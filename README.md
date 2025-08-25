# 75 Hard Challenge Tracker

A progressive web app for tracking your 75 Hard weight loss challenge progress. Built with Next.js 15, React 19, Tailwind CSS, and Privy authentication.

## 🚀 Features

- **Daily Goal Tracking** - Mark off your daily 75 Hard requirements
- **Progress Visualization** - Calendar view showing your streak
- **Challenge Statistics** - Track completion rates and current day
- **Secure Authentication** - Powered by Privy with email and wallet support
- **PWA Ready** - Install as a mobile app
- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - Automatic theme switching

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Privy
- **State Management**: React Context + Hooks
- **PWA**: Next.js PWA plugin

## 📋 Prerequisites

- Node.js 18+ 
- Yarn or npm
- Privy account (for authentication)

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd 75-hard
yarn install
```

### 2. Privy Setup

1. **Create a Privy Account**
   - Go to [console.privy.io](https://console.privy.io/)
   - Sign up and create a new app
   - Configure your app settings
   - Copy your Privy App ID from the console

2. **Set Environment Variables**
   - Copy the `env.example` file to `.env.local`
   - Replace `your_privy_app_id_here` with your actual Privy App ID:
   ```
   NEXT_PUBLIC_PRIVY_APP_ID=your_actual_privy_app_id_here
   ```

### 3. Run the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 4. Build for Production

```bash
yarn build
yarn start
```

## 📱 PWA Installation

1. Open the app in a supported browser (Chrome, Edge, Safari)
2. Look for the install prompt or use the browser menu
3. Install the app to your home screen
4. Enjoy the native app experience!

## 🎯 How to Use

1. **Get Started**: Click "Get Started" to authenticate with Privy
2. **Daily Tracking**: Mark off each completed daily requirement
3. **Monitor Progress**: View your streak and completion statistics
4. **Stay Motivated**: See your progress calendar and achievements

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout with Privy provider
│   ├── page.tsx           # Main app page
│   └── globals.css        # Global styles
├── components/             # Reusable UI components
│   ├── header.tsx         # App header with navigation
│   ├── login-form.tsx     # Authentication form
│   ├── daily-goals.tsx    # Daily goal tracking
│   ├── progress-calendar.tsx # Progress visualization
│   └── challenge-stats.tsx # Statistics display
├── contexts/               # React Context providers
│   ├── auth-context.tsx   # Authentication state
│   └── challenge-context.tsx # Challenge progress state
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── config/                 # Configuration files
    └── privy.ts           # Privy authentication config
```

## 🎨 Customization

### Theme Colors
Customize the app's appearance in `src/config/privy.ts`:
- Primary color: `#10b981` (green)
- Theme: Light/Dark
- Accent colors and branding

### Authentication Methods
Configure supported login methods in `src/config/privy.ts`:
- Email authentication
- Wallet connections (MetaMask, WalletConnect, etc.)
- Social logins (Google, Twitter, Discord)

## 🔒 Security Features

- **Privy Authentication** - Secure, non-custodial authentication
- **Environment Variables** - Secure configuration management
- **Type Safety** - Full TypeScript coverage
- **No Account Creation** - No account creation required beyond Privy authentication

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables for Privy
3. Deploy automatically on push

### Other Platforms
1. Build the project: `yarn build`
2. Set environment variables for Privy
3. Deploy the `out` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Privy Issues**: Check [Privy documentation](https://docs.privy.io/)
- **Next.js Issues**: Check [Next.js documentation](https://nextjs.org/docs)
- **General Questions**: Open an issue in this repository

## 🔄 Updates

- **Next.js 15**: Latest features and performance improvements
- **React 19**: New hooks and optimizations
- **Tailwind CSS 4**: Modern styling system
- **Privy**: Secure authentication and wallet connections

---

**Note**: Make sure to set your Privy App ID in the environment variables before running the app. The app will not work without proper Privy configuration.
