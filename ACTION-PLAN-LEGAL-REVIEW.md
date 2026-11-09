# TBC Website Legal Review — Action Plan

**Source:** TBC Website Legal Review_1.docx (SharePoint, 12_MARKETING/Website (2026)/Reviews/)
**Date:** 22 October 2026
**Repo:** `TBC website/website-main` (Hugo, theme `the-black-circle`)

---

## Key architectural notes

- Page body text is **hardcoded in HTML layout templates**, not in markdown. Edits target `.html` files under `themes/the-black-circle/layouts/`, not the `_index.md` files.
- Meta descriptions live in **front matter** (`_index.md` files under `themes/the-black-circle/content/`).
- **No cookies policy page exists** — it must be created from scratch.
- **No cookie consent banner exists site-wide** — the `access-popup.html` partial (Swiss entity references) is dead code; `main.js` cookie logic is broken.
- The footer entity list omits the ADGM registration number (32099); the Terms and Privacy Policy include it.
- Tracking scripts (GA `G-S73N3620LZ`, HubSpot `244247196`, PageSense `895907915`) load unconditionally in `head.html` with no consent gate.
- The contact form uses `mailto:` with a personal CC (`alberto@theblackcircle.com`), not the configured leads API.

---

## Phase 1 — Regulatory status wording (High)

**Issue 1:** "Regulated" wording goes beyond TBCWM's approved-manager scope.

### 1a. Hero badges — all three languages

| File | Lines |
|---|---|
| `themes/the-black-circle/layouts/home.en.html` | ~15-19 |
| `themes/the-black-circle/layouts/home.ar.html` | ~16-18 |
| `themes/the-black-circle/layouts/home.zh-tw.html` | ~16-18 |

**EN changes:**

| Current | Replace with |
|---|---|
| `BVI · Cayman · ADGM` — Multi-jurisdictional group | `BVI · Cayman` — Investment manager |
| `Regulated investment manager` — BVI FSC, Approved Managers Regs. | `BVI-approved investment manager` — TBCWM International Limited, approved by the BVI FSC |
| `Professional & institutional clients` — Not intended for retail investors | Keep as is |

**AR / ZH:** Translate the same badge changes in their respective files.

### 1b. Footer entity paragraph — replace with the standard regulatory-status statement

| File | Lines |
|---|---|
| `themes/the-black-circle/layouts/_partials/footer.en.html` | `.tbc-footer-legal` first paragraph |
| `themes/the-black-circle/layouts/_partials/footer.ar.html` | equivalent |
| `themes/the-black-circle/layouts/_partials/footer.zh-tw.html` | equivalent |

Replace the first entity-list paragraph with (word for word):

> Regulatory status. TBCWM International Limited (BVI company no. 2202526) is approved by the British Virgin Islands Financial Services Commission as an approved investment manager under the Investment Business (Approved Managers) Regulations. This approval allows it to act as investment manager to certain private and professional funds, including the segregated portfolios of The Black Circle Investment SPC (Cayman Islands company no. 432397). The Black Circle SPV Limited (ADGM registration no. 32099) is registered with the ADGM Registration Authority. It does not hold a Financial Services Permission and is not regulated by the ADGM Financial Services Regulatory Authority. Services described on this website that are provided by third parties are provided under those parties' own terms and regulatory status.

### 1c. Home page body copy

| File: `themes/the-black-circle/layouts/home.en.html` | |
|---|---|
| Hero subtitle: "…with concierge service, a privacy-first approach, and product-neutral advice across borders." | "…delivered with concierge service and a privacy-first approach, through a group operating across several jurisdictions." |
| "A regulated private wealth platform across multiple jurisdictions." | "A private wealth platform built around a BVI-approved investment manager." |
| "…held to the standard of a regulated institution and delivered with confidentiality and a single point of contact." | "…delivered with institutional controls, confidentiality and a single point of contact." |

### 1d. Solutions section body copy

