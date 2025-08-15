# WelcomeApp - React Native Authentication

A modern React Native app with beautiful authentication UI and Firebase integration.

## Features

- ✨ Modern, clean UI design
- 🔐 Email/password authentication
- 📧 Gmail (Google) authentication
- 🔄 Password reset functionality
- 📱 Responsive design for mobile
- 🎨 Beautiful animations and transitions
- 🔒 Secure authentication flow
- 📊 User state management

## Screens

1. **Welcome Screen** - App introduction and navigation
2. **Login Screen** - Email/password and Gmail login
3. **Register Screen** - User registration with validation
4. **Forgot Password Screen** - Password reset functionality
5. **Home Screen** - Dashboard for authenticated users

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication
4. Add Email/Password and Google sign-in methods
5. Get your Firebase configuration

### 3. Configure Firebase

Update `src/config/firebase.js` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 4. Run the App

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CustomButton.js
│   ├── CustomInput.js
│   └── GmailButton.js
├── screens/            # App screens
│   ├── WelcomeScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── ForgotPasswordScreen.js
│   └── HomeScreen.js
├── services/           # API and authentication services
│   └── auth.js
├── context/            # React Context for state management
│   └── AuthContext.js
├── navigation/         # Navigation configuration
│   └── AppNavigator.js
└── config/            # Configuration files
    └── firebase.js
```

## UI Design System

### Colors
- Primary Blue: `#2563EB`
- Secondary Blue: `#3B82F6`
- Success Green: `#10B981`
- Error Red: `#EF4444`
- Background: `#FFFFFF`
- Text Primary: `#1E293B`
- Text Secondary: `#64748B`

### Typography
- Headings: 24-32px, Bold
- Body Text: 16px, Regular
- Button Text: 16px, Medium

### Components
- **CustomButton**: Primary, secondary, and disabled states
- **CustomInput**: Form inputs with validation and focus states
- **GmailButton**: Google authentication button

## Authentication Flow

1. **Welcome Screen** → User chooses to login or register
2. **Login/Register** → User authenticates via email/password or Gmail
3. **Home Screen** → Authenticated user dashboard
4. **Logout** → Returns to welcome screen

## Features Implemented

### ✅ Completed
- [x] Modern UI design system
- [x] Email/password authentication
- [x] Gmail authentication
- [x] Password reset functionality
- [x] Form validation
- [x] Loading states
- [x] Error handling
- [x] Navigation flow
- [x] User state management
- [x] Responsive design

### 🚧 Future Enhancements
- [ ] Dark mode support
- [ ] Biometric authentication
- [ ] Profile management
- [ ] Email verification
- [ ] Social media sharing
- [ ] Push notifications
- [ ] Offline support

## Troubleshooting

### Common Issues

1. **Firebase not configured**
   - Make sure to update `src/config/firebase.js` with your Firebase config
   - Enable Authentication in Firebase Console

2. **Gmail authentication not working**
   - Enable Google sign-in in Firebase Authentication
   - Add your app's SHA-1 fingerprint for Android

3. **Navigation issues**
   - Ensure all dependencies are installed
   - Check that navigation is properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
