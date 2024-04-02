// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Escort from "App/Models/Escort";
import EscortTransformer from "App/Transformers/EscortTransformer";
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import EscortMedia from "App/Models/EscortMedia";

export default class EscortsController {

  /**
   * Create a new escort
   */
  public async create({ request, response, auth, transform }) {
    let user = await auth.use('api').authenticate()

    let data = request.all() //{"age": "21", "bio": "Super amazing services ", "city": "Abfaltersbach", "country": "Austria", "country_code": "AT", "gay": false, "lesbian": false, "linkProfile": true, "phone": "07848949466", "price": "$10", "region": "Burgenland", "services": "Very cool services ", "showProfile": true, "straight": true, "telegram": "Jim", "whatsapp": "07088488"}

    //check if user

    let escort = await Escort.updateOrCreate(
      {
        userId: user.id
      },
      {
        ...data, userId: user.id
      }
    )

    return response.json(transform.item(escort, EscortTransformer))

  }

  /**
   * get my profile
   */
  public async me({ auth, transform }) {
    let user = await auth.use('api').authenticate()

    let escort = await Escort.findByOrFail('user_id', user.id)

    return transform.item(escort, EscortTransformer)
  }


  /**
   * get all escorts with country, region, city, gay, lesbian, age, straight, bi filters
   */
  public async index({ request, response, transform }) {
    let { countryCode, region, city, gender } = request.all()

    console.log('Escorts query', request.all())

    let escorts = Escort.query()
    //.where('is_active', true)

    if (countryCode)
      escorts.where('country_code', countryCode)

    if (region)
      escorts.where('region', region)

    if (city)
      escorts.where('city', city)

    if (gender)
      escorts.where('gender', gender)

    let page = request.all().page | 1

    escorts.preload('media')

    let result = (await escorts.paginate(page)).serialize()

    //console.log(result)

    //  result.data = await transform.collection(result.data, EscortTransformer)
    let arr = [] as any;

    for (let escort of result.data) {
      //console.log(data)

      //transform
      let esc = await transform.item(escort, EscortTransformer)

      let media = await transform.collection(escort.media, (media) => {
        //console.log(media)
        return {
          ...media.media,
          id: media.id
        }
      })

      let toPush = {
        ...esc,
        media: media
      }

      arr.push(toPush)

    }

    result.data = arr;

    return response.json(result)

  }

  /**
   * get escort by uuid
   */
  public async show({ response, params, transform }) {

    let escort = await Escort.query().where('uuid', params.id)
      .preload('media')
      .firstOrFail()

    let json = await transform.item(escort, EscortTransformer)

    let media = await transform.collection(escort.media, (media) => {
      //console.log(media)
      return {
        ...media.media,
        id: media.id
      }
    })

    json.media = media

    return response.json(json)

  }

  /**
   * update
   */
  public async update({ request, response, auth, transform }) {
    let user = await auth.use('api').authenticate()

    let data = request.all()

    let escort = await Escort.findByOrFail('user_id', user.id)

    escort.merge(data)

    await escort.save()

    return response.json(transform.item(escort, EscortTransformer))
  }

  /**
   * delete
   */
  public async delete({ response, auth }) {
    let user = await auth.use('api').authenticate()

    let escort = await Escort.findByOrFail('user_id', user.id)

    await escort.delete()

    return response.json({
      message: 'Escort deleted'
    })

  }

  /**
   * upload media
   */
  public async upload({ request, response, params, transform }) {
    let escort = await Escort.findByOrFail('uuid', params.uuid)

    let file = request.file('image')!

    //console.log(request.all(), file)

    if (!file) {
      return response.status(400).json({
        message: 'No file found'
      })
    }

    let attachment = new EscortMedia()

    attachment.media = await Attachment.fromFile(file)

    attachment.escortId = escort.id

    let saved = await attachment.save()

    return response.json(saved)

  }

  /**
   * delete media
   */
  public async deleteMedia({ response, params }) {
    let media = await EscortMedia.findOrFail(params.id)

    await media.delete()

    return response.json({
      message: 'Media deleted'
    })

  }

  /**
   * My media
   */
  public async myMedia({ response, auth, transform }) {
    let user = await auth.use('api').authenticate()

    let escort = await Escort.findByOrFail('user_id', user.id)

    let media = await escort.related('media').query()

    return response.json(media)
  }

}
