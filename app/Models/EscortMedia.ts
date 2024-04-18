import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { responsiveAttachment, ResponsiveAttachmentContract } from '@ioc:Adonis/Addons/ResponsiveAttachment'

export default class EscortMedia extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public escortId: number

  @column()
  public type: string

  @responsiveAttachment({
    folder: 'profile/escorts', breakpoints: {
      large: 1000,
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
  public media: ResponsiveAttachmentContract | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
