import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  //upload media
  Route.post('upload', 'ProfilesController.upload')

  //delete media
  Route.delete('media/:id', 'ProfilesController.deleteMedia')

  //my media
  Route.get('media', 'ProfilesController.myMedia')

})
  .prefix('v1/profile')
  .middleware(['auth'])
