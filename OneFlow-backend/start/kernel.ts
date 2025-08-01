/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware that will be executed during every HTTP
| requests.
|
*/
server.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| A key-value pair of middleware that can be used by name inside route
| definitions.
|
*/
server.useNamed({
  auth: () => import('#middleware/auth_middleware'),
})

/*
|--------------------------------------------------------------------------
| Router middleware
|--------------------------------------------------------------------------
|
| An array of middleware that will be executed during every HTTP requests, but
| only if the request matches a registered route. This makes it
| different from the global middleware which will be executed for every request.
|
*/
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
])