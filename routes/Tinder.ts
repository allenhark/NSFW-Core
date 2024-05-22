import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


  Route.get('/', 'TindersController.suggested')


})
  .prefix('v1/tinder')
  .middleware(['auth'])
