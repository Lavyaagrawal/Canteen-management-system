const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// CORS Configuration - MUST be first middleware
app.use((req, res, next) => {
  // Set CORS headers for all requests
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Max-Age', '86400');
  
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Also use cors middleware as backup
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Canteen Management System API',
    version: '1.0.0'
  });
});

// Error handling middleware (must be after routes)
app.use((err, req, res, next) => {
  // Don't send error response if headers already sent
  if (res.headersSent) {
    return next(err);
  }
  
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({ 
    detail: err.message || 'Internal server error' 
  });
});

// 404 handler (must be last)
app.use((req, res) => {
  res.status(404).json({ 
    detail: `Route ${req.method} ${req.path} not found` 
  });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Bind to all interfaces (required for Railway)

app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('CORS configured to allow all origins');
});

module.exports = app;