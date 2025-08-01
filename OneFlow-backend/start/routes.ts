/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// Health check routes
router.get('/', async () => {
  return {
    message: 'Welcome to OneFlow API',
    version: '1.0.0',
    status: 'running'
  }
})

router.get('/health', async () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString()
  }
})

// API routes
router.group(() => {
  // Authentication routes
  router.post('/auth/register', '#controllers/auth_controller.register')
  router.post('/auth/login', '#controllers/auth_controller.login')
  router.get('/auth/profile', '#controllers/auth_controller.profile')

  // Projects routes
  router.resource('projects', '#controllers/projects_controller').apiOnly()

  // Tasks routes (to be implemented)
  // router.resource('tasks', '#controllers/tasks_controller').apiOnly()

  // Time entries routes (to be implemented)
  // router.resource('time-entries', '#controllers/time_entries_controller').apiOnly()
}).prefix('/api/v1')