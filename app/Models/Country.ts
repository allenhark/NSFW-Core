import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, afterFetch } from '@ioc:Adonis/Lucid/Orm'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public countryCode: string

  @column()
  public flag: any

  @column()
  public currency: string

  @column()
  public currencySymbol: string

  @column()
  public translations: any

  @column()
  public iso2: string

  @column()
  public iso3: string

  @column()
  public synced: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //convert translations to json before saving
  @beforeSave()
  public static async stringifyTranslations(country: Country) {
    if (country.translations)
      country.translations = JSON.stringify(country.translations)
  }

  //parse translations after fetching
  @afterFetch()
  public static async parseTranslations(country: Country) {
    if (country.translations)
      country.translations = JSON.parse(country.translations)
  }

}
