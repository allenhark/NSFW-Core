import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


  Route.get('/draft', 'PostsController.getDrafts')

  Route.post('/upload/:uuid', 'PostsController.upload')

  Route.delete('/upload/:id', 'PostsController.deleteMedia')

  //publish
  Route.post('/publish/:uuid', 'PostsController.publish')


})
  .prefix('v1/posts')
  .middleware(['auth'])

//User videos recommendations
Route.get('v1/recommendations', 'PostsController.index')
