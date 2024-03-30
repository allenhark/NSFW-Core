import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, hasMany, HasMany, afterFetch } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'
import EscortMedia from './EscortMedia'
import { nanoid } from 'nanoid'
// const nanoid = require('nanoid')
export default class Escort extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public uuid: string

  @column()
  public name: string

  @column()
  public gender: string

  @column()
  public phone: string

  @column()
  public telegram: string

  @column()
  public whatsapp: string

  @column()
  public age: string

  @column()
  public country: string

  @column()
  public countryCode: string

  @column()
  public city: string

  @column()
  public region: string

  @column()
  public bio: string

  @column()
  public price: string

  @column()
  public services: string

  @column()
  public gay: boolean

  @column()
  public lesbian: boolean

  @column()
  public straight: boolean

  @column()
  public showProfile: boolean

  @column()
  public linkProfile: boolean

  @column()
  public isActive: boolean

  @column()
  public views: number

  @hasMany(() => EscortMedia)
  public media: HasMany<typeof EscortMedia>

  @column.dateTime()
  public nextSubscriptionRenew: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //generate unique uuid from name
  @beforeCreate()
  public static async generateUuid(escort: Escort) {

    //name to url friendly case
    let nm = slugify(escort.name)

    //slugify function
    function slugify(string: string) {
      //remove spaces replace with - and lowercase
      return string.replace(/\s+/g, '-').toLowerCase()
    }

    escort.uuid = nm + '-' + nanoid(5)

  }

  //increment views
  // @afterFetch()
  // public static async afterFetch(escort: Escort) {

  //   //increment views
  //   escort.views = escort.views + 1

  //   //save
  //   await escort.save()

  // }


}
