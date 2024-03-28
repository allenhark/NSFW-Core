import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'

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
  public gay: boolean

  @column()
  public lesbian: boolean

  @column()
  public straight: boolean

  @column()
  public showProfile: boolean

  @column()
  public isActive: boolean

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

    escort.uuid = nm + '-' + string.generateRandom(5)

  }
}
