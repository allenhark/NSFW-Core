// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Till from "App/Models/Till"
import Transaction from "App/Models/Transaction";
import User from "App/Models/User";
import moment from 'moment';

export default class MoniesController {

  async deposit({ request, response, auth }) {

    let user = await auth.use('api').authenticate()

    let { message } = request.all()

    //test
    let data = await this.extract(message)

    //ckeck if transaction code exist
    let check = await Transaction.query().where('code', data.transactionCode).first()

    if (check)
      throw new Error('Transaction code exist. ')


    let trans = await Transaction.create({
      userId: user.id,
      userAmount: data.parsed_amount,
      tillName: data.tillName,
      code: data.transactionCode,
      date: data.date,
      time: data.time,
      type: 'deposit'
    })

    return response.json(trans)


  }

  async withdraw({ request, response, auth }) {

    let user = await auth.use('api').authenticate()

    //get user balance
    let bal = await User.findOrFail(user.id)

    let { amount } = request.all()

    //check balance
    if (amount > user.balance)
      throw new Error('Amount is greator than balance')


    //new balance
    let newBal = Number((bal.balance - amount).toFixed(2))

    //set new user balance
    bal.balance = newBal

    //save
    await bal.save()

    //create transaction

    let trans = await Transaction.create({
      userAmount: amount,
      userId: user.id,
      date: moment().format('D/M/YY'),
      time: moment().format('h:mm A'),
      type: "withdraw"
    })

    return response.json(trans)


  }

  async getTill({ response }) {

    let query = await Till.query()
      .where('active', true)
      .orderBy('float', 'asc')
      .firstOrFail()

    return response.json({
      till: query.till,
      name: query.name
    })

  }

  //user transaction history
  async history({ request, response, auth }) {

    let { page } = request.all() || 1

    let user = await auth.use('api').authenticate()

    let query = await Transaction.query()
      .where('user_id', user.id)
      .orderBy('id', 'desc')
      .paginate(page)


    return response.json(query)


  }

  async extract(message: string) {
    // Regular expressions to extract data
    const transactionCodeRegex = /([A-Z0-9]{10})/;
    const amountRegex = /Ksh([\d,]+\.\d{2})/;
    const tillNameRegex = /paid to ([^.]+)\./;
    const dateRegex = /on (\d{1,2}\/\d{1,2}\/\d{2})/;
    const timeRegex = /at (\d{1,2}:\d{2} (?:AM|PM))/;

    // Function to extract data from message
    function extractData(message: string) {
      const transactionCodeMatch = message.match(transactionCodeRegex);
      const amountMatch = message.match(amountRegex);
      const tillNameMatch = message.match(tillNameRegex);
      const dateMatch = message.match(dateRegex);
      const timeMatch = message.match(timeRegex);

      if (transactionCodeMatch && amountMatch && tillNameMatch && dateMatch && timeMatch) {
        const transactionCode = transactionCodeMatch[0];
        const amount = amountMatch[1];
        const tillName = tillNameMatch[1];
        const date = dateMatch[1];
        const time = timeMatch[1];

        return {
          transactionCode,
          amount,
          tillName,
          date,
          time
        };
      } else {
        return null; // Message format doesn't match expected pattern
      }
    }

    // Function to validate if a message is valid
    function isValidMessage(message: string) {
      return transactionCodeRegex.test(message)
        && amountRegex.test(message)
        && tillNameRegex.test(message)
        && dateRegex.test(message)
        && timeRegex.test(message);
    }

    // Extracting data from the message
    const extractedData = extractData(message) as any;
    const convertAmountToFloat = (amountStr: string): number => parseFloat(amountStr.replace(/,/g, ''));

    if (extractedData) {
      extractedData.parsed_amount = convertAmountToFloat(extractedData.amount)

      return extractedData;

    } else {
      console.log("Invalid message format.");

      throw new Error('Invalid message format')
    }

    // Validating the message
    console.log("Is message valid?", isValidMessage(message));


  }
}
