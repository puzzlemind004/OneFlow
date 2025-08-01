import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import { vine } from '@vinejs/vine'

export default class ProjectsController {
  /**
   * Get all projects
   */
  async index({ response }: HttpContext) {
    try {
      const projects = await Project.query()
        .preload('owner', (query) => {
          query.select('id', 'firstName', 'lastName', 'email')
        })
        .preload('tasks')

      return response.ok({
        projects
      })
    } catch (error) {
      return response.internalServerError({
        error: 'Failed to fetch projects'
      })
    }
  }

  /**
   * Create a new project
   */
  async store({ request, response }: HttpContext) {
    try {
      const validator = vine.compile(
        vine.object({
          name: vine.string().minLength(2),
          description: vine.string().optional(),
          status: vine.enum(['draft', 'active', 'completed', 'archived']).optional(),
          startDate: vine.date().optional(),
          endDate: vine.date().optional(),
          ownerId: vine.number()
        })
      )

      const data = await request.validateUsing(validator)
      const project = await Project.create(data)

      await project.load('owner', (query) => {
        query.select('id', 'firstName', 'lastName', 'email')
      })

      return response.created({
        message: 'Project created successfully',
        project
      })
    } catch (error) {
      return response.badRequest({
        error: 'Failed to create project',
        details: error.messages || error.message
      })
    }
  }

  /**
   * Get a specific project
   */
  async show({ params, response }: HttpContext) {
    try {
      const project = await Project.query()
        .where('id', params.id)
        .preload('owner', (query) => {
          query.select('id', 'firstName', 'lastName', 'email')
        })
        .preload('tasks', (query) => {
          query.preload('assignedTo', (subQuery) => {
            subQuery.select('id', 'firstName', 'lastName', 'email')
          })
        })
        .firstOrFail()

      return response.ok({
        project
      })
    } catch (error) {
      return response.notFound({
        error: 'Project not found'
      })
    }
  }

  /**
   * Update a project
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const project = await Project.findOrFail(params.id)

      const validator = vine.compile(
        vine.object({
          name: vine.string().minLength(2).optional(),
          description: vine.string().optional(),
          status: vine.enum(['draft', 'active', 'completed', 'archived']).optional(),
          startDate: vine.date().optional(),
          endDate: vine.date().optional()
        })
      )

      const data = await request.validateUsing(validator)
      project.merge(data)
      await project.save()

      return response.ok({
        message: 'Project updated successfully',
        project
      })
    } catch (error) {
      return response.badRequest({
        error: 'Failed to update project',
        details: error.messages || error.message
      })
    }
  }

  /**
   * Delete a project
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const project = await Project.findOrFail(params.id)
      await project.delete()

      return response.ok({
        message: 'Project deleted successfully'
      })
    } catch (error) {
      return response.notFound({
        error: 'Project not found'
      })
    }
  }
}