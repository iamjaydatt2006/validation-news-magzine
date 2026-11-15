# Technical SEO, Open Graph & JSON-LD Schema Architecture

The **Validation News Magzine Theme** is engineered from the ground up to rank in Google News, Google Discover, and social publication feeds.

---

## 1. Clean Document Head & Meta Hygiene

To avoid canonical confusion and duplicate Open Graph tags, the theme omits `<b:include data='blog' name='all-head-content'/>` in favor of hand-tuned meta directives:

- **Canonical URL:** Automatically references `data:view.url.canonical`.
- **Dynamic Descriptions:** Emits `data:view.description.escaped` when present, or an editorial publication fallback.
- **Search Engine Indexing Control:**
  - Search pages (`data:view.isSearch`) and Archive pages (`data:view.isArchive`) receive `noindex,follow` to prevent keyword cannibalization and duplicate indexing.
  - Standard articles and pages receive `index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1`.
- **Social Media Cards:**
  - Open Graph (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:image`, `og:url`).
  - Open Graph images are resized to `1200x630` using Blogger's `resizeImage(data:view.featuredImage, 1200, "1200:630")` operator.
  - Twitter Card: `summary_large_image`.

---

## 2. Structured Data (JSON-LD)

All structured data is generated in strict JSON-LD format using `.jsonEscaped` to eliminate XSS risks and syntax corruption.

### A. Homepage: `NewsMediaOrganization` & `WebSite`
Generated automatically on the front page:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NewsMediaOrganization",
      "@id": "https://yourblog.blogspot.com/#organization",
      "name": "The Editorial Herald",
      "url": "https://yourblog.blogspot.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://resources.blogblog.com/img/blank.gif"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://yourblog.blogspot.com/#website",
      "url": "https://yourblog.blogspot.com/",
      "name": "The Editorial Herald",
      "publisher": {
        "@id": "https://yourblog.blogspot.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://yourblog.blogspot.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

### B. Single Article: `NewsArticle` Schema
Emitted inside single post dispatches (`data:view.isPost`):
- Full author credit with schema type `Person`
- Published (`datePublished`) and modification timestamps (`dateModified`) in ISO 8601
- Lead article photo array
- Headline & deck description
- Publisher reference linked to the root `NewsMediaOrganization`

### C. BreadcrumbList Schema
Constructed for single articles and label archive views:
- Position 1: `Home` (`/`)
- Position 2: `Primary Desk` (`/search/label/<Category>`)
- Position 3: `Article Headline`

---

## 3. Rich Results Testing

Validate your live blog using Google's official testing suites:
1. **[Google Rich Results Test](https://search.google.com/test/rich-results)**: Verifies `NewsArticle`, `WebSite`, and `BreadcrumbList`.
2. **[Schema.org Validator](https://validator.schema.org/)**: Verifies entity relationships and syntax conformance.
