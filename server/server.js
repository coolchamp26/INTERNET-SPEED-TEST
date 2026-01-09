import express from 'express';
import cors from 'cors';
import compression from 'compression';
import multer from 'multer';
import morgan from 'morgan';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

// Configure multer for file uploads (in-memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB max
  }
});

// Helper function to generate random data
const generateRandomData = (sizeMB) => {
  const sizeBytes = sizeMB * 1024 * 1024;
  return crypto.randomBytes(sizeBytes);
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Ping endpoint - for latency measurement
app.get('/api/ping', (req, res) => {
  res.json({ 
    timestamp: Date.now(),
    message: 'pong'
  });
});

// Download endpoint - serves random data for download speed test
app.get('/api/download', (req, res) => {
  const chunkSize = parseInt(req.query.size) || 5; // Default 5MB
  const maxSize = 50; // Maximum 50MB per request
  
  const requestedSize = Math.min(chunkSize, maxSize);
  
  try {
    console.log(`[DOWNLOAD] Generating ${requestedSize}MB of random data...`);
    const startTime = Date.now();
    
    // Generate random data
    const data = generateRandomData(requestedSize);
    
    const generationTime = Date.now() - startTime;
    console.log(`[DOWNLOAD] Data generated in ${generationTime}ms`);
    
    // Set headers to prevent caching
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Length': data.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Data-Size': `${requestedSize}MB`,
      'X-Generation-Time': `${generationTime}ms`
    });
    
    res.send(data);
    console.log(`[DOWNLOAD] Sent ${requestedSize}MB to client`);
  } catch (error) {
    console.error('[DOWNLOAD] Error:', error);
    res.status(500).json({ error: 'Failed to generate download data' });
  }
});

// Upload endpoint - receives data for upload speed test
app.post('/api/upload', upload.single('data'), (req, res) => {
  try {
    const receivedSize = req.file ? req.file.size : 0;
    const sizeMB = (receivedSize / (1024 * 1024)).toFixed(2);
    
    console.log(`[UPLOAD] Received ${sizeMB}MB of data`);
    
    res.json({
      success: true,
      received: receivedSize,
      receivedMB: parseFloat(sizeMB),
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('[UPLOAD] Error:', error);
    res.status(500).json({ error: 'Failed to process upload data' });
  }
});

// Alternative upload endpoint using raw body
app.post('/api/upload-raw', express.raw({ limit: '50mb', type: 'application/octet-stream' }), (req, res) => {
  try {
    const receivedSize = req.body ? req.body.length : 0;
    const sizeMB = (receivedSize / (1024 * 1024)).toFixed(2);
    
    console.log(`[UPLOAD-RAW] Received ${sizeMB}MB of data`);
    
    res.json({
      success: true,
      received: receivedSize,
      receivedMB: parseFloat(sizeMB),
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('[UPLOAD-RAW] Error:', error);
    res.status(500).json({ error: 'Failed to process upload data' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Speed Test Backend Server Running`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Endpoints:`);
  console.log(`   - GET  /api/ping`);
  console.log(`   - GET  /api/download?size=<MB>`);
  console.log(`   - POST /api/upload`);
  console.log(`   - POST /api/upload-raw`);
  console.log(`\n✨ Ready to test speeds!\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
});
