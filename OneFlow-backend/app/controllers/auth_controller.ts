import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { vine } from '@vinejs/vine'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  /**
   * Register a new user
   */
  async register({ request, response }: HttpContext) {
    try {
      const validator = vine.compile(
        vine.object({
          email: vine.string().email(),
          firstName: vine.string().minLength(2),
          lastName: vine.string().minLength(2),
          password: vine.string().minLength(6),
          role: vine.enum(['admin', 'manager', 'developer']).optional(),
        })
      )

      const data = await request.validateUsing(validator)

      // Check if user already exists
      const existingUser = await User.findBy('email', data.email)
      if (existingUser) {
        return response.badRequest({
          error: 'User with this email already exists'
        })
      }

      // Hash password and create user
      const hashedPassword = await hash.make(data.password)
      const user = await User.create({
        ...data,
        password: hashedPassword,
        role: data.role || 'developer'
      })

      return response.created({
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      })
    } catch (error) {
      return response.badRequest({
        error: 'Registration failed',
        details: error.messages || error.message
      })
    }
  }

  /**
   * Login user
   */
  async login({ request, response }: HttpContext) {
    try {
      const validator = vine.compile(
        vine.object({
          email: vine.string().email(),
          password: vine.string()
        })
      )

      const { email, password } = await request.validateUsing(validator)

      // Find user
      const user = await User.findBy('email', email)
      if (!user) {
        return response.unauthorized({
          error: 'Invalid credentials'
        })
      }

      // Verify password
      const isPasswordValid = await hash.verify(user.password, password)
      if (!isPasswordValid) {
        return response.unauthorized({
          error: 'Invalid credentials'
        })
      }

      // Check if user is active
      if (!user.isActive) {
        return response.unauthorized({
          error: 'Account is deactivated'
        })
      }

      return response.ok({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      })
    } catch (error) {
      return response.badRequest({
        error: 'Login failed',
        details: error.messages || error.message
      })
    }
  }

  /**
   * Get current user profile
   */
  async profile({ response }: HttpContext) {
    // This will be implemented when we add proper auth middleware
    return response.ok({
      message: 'User profile endpoint'
    })
  }
}