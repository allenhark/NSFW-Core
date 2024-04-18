import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { nanoid } from 'nanoid'
import Payment from './Payment'
import Follower from './Follower'
import Subscription from './Subscription'
import { responsiveAttachment, ResponsiveAttachmentContract } from '@ioc:Adonis/Addons/ResponsiveAttachment'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public phone: string

  @column()
  public lastName: string

  @column()
  public firstName: string

  @column()
  public balance: number

  @column()
  public socket: any

  @column()
  public username: string

  @column()
  public language: string

  @column()
  public email: string


  @responsiveAttachment({
    folder: 'profile/avatar', breakpoints: {
      medium: 750,
      small: 250,
    },
    forceFormat: 'webp',
    optimizeOrientation: true,
    responsiveDimensions: true,
    preComputeUrls: true,
    blurhash: {
      enabled: true,
      componentX: 4,
      componentY: 3
    },
    keepOriginal: false
  })
  public avatar: ResponsiveAttachmentContract | null

  @responsiveAttachment({
    folder: 'profile/backgrounds', breakpoints: {
      large: 1000,
      medium: 750,
      small: 250,
    },
    forceFormat: 'webp',
    optimizeOrientation: true,
    responsiveDimensions: true,
    preComputeUrls: true,
    keepOriginal: false,
    blurhash: {
      enabled: true,
      componentX: 4,
      componentY: 3
    },
  })
  public background: ResponsiveAttachmentContract | null

  @column()
  public wallet: string

  @column()
  public referralCode: string

  @column()
  public referralId: number

  @column()
  public country: string

  @column()
  public region: string

  @column()
  public city: string

  @column()
  public countryCode: string

  @column()
  public walletAddress: string

  @column()
  public walletNetwork: string

  @column()
  public walletBalance: number

  @column()
  public active: boolean

  @column()
  public verified: boolean

  @column()
  public isCreator: boolean

  @column()
  public followers: number

  @column()
  public following: number

  @column()
  public subscribers: number

  @column()
  public fee: number

  @column()
  public totalEarnings: number

  @column()
  public unpaidEarnings: number

  @column()
  public totalSpent: number

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @hasMany(() => Payment)
  public payments: HasMany<typeof Payment>

  @hasMany(() => Follower, { foreignKey: 'authorId' })
  public followersList: HasMany<typeof Follower>

  @hasMany(() => Subscription)
  public subscriptions: HasMany<typeof Subscription>

  @hasMany(() => Follower, { foreignKey: 'userId' })
  public followingList: HasMany<typeof Follower>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }

    user.uuid = user.firstName + '-' + user.lastName + '-' + nanoid(6)

  }
}
