// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Device from "App/Models/Device";
import User from "App/Models/User";
import UserTransformer from "App/Transformers/UserTransformer";
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'

const emojiStrip = require('emoji-strip')

export default class AuthController {

  /**
   * Login the customer
   * @param param0
   * @returns
   */
  async login({ request, response, auth, transform }) {

    let data = request.all();

    let customerData;

    let email = data.email;

    email = email.toLowerCase();

    try {

      //format phone number
      customerData = await User.findByOrFail('email', email)

      //generate auth session
      const token = await auth.use('api').attempt(email, data.password)

      let trnsfm = await transform.item(customerData, UserTransformer)

      //store the to customer store
      return response.json({
        status: true,
        customer: trnsfm,
        balance: customerData.balance,
        token: token,
        message: "Welcome back"
      });

    }

    catch (e) {
      return response.status(400).json({ status: false, message: "Invalid email or password" });
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
  async update({ request, response, auth, transform }) {

    const user = await auth.use('api').authenticate()

    let data = request.all();

    delete data?.name

    console.log(data)

    // Merge the new values
    user.merge(data);

    // Save to database
    await user.save();

    //query
    let us = await User.find(user.id)

    let transformed = await transform.item(us, UserTransformer)

    console.log(transformed)

    return response.json(transformed);

  }

  /**
 * Register device
 */
  async registerDevice({ request, response }) {

    let device = request.all();

    console.log(device)

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

    return response.json({ message: "Device registered successfully" });

  }

  /**
   * Return my information
   */
  async me({ auth, response, transform }) {
    const user = await auth.use('api').authenticate()

    let customerData = await User.query()
      .where('id', user.id)
      .first();

    customerData = await transform.item(customerData, UserTransformer)

    return response.json(customerData)
  }

  /**
   * Register
   */
  async register({ request, response, transform }) {

    let data = request.all();

    data.email = data.email.toLowerCase();

    //check if email exists
    let customerData = await User.findBy('email', data.email);

    if (customerData)
      return response.status(400).json({ message: "Email already exists" });

    //split name
    let name = data.name.split(' ');

    //create customer account
    customerData = await User.create({
      email: data.email,
      password: data.password,
      firstName: name[0],
      lastName: name[1]
    })


    return response.json({ message: "Account created successfully" });

  }

  /**
 * Set username
 */
  async setUsername({ request, response, auth, transform }) {

    let user = await auth.use('api').authenticate()

    let { username } = request.all();

    //check if username exists where id is not user id
    let customerData = await User.query()
      .where('username', username)
      .whereNot('id', user.id)
      .first();

    if (customerData) {
      //suggest username
      let suggested = username + Math.floor(Math.random() * 1000);

      return response.json({
        status: false,
        message: "Username already exists. Try " + suggested
      });


    }

    // Merge the new values
    user.merge({ username: username });

    // Save to database
    await user.save();

    let transformed = await transform.item(user, UserTransformer)

    //customer data
    return response.json({
      status: true,
      message: "Username updated successfully",
      user: transformed
    });

  }

  /**
   * Search and suggest username
   */
  async searchUsername({ request, response, auth }) {

    let user = await auth.use('api').authenticate()

    let { username } = request.all();

    //check if username exists where id is not user id
    let customerData = await User.query()
      .where('username', username)
      .whereNot('id', user.id)
      .first();

    if (customerData) {
      //suggest username
      let suggested = username + Math.floor(Math.random() * 1000);

      return response.json({
        status: false,
        message: "Username already exists. Try " + suggested
      });

    }

    return response.json({
      status: true,
      message: "Username available"
    });

  }

  /**
   * Update background image
   */
  async updateBackground({ request, response, auth, transform }) {

    const user = await auth.use('api').authenticate()

    let file = request.file('image')!

    //console.log(request.all(), file)

    if (!file) {
      return response.status(400).json({
        message: 'No file found'
      })
    }


    //save to user
    user.background = await Attachment.fromFile(file)

    await user.save()

    let transformed = await transform.item(user, UserTransformer)

    return response.json(transformed)
  }

  /**
   * Update avator
   */
  async updateAvator({ request, response, auth, transform }) {

    const user = await auth.use('api').authenticate()

    let file = request.file('image')!

    //console.log(request.all(), file)

    if (!file) {
      return response.status(400).json({
        message: 'No file found'
      })
    }


    //save to user
    user.avatar = await Attachment.fromFile(file)

    await user.save()

    let transformed = await transform.item(user, UserTransformer)

    return response.json(transformed)
  }


}
