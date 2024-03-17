/*
|--------------------------------------------------------------------------
| Websocket events
|--------------------------------------------------------------------------
|
| This file is dedicated for defining websocket namespaces and event handlers.
|
*/

import Ws from '@ioc:Ruby184/Socket.IO/Ws'

Ws.namespace('/')
  .connected('SocketsController.onConnected')
  .disconnected('SocketsController.onDisconnected')
  .on('balance', 'SocketsController.balance')
  .on('bet', 'SocketsController.bet')
  .on('cashout', 'SocketsController.cashout')
