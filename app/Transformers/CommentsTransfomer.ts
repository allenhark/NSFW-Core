import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'

export default class CommentsTransformer extends TransformerAbstract {
  public transform(model) {

    return {
      uuid: model.uuid,
      comment: model.comment
    }
  }
}
