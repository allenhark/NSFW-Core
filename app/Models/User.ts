import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import {
  attachment,
  AttachmentContract
} from '@ioc:Adonis/Addons/AttachmentLite'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

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

  @attachment({ folder: 'avatars', preComputeUrl: true })
  public avatar: AttachmentContract | null

  @attachment({ folder: 'backgrounds', preComputeUrl: true })
  public background: AttachmentContract | null

  @column()
  public wallet: string

  @column()
  public referralCode: string

  @column()
  public referralId: number

  @column()
  public country: string

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

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
