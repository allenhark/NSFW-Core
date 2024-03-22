// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import Bet from 'App/Models/Bet'
import OddsHistory from 'App/Models/OddsHistory'

export default class CashoutsController {


  async index({ request, response, auth }) {

    console.log('cashout', request.all())

    let user = await auth.use('api').authenticate()

    //get user balance
    const { odds, uuid, betId } = request.all();

    //get bet session
    let hst = await OddsHistory.findByOrFail('uuid', uuid)

    //get user bet
    let bet = await Bet.findOrFail(betId)

    // console.log(bet.id, hst.id, odds, hst)

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

      return response.json({
        balance: balance
      })

    }
    else {

      bet.open = false;
      await bet.save()

      return response.json({
        balance: user.balance
      })

    }



  }

  //get balance
  public async balance({ response, auth }) {

    let u = await auth.use('api').authenticate()

    let user = await User.findOrFail(u.id)

    //get user balance
    let balance = user.balance

    //emit
    // return socket.emit('balance', balance)
    return response.json({
      balance: balance
    })

  }

  //place bet
  public async bet({ response, request, auth }) {
    console.log('Place bet')
    // Authenticate the user
    let u = await auth.use('api').authenticate()

    let user = await User.findOrFail(u.id)

    // Extract the bet amount from the payload sent by the client
    const { amount, uuid } = request.all();

    //console.log(request.all())

    //get bet session
    let hst = await OddsHistory.findByOrFail('uuid', uuid)

    // Process the bet here
    console.log('Bet amount:', amount);

    //if game has started, reject
    if (hst.started)
      throw new Error('Game has started')

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


    return response.json({
      balance: newBal,
      betId: bet.id
    })

  }


}
