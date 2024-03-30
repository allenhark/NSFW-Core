import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


  Route.post('/', 'EscortsController.create')
  Route.get('/me', 'EscortsController.me')

  Route.post('/media/:uuid', 'EscortsController.upload')
  Route.delete('/media/:id', 'EscortsController.deleteMedia')
  Route.get('/media', 'EscortsController.myMedia')


  Route.put('/', 'EscortsController.update')
  Route.delete('/', 'EscortsController.delete')

})
  .prefix('v1/escorts')
  .middleware(['auth'])

Route.get('v1/escorts', 'EscortsController.index')
Route.get('v1/escorts/:id', 'EscortsController.show')
