# Webpot Developer Overview

## Project Snapshot

Webpot is a marketing site plus lightweight admin dashboard for a website-services business.

Current responsibilities:

- Public marketing pages for website and digital-media services
- A contact form that stores leads in MySQL and sends email notifications
- An admin dashboard for reviewing leads, updating order status, and deleting records
- Project docs and SQL setup notes for deployment

The codebase is mostly static HTML/CSS/JS on the frontend and plain PHP on the backend.

---

## Current Repository Structure

```text
webpot_new/
|-- index.html
|-- orders.html
|-- basic.html
|-- starter.html
|-- premium.html
|-- digital-services.html
|-- privacy policy.html
|-- terms and conditions.html
|-- robots.txt
|-- sitemap.xml
|
|-- assets/
|   |-- css/
|   |   |-- main.css
|   |   |-- orders.css
|   |   |-- legal.css
|   |   |-- plan-details.css
|   |   `-- service-pages.css
|   |-- js/
|   |   `-- main.js
|   |-- images/
|   |   `-- branding/
|   |       |-- favicon-dark.png
|   |       |-- favicon-light.png
|   |       |-- favicon.png
|   |       |-- webpot-logo-black.png
|   |       `-- webpot-logo-white.png
|   `-- documents/
|       `-- website-business-card.pdf
|
|-- services/
|   |-- social-media.html
|   |-- video-production.html
|   `-- wedding-digital.html
|
|-- dashboard_admin/
|   |-- index.html
|   |-- login.html
|   |-- manage.html
|   `-- assets/
|       |-- css/
|       |   `-- admin.css
|       `-- js/
|           `-- admin.js
|
|-- backend/
|   |-- auth.php
|   |-- config.php
|   |-- contact.php
|   |-- database.php
|   |-- mail_templates.php
|   `-- api/
|       |-- customer.php
|       |-- customers.php
|       |-- delete_customer.php
|       |-- save_customer.php
|       |-- update_status.php
|       `-- _legacy/
|           `-- save._customer.php
|
|-- docs/
|   |-- database/
|   |   `-- SQL_code.md
|   `-- project/
|       |-- Flow.md
|       |-- TODO.md
|       |-- Updating_list.md
|       `-- Webpot_overview.md
|
`-- archive/
    `-- root-branding/
        |-- favicon-dark.png
        |-- favicon-light.png
        |-- favicon.png
        |-- webpot-logo-black.png
        `-- webpot-logo-white.png
```

---

## What Changed In The Cleanup

This overview matches the cleaned layout introduced on April 5, 2026.

Structural cleanup completed:

- Shared site CSS moved into `assets/css/`
- Shared site JS moved into `assets/js/main.js`
- Admin-only CSS/JS moved into `dashboard_admin/assets/`
- Root-level duplicate branding images were archived to `archive/root-branding/`
- Public page URLs were preserved to avoid breaking existing links and sitemap entries

Important consequence:

- The repo root now contains mostly deploy-facing HTML entry pages plus crawler files
- Shared implementation files now live in predictable asset folders

---

## Frontend Surface Area

### Public Pages

| File | Purpose |
| --- | --- |
| `index.html` | Main landing page, company overview, services, plans, FAQ, and contact form |
| `orders.html` | Main pricing / order entry page for website plans |
| `starter.html` | Starter plan detail page |
| `basic.html` | Basic plan detail page |
| `premium.html` | Premium plan detail page |
| `digital-services.html` | Overview page for media and digital-growth services |
| `services/social-media.html` | Social media service detail page |
| `services/video-production.html` | Video production service detail page |
| `services/wedding-digital.html` | Wedding digital service detail page |
| `privacy policy.html` | Legal page |
| `terms and conditions.html` | Legal page |

### Shared Frontend Assets

| File | Role |
| --- | --- |
| `assets/css/main.css` | Main visual system for public pages |
| `assets/css/orders.css` | Orders page-specific styles |
| `assets/css/legal.css` | Legal page styles |
| `assets/css/plan-details.css` | Shared styling for plan detail pages |
| `assets/css/service-pages.css` | Shared styling for service detail pages in `services/` |
| `assets/js/main.js` | Scroll reveal, preloader, FAQ, counter animation, dropdown behavior, and contact-status handling |

### Frontend Notes

- The public site still uses standalone HTML files rather than a templating layer.
- Legal routes intentionally keep their existing filenames with spaces because internal links already depend on them.
- `index.html` contains the only contact form currently wired to the backend.

---

## Admin Dashboard

### Pages

| File | Purpose |
| --- | --- |
| `dashboard_admin/login.html` | Admin authentication UI |
| `dashboard_admin/index.html` | Customer list view |
| `dashboard_admin/manage.html` | Single-customer detail / update screen |

### Assets

| File | Role |
| --- | --- |
| `dashboard_admin/assets/css/admin.css` | Dashboard styling |
| `dashboard_admin/assets/js/admin.js` | Auth checks, list rendering, manage-screen loading, save/update/delete actions, and toast feedback |

