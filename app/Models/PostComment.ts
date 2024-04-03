import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { nanoid } from 'nanoid'
import Post from './Post'
import User from './User'

export default class PostComment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public postId: number

  @column()
  public userId: number

  @column()
  public comment: string

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static generateUuid(postComment: PostComment) {
    postComment.uuid = nanoid()
  }
}
