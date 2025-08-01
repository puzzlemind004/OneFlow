import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types'
import Project from './project.js'
import Task from './task.js'
import TimeEntry from './time_entry.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare password: string

  @column()
  declare role: 'admin' | 'manager' | 'developer'

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Project)
  declare projects: HasMany<typeof Project>

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>

  @hasMany(() => TimeEntry)
  declare timeEntries: HasMany<typeof TimeEntry>
}