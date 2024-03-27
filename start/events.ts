// import Ws from '@ioc:Ruby184/Socket.IO/Ws'
// import Event from '@ioc:Adonis/Core/Event'
// const abl = 'HhEcRg.a8e8uA:fG8w3szlebXHLwog_UpDHOG3YfCsRQL4aYerhjqrfqw';
// const Ably = require('ably/promises');

// const ably = new Ably.Realtime.Promise(abl)

// ably.connection.once("connected", () => {
//   console.log("Connected to Ably!")
// })

// const channel = ably.channels.get("numbers")

// Event.on('number', async (num: any) => {
//   console.log(num)
//   //  Ws.io.emit('number', num)
//   await channel.publish("number", num.toString())
// })

// Event.on('end', async (num: any) => {
//   console.log('Ended', num)
//   //  Ws.io.emit('end', num)
//   await channel.publish("end", num.toString())
// })

// Event.on('start', async () => {
//   console.log('Starting')
//   //  Ws.io.emit('start', true)
//   await channel.publish("start", { state: true })
// })

// Event.on('players', async (num: number) => {
//   //  Ws.io.emit('players', num)
//   await channel.publish("players", num.toString())
// })

// Event.on('uuid', async (data: any) => {
//   //  Ws.io.emit('uuid', data)
//   await channel.publish("uuid", { uuid: data })
// })

// Event.on('wait', async (data: any) => {
//   //  Ws.io.emit('wait', data)
//   await channel.publish("wait", { state: data })
// })
