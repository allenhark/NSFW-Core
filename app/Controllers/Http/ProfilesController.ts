// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import User from 'App/Models/User'
import UserMedia from 'App/Models/UserMedia'

export default class ProfilesController {

  /**
   * upload media
   */
  public async upload({ request, response, params, transform, auth }) {
    let user = await auth.use('api').authenticate()

    let file = request.file('image')!

    //console.log(request.all(), file)

    if (!file) {
      return response.status(400).json({
        message: 'No file found'
      })
    }

    let attachment = new UserMedia()

    attachment.media = await ResponsiveAttachment.fromFile(file)

    attachment.userId = user.id

    let saved = await attachment.save()

    // console.log(saved, attachment)

    return response.json(attachment)

  }

  /**
   * delete media
   */
  public async deleteMedia({ response, params }) {
    let media = await UserMedia.findOrFail(params.id)

    await media.delete()

    return response.json({
      message: 'Media deleted'
    })

  }

  /**
   * My media
   */
  public async myMedia({ response, auth }) {
    let user = await auth.use('api').authenticate()

    let escort = await User.findByOrFail('id', user.id)

    let media = await escort.related('media').query()

    return response.json(media)
  }

}
