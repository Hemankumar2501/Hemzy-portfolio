# Deployment Guide

This guide will help you deploy your portfolio to various hosting platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

Vercel is the easiest and fastest way to deploy your portfolio.

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Website**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite and deploy
   - Your site will be live in ~2 minutes!

3. **Deploy via CLI**
   ```bash
   vercel
   ```

**Custom Domain**: Add your domain in Vercel dashboard → Settings → Domains

---

### Option 2: Netlify

1. **Deploy via Netlify Website**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings are auto-configured via `netlify.toml`
   - Click "Deploy site"

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

**Custom Domain**: Add in Netlify dashboard → Domain settings

---

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add to scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. **Update vite.config.ts**
   Change base to your repo name:
   ```typescript
   base: '/your-repo-name/',
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Your site: `https://username.github.io/repo-name/`

---

### Option 4: Cloudflare Pages

1. **Deploy via Cloudflare Dashboard**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Build output: `dist`
   - Click "Save and Deploy"

---

## 📦 Build for Production

Before deploying, test the production build locally:

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

The build will be in the `dist/` folder.

---

## ✅ Pre-Deployment Checklist

- [ ] Test the production build locally (`npm run preview`)
- [ ] Verify all 3D models load correctly
- [ ] Check all images are optimized
- [ ] Test on mobile devices
- [ ] Verify all links work (navigation, footer, social)
- [ ] Update contact information if needed
- [ ] Test form submissions (if applicable)
- [ ] Check console for errors
- [ ] Verify SEO meta tags in `index.html`
- [ ] Update `robots.txt` with your domain
- [ ] Add Google Analytics (optional)

---

## 🔧 Environment Variables

If you need environment variables:

1. Create `.env.production` file:
   ```
   VITE_API_URL=your-api-url
   VITE_ANALYTICS_ID=your-analytics-id
   ```

2. Add to your hosting platform:
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site settings → Environment variables
   - **Cloudflare**: Settings → Environment variables

---

## 🌐 Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records at your domain registrar:
   - Type: `A` Record
   - Name: `@`
   - Value: `76.76.21.21`

### For Netlify:
1. Go to Domain settings → Add custom domain
2. Update DNS records:
   - Type: `A` Record
   - Name: `@`
   - Value: `75.2.60.5`

### For Cloudflare Pages:
1. Go to Custom domains → Set up a custom domain
2. Follow Cloudflare's DNS setup instructions

---

## 📊 Performance Optimization

Your portfolio is already optimized with:
- ✅ Code splitting
- ✅ Lazy loading for 3D models
- ✅ Optimized images
- ✅ Minified CSS/JS
- ✅ Tree shaking

### Additional Optimizations:

1. **Enable Compression** (automatic on Vercel/Netlify)
2. **Add CDN** (automatic on most platforms)
3. **Enable HTTP/2** (automatic on modern hosts)

---

## 🐛 Troubleshooting

### 3D Models Not Loading
- Ensure `.glb` files are in `public/` folder
- Check browser console for CORS errors
- Verify file paths are correct

### Blank Page After Deploy
- Check browser console for errors
- Verify `base` path in `vite.config.ts`
- Ensure all dependencies are in `package.json`

### Routing Issues
- Verify redirect rules in `vercel.json` or `netlify.toml`
- Check `_redirects` file in `public/` folder

---

## 📱 Post-Deployment

After deployment:

1. **Test Your Site**
   - Visit your live URL
   - Test all sections and navigation
   - Check mobile responsiveness
   - Verify 3D models load

2. **Share Your Portfolio**
   - Update LinkedIn with your portfolio URL
   - Add to GitHub profile README
   - Share on social media

3. **Monitor Performance**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Check [GTmetrix](https://gtmetrix.com/)
   - Monitor with [Google Analytics](https://analytics.google.com/)

---

## 🎉 You're Live!

Your portfolio is now live and ready to impress recruiters and clients!

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev/guide/

---

**Built with ❤️ by Hemankumar**