| File: `themes/the-black-circle/layouts/home.en.html` (or `solutions/section.html`) | |
|---|---|
| "Each capability is delivered within a regulated framework and aligned to the client's objectives…" | "Each capability is aligned to the client's objectives, risk profile and jurisdictional requirements. Where a capability is a regulated activity, it is carried out only by an appropriately authorised entity." |

### 1e. Meta descriptions (front matter)

| File | Current | Replace with |
|---|---|---|
| `content/_index.en.md` | "The Black Circle provides regulated wealth planning, investment management, private banking, and custody…" | "Private wealth management — wealth planning, investment management, secondary market deals, and tailored solutions. For professional and institutional clients only." |
| `themes/.../content/solutions/wealth-planning/_index.md` | "regulated wealth planning…" | "Introductions to independent life insurance and fiduciary providers for succession and structuring. For professional clients only." |
| `themes/.../content/solutions/investment/_index.md` | "regulated crypto investment services … in ADGM" | "Discretionary investment management across traditional assets, digital assets and gold by TBCWM International Limited, a BVI-approved investment manager. For professional investors only." |

---

## Phase 2 — ADGM references removed/corrected (High)

**Issue 2:** ADGM shown next to "regulated" badge; Terms link to ADGM COBS; investment page meta says "regulated crypto investment services … in ADGM."

| # | File | Change |
|---|---|---|
| 2a | `home.en/ar/zh-tw.html` hero badges | Remove "ADGM" from badge 1 (done in Phase 1a) |
| 2b | `themes/.../layouts/terms/section.html` (~line with "Learn more" button) | Remove the ADGM COBS link, or redirect it to the Investor Eligibility clause |
| 2c | `themes/.../content/solutions/investment/_index.md` meta | "regulated crypto investment services … in ADGM" → fixed in Phase 1e |

---

## Phase 3 — Chinese and Arabic translation alignment (High)

**Issue 3:** Chinese and Arabic heroes promise "private banking and custody"; Arabic adds "independent" advice. Neither matches English.

| File | Action |
|---|---|
| `themes/the-black-circle/layouts/home.zh-tw.html` | Align all body copy with the EN redlines from Phase 1c. Remove "private banking" and "custody" claims. |
| `themes/the-black-circle/layouts/home.ar.html` | Align all body copy with EN redlines. Remove "independent" advice wording. |

**Issue 4:** Traditional Chinese and Arabic versions look like targeting of Hong Kong / onshore UAE.

| File | Action |
|---|---|
| `config/_default/hugo.toml` (languages) | Evaluate whether `/zh-tw/` and `/ar/` should remain public. Options: (a) remove the sub-sites, (b) gate them behind the jurisdiction gate (Phase 4), (c) keep but ensure all copy matches EN and the gate intercepts before content loads. |

---

## Phase 4 — Jurisdiction gate (High)

**Issues 4, 7:** Cross-border marketing risk (HK, UAE, UK, US).

### 4a. Build a new jurisdiction-gate partial

Create `themes/the-black-circle/layouts/_partials/jurisdiction-gate.html` — a modal/overlay shown on first visit:

- Text (word for word per the review)
- Country of residence dropdown
- "I confirm and continue" button
- "Leave" button

### 4b. Wire it into `baseof.html`

Include the gate partial in `baseof.html` so it appears on every page, all languages.

### 4c. JS for the gate

Add logic to `main.js` (or a new `gate.js`):
- Set a cookie/localStorage flag after confirmation
- On subsequent visits, skip the modal
- On "Leave", redirect to a safe page or blank state

### 4d. UK geo-blocking for crypto pages

For `/solutions/bitcoin-and-crypto-backed-lending/` and `/solutions/investment/`:
- Option A: Server-side geo-block UK IPs
- Option B: Add UK exclusion to the gate text (already in the review wording)

### 4e. US secondaries gating

The "space sector" secondary market copy should only show deal details behind login, after eligibility checks (covered in Phase 12).

### 4f. Remove the dead Swiss-entity modal

