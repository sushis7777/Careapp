# CAREapp

Vite + React + Tailwind CSS + Framer Motion + Lucide React — GitHub + Vercel ready.

## Local dev
```
npm install
npm run dev
```

## To deploy via GitHub → Vercel (recommended)
1. Create a GitHub repo under your account `sushis7777` named `CAREapp`.
2. Push this folder to that repo (examples):
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/sushis7777/CAREapp.git
git push -u origin main
```
3. In the GitHub repo Settings → Secrets, add `VERCEL_TOKEN` (create at https://vercel.com/account/tokens).
4. On push to `main`, GitHub Actions will build and use the Vercel Action to deploy the site.

## Notes
- The project includes a local-only analytics module (stored in localStorage). Open the app and click **Admin** to inspect visits/events.
