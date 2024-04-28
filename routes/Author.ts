import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


  Route.get('/popular', 'AuthorsController.popular')
  Route.get('/search', 'AuthorsController.search')

  Route.get('/is-following/:uuid', 'AuthorsController.isFollowing')
  Route.post('/follow/:uuid', 'AuthorsController.follow')

  Route.get('/is-subscribed/:uuid', 'AuthorsController.isSubscribed')

})
  .prefix('v1/authors')
  .middleware(['auth'])
