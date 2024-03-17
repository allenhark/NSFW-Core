// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Device from "App/Models/Device";
import User from "App/Models/User";
const emojiStrip = require('emoji-strip')

export default class AuthController {

  /**
   * Login the customer
   * @param param0
   * @returns
   */
  async login({ request, response, auth }) {

    let data = request.all();

    let customerData;

    let phone = this.formatPhoneNumber(data.phone)

    try {

      //format phone number
      customerData = await User.findByOrFail('phone', phone)


      //generate auth session
      const token = await auth.use('api').attempt(phone, data.password)

      //store the to customer store
      return response.json({
        status: true,
        customer: customerData,
        balance: customerData.balance,
        token: token,
        message: "Welcome back"
      });

    }

    catch (err) {
      //create customer account
      customerData = await User.create({
        phone: phone,
        password: data.password
      })

      //generate auth session
      const token = await auth.use('api').generate(customerData, {
        expiresIn: '90 days'
      })

      return response.json({
        status: true,
        customer: customerData,
        balance: customerData.balance,
        token: token,
        message: "Welcome back"
      });

    }

  }

  /**
   * Format phone number
   * @param phoneNumber
   * @returns
   */
  formatPhoneNumber = (phoneNumber) => {
    // Remove all non-numeric characters from the input
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Check if the cleaned phone number starts with '0' and has 9 digits
    if (cleaned.startsWith('0') || cleaned.length === 9) {
      // If so, replace '0' with '254' and return the formatted phone number
      return '254' + cleaned.slice(1);
    } else {
      // If not, simply return the original input
      return cleaned;
    }
  };


  /**
   * logout customer
   */
  async logout({ request, response, auth }) {
    const user = await auth.use('api').authenticate()

    await auth.use('api').logout()

    return response.json({
      message: 'You have been logged out successfully'
    })

  }

  /**
   * update user account
   */
  async update({ request, response, auth }) {

    const user = await auth.use('api').authenticate()

    let data = request.all();

    // Merge the new values
    user.merge(data);

    // Save to database
    await user.save();


    return response.json(user);

  }

  /**
 * Register device
 */
  async registerDevice({ request, response, auth }) {

    let device = request.all();
    const user = await auth.use('api').authenticate()

    device.customer_id = user.id;
    device.deviceName = emojiStrip(device.deviceName);

    //check if device exists
    let deviceData = await Device.findBy('uuid', device.uuid);

    if (deviceData) {
      deviceData.fcmToken = device.fcmToken

      //save device
      await deviceData.save();

    }

    else {
      //create or update device
      deviceData = await Device.create(device)

    }

    return response.json(deviceData);

  }

  /**
   * Return my information
   */
  async me({ auth, response }) {
    const user = await auth.use('api').authenticate()

    let customerData = await User.query()
      .where('id', user.id)
      .first();

    return response.json(customerData)
  }


}
