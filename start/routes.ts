/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('v1/auth', 'AuthController.login')

Route.get('test', 'TestsController.index')


Route.group(() => {

  //me
  Route.get('auth', 'AuthController.me')

  //logout
  Route.delete('auth', 'AuthController.logout')

  //update
  Route.put('auth', 'AuthController.update')

  //register device
  Route.post('auth/device', 'AuthController.registerDevice')

  //cashout via api
  Route.post('cashout', 'CashoutsController.index')

  Route.post('bet', 'CashoutsController.bet')

  Route.get('balance', 'CashoutsController.balance')

  //get till
  Route.get('till', 'MoniesController.getTill')

  //deposit
  Route.post('deposit', 'MoniesController.deposit')

  //withdraw
  Route.post('withdraw', 'MoniesController.withdraw')

  //history
  Route.get('history', 'MoniesController.history')

  //dimba
  Route.post('dimba', 'GoalsController.show')

})
  .prefix('v1')
  .middleware(['auth'])
