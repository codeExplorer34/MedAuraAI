# 🚀 Quick Deploy Guide

## Fastest Way to Deploy (Vercel - Recommended)

1. **Push your code to GitHub**

2. **Go to [vercel.com](https://vercel.com) and sign in with GitHub**

3. **Click "New Project" → Import your repository**

4. **Configure**:
   - **Root Directory**: `frontend`
   - Build settings are auto-detected ✅

5. **Click "Deploy"** - Done! 🎉

Your site will be live in ~30 seconds at `https://your-project.vercel.app`

---

## Test Locally First

```bash
cd frontend
npm install
npm run build
npm run preview
```

Visit `http://localhost:4173` to see your demo site.

---

## What's Included

✅ 5 demo cases with full AI analysis  
✅ Read-only mode (no API keys needed)  
✅ All previous reports and diagnostics  
✅ Professional UI with demo banner  

---

## Update Cases Later

Run the export script:
```bash
python export_cases.py
```

Then commit and push - deployment will auto-update!

---

See `DEPLOYMENT_GUIDE.md` for detailed instructions and other hosting options.

