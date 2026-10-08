# RythuMitra V10.9 — Backend & Cloud Foundation

V10.9 keeps the working V10.8 mobile scroll system and adds a real backend foundation using Supabase's public Auth/REST APIs.

## Included
- Supabase email/password cloud account
- Cloud database sync and restore
- Per-user Row Level Security SQL
- Local-first fallback: the app still works with localStorage when cloud is not configured
- No service-role key is requested or stored
- V10.8 scrolling preserved

## Phone-only setup
1. Create a Supabase project.
2. Open the Supabase SQL Editor and run `SUPABASE_SETUP.sql`.
3. In RythuMitra open **Account → Production Cloud Backend**.
4. Enter the project URL and anon public key.
5. Tap **Save Cloud Setup**, then **Test Connection**.
6. Create a Cloud Account or Login.
7. Tap **Upload My Data**.

The app can be published as a static GitHub Pages site because it talks directly to Supabase using the public anon key and RLS. Never place a Supabase service-role/secret key in the app.

## Important
This version provides real cloud auth and per-user data storage once the Supabase project is configured. SMS/mobile OTP, server-side admin workflows, marketplace moderation, and advanced realtime messaging remain later backend phases.
