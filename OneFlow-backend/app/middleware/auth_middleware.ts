import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: string[]
    } = {}
  ) {
    /**
     * Authentication logic goes here
     * For now, we'll just pass through
     */
    return next()
  }
}