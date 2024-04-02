import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'

export default class AuthorTransformer extends TransformerAbstract {
  public transform(model) {
    // console.log(model)
    return {
      uuid: model.uuid,
      id: model.uuid,
      name: model.first_name + ' ' + model.last_name,
      // email: model.email,
      // phone: model.phone,
      avatar: model.avatar,
      //balance: model.balance,
      username: model.username,
      // refferalCode: model.refferal_code,
      country: model.country,
      language: model.language,
      // wallet: model.wallet,
      //  wallet_network: model.wallet_network,
      background: model.background,
      is_creator: model.is_creator,
      // verified: model.verified,
      is_active: model.active,
      following: model.following,
      followers: model.followers,
      // subscribers: model.subscribers,
    }
  }
}
