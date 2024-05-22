import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  //upload media
  Route.post('upload', 'ProfilesController.upload')

  //delete media
  Route.delete('media/:id', 'ProfilesController.deleteMedia')

  //my media
  Route.get('media', 'ProfilesController.myMedia')

  //get user category
  Route.get('categories', 'ProfilesController.getCategories')

  //add user category
  Route.post('categories', 'ProfilesController.attachCategory')

  //delete user category
  Route.delete('category/:id', 'ProfilesController.deleteCategory')

})
  .prefix('v1/profile')
  .middleware(['auth'])
