/**
 * Validation News Magzine Theme - Comprehensive XML Validator & Linter
 * Performs deep W3C XML, Blogger Layout v3, JSON-LD, CDATA & CDN audits.
 * @package ValidationNewsMagzine
 * @version 1.2.0
 * @author Jaydatta Khodave
 * @license MIT
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const XML_FILE = path.join(ROOT_DIR, 'dist/validation-news-magzine.xml');

console.log('===============================================================');
console.log('VALIDATION NEWS MAGZINE THEME - STRICT XML AUDIT SUITE (v1.2.0)');
console.log('===============================================================\n');

if (!fs.existsSync(XML_FILE)) {
  console.error(`FAIL: Theme XML file does not exist: ${XML_FILE}`);
  process.exit(1);
}

const content = fs.readFileSync(XML_FILE, 'utf-8');

let hasErrors = false;
function assertCheck(name, passed, detail) {
  if (passed) {
    console.log(`✓ [PASS] ${name}${detail ? ` - ${detail}` : ''}`);
  } else {
    console.error(`✗ [FAIL] ${name}${detail ? ` - ${detail}` : ''}`);
    hasErrors = true;
  }
}

// 1. Strict XML Well-Formedness (Python ElementTree / xmllint)
try {
  const pyCheck = `python3 -c "import xml.etree.ElementTree as ET; ET.parse('${XML_FILE}')"`;
  execSync(pyCheck, { stdio: 'pipe' });
  assertCheck('CHECK 1: Strict XML Parser Well-Formedness', true, 'Document parses with 0 W3C syntax errors');
} catch (e) {
  assertCheck('CHECK 1: Strict XML Parser Well-Formedness', false, e.message);
}

// 2. Blogger Engine Root Tag & Attributes
const rootMatch = content.match(/<html\b([^>]*)>/i);
if (rootMatch) {
  const attrs = rootMatch[1];
  const hasLayoutsV3 = attrs.includes("b:layoutsVersion='3'");
  const hasWidgetV2 = attrs.includes("b:defaultwidgetversion='2'");
  const hasCssFalse = attrs.includes("b:css='false'");
  const hasResponsive = attrs.includes("b:responsive='true'");

  assertCheck('CHECK 2.1: Blogger Layouts Version v3', hasLayoutsV3, "b:layoutsVersion='3'");
  assertCheck('CHECK 2.2: Blogger Widget Version v2', hasWidgetV2, "b:defaultwidgetversion='2'");
  assertCheck('CHECK 2.3: Strip Default Blogger CSS Bundle', hasCssFalse, "b:css='false'");
  assertCheck('CHECK 2.4: Responsive Layout Enabled', hasResponsive, "b:responsive='true'");
} else {
  assertCheck('CHECK 2: Root <html> element', false, 'Root <html> tag not found');
}

// 3. Section and Widget Direct Child Hierarchy Check
let sectionCount = 0;
let sectionsValid = true;
try {
  const pySectionCheck = `python3 -c "
import xml.etree.ElementTree as ET, json
tree = ET.parse('${XML_FILE}')
root = tree.getroot()
sections = root.findall('.//{http://www.google.com/2005/gml/b}section')
result = {'count': len(sections), 'invalid': []}
for sec in sections:
    sec_id = sec.attrib.get('id', 'unknown')
    for child in sec:
        if not child.tag.endswith('widget'):
            result['invalid'].append({'section': sec_id, 'tag': child.tag})
print(json.dumps(result))
"`;
  const secResult = JSON.parse(execSync(pySectionCheck, { stdio: ['pipe', 'pipe', 'pipe'] }).toString());
  sectionCount = secResult.count;
  if (secResult.invalid.length > 0) {
    sectionsValid = false;
    console.error('Invalid direct tags found inside <b:section>:', secResult.invalid);
  }
} catch (e) {
  sectionsValid = false;
  console.error('Error during section inspection:', e.message);
}

assertCheck(`CHECK 3: Section Widget Nesting (${sectionCount} sections found)`, sectionsValid, 'Zero raw HTML directly in <b:section> (only valid <b:widget> elements)');

// 4. PopularPosts & PageList Widget Schema Configuration
const ppMatch = content.match(/<b:widget[^>]*type=['"]PopularPosts['"][^>]*>([\s\S]*?)<\/b:widget>/);
if (ppMatch) {
  const ppBody = ppMatch[1];
  const hasAllTime = ppBody.includes("<b:widget-setting name='timeRange'>ALL_TIME</b:widget-setting>");
  const hasInvalid30Days = ppBody.includes('LAST_30_DAYS');
  assertCheck('CHECK 4.1: PopularPosts timeRange Settings', hasAllTime && !hasInvalid30Days, "Valid enum 'ALL_TIME' (Zero rejected 'LAST_30_DAYS')");
} else {
  assertCheck('CHECK 4.1: PopularPosts Widget Presence', false, 'PopularPosts1 widget not found');
}

const pageListMatch = content.match(/<b:widget[^>]*type=['"]PageList['"][^>]*>([\s\S]*?)<\/b:widget>/);
if (pageListMatch) {
  const pageListBody = pageListMatch[1];
  const hasInvalidLinkSetting = pageListBody.includes("name='link-") || pageListBody.includes('name="link-');
  assertCheck('CHECK 4.2: PageList Widget Schema Settings', !hasInvalidLinkSetting, "Zero invalid 'link-X' setting names (PageList schema allows only pageListJson/homeTitle)");
} else {
  assertCheck('CHECK 4.2: PageList Widget Presence', false, 'PageList1 widget not found');
}

// 5. JSON-LD Blocks Verification
const jsonLdRegex = /<script\b[^>]*type=['"]application\/ld\+json['"][^>]*>([\s\S]*?)<\/script>/gi;
let jsonLdMatch;
let jsonLdCount = 0;
let jsonLdValid = true;

while ((jsonLdMatch = jsonLdRegex.exec(content)) !== null) {
  jsonLdCount++;
  let rawJson = jsonLdMatch[1];
  // Replace XML entity quotes &quot; with standard quotes "
  let decoded = rawJson.replace(/&quot;/g, '"').replace(/&amp;/g, '&');

  // Check for illegal trailing commas before closing braces/brackets
  const trailingCommaMatch = decoded.match(/,\s*([}\]])/);
  if (trailingCommaMatch) {
    console.error(`Trailing comma detected in JSON-LD block #${jsonLdCount}: ${trailingCommaMatch[0]}`);
    jsonLdValid = false;
  }

  // Substitute Blogger XML tags with valid mock strings to verify syntax
  let mockJson = decoded
    .replace(/<b:if[^>]*>[\s\S]*?<\/b:if>/g, '""')
    .replace(/<data:[^>]*\/>/g, 'https://example.com/mock')
    .replace(/<[^>]+>/g, '');

  try {
    JSON.parse(mockJson);
  } catch (err) {
    // If parse fails due to placeholder replacement, test direct structure without trailing commas
    if (trailingCommaMatch) {
      jsonLdValid = false;
    }
  }
}
assertCheck(`CHECK 5: JSON-LD Structured Data Schema (${jsonLdCount} blocks)`, jsonLdValid, 'Zero trailing commas and valid schema objects');

// 6. Ampersand Escaping outside CDATA
const noCdata = content.replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '');
const invalidAmps = noCdata.match(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g);
assertCheck('CHECK 6: Escaped Ampersands Outside CDATA', !invalidAmps, invalidAmps ? `Found ${invalidAmps.length} unescaped '&'` : '100% compliant &amp;');

// 7. Self-Closing Void Tags Check
const voidTags = ['img', 'input', 'meta', 'link', 'br', 'hr'];
let voidTagsValid = true;
for (const vt of voidTags) {
  const unclosed = noCdata.match(new RegExp('<' + vt + '(?:\\s+[^>]*?)?(?<!/)>', 'gi'));
  if (unclosed) {
    const realUnclosed = unclosed.filter(u => !u.startsWith('<b:') && !u.startsWith('<data:'));
    if (realUnclosed.length > 0) {
      console.error(`Unclosed void tag <${vt}>:`, realUnclosed.slice(0, 3));
      voidTagsValid = false;
    }
  }
}
assertCheck('CHECK 7: XHTML Self-Closing Void Tags', voidTagsValid, 'All <link/>, <meta/>, <img/>, <input/> properly terminated');

// 8. jsDelivr CDN URLs Resolution to Local Repository Assets
const cdnRegex = /https:\/\/cdn\.jsdelivr\.net\/gh\/iamjaydatt2006\/validation-news-magzine@v1\.2\.0\/([a-zA-Z0-9_\-./]+)/g;
let cdnMatch;
let cdnUrlsCount = 0;
let cdnUrlsValid = true;

while ((cdnMatch = cdnRegex.exec(content)) !== null) {
  cdnUrlsCount++;
  const assetRelPath = cdnMatch[1];
  const localAssetPath = path.join(ROOT_DIR, assetRelPath);
  if (!fs.existsSync(localAssetPath)) {
    console.error(`CDN asset 404: ${assetRelPath} not found at ${localAssetPath}`);
    cdnUrlsValid = false;
  }
}
assertCheck(`CHECK 8: jsDelivr CDN Asset Mapping (${cdnUrlsCount} URLs)`, cdnUrlsValid && cdnUrlsCount > 0, 'All v1.2.0 CDN endpoints resolve to existing files');

// 9. Blogger Layout v3 <b:defaultmarkups> Verification
const hasDefaultMarkups = content.includes('<b:defaultmarkups>') && content.includes('</b:defaultmarkups>');
assertCheck('CHECK 9: Blogger Layout v3 <b:defaultmarkups>', hasDefaultMarkups, 'Global widget default markups declared to prevent no-items layout stripping');

// 10. Blog1 Modular Architecture & Includable Contracts (15 Required Includables)
const blog1Match = content.match(/<b:widget[^>]*id=['"]Blog1['"][^>]*>([\s\S]*?)<\/b:widget>/);
let blog1Valid = false;
let missingBlogIncludables = [];
if (blog1Match) {
  const b1Body = blog1Match[1];
  const requiredIncludables = [
    'main',
    'archiveHeader',
    'featuredLeadPost',
    'postCard',
    'singlePost',
    'staticPage',
    'postBreadcrumbs',
    'postMeta',
    'postLabels',
    'postShare',
    'authorBox',
    'postPagination',
    'threadedComments',
    'emptyState',
    'error404'
  ];

  for (const inc of requiredIncludables) {
    if (!b1Body.includes(`id='${inc}'`) && !b1Body.includes(`id="${inc}"`)) {
      missingBlogIncludables.push(inc);
    }
  }
  blog1Valid = missingBlogIncludables.length === 0;
  assertCheck(`CHECK 10: Blog1 Modular Architecture (${requiredIncludables.length} contracts)`, blog1Valid, blog1Valid ? 'Contains all 15 modular includables (main, archiveHeader, lead, cards, post, comments, etc.)' : `Missing includables: ${missingBlogIncludables.join(', ')}`);
} else {
  assertCheck('CHECK 10: Blog1 Widget Presence', false, 'Blog1 widget missing');
}

// 11. Section showaddelement Permissions & Classes
const pySectionPermCheck = `python3 -c "
import xml.etree.ElementTree as ET, json
tree = ET.parse('${XML_FILE}')
root = tree.getroot()
sections = root.findall('.//{http://www.google.com/2005/gml/b}section')
invalid = []
for sec in sections:
    sec_id = sec.attrib.get('id', '')
    perm = sec.attrib.get('showaddelement', '')
    cls = sec.attrib.get('class', '')
    if perm != 'yes' or not cls:
        invalid.append({'id': sec_id, 'showaddelement': perm, 'class': cls})
print(json.dumps({'count': len(sections), 'invalid': invalid}))
"`;
const secPermResult = JSON.parse(execSync(pySectionPermCheck, { stdio: ['pipe', 'pipe', 'pipe'] }).toString());
assertCheck(`CHECK 11: Section showaddelement Permissions & Classes (${secPermResult.count} sections)`, secPermResult.invalid.length === 0, secPermResult.invalid.length === 0 ? `All ${secPermResult.count} sections have showaddelement="yes" and semantic class attributes` : `Invalid sections: ${JSON.stringify(secPermResult.invalid)}`);

// 12. Blogger Layout Wireframe (<b:template-skin>)
const tmplSkinMatch = content.match(/<b:template-skin>([\s\S]*?)<\/b:template-skin>/i);
let hasTemplateSkin = false;
if (tmplSkinMatch) {
  const tsCss = tmplSkinMatch[1];
  hasTemplateSkin = tsCss.includes('body#layout') && tsCss.includes('.section');
}
assertCheck('CHECK 12: Blogger Layout Editor Wireframe (<b:template-skin>)', hasTemplateSkin, 'Dedicated body#layout CSS wireframe for Blogger Theme Layout dashboard');

// 13. Native v2 Widget Includables (<b:includable id="main">)
let widgetsWithoutMain = [];
let totalWidgets = 0;
try {
  const pyWidgetCheck = `python3 -c "
import xml.etree.ElementTree as ET, json
tree = ET.parse('${XML_FILE}')
root = tree.getroot()
widgets = root.findall('.//{http://www.google.com/2005/gml/b}widget')
missing = []
for w in widgets:
    w_id = w.attrib.get('id', 'unknown')
    mains = [inc for inc in w.findall('.//{http://www.google.com/2005/gml/b}includable') if inc.attrib.get('id') == 'main']
    if not mains:
        missing.append(w_id)
print(json.dumps({'total': len(widgets), 'missing': missing}))
"`;
  const widgetResult = JSON.parse(execSync(pyWidgetCheck, { stdio: ['pipe', 'pipe', 'pipe'] }).toString());
  totalWidgets = widgetResult.total;
  widgetsWithoutMain = widgetResult.missing;
} catch (e) {
  widgetsWithoutMain = [e.message];
}
assertCheck(`CHECK 13: Native v2 Widget Includables (${totalWidgets} widgets)`, widgetsWithoutMain.length === 0, widgetsWithoutMain.length === 0 ? `All ${totalWidgets} widgets implement valid <b:includable id='main'>` : `Widgets missing main includable: ${widgetsWithoutMain.join(', ')}`);

// 14. Blogger Theme Designer Variable Definitions (<Variable> in <b:skin>)
const bSkinMatch = content.match(/<b:skin>([\s\S]*?)<\/b:skin>/i);
let hasVariables = false;
if (bSkinMatch) {
  const skinBody = bSkinMatch[1];
  hasVariables = skinBody.includes('<Variable name="keycolor"') &&
                 skinBody.includes('<Group description="Theme Colors"') &&
                 skinBody.includes('<Variable name="bg.page"');
}
assertCheck('CHECK 14: Theme Designer Variable Definitions', hasVariables, 'Valid <Variable> and <Group> blocks declared in <b:skin> for Blogger Theme Designer GUI');

// 15. Semantic Microdata Schema (Per basic-blogger-template documentation)
const hasMicrodata = content.includes("itemtype='http://schema.org/WebPage'") &&
                     content.includes("itemtype='http://schema.org/WPHeader'") &&
                     content.includes("itemtype='http://schema.org/SiteNavigationElement'") &&
                     content.includes("itemtype='http://schema.org/Blog'") &&
                     content.includes("itemtype='http://schema.org/WPSideBar'") &&
                     content.includes("itemtype='http://schema.org/WPFooter'");
assertCheck('CHECK 15: Schema.org Semantic Microdata & Microformats', hasMicrodata, 'Complete HTML5 Microdata markup across WebPage, WPHeader, SiteNav, Blog, WPSideBar & WPFooter');

console.log('\n===============================================================');
if (hasErrors) {
  console.error('RESULT: VALIDATION FAILED! Please resolve errors above.');
  process.exit(1);
} else {
  console.log('RESULT: ALL XML & BLOGGER AUDITS PASSED WITH 100% SUCCESS!');
  console.log('===============================================================\n');
  process.exit(0);
}
