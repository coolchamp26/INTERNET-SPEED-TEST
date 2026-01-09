# 🚀 SpeedTest Pro

A modern, full-stack internet speed test application built with React and Node.js. Test your network performance with **real measurements** using a backend server, beautiful visualizations, and detailed metrics!

![Speed Test App](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-Private-red)

## ✨ Features

- **⚡ Real Speed Testing** - Actual download/upload measurements using backend server
- **📊 Interactive Visualizations** - Beautiful animated speedometers to display results
- **📈 Test History** - Track your last 5 speed tests with timestamps
- **📱 Device Information** - View browser, platform, and CPU core details
- **🌐 Network Information** - Display connection type, downlink, and RTT
- **🌙 Dark/Light Mode** - Toggle between dark and light themes
- **🔒 Privacy-Focused** - No data collection or logging
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices

## 🎯 Demo

The app features:
- **Download Speed Test** - Measures your actual download bandwidth in Mbps
- **Upload Speed Test** - Measures your actual upload bandwidth in Mbps  
- **Latency Test** - Measures ping time to backend server in milliseconds
- **Average Statistics** - Calculates average speeds from test history
- **Network Detection** - Automatically detects if you're offline

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **CORS**: Enabled for cross-origin requests
- **Compression**: Gzip compression for responses
- **File Upload**: Multer for handling upload tests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

## 📁 Project Structure

```
speed-test-app/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── App.css         # App-specific styles
│   ├── config.js       # API configuration
│   ├── main.jsx        # Application entry point
│   ├── index.css       # Global styles
│   └── assets/         # Images, fonts, etc.
├── server/             # Backend server
│   ├── server.js       # Express server with speed test endpoints
│   ├── package.json    # Backend dependencies
│   └── .gitignore      # Backend gitignore
├── index.html          # HTML template
├── package.json        # Frontend dependencies & scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── eslint.config.js    # ESLint configuration
```

## 🚀 Getting Started

### 1️⃣ Install Dependencies

First, install frontend dependencies:

```bash
npm install
```

Then, install backend dependencies:

```bash
cd server
npm install
cd ..
```

### 2️⃣ Run the Application

You can run both frontend and backend together with a single command:

```bash
npm run dev:all
```

Or run them separately:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

### 3️⃣ Access the Application

- **Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser
- **Backend API**: Running on [http://localhost:5000](http://localhost:5000)

## 🎨 Components Overview

### Main Components

- **SpeedTestApp** - Main application container with state management
- **Speedometer** - Animated circular progress indicators for speed metrics
- **NetworkInfo** - Displays network connection information
- **DeviceInfo** - Shows device and browser details

### Speed Test Engine

The `SpeedTestEngine` uses real backend APIs for measurements:
- `measureDownload()` - Downloads actual data from backend server
- `measureUpload()` - Uploads data to backend server  
- `measureLatency()` - Pings backend server to measure latency
- `generatePayload()` - Creates random data for upload tests

## 🎮 Usage

1. **Start both servers** using `npm run dev:all`
2. **Click "Start Test"** to begin the speed test
3. **Wait for completion** - The test measures latency, download, and upload speeds sequentially
4. **View results** - Results are displayed on animated speedometers
5. **Check history** - Your last 5 tests are saved in the history section
6. **Toggle theme** - Click the sun/moon icon to switch between dark and light modes
7. **Reset** - Click "Reset" to clear current results

## 📊 How It Works

The speed test uses a full-stack approach with real measurements:

### Backend Endpoints

1. **GET `/api/ping`** - Quick endpoint for latency measurement
2. **GET `/api/download?size=<MB>`** - Serves random data (default 5MB) for download tests
3. **POST `/api/upload-raw`** - Receives data for upload speed measurement
4. **GET `/api/health`** - Health check endpoint

### Testing Process

1. **Latency Measurement**: Sends requests to backend and measures round-trip time
2. **Download Test**: Downloads actual data from backend server and calculates transfer speed
3. **Upload Test**: Uploads generated data to backend server and measures transfer time
4. **Multiple Samples**: Each test runs multiple iterations and averages results for accuracy

> **Note**: This implementation provides **real network speed measurements** by transferring actual data between your browser and the backend server.

## 🔧 Configuration

### Environment Variables

**Frontend** (`.env.local`):
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend** (`server/.env`):
```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Tailwind CSS

The project uses Tailwind CSS via CDN in `index.html`. Customize in `tailwind.config.js`.

### Vite

Vite configuration can be modified in `vite.config.js` for custom build settings.

## 📦 Production Deployment

### Frontend

Build the frontend:
```bash
npm run build
```

The built files will be in the `dist/` folder. Deploy to services like:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

### Backend

Deploy the backend to services like:
- Heroku
- Railway
- DigitalOcean
- AWS EC2/Elastic Beanstalk

**Important**: Update `VITE_API_URL` in frontend environment variables to point to your deployed backend URL.

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Modern mobile browsers

## 🔒 Privacy & Security

- ✅ No user data collection
- ✅ No analytics or tracking
- ✅ Test data is generated randomly and not stored
- ✅ CORS protection enabled
- ✅ All tests run in real-time without logging

## 📄 License

This project is private and proprietary.

## 👤 Author

**Ashambar**

<div align="center">
  Made with ❤️ by Ashambar
  <br />
  <sub>Full-stack • Real measurements • Privacy-focused</sub>
</div>
