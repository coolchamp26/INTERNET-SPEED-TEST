# 🚀 SpeedTest Pro

A modern, privacy-focused internet speed test application built with React. Test your network performance with beautiful visualizations and detailed metrics - all running entirely in your browser!

![Speed Test App](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-Private-red)

## ✨ Features

- **⚡ Real-time Speed Testing** - Measure download, upload speeds, and latency (ping)
- **📊 Interactive Visualizations** - Beautiful animated speedometers to display results
- **📈 Test History** - Track your last 5 speed tests with timestamps
- **📱 Device Information** - View browser, platform, and CPU core details
- **🌐 Network Information** - Display connection type, downlink, and RTT
- **🌙 Dark/Light Mode** - Toggle between dark and light themes
- **🔒 Privacy-Focused** - No data collection, all tests run client-side
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices

## 🎯 Demo

The app features:
- **Download Speed Test** - Measures your download bandwidth in Mbps
- **Upload Speed Test** - Measures your upload bandwidth in Mbps  
- **Latency Test** - Measures ping time in milliseconds
- **Average Statistics** - Calculates average speeds from test history
- **Network Detection** - Automatically detects if you're offline

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

```

## 📁 Project Structure

```
speed-test-app/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── App.css         # App-specific styles
│   ├── main.jsx        # Application entry point
│   ├── index.css       # Global styles
│   └── assets/         # Images, fonts, etc.
├── index.html          # HTML template
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── eslint.config.js    # ESLint configuration
```

## 🎨 Components Overview

### Main Components

- **SpeedTestApp** - Main application container with state management
- **Speedometer** - Animated circular progress indicators for speed metrics
- **NetworkInfo** - Displays network connection information
- **DeviceInfo** - Shows device and browser details

### Speed Test Engine

The `SpeedTestEngine` handles all measurement functionality:
- `measureDownload()` - Tests download speed
- `measureUpload()` - Tests upload speed  
- `measureLatency()` - Tests ping/latency
- `generatePayload()` - Creates test data blobs

## 🎮 Usage

1. **Click "Start Test"** to begin the speed test
2. **Wait for completion** - The test measures latency, download, and upload speeds sequentially
3. **View results** - Results are displayed on animated speedometers
4. **Check history** - Your last 5 tests are saved in the history section
5. **Toggle theme** - Click the sun/moon icon to switch between dark and light modes
6. **Reset** - Click "Reset" to clear current results

## 📊 How It Works

The speed test uses a clever frontend-only approach:

1. **Latency Measurement**: Uses fetch requests to `cloudflare.com/cdn-cgi/trace` to measure round-trip time
2. **Download Test**: Generates data locally and measures processing time with small network requests
3. **Upload Test**: Creates payload blobs and measures processing speed
4. **Multiple Samples**: Each test runs multiple iterations and averages the results for accuracy

> **Note**: This is a frontend-only implementation, so speeds are simulated based on actual network latency and processing capabilities.

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS via CDN in `index.html`. You can customize the configuration in `tailwind.config.js`.

### Vite

Vite configuration can be modified in `vite.config.js` for custom build settings.

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Modern mobile browsers

## 📄 License

This project is private and proprietary.

## 👤 Author

**Ashambar**

<div align="center">
  Made with ❤️ by Ashambar
  <br />
  <sub>Frontend-only • Privacy-focused • No data collection</sub>
</div>
