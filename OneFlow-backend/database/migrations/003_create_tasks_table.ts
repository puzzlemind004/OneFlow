import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description')
      table.enum('status', ['todo', 'in_progress', 'review', 'done']).defaultTo('todo')
      table.enum('priority', ['low', 'medium', 'high', 'urgent']).defaultTo('medium')
      table.enum('type', ['feature', 'bug', 'task', 'epic']).defaultTo('task')
      table.decimal('estimated_hours', 8, 2).nullable()
      table.timestamp('due_date').nullable()
      
      table.integer('project_id').unsigned().references('projects.id').onDelete('CASCADE')
      table.integer('assigned_to_id').unsigned().references('users.id').onDelete('SET NULL').nullable()
      table.integer('created_by_id').unsigned().references('users.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}