Delete `themes/the-black-circle/layouts/_partials/access-popup.html` and clean up the broken JS in `themes/the-black-circle/assets/js/main.js` (lines ~194-246).

---

## Phase 5 — Legacy page content redlines (High)

**Issue 5:** Tailored Solutions, Bitcoin, and The Origin contain old/stronger claims.

### 5a. Tailored Solutions

| File: `themes/.../layouts/solutions/tailored-solutions/section.html` | |
|---|---|
| "Access to a regulated environment for digital and traditional assets" | Delete |
| "Tax Structuring — Optimize personal and business taxation through compliant frameworks." | "Tax advice — Introductions to independent tax advisers." |
| "Corporate Setup — Establish regulated entities for international business and asset protection." | "Corporate services — Introductions to licensed corporate service providers." |
| "Visa & Residency — Access long-term residency programs and investor visas…" | "Visa & Residency — Introductions to licensed immigration and residency advisers in the UAE and other jurisdictions." |
| "Through our network of regulated banking partners, we assist clients with introductions, account opening, and cross-border coordination." | "We can introduce clients to banks in several jurisdictions. Account opening is at each bank's discretion and subject to its own checks." |
| "Secure settlement and treasury management; Simplified compliance and consolidated reporting" | Delete |
| "A dedicated relationship manager providing personalized guidance to find the best solutions for your financial needs." | "A dedicated relationship manager to coordinate your requests." |

Also update `themes/.../content/solutions/tailored-solutions/_index.md` meta description.

### 5b. Bitcoin-Backed Lending

| File: `themes/.../layouts/solutions/bitcoin-and-crypto-backed-lending/section.html` | |
|---|---|
| "Why Leading Clients Choose Our Financing Solutions" | "Bitcoin-backed financing through third-party lenders" |
| "Institutional-grade execution — Competitive rates and deep liquidity through trusted global partners." | "Rates and terms are set by the third-party lender and depend on market conditions and your collateral." |
| "Secure custody — Assets held through appropriately regulated third-party providers…" | "Custody — Collateral is held by the lender or its custodian, not by The Black Circle. Insurance, where available, is subject to the custodian's terms." |
| Add under VASP heading | "Execution, staking and custody are carried out by third-party providers for the SPC's portfolios. No Group entity provides virtual asset exchange or custody services to clients." |

Also update `themes/.../content/solutions/bitcoin-and-crypto-backed-lending/_index.md` meta description.

### 5c. The Origin

| File: `themes/.../layouts/the-origin/section.html` | |
|---|---|
| "Institutional-grade custody and insured infrastructure safeguard every asset under our management." | "Client assets are held with third-party custodians. Insurance, where available, is subject to each custodian's terms, limits and exclusions." |
| "A dedicated relationship manager delivers 24/7 personalized support…" | "A dedicated relationship manager supports you, with out-of-hours contact for urgent matters." |
| "Independent advisory model providing objective access to third-party products, ensuring selection based solely on client interests." | "We select third-party providers on their merits for each client and disclose any fees we receive from them. Conflicts of interest are managed under our conflicts policy." |
| "We operate with full transparency, regulatory discipline, and fiduciary care, setting a new benchmark for digital asset management." | "We operate transparently and within the regulatory requirements that apply to each Group entity." |
| "The Black Circle is more than a financial institution." | "The Black Circle is more than an investment manager." |
| "Our dedicated research team delivers market intelligence…" | "Our team shares market commentary with clients. Commentary is general information, not investment advice." |
| "Every solution amplifies, diversifies, and secures your wealth for sustainable growth." | "Our solutions are designed to support diversification. All investments carry risk." |
| Meta: "Digital Asset Wealth Management Leaders", "traditional private banking excellence" | "About The Black Circle — our story and leadership" |

Also update `themes/.../content/the-origin/_index.md` meta description.

---

## Phase 6 — Crypto VASP wording (High)

**Issue 6:** Crypto execution, staking, lending and custody wording may read as TBCWM providing virtual-asset services (BVI VASP Act).

