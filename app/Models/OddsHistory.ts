import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OddsHistory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public odd: number

  @column()
  public uuid: string

  @column()
  public active: boolean

  @column()
  public started: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
