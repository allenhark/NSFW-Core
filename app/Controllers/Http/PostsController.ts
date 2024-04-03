// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from "App/Models/Post"
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import PostImage from "App/Models/PostImage";
import PostTransformer from "App/Transformers/PostTransformer";
import UserTransformer from "App/Transformers/UserTransformer";
import AuthorTransformer from "App/Transformers/AuthorTransfomer";
import PostComment from "App/Models/PostComment";
import CommentsTransformer from "App/Transformers/CommentsTransfomer";

export default class PostsController {

  async getDrafts({ request, response, auth, transform }) {

    let user = await auth.use('api').authenticate()

    //get draft or create
    let post;

    try {
      post = await Post.query().where('user_id', user.id).where('status', 'draft').firstOrFail()
    }
    catch (e) {

      post = await Post.create({ userId: user.id })
    }

    let media = await post.related('images').query()

    return response.json({ post, media })

  }

  /**
 * upload media
 */
  public async upload({ request, response, params, transform }) {
    let escort = await Post.findByOrFail('uuid', params.uuid)

    let file = request.file('image')!

    //console.log(request.all(), file)

    if (!file) {
      return response.status(400).json({
        message: 'No file found'
      })
    }

    let attachment = new PostImage()

    attachment.media = await Attachment.fromFile(file)

    attachment.postId = escort.id

    let saved = await attachment.save()

    return response.json(saved)

  }

  /**
   * delete media
   */
  public async deleteMedia({ response, params }) {
    let media = await PostImage.findOrFail(params.id)

    const postId = media.postId

    await media.delete()

    //get remaining images
    let images = await PostImage.query().where('post_id', postId)

    return response.json({
      message: 'Media deleted',
      media: images
    })

  }

  /**
   * publish post
   */
  public async publish({ request, response, params }) {
    let post = await Post.findByOrFail('uuid', params.uuid)

    let data = request.all()

    console.log(data)

    post.merge(data)

    await post.save()

    return response.json(post)

  }

  /**
   * Get content recommendations
   */
  public async index({ request, response, transform, auth }) {

    let page = request.all().page || 1

    //get posts
    let posts = await Post.query()
      .where('status', 'published')
      .preload('images')
      .preload('author')
      .paginate(page)

    let serial = await posts.serialize()

    let arr = [] as any;

    for (let post of serial.data) {
      //console.log(data)

      //transform
      let esc = await transform.item(post, PostTransformer)

      let media = await transform.collection(post.images, (media) => {
        //console.log(media)
        return {
          ...media.media,
          id: media.id
        }
      })

      let author = await transform.item(post.author, AuthorTransformer)

      let toPush = {
        ...esc,
        media: media,
        author: author
      }

      arr.push(toPush)

    }

    serial.data = arr;

    return response.json(serial)

  }

  /**
   * Like or unlike post
   */
  async like({ request, response, auth, params }) {

    let user = await auth.use('api').authenticate()

    let post = await Post.findByOrFail('uuid', params.uuid)

    let like = await post.related('likers').query().where('user_id', user.id).first()

    let liked = true;

    if (like) {
      await like.delete()
      liked = false;
      post.likesCount = post.likesCount - 1
    } else {
      await post.related('likers').create({ userId: user.id })

      post.likesCount = post.likesCount + 1
    }

    await post.save()

    return response.json({ message: 'success', liked: liked })

  }

  /**
   * Get of user has likes
   */
  async hasLiked({ request, response, auth, params }) {

    let user = await auth.use('api').authenticate()

    let post = await Post.findByOrFail('uuid', params.uuid)

    let like = await post.related('likers').query().where('user_id', user.id).first()

    return response.json({ liked: like ? true : false })
  }

  /**
   * Create comment
   */
  async createComment({ request, response, auth, params }) {

    let user = await auth.use('api').authenticate()

    let post = await Post.findByOrFail('uuid', params.uuid)

    let data = request.all()

    let comment = await post.related('comments').create({ userId: user.id, comment: data.comment })

    post.commentsCount = post.commentsCount + 1

    await post.save()

    return response.json(comment)

  }

  /**
   * delete comment
   */
  async deleteComment({ response, params, auth }) {

    let user = await auth.use('api').authenticate()

    let comment = await PostComment.query().where('uuid', params.uuid).where('user_id', user.id).firstOrFail()

    let post = await Post.findOrFail(comment.postId)

    post.commentsCount = post.commentsCount - 1

    await post.save()

    await comment.delete()

    return response.json({ message: 'Comment deleted' })

  }

  /**
   * Get comments
   */
  async getComments({ request, response, params, transform }) {

    let post = await Post.findByOrFail('uuid', params.uuid)

    let page = request.all().page || 1

    let comments = await PostComment.query()
      .where('post_id', post.id)
      .orderBy('id', 'desc')
      .preload('author')
      .paginate(page)

    let serial = comments.serialize()

    let arr = [] as any;

    for (let post of serial.data) {
      //console.log(data)

      //transform
      let esc = await transform.item(post, CommentsTransformer)

      let author = await transform.item(post.author, AuthorTransformer)

      let toPush = {
        ...esc,
        author: author
      }

      arr.push(toPush)

    }

    serial.data = arr;

    return response.json(serial)

  }

}