### 6a. Investment Management page

| File: `themes/.../layouts/solutions/investment/section.html` | |
|---|---|
| "…within a regulated FSC framework…" | "…managed by TBCWM International Limited, a BVI-approved investment manager, for the segregated portfolios of The Black Circle Investment SPC…" |
| "…through trusted brokers operating under a regulated framework…" | "…through third-party brokers and liquidity providers we select, each acting under its own terms and regulatory status…" |
| "Institutional security. Complete control." | "Institutional custody." |
| "…institutional custody through FSC-approved third-party custodians." | "…custody with third-party custodians, licensed or registered in their own jurisdictions where required." |
| "Best Execution — Competitive pricing and minimal spreads through trusted global brokers." | "Execution — We aim to obtain the best terms reasonably available, taking into account price, costs, speed and likelihood of execution." |
| "…full documentation transparency and regulated settlement." | "…with a trade confirmation for every transaction." |
| "Lending — Generate yield by lending to over-collateralized institutional borrowers." | "Lending — Lending to institutional borrowers, usually against collateral. Lending involves counterparty, collateral and liquidity risk, and returns are not guaranteed." |
| Spot & OTC Execution heading | Add: "Execution, staking and custody are carried out by third-party providers for the SPC's portfolios. No Group entity provides virtual asset exchange or custody services to clients." |

### 6b. Bitcoin page

Already covered in Phase 5b (VASP disclaimer line).

---

## Phase 7 — Gold page additions (High)

| File: `themes/.../layouts/solutions/gold/section.html` | |
|---|---|
| Under Gold-Backed Financing heading | Add: "Financing is provided by third-party lenders under their own terms. No Group entity lends money." |
| "Physical gold … held with approved custodians. Exclusive access to institutional-grade gold structures." | "Physical gold … held with third-party custodians we select. Access to institutional gold structures, subject to eligibility." |

Also update `themes/.../content/solutions/gold/_index.md` meta if it contains "exclusive" claims.

---

## Phase 8 — Home page remaining redlines (High)

| File: `themes/.../layouts/home.en.html` (+ ar, zh-tw) | |
|---|---|
| Wealth Planning card: "Structuring and succession arrangements … through compliant insurance and fiduciary solutions." | "Structuring and succession arrangements through introductions to independent, appropriately licensed insurance and fiduciary providers." |
| Secondary Market Deals card: "Curated access to secondary market opportunities across US and global markets, including the space sector." | "Access, for eligible professional investors, to selected private-company opportunities, offered only through the relevant offering documents and subject to your jurisdiction." |
| Bitcoin card: "Bitcoin-backed financing and yield … Exclusive, institutional-only bitcoin structures." | "Bitcoin-backed financing and yield arranged with third-party providers, for eligible professional clients only. Digital assets are volatile and you may lose some or all of your investment." |
| Service section: "…decisions are driven solely by the client's objectives, and arrangements are fully segregated and private." | "…decisions are made in line with the client's objectives and our conflicts-of-interest policy, and client assets are held in segregated arrangements with third-party custodians." |

---

## Phase 9 — Terms & Conditions amendments (Medium)

**Issue 9, 7 (UK restriction).**

