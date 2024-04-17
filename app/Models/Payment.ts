import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeSave, afterFetch } from '@ioc:Adonis/Lucid/Orm'

import User from './User'
export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public countryId: number

  @column()
  public reference: string

  @column()
  public amount: number

  @column()
  public status: 'pending' | 'success' | 'failed'

  @column()
  public currency: string

  @column()
  public gateway: string

  @column()
  public meta: any

  @column()
  public response: any

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //stringify the meta and response fields before saving
  @beforeSave()
  public static async stringifyMetaAndResponse(payment: Payment) {

    if (payment.meta && typeof payment.meta === 'object')
      payment.meta = JSON.stringify(payment.meta)

    if (payment.response && typeof payment.response === 'object')
      payment.response = JSON.stringify(payment.response)
  }

  //parse the meta and response fields after fetching
  @afterFetch()
  public static async parseMetaAndResponse(payment: Payment) {

    if (payment.meta && typeof payment.meta === 'string')
      payment.meta = JSON.parse(payment.meta)

    if (payment.response && typeof payment.response === 'string')
      payment.response = JSON.parse(payment.response)
  }
}

