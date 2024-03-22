import { rword } from 'rword';
import _ from 'lodash'
import Event from '@ioc:Adonis/Core/Event'
import OddsHistory from 'App/Models/OddsHistory';
import { string } from '@ioc:Adonis/Core/Helpers'
import Bet from 'App/Models/Bet';

const seedrandom = require('seedrandom');

export default class Generator {

  endlessLoop() {
    console.log("Running Server");
    this.getVars()

  }

  generateWeightedRandomNumber3(seed) {
    // Initialize the seeded random generator with user-provided seed
    const rng = seedrandom(seed);
    const randomPercent = rng() * 100;  // Convert the result to a percentile

    // Directly use the updated probabilities to determine the range
    if (randomPercent <= 80) {
      // 1-2 range with 70% chance
      return 1 + rng();
    } else if (randomPercent <= 90) {
      // 3-10 range with 20% chance
      return 3 + rng() * 7;
    } else if (randomPercent <= 99.9) {
      // 10-20 range with 9% chance
      return 10 + rng() * 10;
    } else {
      // 20-5000 range with 1% chance
      return 20 + rng() * 4980;
    }
  }



  async getVars() {

    let iteration = 1; // Starting iteration
    let players = this.generateRandomNumber(11, 1321);

    Event.emit('players', players);
    let uuid = string.generateRandom(32);

    while (true) {

      Event.emit('start', true)
      console.log('Starting')

      let words = rword.generate(50);
      let str = _.join(words);
      let seed = `${Date.now()}_${(Math.random() * 0x100000000)}_${str}`;

      const finalNumber = Number((this.generateWeightedRandomNumber3(seed)).toFixed(2));

      console.log(`Final Number to animate: ${finalNumber}`);

      await this.simulateNumberAnimation(finalNumber);

      Event.emit('end', Number(finalNumber.toFixed(2)));

      Event.emit('uuid', false)


      //close all open bets to lost
      await this.closeOpen()

      //save number to database
      let game = await OddsHistory.create({
        odd: Number(finalNumber.toFixed(2)),
        uuid: uuid,
        active: true
      })

      //emit uuid
      Event.emit('uuid', uuid)

      //generate new uuid
      uuid = string.generateRandom(32)

      iteration++; // Increment for next iteration

      // Wait for 10 seconds before the next iteration
      await new Promise(resolve => setTimeout(resolve, 7000));

      Event.emit('wait', true)

      await new Promise(resolve => setTimeout(resolve, 10000));

      Event.emit('wait', false)
      game.started = true
      await game.save()

    }
  }

  generateRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    while (randomNumber < min) {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (randomNumber % 2 === 0) {
      // If even, add 1 to make it odd
      randomNumber += 1;
    }

    return randomNumber;
  }


  // Improved function to ensure animation lasts for at least 2 seconds
  async simulateNumberAnimation(finalNumber) {
    let currentNumber = 1; // Start with 1
    let delayTime = 500; // Initial delay time of 1 second
    let increment = 0.03; // Start with increment of 2
    let loop = 1;

    while (currentNumber <= finalNumber) {
      currentNumber = Number(currentNumber.toFixed(2))
      // console.log(`Animating number: ${currentNumber}`);
      Event.emit('number', currentNumber);

      if (loop >= 17) {
        delayTime = 150; // Change delay time to 500ms after the first 17 increments
        increment = 0.09
      }

      loop++;

      await new Promise(resolve => setTimeout(resolve, delayTime)); // Wait for the specified delay time

      currentNumber += increment;

    }

  }


  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  /**
   * Close open bets
   */
  async closeOpen() {

    //get all open bets
    let bets = await Bet.query()
      .where('open', true)
      .update({
        open: false,
        won: false
      })

    //close session
    await OddsHistory.query()
      .where('active', true)
      .update({ active: false })

  }


}
