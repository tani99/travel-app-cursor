# Template TODOs - Replace App-Specific Content

## 🔥 Firebase Configuration

### 1. `src/config/firebase.js`
- ✅ TODO already added - Replace Firebase config with your own project details

### 2. `src/screens/ForgotPasswordScreen.js` (Lines 49-50)
```javascript
// TODO: Remove these hardcoded Firebase project references
authDomain: 'travel-planner-codex.firebaseapp.com',
projectId: 'travel-planner-codex'
```

## 📱 App Configuration

### 3. `package.json`
- ✅ TODO: Update `"author": "Your Name"` with your name

### 4. `app.json`
- ✅ TODO: Update app name and slug for your specific app
- ✅ TODO: Replace app icons in `assets/` folder with your own

## 🔧 Native Platform Configuration

### 5. `android/app/google-services.json`
- ✅ TODO: Replace with your Firebase project's google-services.json
- ✅ TODO: Update `"package_name": "com.yourcompany.welcomeapp"` with your app's package name

### 6. `GoogleService-Info.plist`
- ✅ TODO: Replace with your Firebase project's GoogleService-Info.plist
- ✅ TODO: Update bundle identifier

### 7. `google-services.json` (root)
- ✅ TODO: Replace with your Firebase project's google-services.json

## 🎨 Branding & Content

### 8. `src/screens/WelcomeScreen.js`
- ✅ TODO: Replace "APP" logo text with your app name or logo
- ✅ TODO: Update title "Welcome to" with your app name
- ✅ TODO: Update subtitle "Your React Native App" with your app description

### 9. `src/screens/HomeScreen.js`
- ✅ TODO: Update "Dashboard" title with your app's main screen title
- ✅ TODO: Customize welcome message and placeholder content

### 10. `assets/` folder
- ✅ TODO: Replace all icon files with your app's branding:
  - `icon.png` - App icon
  - `adaptive-icon.png` - Android adaptive icon
  - `splash-icon.png` - Splash screen icon
  - `favicon.png` - Web favicon

## 📝 Documentation Files

### 11. Update these files with your app's information:
- `README.md` - Update title and description
- `DEBUG_FIREBASE_EMAIL.md` - Update Firebase project references
- `FIREBASE_AUTH_IMPLEMENTATION_PLAN.md` - Update project references

## 🚀 Quick Setup Checklist

1. **Firebase Setup**
   - Create new Firebase project
   - Enable Authentication (Email/Password + Google)
   - Download google-services.json and GoogleService-Info.plist
   - Update `src/config/firebase.js`

2. **App Branding**
   - Replace all assets in `assets/` folder
   - Update app name in `app.json`
   - Update package name in native configs

3. **Content Customization**
   - Update screen titles and messages
   - Replace placeholder content
   - Update author name in package.json

4. **Test**
   - Run `npm install`
   - Test authentication flow
   - Verify app builds successfully

## ⚠️ Important Notes

- Keep the existing Firebase config for template testing
- Replace with your own config only when forking for a specific app
- Update all references to "travel-planner-codex" project
- Update all references to "com.yourcompany.welcomeapp" package name
