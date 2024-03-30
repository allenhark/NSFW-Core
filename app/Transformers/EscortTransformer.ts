import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'

export default class EscortTransformer extends TransformerAbstract {

  public transform(model) {
    return {
      uuid: model.uuid,
      name: model.name,
      age: model.age,
      bio: model.bio,
      city: model.city,
      country: model.country,
      countryCode: model.country_code,
      region: model.region,
      phone: model.phone,
      price: model.price,
      services: model.services,
      showProfile: model.show_profile,
      linkProfile: model.link_profile,
      gay: model.gay,
      gender: model.gender,
      straight: model.straight,
      lesbian: model.lesbian,
      //media array
      //media: model.media,
    }
  }


}
