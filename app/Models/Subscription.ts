import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import User from './User'
import Payment from './Payment'
export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public authorId: number

  @column()
  public paymentId: number

  @column()
  public amount: number

  @column()
  public active: boolean

  @column()
  public autoRenew: boolean

  @column.dateTime()
  public expiresAt: DateTime

  @column.dateTime()
  public trialEndsAt: DateTime

  @column()
  public credited: boolean

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'authorId' })
  public author: BelongsTo<typeof User>

  @belongsTo(() => Payment)
  public payment: BelongsTo<typeof Payment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
