# Astral Nexus - Deployment Checklist

Use this checklist to ensure a smooth deployment to production.

## Pre-Deployment

### Code Quality
- [x] All TypeScript errors resolved
- [x] Build completes successfully (`npm run build`)
- [x] No console errors in development
- [x] All pages load correctly
- [x] Search functionality works
- [x] Navigation works on mobile and desktop

### Content
- [x] All guides have proper frontmatter
- [x] Guide index generated (`npm run index-guides`)
- [x] All guide links work
- [x] Related guides are relevant
- [x] Table of contents generates correctly

### SEO & Performance
- [x] Sitemap generates correctly (`/sitemap.xml`)
- [x] Robots.txt configured (`/robots.txt`)
- [x] Meta tags on all pages
- [x] Open Graph tags configured
- [x] Favicon and manifest configured
- [x] Images optimized (if any)

### Testing
- [ ] Test on Chrome/Edge
- [ ] Test on Firefox
- [ ] Test on Safari (if available)
- [ ] Test on mobile devices
- [ ] Test search with various queries
- [ ] Test all navigation links
- [ ] Test responsive layouts
- [ ] Test keyboard navigation

## Deployment Setup

### Environment Variables
- [ ] Create `.env.production` or set in hosting platform
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain

### Hosting Platform (Vercel Recommended)

#### Option 1: Vercel
1. [ ] Push code to GitHub
2. [ ] Connect repository to Vercel
3. [ ] Configure environment variables
4. [ ] Deploy
5. [ ] Set custom domain (optional)

#### Option 2: Netlify
1. [ ] Push code to GitHub
2. [ ] Connect repository to Netlify
3. [ ] Build command: `npm run build`
4. [ ] Publish directory: `.next`
5. [ ] Configure environment variables
6. [ ] Deploy

#### Option 3: Other Platforms
- [ ] Ensure Node.js 18+ support
- [ ] Configure build command: `npm run build`
- [ ] Configure start command: `npm start`
- [ ] Set environment variables

### Domain & DNS
- [ ] Purchase domain (optional)
- [ ] Configure DNS records
- [ ] Set up SSL certificate (usually automatic)
- [ ] Test domain resolution

## Post-Deployment

### Verification
- [ ] Visit production site
- [ ] Test all pages load
- [ ] Test search functionality
- [ ] Test on mobile device
- [ ] Check sitemap: `yourdomain.com/sitemap.xml`
- [ ] Check robots: `yourdomain.com/robots.txt`
- [ ] Verify meta tags (view page source)

### Performance
- [ ] Run Lighthouse audit
- [ ] Aim for scores: Performance >90, SEO >95, Accessibility >95
- [ ] Check Core Web Vitals
- [ ] Test page load speed

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify meta descriptions
- [ ] Check structured data

### Monitoring
- [ ] Set up error tracking (Sentry, optional)
- [ ] Set up analytics (Google Analytics, optional)
- [ ] Configure uptime monitoring (optional)
- [ ] Set up automated backups

### Security
- [ ] SSL certificate active
- [ ] Security headers configured
- [ ] No sensitive data exposed
- [ ] Environment variables secure

## Maintenance

### Weekly
- [ ] Check for broken links
- [ ] Review analytics (if configured)
- [ ] Check for errors/issues

### Monthly
- [ ] Update dependencies (`npm update`)
- [ ] Test all functionality still works
- [ ] Review and add new guides

### Quarterly
- [ ] Major dependency updates
- [ ] Security audit
- [ ] Performance optimization
- [ ] Content review and refresh

## Rollback Plan

If issues occur after deployment:

1. Revert to previous deployment (Vercel/Netlify have built-in rollback)
2. Or: `git revert` and redeploy
3. Investigate issue locally
4. Fix and redeploy

## Success Criteria

Deployment is successful when:
- [x] Site loads at production URL
- [x] All guides accessible
- [x] Search works
- [x] Mobile responsive
- [x] Fast load times (<3s)
- [x] No console errors
- [x] SEO tags present

## Support

If you encounter issues:
- Check Next.js deployment documentation
- Review hosting platform docs
- Check build logs for errors
- Test locally first (`npm run build && npm start`)

---

**Good luck with your deployment!** 🚀

The Astral Nexus is ready to share knowledge with the world.