### How The Admin Flow Works

1. `dashboard_admin/login.html` performs `fetch('../backend/auth.php?action=check')` on load.
2. On submit it posts JSON credentials to `../backend/auth.php?action=login`.
3. Successful login redirects to `dashboard_admin/index.html`.
4. `dashboard_admin/assets/js/admin.js` checks auth again before loading customer data.
5. Customer list data comes from `backend/api/customers.php`.
6. Manage view loads a single record from `backend/api/customer.php?id=...`.
7. Save, status update, and delete actions call the corresponding API endpoints.

---

## Backend

### Core Files

| File | Purpose |
| --- | --- |
| `backend/config.php` | Site metadata, email settings, database credentials, and hardcoded admin credentials |
| `backend/database.php` | MySQLi singleton connection helper |
| `backend/contact.php` | Handles public contact form submissions, DB insert, and email sending |
| `backend/auth.php` | Session-backed admin auth API (`login`, `logout`, `check`) |
| `backend/mail_templates.php` | HTML email template rendering |

### Admin APIs

| Endpoint File | Purpose |
| --- | --- |
| `backend/api/customers.php` | Return all customers, optionally filtered by status |
| `backend/api/customer.php` | Return one customer by ID |
| `backend/api/save_customer.php` | Save admin-managed fields like plan, agreed price, date, and notes |
| `backend/api/update_status.php` | Change order status and attempt customer notification email |
| `backend/api/delete_customer.php` | Delete a customer record |

### Database Shape

The active schema is documented in `docs/database/SQL_code.md`.

Primary table:

- `customers`

Supporting table:

- `email_logs`

Status values used in code:

- `Ordered`
- `Processing`
- `Completed`

Derived payment labels in API responses:

- `Ordered` -> `Unpaid`
- `Processing` -> `Half Paid`
- `Completed` -> `Paid`

---

## Request And Data Flow

### Public Contact Flow

1. A visitor submits the contact form in `index.html`.
2. The form posts to `backend/contact.php`.
3. `contact.php` validates input and ignores honeypot spam submissions.
4. A customer row is inserted into MySQL.
5. Admin email and customer confirmation email are sent.
6. The user is redirected back to `index.html?contact_status=...#contact`.
7. `assets/js/main.js` reads `contact_status` and surfaces the result message in the form UI.

### Admin Customer Management Flow

1. Admin authenticates through `backend/auth.php`.
2. Dashboard pages require an active PHP session.
3. Admin JS fetches customer data from `backend/api/*`.
4. Status changes write to the database and log email outcomes.
5. Save and delete actions update or remove records immediately.

---

## Asset And Naming Conventions

The repo now follows these conventions:

- Public entry pages stay at repo root unless a route migration is planned
- Shared public assets belong under `assets/`
- Admin-only assets belong under `dashboard_admin/assets/`
- Branding source-of-truth lives in `assets/images/branding/`
- Old duplicates should be archived, not silently reintroduced at root

If new pages are added:

- Put the HTML file where the final route should live
- Reuse `assets/css/main.css` and `assets/js/main.js` unless the page truly needs a new scoped file
- Keep branding references pointed at `assets/images/branding/`

---

## Known Technical Debt

These issues still exist after the structural cleanup:

1. `backend/config.php` stores real-looking database and admin credentials directly in source.
2. Backend queries rely on escaped string interpolation instead of prepared statements.
3. Several frontend files contain encoding artifacts like `â€“` and `â€™`.
4. Legal page filenames contain spaces, which is workable but not ideal for long-term routing hygiene.
5. The public site repeats navbar and footer markup across many HTML files.

Recommended next improvements:

- Move secrets to environment configuration
- Convert database writes/reads to prepared statements
- Normalize text encoding to UTF-8 without mojibake artifacts
- Introduce reusable partials or a build step for shared layout sections
- Consider route-safe renames for legal pages only with redirects or coordinated link updates

---

## Developer Quick Start

### Public Site

- Edit the relevant HTML entry page
- Update shared styles in `assets/css/`
- Update shared behavior in `assets/js/main.js`

### Admin Dashboard

- Update markup in `dashboard_admin/*.html`
- Update admin styling in `dashboard_admin/assets/css/admin.css`
- Update dashboard behavior in `dashboard_admin/assets/js/admin.js`

### Backend

- Adjust DB and email behavior in `backend/`
- Review schema notes in `docs/database/SQL_code.md`

---

## Bottom Line

This project is now organized around a clear split:

- deployable public pages at the root
- shared public assets in `assets/`
- admin-only UI in `dashboard_admin/`
- PHP backend logic in `backend/`
- supporting docs in `docs/`
- archived duplicate branding in `archive/`

That structure should be the baseline for future work unless the project is intentionally migrated to a framework or build system.
