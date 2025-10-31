# Deployment Guide

This guide explains how to deploy the Subscription Manager project to Supabase and Vercel without exposing secrets.

## Pre-deployment Checklist

- Local environment variables configured in `frontend/.env`.
- Git available and repository up to date.
- Access to the Supabase and Vercel projects.
- Brandfetch API key (optional, only needed if the brand icon autocomplete is enabled).

## Step 1: Deploy Supabase Edge Functions

### 1.1 Install and authenticate the Supabase CLI

```bash
npm install -g supabase
supabase login
```

When linking your project, replace the placeholder with your Supabase project reference:

```bash
supabase link --project-ref <SUPABASE_PROJECT_REF>
```

### 1.2 Deploy the Brandfetch Edge Function

```bash
supabase functions deploy brandfetch-api
```

### 1.3 Store the Brandfetch API key

```bash
supabase secrets set BRANDFETCH_API_KEY=<YOUR_BRANDFETCH_API_KEY>
```

### 1.4 Smoke test the Edge Function

```bash
curl -X POST https://<SUPABASE_PROJECT_URL>/functions/v1/brandfetch-api \
  -H "Authorization: Bearer <SUPABASE_ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"brand":"netflix.com"}'
```

## Step 2: Commit and Push Code

```bash
git status
git add .
git commit -m "Describe your change"
git push origin main
```

Ensure `.env` files and other secrets remain untracked.

## Step 3: Configure Vercel Environment Variables

In the Vercel dashboard set the following variables for Production, Preview, and Development:

```
REACT_APP_SUPABASE_URL = https://<SUPABASE_PROJECT_URL>
REACT_APP_SUPABASE_ANON_KEY = <SUPABASE_ANON_KEY>
```

Trigger a deployment either by pushing to the main branch (automatic) or via the Vercel CLI:

```bash
vercel --prod
```

## Step 4: Post-deployment Verification

1. Visit the Vercel deployment URL.
2. Confirm the landing page renders.
3. Test sign-in/up flow.
4. Validate core subscription CRUD features.
5. Check the console for errors.
6. (Optional) Verify that the brand search autocomplete returns icons.

## Troubleshooting

| Issue | Likely Cause | Fix |
| --- | --- | --- |
| Build fails with missing env vars | Vercel variables not set | Re-enter `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`, redeploy |
| Blank screen after sign-in | Supabase URL or key incorrect | Confirm values in the Vercel dashboard |
| Brandfetch autocomplete fails | Edge Function not deployed or secrets missing | Redeploy `brandfetch-api` and reset `BRANDFETCH_API_KEY` |
| Google OAuth fails | Redirect URI not added | Update Google Cloud OAuth Client redirect URIs to include Vercel URL and `<SUPABASE_PROJECT_URL>/auth/v1/callback` |
| CORS errors | Outdated Edge Function | Redeploy the Edge Function to pick up the current headers |

## Observability

- **Vercel build logs**: Vercel Project → Deployments.
- **Supabase Edge Function logs**: Supabase Dashboard → Edge Functions → `brandfetch-api`.
- **Usage monitoring**: Supabase Dashboard → Settings → Usage; Brandfetch Dashboard for API quota.

## Routine Updates

```bash
npm start          # local verification
git add .
git commit -m "Describe your change"
git push origin main
supabase functions deploy brandfetch-api   # only if Edge Function code changed
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Brandfetch Documentation](https://docs.brandfetch.com/)

_Last reviewed: 2025-10-31_
