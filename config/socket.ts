/**
 * Here you can define options for socket.io server described here
 * https://socket.io/docs/v4/server-options/#socketio-server-options
 */

import type { WsConfig } from '@ioc:Ruby184/Socket.IO/Ws'

const wsConfig: WsConfig = {
  //
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  },
  cors: {
    origin: "*"
  },
  transports: [
    'websocket', "polling"
  ]
}

export default wsConfig
