import React, { useState, useEffect } from 'react';
import { Activity, Wifi, WifiOff, Clock, Smartphone, RefreshCw, History, Moon, Sun, TrendingUp, TrendingDown } from 'lucide-react';
import API_ENDPOINTS from './config';

// Speed Test Engine with REAL backend API calls
const SpeedTestEngine = {
  // Generate random data blob for upload tests
  generatePayload: (sizeInMB) => {
    const bytes = sizeInMB * 1024 * 1024;
    const arr = new Uint8Array(bytes);
    // Fill with random data
    for (let i = 0; i < bytes; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
    return new Blob([arr]);
  },

  // Measure REAL download speed from backend
  measureDownload: async (onProgress) => {
    const samples = [];
    const iterations = 3;
    const chunkSizeMB = 5;

    for (let i = 0; i < iterations; i++) {
      try {
        const startTime = performance.now();

        // Fetch actual data from backend server
        const response = await fetch(`${API_ENDPOINTS.DOWNLOAD}?size=${chunkSizeMB}`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error(`Download failed: ${response.status}`);
        }

        // Read the entire response body
        const data = await response.blob();

        const endTime = performance.now();
        const durationSeconds = (endTime - startTime) / 1000;

        // Calculate actual speed based on data transferred
        const actualSizeMB = data.size / (1024 * 1024);
        const speedMbps = (actualSizeMB * 8) / durationSeconds;

        samples.push(speedMbps);
        onProgress?.((i + 1) / iterations);

        console.log(`Download test ${i + 1}: ${speedMbps.toFixed(2)} Mbps (${actualSizeMB.toFixed(2)}MB in ${durationSeconds.toFixed(2)}s)`);

        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error('Download test error:', error);
        throw error;
      }
    }

    return samples.reduce((a, b) => a + b) / samples.length;
  },

  // Measure REAL upload speed to backend
  measureUpload: async (onProgress) => {
    const samples = [];
    const iterations = 2;
    const payloadSizeMB = 3;

    for (let i = 0; i < iterations; i++) {
      try {
        const startTime = performance.now();

        // Generate upload payload
        const payload = SpeedTestEngine.generatePayload(payloadSizeMB);

        // Upload to backend server
        const response = await fetch(API_ENDPOINTS.UPLOAD, {
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'application/octet-stream'
          },
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.status}`);
        }

        await response.json();

        const endTime = performance.now();
        const durationSeconds = (endTime - startTime) / 1000;

        // Calculate upload speed
        const speedMbps = (payloadSizeMB * 8) / durationSeconds;
        samples.push(speedMbps);

        onProgress?.((i + 1) / iterations);

        console.log(`Upload test ${i + 1}: ${speedMbps.toFixed(2)} Mbps (${payloadSizeMB}MB in ${durationSeconds.toFixed(2)}s)`);

        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error('Upload test error:', error);
        throw error;
      }
    }

    return samples.reduce((a, b) => a + b) / samples.length;
  },

  // Measure REAL latency to backend
  measureLatency: async () => {
    const samples = [];
    const iterations = 5;

    for (let i = 0; i < iterations; i++) {
      try {
        const startTime = performance.now();

        // Ping the backend server
        await fetch(API_ENDPOINTS.PING, {
          method: 'GET',
          cache: 'no-store'
        });

        const endTime = performance.now();
        const latency = endTime - startTime;
        samples.push(latency);

        console.log(`Ping ${i + 1}: ${latency.toFixed(2)}ms`);

        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Ping test error:', error);
        // Use a penalty value if ping fails
        samples.push(999);
      }
    }

    return samples.reduce((a, b) => a + b) / samples.length;
  }
};

// Speedometer Component with animation
const Speedometer = ({ value, maxValue, label, color, darkMode }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const angle = (percentage / 100) * 180 - 90;

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-full">
      <div className="relative w-40 h-40 mx-auto">
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className={darkMode ? "text-gray-700" : "text-gray-200"}
            opacity={darkMode ? "0.3" : "1"}
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold" style={{ color }}>
            {value.toFixed(1)}
          </div>
          <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</div>
        </div>
      </div>
    </div>
  );
};

// Network Info Component
const NetworkInfo = ({ darkMode }) => {
  const [netInfo, setNetInfo] = useState(null);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const updateInfo = () => {
        setNetInfo({
          type: connection.effectiveType || 'unknown',
          downlink: connection.downlink || 'N/A',
          rtt: connection.rtt || 'N/A'
        });
      };

      updateInfo();
      connection.addEventListener('change', updateInfo);
      return () => connection.removeEventListener('change', updateInfo);
    }
  }, []);

  if (!netInfo) return null;

  return (
    <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
      <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <Wifi size={16} className="text-blue-400" /> Network Info
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Connection:</span>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{netInfo.type.toUpperCase()}</span>
        </div>
        <div className="flex justify-between">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Downlink:</span>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{netInfo.downlink} Mbps</span>
        </div>
        <div className="flex justify-between">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>RTT:</span>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{netInfo.rtt} ms</span>
        </div>
      </div>
    </div>
  );
};

// Device Info Component
const DeviceInfo = ({ darkMode }) => {
  const getBrowser = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Browser';
  };

  return (
    <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
      <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <Smartphone size={16} className="text-green-400" /> Device Info
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Browser:</span>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{getBrowser()}</span>
        </div>
        <div className="flex justify-between">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Platform:</span>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{navigator.platform}</span>
        </div>
        <div className="flex justify-between">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Cores:</span>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{navigator.hardwareConcurrency || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const SpeedTestApp = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testPhase, setTestPhase] = useState('');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState({
    download: 0,
    upload: 0,
    ping: 0
  });
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const runTest = async () => {
    if (!navigator.onLine) {
      setError('No internet connection detected');
      return;
    }

    setTesting(true);
    setError('');
    setResults({ download: 0, upload: 0, ping: 0 });
    setProgress(0);

    try {
      // Measure Latency
      setTestPhase('Measuring latency...');
      const ping = await SpeedTestEngine.measureLatency();
      setResults(prev => ({ ...prev, ping }));
      setProgress(33);

      await new Promise(resolve => setTimeout(resolve, 300));

      // Measure Download Speed
      setTestPhase('Testing download speed...');
      const download = await SpeedTestEngine.measureDownload((p) => {
        setProgress(33 + p * 34);
      });
      setResults(prev => ({ ...prev, download }));

      await new Promise(resolve => setTimeout(resolve, 300));

      // Measure Upload Speed
      setTestPhase('Testing upload speed...');
      const upload = await SpeedTestEngine.measureUpload((p) => {
        setProgress(67 + p * 33);
      });
      setResults(prev => ({ ...prev, upload }));

      setProgress(100);
      setTestPhase('Test complete!');

      // Add to history
      const testResult = {
        timestamp: new Date().toLocaleTimeString(),
        download,
        upload,
        ping
      };
      setHistory(prev => [testResult, ...prev].slice(0, 5));

    } catch (err) {
      setError('Test failed. Please try again.');
      console.error('Speed test error:', err);
    } finally {
      setTimeout(() => {
        setTesting(false);
        setTestPhase('');
        setProgress(0);
      }, 1000);
    }
  };

  const resetTest = () => {
    setResults({ download: 0, upload: 0, ping: 0 });
    setError('');
    setTestPhase('');
    setProgress(0);
  };

  const avgDownload = history.length > 0
    ? history.reduce((sum, t) => sum + t.download, 0) / history.length
    : 0;

  const avgUpload = history.length > 0
    ? history.reduce((sum, t) => sum + t.upload, 0) / history.length
    : 0;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">SpeedTest Pro</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Accurate network measurements</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center gap-3">
            <WifiOff size={20} className="text-red-400" />
            <span className="text-red-200">{error}</span>
          </div>
        )}

        {/* Main Test Card */}
        <div className={`rounded-2xl shadow-2xl p-8 mb-6 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-white border-2 border-gray-200'}`}>

          {/* Speedometers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Speedometer
              value={results.download}
              maxValue={100}
              label="Download Mbps"
              color="#3b82f6"
              darkMode={darkMode}
            />
            <Speedometer
              value={results.upload}
              maxValue={50}
              label="Upload Mbps"
              color="#10b981"
              darkMode={darkMode}
            />
            <Speedometer
              value={results.ping}
              maxValue={200}
              label="Ping ms"
              color="#f59e0b"
              darkMode={darkMode}
            />
          </div>

          {/* Progress Bar */}
          {testing && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{testPhase}</span>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={runTest}
              disabled={testing}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg text-white"
            >
              <Activity size={20} className={testing ? 'animate-spin' : ''} />
              {testing ? 'Testing...' : 'Start Test'}
            </button>
            <button
              onClick={resetTest}
              disabled={testing}
              className={`px-8 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800' : 'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 disabled:text-gray-400'}`}
            >
              <RefreshCw size={20} />
              Reset
            </button>
          </div>

          {/* Statistics */}
          {history.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className={`rounded-lg p-3 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50 border border-gray-200'}`}>
                <div className={`text-xs mb-1 flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TrendingDown size={14} /> Avg Download
                </div>
                <div className="text-lg font-bold text-blue-400">
                  {avgDownload.toFixed(1)} Mbps
                </div>
              </div>
              <div className={`rounded-lg p-3 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50 border border-gray-200'}`}>
                <div className={`text-xs mb-1 flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TrendingUp size={14} /> Avg Upload
                </div>
                <div className="text-lg font-bold text-green-400">
                  {avgUpload.toFixed(1)} Mbps
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <NetworkInfo darkMode={darkMode} />
          <DeviceInfo darkMode={darkMode} />
        </div>

        {/* Test History */}
        {history.length > 0 && (
          <div className={`rounded-xl shadow-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <History size={20} className="text-purple-400" />
              Recent Tests
            </h3>
            <div className="space-y-3">
              {history.map((test, idx) => (
                <div key={idx} className={`rounded-lg p-4 flex justify-between items-center ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50 border border-gray-100'}`}>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{test.timestamp}</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-blue-400 font-medium">↓ {test.download.toFixed(1)}</span>
                    <span className="text-green-400 font-medium">↑ {test.upload.toFixed(1)}</span>
                    <span className="text-amber-400 font-medium">{test.ping.toFixed(0)}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`text-center mt-8 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          <p>Real-time speed testing with backend measurements • Privacy-focused</p>
        </div>
      </div>
    </div>
  );
};

export default SpeedTestApp;