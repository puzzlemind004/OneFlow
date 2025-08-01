import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'time_entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('description')
      table.decimal('hours', 8, 2).notNullable()
      table.timestamp('date').notNullable()
      
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('task_id').unsigned().references('tasks.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}