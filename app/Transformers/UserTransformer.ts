import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'

export default class UserTransformer extends TransformerAbstract {
  public transform(model) {
    return {
      id: model.name,
      name: model.firstName + ' ' + model.lastName,
      email: model.email,
      phone: model.phone,
      avatar: model.avatar,
      balance: model.balance,
      username: model.username,
      refferalCode: model.refferalCode,

    }
  }
}
