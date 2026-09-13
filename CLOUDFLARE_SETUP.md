# DIICOT pe Cloudflare Workers

## Comenzi pentru Cloudflare Builds

- Build command: `npm run build`
- Deploy command: `npm run deploy`
- Root directory: `/`

## Variabile publice

- `PORT=3000` si `NODE_ENV=production` sunt deja definite in `wrangler.jsonc`.

## Secrete obligatorii

Adauga in Cloudflare, fara ghilimele:

- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `DISCORD_REDIRECT_URI`
- `DISCORD_GUILD_ID`
- `DISCORD_BOT_TOKEN`
- `SESSION_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `B2_BUCKET`
- `B2_REGION`
- `B2_ENDPOINT`
- `B2_KEY_ID`
- `B2_APPLICATION_KEY`
- `B2_DIRECT_UPLOAD_ORIGIN`
- `CALLSIGN_DASHBOARD_URL`

Adresele care depind de domeniul final se completeaza dupa primul deploy.