| File: `themes/.../layouts/terms/section.html` (+ `.ar`, `.zh-tw`) | |
|---|---|
| Banner "Learn more" link to ADGM COBS | Remove the link, or point to Investor Eligibility clause |
| General (new first paragraph) | Add: "This Website is operated by TBCWM International Limited, a company incorporated in the British Virgin Islands with company number 2202526, whose registered office is at [address] ('we', 'us', 'our'). References to 'The Black Circle Group' mean TBCWM International Limited and its affiliates." |
| General — ADGM entity | Add: "…The Black Circle SPV Limited, registered with the ADGM Registration Authority with registration number 32099. It does not hold a Financial Services Permission and is not regulated by the ADGM Financial Services Regulatory Authority." |
| General — amendments | Consolidate two change clauses into one |
| General — capacity | "You confirm that you are at least 18 years old and have legal capacity to agree to these Terms." |
| New: Regulatory status clause | Insert the standard regulatory-status statement from Phase 1b |
| New: Third-party services clause | "Where we introduce you to a third-party provider, we or another Group entity may receive a fee or other benefit from that provider. We will tell you about it before you enter into any arrangement." |
| New: Jurisdictional restrictions | "In particular, the Website is not directed at persons in the United Kingdom, the United States, Hong Kong or the United Arab Emirates (outside the ADGM and DIFC), unless a Group entity has confirmed in writing that it may lawfully deal with them." |
| Cookies and analytics | Update cross-reference: "…set out in our Privacy Policy and Cookies Policy." |
| New: Complaints clause | "If you have a complaint about the Website or our services, please write to complaints@theblackcircle.com. We will acknowledge it within 5 business days and aim to respond in full within 30 days." |
| New: Translations clause | "These Terms may be published in other languages. If there is any difference, the English version prevails." |
| Governing law | Keep BVI law, exclusive BVI courts — no change |

Also update `.ar` and `.zh-tw` mirrors.

---

## Phase 10 — Privacy Policy overhaul (Medium)

**Issue 8.**

| File: `themes/.../layouts/privacy-policy/section.html` (+ `.ar`, `.zh-tw`) | |
|---|---|
| Important information (after controller paragraph) | Add applicable-laws paragraph (BVI DPA 2021, Cayman DPA, ADGM DPR 2021, UK/EU GDPR, UAE PDPL) |
| New: SPC investors section | "If you invest in The Black Circle Investment SPC, you will also receive a separate investor privacy notice with the offering documents." |
| Information we collect (new) | Add Didit identity verification / biometric data disclosure |
| Legal bases | Replace general list with a per-purpose table (KYC/AML → legal obligation; enquiries → steps before contract; analytics/marketing → consent; security/fraud → legitimate interests) |
| International transfers (add) | "Where we transfer Personal Data out of the British Virgin Islands, we do so only where there are adequate safeguards, such as contractual protections with the recipient, or with your consent." |
| Data retention (add) | "We keep KYC and transaction records for at least five years after our relationship ends, or longer where the law requires. We keep enquiry records for up to two years if no relationship begins." |
| Your rights (add) | "You can complain to the BVI Office of the Information Commissioner, the Cayman Islands Ombudsman, the ADGM Office of Data Protection, or the data protection authority where you live." |
| New: Automated decisions | "We use automated screening tools for sanctions and PEP checks. Any match is reviewed by our compliance team before a decision is made." |
| New: Children | "The Website and our services are not intended for anyone under 18. We do not knowingly collect their Personal Data." |
| Marketing | Add: "You can also object to direct marketing at any time by writing to us." |

Also update `.ar` and `.zh-tw` mirrors.

---

## Phase 11 — Cookies Policy page + consent banner (Medium)

**Issue 10.**

### 11a. Create Cookies Policy page

| Item | Path |
|---|---|
| Content | `themes/the-black-circle/content/cookies-policy/_index.md` (+ `.ar`, `.zh-tw`) |
| Template | `themes/the-black-circle/layouts/cookies-policy/section.html` (+ `.ar`, `.zh-tw`) |

Content requirements:
- Cookie table: Name · Provider · Purpose · Duration (consent cookie, `_ga`, `_ga_[ID]`, `hubspotutk`, `__hstc`, `__hssc`, `__hssrc`, Zoho PageSense cookies — confirm names with web team)
- Analytics retention: "Google Analytics cookies (_ga, _ga_[ID]) last up to 2 years. Analytics data is kept for 14 months."
- HubSpot forms note: "If you reject marketing cookies, you can still use our enquiry form. HubSpot will then process your form submission without setting tracking cookies."

### 11b. Add menu entries

