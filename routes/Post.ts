import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


  Route.get('/draft', 'PostsController.getDrafts')

  Route.post('/upload/:uuid', 'PostsController.upload')

  Route.delete('/upload/:id', 'PostsController.deleteMedia')

  //publish
  Route.post('/publish/:uuid', 'PostsController.publish')

  //Like Unlike post
  Route.post('/like/:uuid', 'PostsController.like')
  Route.get('/like/:uuid', 'PostsController.hasLiked')

  //post comment
  Route.post('/comment/:uuid', 'PostsController.createComment')

  //delete comment
  Route.delete('/comment/:uuid', 'PostsController.deleteComment')

  //report post
  Route.post('/report/:uuid', 'PostsController.report')

})
  .prefix('v1/posts')
  .middleware(['auth'])

//User videos recommendations
Route.get('v1/recommendations', 'PostsController.index')

//get post comments
Route.get('v1/comments/:uuid', 'PostsController.getComments')
