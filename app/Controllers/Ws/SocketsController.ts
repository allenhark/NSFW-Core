import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Bet from 'App/Models/Bet'
import OddsHistory from 'App/Models/OddsHistory'
import User from 'App/Models/User'

export default class SocketsController {

  private getUserRoom(user: User): string {
    return `user:${user.id}`
  }

  public async onConnected({ socket, auth }: WsContextContract) {
    // all connections for the same authenticated user will be in the room
    let user = await auth.use('api').authenticate()

    user.socket = socket.id

    //user.save()

    // const room = this.getUserRoom(user)

    // const userSockets = await socket.in(room).allSockets()

    // // add this socket to user room
    // socket.join(room)

    // add userId to data shared between Socket.IO servers

    socket.data.userId = user.id

    // const allSockets = await socket.nsp.fetchSockets()
    // const onlineIds = new Set<number>()

    // for (const remoteSocket of allSockets) {
    //   onlineIds.add(remoteSocket.data.userId)
    // }

    // console.log('User connected: ', user.id)
  }

  // see https://socket.io/get-started/private-messaging-part-2/#disconnection-handler
  public async onDisconnected({ socket, auth, logger }: WsContextContract, reason: string) {
    let user = await auth.use('api').authenticate()

    // const room = this.getUserRoom(user)

    // const userSockets = await socket.in(room).allSockets()

    // // user is disconnected
    // if (userSockets.size === 0) {
    //   // notify other users
    //   socket.broadcast.emit('user:offline', user)
    // }

    console.log('user disconnected: ', reason, user.id)

  }

  //get balance
  public async balance({ socket, auth }: WsContextContract) {

    let u = await auth.use('api').authenticate()

    let user = await User.findOrFail(u.id)

    //get user balance
    let balance = user.balance

    console.log('balance requested', socket.id)

    //emit
    // return socket.emit('balance', balance)
    return socket.broadcast.emit('balance', balance);

  }

  //cashout
  public async cashout({ socket, auth }: WsContextContract, payload: any) {

    let u = await auth.use('api').authenticate()

    let user = await User.findOrFail(u.id)

    //get user balance
    const { odds, uuid } = payload.data;

    //get bet session
    let hst = await OddsHistory.findByOrFail('active', true)

    //get user bet
    let bet = await Bet.query()
      .where('user_id', user.id)
      .where('odds_history_id', hst.id)
      .where('open', true)
      .firstOrFail()


    console.log(bet.id, hst.id, odds, 'Cashout')

    //if is open
    if (hst.active) {

      let bal = Number((bet.amount * odds).toFixed(2))

      //add amount to user balance
      let balance = Number((user.balance + bal).toFixed(2))

      user.balance = balance

      await user.save()

      bet.open = false;
      bet.won = true;
      bet.odd = odds

      await bet.save()

      //emit
      socket.broadcast.emit('balance', balance)
      //socket.broadcast.emit('balance', balance)

    }
    else
      bet.open = false; await bet.save()


  }

  public async bet({ socket, request, auth }: WsContextContract, payload: any) {
    // Authenticate the user
    let u = await auth.use('api').authenticate()

    let user = await User.findOrFail(u.id)

    // Extract the bet amount from the payload sent by the client
    const { amount, uuid } = payload.data;

    //get bet session
    let hst = await OddsHistory.findByOrFail('uuid', uuid)

    // Process the bet here
    console.log('Bet amount:', amount);

    // Perform other operations with the bet amount
    //deduct amount from user account
    let newBal = Number((user.balance - amount).toFixed(2))

    // save balance
    user.balance = newBal

    await user.save()

    //create bet slip
    let bet = await Bet.create({
      userId: user.id,
      amount: amount,
      oddsHistoryId: hst.id
    })

    console.log('Bet created:', bet.id)

    // Emit the updated balance to the client
    socket.broadcast.emit('balance', newBal);
    socket.broadcast.emit('bet_placed', true);

  }

}
