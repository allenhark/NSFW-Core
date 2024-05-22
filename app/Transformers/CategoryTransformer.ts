import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'

export default class CategoryTransformer extends TransformerAbstract {

  public transform(model) {
    return {
      id: model.id,
      value: model.name,
    }
  }

}
