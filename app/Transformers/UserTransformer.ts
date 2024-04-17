import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'

export default class UserTransformer extends TransformerAbstract {
  public transform(model) {
    //console.log(model)
    return {
      uuid: model.uuid,
      id: model.uuid,
      name: model.firstName + ' ' + model.lastName,
      email: model.email,
      phone: model.phone,
      avatar: model.avatar,
      balance: model.balance,
      username: model.username,
      refferalCode: model.refferalCode,
      country: model.country,
      region: model.region,
      city: model.city,
      country_code: model.countryCode,
      language: model.language,
      wallet: model.wallet,
      wallet_network: model.walletNetwork,
      background: model.background,
      is_creator: !!model.isCreator,
      verified: !!model.verified,
      is_active: !!model.active,
      following: model.following,
      followers: model.followers,
      subscribers: model.subscribers,
      fee: model.fee,
      wallet_address: model.walletAddress
    }
  }
}
