import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Project from '#models/project'
import Task from '#models/task'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    // Create users
    const admin = await User.create({
      email: 'admin@oneflow.com',
      firstName: 'Admin',
      lastName: 'User',
      password: await hash.make('password123'),
      role: 'admin',
      isActive: true,
    })

    const manager = await User.create({
      email: 'manager@oneflow.com',
      firstName: 'Project',
      lastName: 'Manager',
      password: await hash.make('password123'),
      role: 'manager',
      isActive: true,
    })

    const developer = await User.create({
      email: 'dev@oneflow.com',
      firstName: 'John',
      lastName: 'Developer',
      password: await hash.make('password123'),
      role: 'developer',
      isActive: true,
    })

    // Create projects
    const project1 = await Project.create({
      name: 'OneFlow Platform',
      description: 'Main project management platform',
      status: 'active',
      ownerId: manager.id,
    })

    const project2 = await Project.create({
      name: 'Mobile App',
      description: 'OneFlow mobile application',
      status: 'draft',
      ownerId: manager.id,
    })

    // Create tasks
    await Task.create({
      title: 'Setup project structure',
      description: 'Initialize the project with proper folder structure',
      status: 'done',
      priority: 'high',
      type: 'task',
      estimatedHours: 8,
      projectId: project1.id,
      assignedToId: developer.id,
      createdById: manager.id,
    })

    await Task.create({
      title: 'Implement user authentication',
      description: 'Add login/register functionality',
      status: 'in_progress',
      priority: 'high',
      type: 'feature',
      estimatedHours: 16,
      projectId: project1.id,
      assignedToId: developer.id,
      createdById: manager.id,
    })

    await Task.create({
      title: 'Create project dashboard',
      description: 'Build the main project dashboard with charts',
      status: 'todo',
      priority: 'medium',
      type: 'feature',
      estimatedHours: 24,
      projectId: project1.id,
      assignedToId: developer.id,
      createdById: manager.id,
    })

    console.log('Database seeded successfully!')
  }
}