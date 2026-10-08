# RythuMitra V10.9 Deployment Checklist

- Replace the V10.8 repository files with all V10.9 files.
- Confirm GitHub Pages deploys successfully.
- Open Account → Production Cloud Backend.
- Create/configure a Supabase project and run SUPABASE_SETUP.sql.
- Save the Supabase URL + anon public key in the app.
- Test Connection.
- Create Cloud Account / Login.
- Upload My Data, then test Restore Cloud Data on another browser/device.
- Never add a Supabase service-role/secret key to the repository.
- Confirm V10.8 scrolling still works before moving to V10.10.
