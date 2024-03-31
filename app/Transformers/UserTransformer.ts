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
      country: model.country,
      language: model.language,
      wallet: model.wallet,
      wallet_network: model.wallet_network,
      background: model.background,
      is_creator: model.is_creator,
      verified: model.verified,
      is_active: model.active
    }
  }
}
