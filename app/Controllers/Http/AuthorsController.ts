// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import AuthorTransformer from "App/Transformers/AuthorTransfomer";
import Follower from "App/Models/Follower";
import Subscription from "App/Models/Subscription";

export default class AuthorsController {

  /**
   * Get popular authors. Limit to 10
   */
  public async popular({ response, transform }) {

    let q = await User.query()
      .where('active', true)
      .where('is_creator', true)
      .orderBy('followers', 'desc')
      .orderBy('subscribers', 'desc')
      .limit(10)

    let serial = q.map((user) => user.serialize())

    serial = await transform.collection(serial, AuthorTransformer)

    //console.log(serial)

    return response.json(serial)

  }

  /**
   * Search by username, first name, last name, country, city. Limit to top 20 results
   */
  async search({ request, response, transform }) {

    let { q } = request.all()

    // console.log('query', q)

    let users = await User.query()
      .where('active', true)
      // .where('is_creator', true)
      .where('username', 'like', `%${q}%`)
      .orWhere('first_name', 'like', `%${q}%`)
      .orWhere('last_name', 'like', `%${q}%`)
      .orWhere('country', 'like', `%${q}%`)
      .orWhere('city', 'like', `%${q}%`)
      .limit(20)

    let serial = users.map((user) => user.serialize())

    serial = await transform.collection(serial, AuthorTransformer)

    return response.json(serial)
  }

  /**
   * get if user follows a certain author
   */
  async isFollowing({ request, response, auth, params }) {

    let user = await auth.authenticate()

    let author = await User.findByOrFail('uuid', params.uuid)

    try {

      await Follower.query().where('author_id', author.id).where('user_id', user.id).firstOrFail()

      return response.json({ isFollowing: true })

    }
    catch (e) {
      return response.json({ isFollowing: false })
    }

  }

  /**
   * get if is subscribed to a certain author
   *
   */
  async isSubscribed({ request, response, auth, params }) {

    let author = await User.findByOrFail('uuid', params.uuid)

    let user = await auth.authenticate()

    let isSubscribed = await user.related('subscriptions').query().where('author_id', author.id).first()

    return response.json({ isSubscribed: !!isSubscribed })
  }

  /**
   * Follow/unfollow an author
   */
  async follow({ params, response, auth }) {

    let author = await User.findByOrFail('uuid', params.uuid)

    let user = await auth.authenticate()

    let isFollowing = await Follower.query().where('author_id', author.id).where('user_id', user.id).first()

    let follow = true

    if (isFollowing) {

      await Follower.query().where('author_id', author.id).where('user_id', user.id).delete()

      follow = false

      //update followers count
      author.followers -= 1

      await author.save()

    } else {

      await Follower.create({
        authorId: author.id,
        userId: user.id
      })

      //update followers count
      author.followers += 1

      await author.save()
    }

    return response.json({ success: true, follow: follow })
  }
}
