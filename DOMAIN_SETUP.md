# Domain Setup Instructions for www.afc.com

This document provides instructions for configuring the custom domain www.afc.com to work with the Amma Food Center website hosted on GitHub Pages.

## Steps to Configure DNS

To make http://www.afc.com/ work with this GitHub Pages site, you need to configure your DNS settings with your domain registrar.

### 1. Configure DNS Records

Add the following DNS records in your domain registrar's control panel (e.g., GoDaddy, Namecheap, etc.):

#### For www.afc.com (CNAME Record):
```
Type: CNAME
Name: www
Value: zeroimmortal07.github.io
TTL: 3600 (or default)
```

#### For apex domain afc.com (A Records):
If you also want afc.com (without www) to work, add these A records:
```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600
```

### 2. Enable GitHub Pages

1. Go to your repository settings: https://github.com/Zeroimmortal07/amma-food-center/settings/pages
2. Under "Source", select the branch you want to deploy (usually `main` or `master`)
3. Under "Custom domain", enter `www.afc.com`
4. Check "Enforce HTTPS" (recommended, but wait until DNS propagates first)

### 3. Wait for DNS Propagation

DNS changes can take anywhere from a few minutes to 48 hours to propagate worldwide. You can check the status using:
- https://www.whatsmydns.net/
- `dig www.afc.com` (on Linux/Mac)
- `nslookup www.afc.com` (on Windows)

### 4. Verify Configuration

Once DNS has propagated:
1. Visit http://www.afc.com/ - it should load your website
2. Check that HTTPS is working (may take a few hours after DNS propagation)
3. Both www.afc.com and afc.com should redirect to the same site

## Troubleshooting

### "Domain's DNS record could not be retrieved"
- Wait longer for DNS propagation (up to 48 hours)
- Verify your DNS records are correct
- Try clearing your local DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### "HTTPS not working"
- GitHub needs to provision an SSL certificate after DNS is configured
- This can take a few hours after DNS propagates
- Once ready, enable "Enforce HTTPS" in repository settings

### "Site not loading"
- Check GitHub Pages settings are enabled
- Verify the correct branch is selected as the source
- Check that the CNAME file exists in the repository root
- Ensure index.html exists in the repository

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [DNS Record Types Explained](https://www.cloudflare.com/learning/dns/dns-records/)
