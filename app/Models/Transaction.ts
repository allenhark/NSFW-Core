import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public tillDepositId: number

  @column()
  public code: string

  @column()
  public type: string

  @column()
  public userAmount: number

  @column()
  public amount: number

  @column()
  public date: string

  @column()
  public time: string

  @column()
  public tillName: string

  @column()
  public systemAccepted: boolean

  @column()
  public processed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
