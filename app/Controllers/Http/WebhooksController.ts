// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WebhooksController {

  async index({ request, response }) {

    console.log(request.all())

    //request heasers
    console.log(request.headers())

    return response.json({
      message: 'Webhook received'
    })
  }
}
