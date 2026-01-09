# 🚀 Free Public Deployment Guide

This guide will help you deploy MedAuraAI as a **read-only demo** for free, showcasing previous cases without exposing API keys.

## 📋 What You Get

✅ **Free hosting** - No costs  
✅ **Read-only demo** - View all previous cases and reports  
✅ **No API keys needed** - Uses static JSON data  
✅ **Professional appearance** - Full UI/UX with demo banner  

## 🎯 Prerequisites

1. A GitHub account (for GitHub Pages) OR
2. A Vercel account (recommended) OR
3. A Netlify account

## 📦 Step 1: Prepare the Project

All preparation is already done! The project includes:
- ✅ Exported case data in `frontend/public/cases/`
- ✅ Demo mode API that reads from static files
- ✅ Deployment configuration files

## 🚀 Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the fastest and easiest option for React apps.

### Steps:

1. **Install Vercel CLI** (optional - you can also use the web interface):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

3. **Build the project** (to test locally first):
   ```bash
   npm install
   npm run build
   ```

4. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   
   Or use the web interface:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set **Root Directory** to `frontend`
   - Vercel will auto-detect the build settings
   - Click "Deploy"

5. **Done!** Your site will be live at `https://your-project.vercel.app`

### Environment Variables (Optional):

If you want to explicitly enable demo mode, add:
```
VITE_DEMO_MODE=true
```

---

## 🌐 Option 2: Deploy to Netlify

Netlify is another excellent free hosting option.

### Steps:

1. **Build the project locally** (to test):
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

   Or use the web interface:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `frontend/dist` folder after building
   - Or connect your GitHub repository
   - Set **Base directory** to `frontend`
   - Set **Build command** to `npm run build`
   - Set **Publish directory** to `dist`

3. **Done!** Your site will be live at `https://your-project.netlify.app`

---

## 📄 Option 3: Deploy to GitHub Pages

GitHub Pages is free but requires a bit more setup.

### Steps:

1. **Update `vite.config.js`** (already done):
   ```js
   base: './'
   ```

2. **Install GitHub Pages deploy tool**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to `package.json`**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: `gh-pages` branch
   - Save

6. **Your site will be live at**: `https://yourusername.github.io/repository-name`

---

## 🧪 Test Locally Before Deploying

1. **Build the project**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Preview the production build**:
   ```bash
   npm run preview
   ```

3. **Visit** `http://localhost:4173` to see your demo site

---

## 🔧 Configuration Options

### Enable Demo Mode Explicitly

Create `frontend/.env.production`:
```
VITE_DEMO_MODE=true
```

This ensures demo mode is always enabled in production.

### Connect to Real Backend (Advanced)

If you deploy a backend separately and want to connect to it:

Create `frontend/.env.production`:
```
VITE_API_BASE_URL=https://your-backend-api.com
VITE_DEMO_MODE=false
```

**Note**: This requires deploying the backend separately (which needs API keys).

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── cases/              # Static case data (exported)
│   │   ├── index.json      # List of all cases
│   │   └── *.json          # Individual case files
│   └── ...
├── src/
│   ├── api/
│   │   ├── api.js          # Main API (with demo fallback)
│   │   └── demo-api.js     # Demo API (reads static files)
│   └── ...
├── vercel.json             # Vercel config
├── netlify.toml           # Netlify config
└── vite.config.js         # Vite config
```

---

## 🔄 Updating Case Data

To add more cases to the demo:

1. **Run the export script**:
   ```bash
   python -c "import json, os; cases = {}; [cases.update({f[:-5]: json.load(open(os.path.join('cases_data', f), encoding='utf-8'))}) for f in os.listdir('cases_data') if f.endswith('.json')]; os.makedirs('frontend/public/cases', exist_ok=True); [open(os.path.join('frontend/public/cases', f'{id}.json'), 'w', encoding='utf-8').write(json.dumps(case, indent=2)) for id, case in cases.items()]; open('frontend/public/cases/index.json', 'w', encoding='utf-8').write(json.dumps({'items': list(cases.values()), 'total': len(cases)}, indent=2)); print(f'Exported {len(cases)} cases')"
   ```

2. **Commit and push**:
   ```bash
   git add frontend/public/cases/
   git commit -m "Update demo cases"
   git push
   ```

3. **Redeploy** (automatic on Vercel/Netlify, manual on GitHub Pages)

---

## ✅ What Works in Demo Mode

✅ View all previous cases  
✅ Search and filter cases  
✅ View detailed case reports  
✅ See all specialist analyses  
✅ View treatment recommendations  
❌ Create new cases (not available)  
❌ Upload PDF reports (not available)  
❌ Rerun AI agents (not available)  

---

## 🆘 Troubleshooting

### Cases not loading?
- Check that `frontend/public/cases/index.json` exists
- Verify case JSON files are valid
- Check browser console for errors

### Routing not working?
- Ensure your deployment platform is configured to redirect all routes to `index.html`
- Check `vercel.json` or `netlify.toml` configuration

### Build fails?
- Make sure all dependencies are installed: `npm install`
- Check Node.js version (should be 16+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

---

## 🎉 You're All Set!

Your MedAuraAI demo is now publicly accessible for free! Visitors can explore all the previous cases and see how the AI medical diagnostics system works, without needing any API keys or backend infrastructure.

---

## 📝 Additional Notes

- **No API keys exposed**: Demo mode uses only static JSON files
- **Free forever**: All hosting platforms mentioned offer free tiers
- **Easy updates**: Just update the case JSON files and redeploy
- **Scalable**: Can handle hundreds of cases without performance issues

Need help? Check the platform-specific documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/pages)

