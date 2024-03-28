import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import {
  attachment,
  AttachmentContract
} from '@ioc:Adonis/Addons/AttachmentLite'

export default class EscortMedia extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public escortId: number

  @column()
  public type: string

  @attachment({ folder: 'escort-medias', preComputeUrl: true })
  public media: AttachmentContract | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
