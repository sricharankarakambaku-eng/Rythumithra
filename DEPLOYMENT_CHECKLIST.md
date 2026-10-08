# RythuMitra V10.4 — Final Pre-Deployment QA

## Scope
V10.4 is a stabilization release. No major product feature was added after V10.3. The focus is testing, navigation, mobile polish, bilingual UI, data safety, offline behavior, and deployment readiness.

## Static checks completed
- JavaScript syntax: `app.js`, `v9.js`, `v10.js`, `sw.js`
- HTML element ID uniqueness
- Local script/style/manifest references
- Service-worker core asset list
- No bundled raster image assets
- No obvious demo/sample records seeded into local storage
- Calculation logic reviewed: sale value = kg × ₹/kg; profit = sales − expenses

## Browser smoke tests completed
- Dashboard opens
- Dashboard vertical cards navigate to their target screens
- Back-to-Dashboard controls are present on feature screens
- Farmer Account screen loads without a console error
- Crops form rejects missing/invalid required values
- Expense form rejects missing crop/invalid amount
- Sales form rejects missing crop/invalid quantity/price
- Sales preview calculates kg × ₹/kg
- English → Telugu → English switch works on the main V10 dashboard
- Offline indicator appears when browser goes offline
- Offline app shell loads after service-worker cache is available
- No horizontal overflow at mobile viewport sizes tested

## Production limitations kept explicit
- SMS OTP is still a demo workflow until a real SMS/backend provider is connected.
- Cloud backup/synchronization is not a real multi-device backend yet.
- Live marketplace, live mandi prices, and production AI require backend/API services.
- Weather and map services require internet for fresh data.

## Deployment sequence
1. Upload the contents of this V10.4 ZIP to GitHub.
2. Enable GitHub Pages for the repository branch/folder containing `index.html`.
3. Open the HTTPS Pages URL on the phone.
4. Test dashboard, language toggle, Back buttons, crops, expenses, sales, reports, marketplace, schemes, weather, notifications and offline reload.
5. Confirm the browser shows HTTPS and the PWA service worker is active.
6. Treat V10.4 as the final frontend baseline before V10.5 backend/database work.
