import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { nanoid } from 'nanoid'
import PostImage from './PostImage'
import User from './User'
import PostLiker from './PostLiker'
import PostComment from './PostComment'
import PostReport from './PostReport'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public userId: number

  @column()
  public type: string

  @column()
  public status: string

  @column()
  public visibility: string

  @column()
  public content: string

  @column()
  public video: JSON | null

  @column()
  public country: string

  @column()
  public city: string

  @column()
  public countryCode: string

  @column()
  public likesCount: number

  @column()
  public commentsCount: number

  @column()
  public sharesCount: number

  @column()
  public viewsCount: number

  @column()
  public savedCount: number

  @column()
  public allowComments: boolean

  @column()
  public allowShares: boolean

  @column()
  public flagged: boolean

  @hasMany(() => PostImage)
  public images: HasMany<typeof PostImage>

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  @hasMany(() => PostLiker)
  public likers: HasMany<typeof PostLiker>

  @hasMany(() => PostComment)
  public comments: HasMany<typeof PostComment>

  @hasMany(() => PostReport)
  public reports: HasMany<typeof PostReport>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateUUID(post: Post) {
    if (!post.uuid) {
      post.uuid = nanoid()
    }
  }
}
