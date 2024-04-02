import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import {
  attachment,
  AttachmentContract
} from '@ioc:Adonis/Addons/AttachmentLite'


export default class PostImage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public postId: number

  @attachment({ folder: 'post_images', preComputeUrl: true })
  public media: AttachmentContract | null

  @column()
  public position: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
