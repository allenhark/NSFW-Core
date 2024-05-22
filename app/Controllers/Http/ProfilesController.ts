// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import Category from 'App/Models/Category'
import User from 'App/Models/User'
import UserMedia from 'App/Models/UserMedia'
import Env from '@ioc:Adonis/Core/Env'
import CategoryTransformer from 'App/Transformers/CategoryTransformer'
import UserCategory from 'App/Models/UserCategory'

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

  /**
   * Attach user category
   */
  public async attachCategory({ request, response, auth }) {
    let user = await auth.use('api').authenticate()

    let categories = request.input('categories')

    //get all user categories
    let userCategories = await UserCategory.query().where('userId', user.id)

    //match user categories to categories, delete if id doestn't exist on categories, add if it doesn't exist on user categories
    for (let cat of userCategories) {
      if (categories.indexOf(cat.categoryId) == -1) {
        await cat.delete()
      }
    }

    for (let cat of categories) {
      //check if category exists
      let exists = await UserCategory.query()
        .where('userId', user.id)
        .where('categoryId', cat)
        .first()

      if (exists)
        continue

      await UserCategory.create({
        userId: user.id,
        categoryId: cat
      })
    }

    return response.json({
      message: 'Category attached'
    })

  }

  /**
   * Detach user category
   */
  public async detachCategory({ response, auth, params }) {
    let user = await auth.use('api').authenticate()

    let category = params.id

    await user.related('categories').detach([category])

    return response.json({
      message: 'Category detached'
    })

  }

  /**
   * Get user categories
   */
  public async getCategories({ response, auth, transform }) {
    let user = await auth.use('api').authenticate()

    let categories = await UserCategory.query().where('userId', user.id).preload('category')

    let cats = await transform.collection(categories, (model) => {
      return {
        id: model.category.id,
        value: model.category.name
      }

    })

    return response.json(cats)

  }

  /**
   * Update user profile
   */
  public async updateProfile({ request, response, auth }) {
    let user = await auth.use('api').authenticate()

    let data = request.all()

    user.merge(data)

    await user.save()

    return response.json(user)
  }

  /**
   * get all categories
   */
  public async categories({ response, transform }) {
    let nsfw = await Env.get('NSFW')

    if (nsfw == 'true')
      nsfw = true
    else
      nsfw = false

    let categories = await Category.query()
      .where('nsfw', nsfw)
      .orderBy('name', 'asc')

    let cats = await transform.collection(categories, CategoryTransformer)

    return response.json(cats)
  }

}
