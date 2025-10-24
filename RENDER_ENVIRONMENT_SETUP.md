# How to Add JWT_SECRET Environment Variable on Render

## 🎯 Step-by-Step Guide

### Step 1: Access Render Dashboard
1. Go to [https://render.com](https://render.com)
2. Click **"Sign In"** (top right corner)
3. Sign in with your GitHub account (or whatever you used to create the account)

### Step 2: Find Your Backend Service
1. Once logged in, you'll see your dashboard
2. Look for your backend service named: **`ecommerce-backend-bwha`**
3. Click on the service name to open it

### Step 3: Navigate to Environment Tab
1. In your service page, you'll see several tabs at the top:
   - Overview
   - **Environment** ← Click this one
   - Logs
   - Settings
   - etc.

### Step 4: Add Environment Variable
1. In the Environment tab, you'll see a list of existing environment variables
2. Look for a button that says **"Add Environment Variable"** or **"+"**
3. Click it

### Step 5: Set the Values
1. **Key field**: Type `JWT_SECRET`
2. **Value field**: Type `your_super_secret_jwt_key_here_please_change_this_in_production_12345`
3. Click **"Save"** or **"Add"**

### Step 6: Redeploy (if needed)
1. After saving, Render might automatically redeploy
2. If not, look for a **"Manual Deploy"** button and click it
3. Wait 2-3 minutes for deployment to complete

## 🔐 Alternative JWT_SECRET Values
You can use any of these secure strings:

```
jwt_secret_key_2024_ecommerce_app_secure_random_string_12345
my_super_secret_jwt_key_for_ecommerce_app_2024_secure_12345
ecommerce_jwt_secret_key_2024_very_secure_random_string_12345
```

## 📱 Visual Guide
```
Render Dashboard → Your Service → Environment Tab → Add Variable
     ↓                    ↓              ↓              ↓
[render.com] → [ecommerce-backend-bwha] → [Environment] → [Add JWT_SECRET]
```

## ✅ What You Should See
After adding the environment variable, you should see:
- `JWT_SECRET` in the list of environment variables
- The service will redeploy automatically
- Your authentication will start working

## 🚨 If You Can't Find Your Service
1. Make sure you're logged into the correct Render account
2. Check if the service name is slightly different
3. Look for any service with "ecommerce" or "backend" in the name

## 🎉 Expected Result
Once the JWT_SECRET is added and deployed:
- ✅ Login will work
- ✅ Registration will work  
- ✅ No more 500 errors
- ✅ Full authentication functionality
