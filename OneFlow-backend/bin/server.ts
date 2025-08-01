/*
|--------------------------------------------------------------------------
| HTTP server entrypoint
|--------------------------------------------------------------------------
|
| The "server.ts" file is the entrypoint for creating the HTTP server.
| This is a simplified Express server for development testing.
|
*/

import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3333

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}))
app.use(express.json())

// Health check routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to OneFlow API',
    version: '1.0.0',
    status: 'running'
  })
})

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

// Basic auth routes
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body
  
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    })
  }

  // Mock authentication
  res.json({
    message: 'Login successful',
    user: {
      id: 1,
      email,
      firstName: 'John',
      lastName: 'Doe',
      role: 'developer'
    }
  })
})

app.post('/api/v1/auth/register', (req, res) => {
  const { email, firstName, lastName, password } = req.body
  
  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({
      error: 'All fields are required'
    })
  }

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: 2,
      email,
      firstName,
      lastName,
      role: 'developer'
    }
  })
})

// Basic projects routes
app.get('/api/v1/projects', (req, res) => {
  res.json({
    projects: [
      {
        id: 1,
        name: 'OneFlow Platform',
        description: 'Main project management platform',
        status: 'active',
        owner: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  })
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`📍 API available at http://localhost:${PORT}/api/v1`)
})