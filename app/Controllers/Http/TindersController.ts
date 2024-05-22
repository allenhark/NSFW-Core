// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Location from "App/Models/Location"
import User from "App/Models/User"

export default class TindersController {

  /**
   * Get suggested profiles near me
   */
  async suggested({ request, response, auth, transform }) {

    let user = await auth.use('api').authenticate()

    //get user location
    // let location = await Location.query().where('user_id', user.id).first() as any

    // console.log(location)
    // console.log(user)

    //no location
    if (!user.location)
      user.location = request.input('location')

    let distance = request.input('distance', 20) //100km

    //get suggested profiles
    let profiles = await User.query()
      .whereNot('id', user.id)
      .andWhereRaw(
        `ST_Distance_Sphere(location, ST_GeomFromText('POINT(? ?)')) <= ?`,
        [user.location.x, user.location.y, distance * 1000]
      )
      .preload('media')
      .preload('categories')
      .paginate(request.input('page', 1), request.input('limit', 20))


    return response.json(profiles)

  }
}
