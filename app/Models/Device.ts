import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Device extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public brand: string

  @column()
  public fcmToken: string

  @column()
  public designName: string

  @column()
  public modelName: string

  @column()
  public osName: string

  @column()
  public osVersion: string

  @column()
  public deviceName: string

  @column()
  public manufacturer: string

  @column()
  public uuid: string

  @column()
  public referrer: string

  @column()
  public installTime: string

  @column()
  public buildVersion: string

  @column()
  public runTimeVersion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
