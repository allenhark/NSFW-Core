import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'

export default class PostTransformer extends TransformerAbstract {
  public transform(model) {

    return {
      uuid: model.uuid,
      type: model.type,
      status: model.status,
      visibility: model.visibility,
      content: model.content,
      video: JSON.parse(model.video),
      country: model.country,
      city: model.city,
      countryCode: model.country_code,
      likesCount: model.likes_count,
      commentsCount: model.comments_count,
      sharesCount: model.sharesCount,
      viewsCount: model.viewsCount,
      savedCount: model.savedCount,
      allowComments: !!model.allow_comments,
      allowShares: !!model.allow_shares,
      flagged: model.flagged,

    }
  }
}
