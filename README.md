# 📅 Планировщик - Event Calendar PWA

Modern, responsive calendar application built with React, TypeScript, and Vite. Features Progressive Web App capabilities with enhanced mobile installation support.

## ✨ Features

- 📱 **Progressive Web App** - Install on mobile and desktop
- 📅 **Multiple Calendar Views** - Month, Week, Day, and List views
- ⚡ **Real-time Sync** - Firebase backend integration
- 🔐 **User Authentication** - Secure login and registration
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- 🌙 **Modern UI** - Clean design with Tailwind CSS
- 🔄 **Offline Support** - Works without internet connection
- 🎯 **Event Management** - Create, edit, and delete events
- 🔔 **Notifications** - Event reminders and alerts

## 🛠️ Tech Stack

- **Frontend:** React 19.1.1 + TypeScript 5.5.3
- **Build Tool:** Vite 5.4.2
- **Styling:** Tailwind CSS 3.4.1
- **Calendar:** FullCalendar 6.1.19
- **Backend:** Firebase 12.2.1
- **Icons:** Lucide React 0.540.0
- **PWA:** vite-plugin-pwa 1.0.3

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AlexeySmerdov/planer-react.git
   cd planer-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 PWA Installation

### Mobile Devices

**Android (Chrome):**
1. Open the app in Chrome
2. Tap the menu (⋮)
3. Select "Install app" or "Add to Home screen"

**iOS (Safari):**
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

### Desktop

**Chrome/Edge:**
1. Look for the install icon in the address bar
2. Click "Install" when prompted

## 🗂️ Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── calendar/       # Calendar-related components
│   └── ui/             # UI components
├── hooks/              # Custom React hooks
├── services/           # Firebase services
├── types/              # TypeScript interfaces
├── utils/              # Helper functions
├── context/            # React context providers
└── config/             # Configuration files
```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore
3. Copy your config to `src/config/firebase.ts`:

```typescript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### PWA Configuration

The PWA is pre-configured with:
- Service Worker for offline support
- Web App Manifest for installation
- Optimized icons for all platforms
- Enhanced mobile installation prompts

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Demo](https://your-demo-link.com) (if available)
- [Issues](https://github.com/AlexeySmerdov/planer-react/issues)
- [Pull Requests](https://github.com/AlexeySmerdov/planer-react/pulls)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/)
- [FullCalendar](https://fullcalendar.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

Made with ❤️ by [AlexeySmerdov](https://github.com/AlexeySmerdov)