# JWT_SECRET Troubleshooting Guide

## 🚨 Still Getting "Server configuration error"?

This means the JWT_SECRET environment variable is still not properly set on Render.

## 🔍 Double-Check These Steps:

### Step 1: Verify Environment Variable Was Added
1. Go to Render Dashboard
2. Click on your backend service: `ecommerce-backend-bwha`
3. Click **"Environment"** tab
4. Look for `JWT_SECRET` in the list
5. Make sure it shows: `JWT_SECRET = your_super_secret_jwt_key_here_please_change_this_in_production_12345`

### Step 2: Check Deployment Status
1. In your service page, look for deployment status
2. You should see "Deploying..." or "Live" status
3. If it says "Deploying...", wait for it to complete

### Step 3: Manual Redeploy (if needed)
1. If the environment variable is there but still not working:
2. Look for **"Manual Deploy"** button
3. Click it to force a new deployment
4. Wait 3-5 minutes

## 🔧 Alternative: Try Different JWT_SECRET Value

If the long string isn't working, try a shorter one:

**Key**: `JWT_SECRET`
**Value**: `my_jwt_secret_12345`

## 📱 Visual Checklist:

✅ **Environment Tab**: Can you see JWT_SECRET in the list?
✅ **Save Button**: Did you click Save/Add after entering the values?
✅ **Deployment**: Is the service showing as "Live" or "Deploying"?
✅ **Wait Time**: Have you waited at least 3-5 minutes?

## 🚨 Common Mistakes:

❌ **Typo in Key**: Make sure it's exactly `JWT_SECRET` (not `JWT_SECRETS` or `JWT_SECRET_KEY`)
❌ **Missing Save**: Forgot to click Save/Add button
❌ **Wrong Service**: Added to frontend instead of backend
❌ **Not Waiting**: Didn't wait for deployment to complete

## 🎯 Quick Test:

After adding JWT_SECRET and waiting for deployment:
1. Go to: `https://e-commerce-w645.onrender.com/#/Login`
2. Try logging in with: `newuser@example.com` / `test123`
3. Should work without "Server configuration error"

## 📞 If Still Not Working:

1. **Check Render Logs**: Go to "Logs" tab in your service
2. **Look for Errors**: Any error messages about environment variables?
3. **Contact Support**: Render has good support if needed

The key is making sure JWT_SECRET is properly saved in the Environment tab and the service has redeployed!
