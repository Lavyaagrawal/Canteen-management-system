# Fix GitHub Authentication Error

## Problem
Getting `403 Permission denied` when pushing to GitHub because wrong credentials are cached.

## Solution: Use Personal Access Token

### Step 1: Create a Personal Access Token

1. Go to GitHub: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Canteen Management System`
4. Select expiration (90 days or custom)
5. Check the **`repo`** scope (full control of private repositories)
6. Click **"Generate token"**
7. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

### Step 2: Update Git Remote with Token

Run this command (replace `YOUR_TOKEN` with your actual token):

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/Lavyaagrawal/Canteen-management-system.git
```

**Example:**
```bash
git remote set-url origin https://ghp_xxxxxxxxxxxxxxxxxxxx@github.com/Lavyaagrawal/Canteen-management-system.git
```

### Step 3: Push Again

```bash
git push origin main
```

It should work now! ✅

---

## Alternative: Use SSH (More Secure)

### Step 1: Check if you have SSH keys

```bash
ls -la ~/.ssh
```

### Step 2: Generate SSH key (if you don't have one)

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

Press Enter to accept default location, then set a passphrase (optional).

### Step 3: Add SSH key to GitHub

1. Copy your public key:
```bash
cat ~/.ssh/id_ed25519.pub
```

2. Go to GitHub → Settings → SSH and GPG keys → New SSH key
3. Paste the key and save

### Step 4: Change remote to SSH

```bash
git remote set-url origin git@github.com:Lavyaagrawal/Canteen-management-system.git
```

### Step 5: Push

```bash
git push origin main
```

---

## Quick Fix: Clear Keychain Manually

1. Open **Keychain Access** app (search in Spotlight)
2. Search for `github.com`
3. Delete any entries related to GitHub
4. Try pushing again - it will prompt for credentials

---

## Recommended: Use Personal Access Token

The Personal Access Token method is the easiest and most reliable for HTTPS.