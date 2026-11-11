# Sitecore 10.3.2 integration guide

This project is designed to remain usable as the GitHub Pages leadership prototype while also producing a frontend bundle that can be hosted by **Sitecore.NET 10.3.2 (rev. 010081 PRE)** on **.NET Framework 4.8**.

## Supported baseline

The guaranteed baseline is:

- Sitecore 10.3.2
- .NET Framework 4.8
- Sitecore MVC rendering
- Static compiled React/CSS assets served by the Sitecore Content Delivery web application
- No ASP.NET Core runtime requirement
- No Vite dev server in production
- No Node.js runtime requirement on CM/CD for this integration pattern

The React application is treated as a browser-side enhancement mounted by a Sitecore MVC view. Sitecore remains responsible for page delivery, publishing, security, media, workflow and content governance.

## Headless/JSS licensing

Do **not** assume Headless Services/JSS is available from the Sitecore version number alone.

Sitecore recommends checking the active license file for the `Sitecore.JSS` entitlement. If that entitlement is present, this prototype can later be migrated to a JSS/Headless Services implementation. If it is absent, keep the MVC/static-asset model described here.

The current prototype therefore has **no mandatory JSS dependency**.

## Build commands

Normal leadership demo / GitHub Pages:

```bash
npm install
npm run build
```

Sitecore bundle:

```bash
npm install
npm run build:sitecore
```

The Sitecore build is written to:

```
dist-sitecore/
```

It uses a stable asset base:

```
/Assets/StarPubsRecruitment/
```

and stable entry filenames:

```
assets/app.js
assets/app.css
```

The `public/images` directory is copied into the Sitecore bundle automatically.

## Deploying to a Sitecore 10.3.2 test environment

1. Run `npm run build:sitecore`.
2. Copy the **contents** of `dist-sitecore` into the Sitecore webroot folder:
   ```
   /Assets/StarPubsRecruitment/
   ```
3. Copy `sitecore/Views/StarPubsRecruitment/RecruitmentApp.cshtml` into the Sitecore webroot:
   ```
   /Views/StarPubsRecruitment/RecruitmentApp.cshtml
   ```
4. In Sitecore, create a **View Rendering** that points to:
   ```
   /Views/StarPubsRecruitment/RecruitmentApp.cshtml
   ```
5. Add that rendering to the required Sitecore page layout / placeholder.
6. Optionally add a single-line text field called **App Route** to the page template. Supported prototype route values include:
   - `siteHome`
   - `portalHome`
   - `agreements`
   - `faqs`
   - `profile`
   - `saved`
   - `applications`
7. Publish the page, rendering definition and related media/content items to the web database.
8. Verify that the CD server can return:
   - `/Assets/StarPubsRecruitment/assets/app.js`
   - `/Assets/StarPubsRecruitment/assets/app.css`

## Why this is compatible with .NET Framework 4.8

The generated JavaScript and CSS execute in the visitor's browser. Sitecore 10.3.2 only needs to serve the MVC view and static files. The frontend does not require ASP.NET Core, .NET 6/8, Next.js middleware or a Node.js application server.

The build target is ES2018 for a conservative modern-browser baseline.

## Runtime configuration

Before the bundle is loaded, the MVC view sets:

```js
window.__STAR_PUBS_CONFIG__ = {
  assetBase: "/Assets/StarPubsRecruitment/",
  initialPage: "siteHome",
  signedIn: false
};
```

This lets the same compiled bundle work under the Sitecore webroot instead of the GitHub Pages subdirectory.

## Sitecore authoring recommendation

For a production implementation, move hard-coded prototype content into Sitecore items gradually.

Recommended content ownership:

| Experience | Sitecore source |
| --- | --- |
| Homepage hero / CTA copy | Page fields or component datasource |
| Agreement cards | Agreement datasource items |
| FAQ groups / questions | FAQ folder + FAQ item templates |
| Pub vacancy data | Existing vacancy datasource / integration |
| Images | Sitecore Media Library |
| Navigation | Sitecore content tree / link fields |
| Application/account data | Recruitment platform / secure application service, not page fields |

The current React bundle can remain as the presentation layer during that migration.

## Routing

The leadership prototype still uses client-side state navigation internally. That is acceptable when mounted as a single recruitment application page.

For a fully Sitecore-authored production site, create Sitecore content items for public URLs and either:

1. mount only the relevant React feature on each Sitecore page, or
2. switch to JSS/Headless Services if the active licence includes `Sitecore.JSS`.

Do not replace Sitecore page routing with a Vite development server.

## Authentication

The current sign-in is a mock leadership-demo flow only.

For production:

- do not store credentials in JavaScript;
- do not use localStorage as an authentication authority;
- integrate with the approved identity / applicant platform;
- use secure cookies or the organisation's approved identity implementation;
- keep candidate personal data out of Sitecore presentation fields unless the solution design explicitly requires it.

## Forms and applicant data

The prototype application forms and journey states are demonstrative UI. They should connect to the approved recruitment system or an API layer rather than write directly to Sitecore content items.

## Caching

Recommended production pattern:

- fingerprint or version static asset deployments at release level;
- enable long-lived caching for image/font/static assets;
- avoid caching personalised applicant data in Sitecore HTML output;
- keep authenticated applicant responses private/no-store where appropriate.

## Experience Editor

Because this baseline is a client-rendered application, Experience Editor will not provide field-level inline editing for hard-coded React copy.

For production authoring, expose editable Sitecore fields through MVC component datasources, or use JSS/Headless Services if licensed.

## Content Security Policy

If a CSP is enabled, allow the Sitecore-hosted bundle and required image/font origins. The project currently loads Montserrat from Google Fonts in CSS. For a stricter enterprise CSP, replace the external font import with an approved locally hosted webfont or the organisation's existing font stack.

## GitHub Pages

The existing `npm run build` command and GitHub Pages workflow remain unchanged. GitHub Pages uses:

```
/star-pubs-recruitment-portal-demo/
```

The Sitecore build uses:

```
/Assets/StarPubsRecruitment/
```

so the two deployment targets can coexist.
