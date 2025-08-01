import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types'
import User from './user.js'
import Project from './project.js'
import TimeEntry from './time_entry.js'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare status: 'todo' | 'in_progress' | 'review' | 'done'

  @column()
  declare priority: 'low' | 'medium' | 'high' | 'urgent'

  @column()
  declare type: 'feature' | 'bug' | 'task' | 'epic'

  @column()
  declare estimatedHours: number | null

  @column.dateTime()
  declare dueDate: DateTime | null

  @column()
  declare projectId: number

  @column()
  declare assignedToId: number | null

  @column()
  declare createdById: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @belongsTo(() => User, {
    foreignKey: 'assignedToId',
  })
  declare assignedTo: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'createdById',
  })
  declare createdBy: BelongsTo<typeof User>

  @hasMany(() => TimeEntry)
  declare timeEntries: HasMany<typeof TimeEntry>
}