| File | Change |
|---|---|
| `config/_default/menus.en.toml` | Add `cookies-policy` under `terms` menu |
| `config/_default/menus.ar.toml` | Add Arabic equivalent |

### 11c. Add cookies link in footer

Update `footer.en/ar/zh-tw.html` — add "Cookies Policy" link in the Legal column (currently only Terms & Privacy Policy).

### 11d. Implement cookie consent banner

Create `themes/the-black-circle/layouts/_partials/cookie-banner.html`:
- Banner with Reject / Accept buttons
- Cookie preferences link that reopens the banner (currently the footer link is `#`)

Include in `baseof.html`.

### 11e. Gate tracking scripts behind consent

Update `themes/the-black-circle/layouts/_partials/head.html` (lines ~10-22):
- Wrap GA, HubSpot, PageSense script tags in a consent check
- Only load after "Accept" is clicked
- Use a small inline script or Cookiebot/complybn-style approach

### 11f. Fix footer cookie preferences link

In all three footer files, change the cookie preferences link from `#` to a JS call that reopens the banner.

---

## Phase 12 — Request-access form improvements (Medium)

**Issue 11.**

| File: `themes/.../layouts/request-access/section.html` and `themes/.../layouts/_partials/contact-form-custom.en.html` (+ `.ar`, `.zh-tw`) | |
|---|---|
| Checkbox text: "I confirm I am a professional, institutional, or sophisticated investor." | "I confirm that I am a professional or institutional investor under the laws of my country of residence, and that I am contacting The Black Circle on my own initiative. I understand that The Black Circle will verify my status before providing any service." |
| Add country of residence field | Required dropdown |
| Marketing opt-in: "I agree to receive occasional updates…" | "I would like to receive occasional updates from The Black Circle by email. I can unsubscribe at any time." (unticked by default) |
| Privacy notice text | "TBCWM International Limited will use these details to respond to your enquiry and assess your eligibility, as described in our Privacy Policy." |
| Professional investor standard: "…satisfy the professional investor standards recognised under the regulatory framework of the BVI FSC." | "…qualify as a 'professional investor' under the BVI Securities and Investment Business Act, 2010, and under the rules of your own country." |
| Remove `alberto@theblackcircle.com` CC | Use only `info@theblackcircle.com` or the leads API |
| Replace `mailto:` submission with POST to leads API | `params.toml` already has `leads_api_url` configured |

---

## Phase 13 — Pre-publish confirmations (blocking)

These are the review's open questions that must be answered before publishing. They require human input, not code changes.

- [ ] **ADGM entity:** Confirm which ADGM entities exist and are active (The Black Circle SPV Limited no. 32099; The Black Circle Group Ltd if it exists).
- [ ] **SPC:** Confirm The Black Circle Investment SPC qualifies as a fund TBCWM may manage (private/professional fund characteristics, recognised jurisdiction, AUM within thresholds).
- [ ] **OTC model:** If TBC executes crypto trades under a POA outside the SPC, confirm which entity and whether BVI VASP registration is needed.
- [ ] **Dubai team (GSX):** Confirm no one markets investment products to onshore UAE residents without an SCA-licensed route.
- [ ] **Hong Kong entity:** Confirm what it does and why a Traditional Chinese site exists (HK or Taiwan target?).
- [ ] **Fees from providers:** List all fees from insurance, lenders, custodians, banks so disclosure wording is accurate.
- [ ] **Vast:** Confirm the NDA allows a public reference to "space sector" secondaries.
- [ ] **Leadership bios:** Confirm bios are current and each person consents (Virgin references).
- [ ] **Claims to keep only if true:** "24/7" support, a research team, "founded in 2024".
- [ ] **Registered office addresses** for Terms and Privacy Policy, and a `complaints@theblackcircle.com` mailbox.

---

## Implementation order (recommended)

| Step | Phase | Why first |
|---|---|---|
| 1 | Phase 1 (regulatory wording) | Highest legal risk; touches hero, footer, home, meta — the most visible claims |
| 2 | Phase 2 (ADGM references) | Directly linked to Phase 1; same files |
| 3 | Phase 5 (legacy page redlines) | Strongest outdated claims on three pages |
| 4 | Phase 6 (crypto VASP wording) | BVI VASP Act exposure; same investment/bitcoin files |
| 5 | Phase 7 (Gold additions) | Quick add; same solutions directory |
| 6 | Phase 8 (home page remaining redlines) | Same home.en.html file already open from Phase 1 |
| 7 | Phase 3 (AR/ZH translation alignment) | Once EN is finalised, propagate to AR and ZH |
| 8 | Phase 9 (Terms amendments) | Self-contained in one template file |
| 9 | Phase 10 (Privacy Policy) | Self-contained in one template file |
| 10 | Phase 11 (Cookies Policy + banner) | Requires new pages + JS + head.html changes |
| 11 | Phase 12 (Request-access form) | Form + JS changes |
| 12 | Phase 4 (Jurisdiction gate) | Requires new partial + JS + baseof.html; should go last because it changes UX for all visitors and needs testing |
| 13 | Phase 13 (confirmations) | Blocking sign-off; gather answers in parallel throughout |

---

## File inventory (all files to touch)

### Layout templates (HTML)
- `themes/the-black-circle/layouts/home.en.html`
- `themes/the-black-circle/layouts/home.ar.html`
- `themes/the-black-circle/layouts/home.zh-tw.html`
- `themes/the-black-circle/layouts/_partials/footer.en.html`
- `themes/the-black-circle/layouts/_partials/footer.ar.html`
- `themes/the-black-circle/layouts/_partials/footer.zh-tw.html`
- `themes/the-black-circle/layouts/_partials/head.html`
- `themes/the-black-circle/layouts/baseof.html`
- `themes/the-black-circle/layouts/terms/section.html` (+ `.ar`, `.zh-tw`)
- `themes/the-black-circle/layouts/privacy-policy/section.html` (+ `.ar`, `.zh-tw`)
- `themes/the-black-circle/layouts/solutions/investment/section.html`
- `themes/the-black-circle/layouts/solutions/wealth-planning/section.html`
- `themes/the-black-circle/layouts/solutions/gold/section.html`
- `themes/the-black-circle/layouts/solutions/bitcoin-and-crypto-backed-lending/section.html`
- `themes/the-black-circle/layouts/solutions/tailored-solutions/section.html`
- `themes/the-black-circle/layouts/the-origin/section.html`
- `themes/the-black-circle/layouts/request-access/section.html`
- `themes/the-black-circle/layouts/_partials/contact-form-custom.en.html` (+ `.ar`, `.zh-tw`)

### New files to create
- `themes/the-black-circle/content/cookies-policy/_index.md` (+ `.ar`, `.zh-tw`)
- `themes/the-black-circle/layouts/cookies-policy/section.html` (+ `.ar`, `.zh-tw`)
- `themes/the-black-circle/layouts/_partials/cookie-banner.html`
- `themes/the-black-circle/layouts/_partials/jurisdiction-gate.html`

### Config files
- `config/_default/menus.en.toml`
- `config/_default/menus.ar.toml`
- `content/_index.en.md` (meta description)

### Content (meta descriptions only)
- `themes/the-black-circle/content/solutions/investment/_index.md`
- `themes/the-black-circle/content/solutions/wealth-planning/_index.md`
- `themes/the-black-circle/content/solutions/gold/_index.md`
- `themes/the-black-circle/content/solutions/bitcoin-and-crypto-backed-lending/_index.md`
- `themes/the-black-circle/content/solutions/tailored-solutions/_index.md`
- `themes/the-black-circle/content/the-origin/_index.md`

### JS
- `themes/the-black-circle/assets/js/main.js` (clean up dead modal code + add gate/banner logic)

### Delete
- `themes/the-black-circle/layouts/_partials/access-popup.html` (dead code, Swiss entity references)

### Total: ~30 files modified, ~4 files created, ~1 file deleted
