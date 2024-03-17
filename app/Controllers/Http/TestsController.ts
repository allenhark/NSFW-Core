// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chooser from "random-seed-weighted-chooser";
import prand from 'pure-rand';
import { rword } from 'rword';
import _ from 'lodash'
import Ws from 'App/Services/Ws'
import Event from '@ioc:Adonis/Core/Event'


const seedrandom = require('seedrandom');

export default class TestsController {

  async index({ request, response }) {

    let seed;

    let nums = [] as any;

    //loop 100 times



    let words = rword.generate(50);

    let str = _.join(words);

    seed = `${Date.now()}_${(Math.random() * 0x100000000)}_${str}`

    // let number = this.generateWeightedRandomNumber(seed)
    let number2 = this.generateWeightedRandomNumber3(seed)

    number2 = Number(number2.toFixed(2))

    Event.emit('number', number2)

    return response.json(number2);

  }

  generateWeightedRandomNumber3(seed) {
    // Initialize the seeded random generator with user-provided seed
    const rng = seedrandom(seed);
    const randomPercent = rng() * 100;  // Convert the result to a percentile

    // Directly use the updated probabilities to determine the range
    if (randomPercent <= 70) {
      // 1-2 range with 70% chance
      return 1 + rng();
    } else if (randomPercent <= 90) {
      // 3-10 range with 20% chance
      return 3 + rng() * 7;
    } else if (randomPercent <= 99) {
      // 10-20 range with 9% chance
      return 10 + rng() * 10;
    } else {
      // 20-5000 range with 1% chance
      return 20 + rng() * 4980;
    }
  }

  generateWeightedRandomNumber(seed, favoredMax = 2.4, totalMax = 5000, favoredProbability = 0.985) {

    const extraPrecisionProbability = 0.95; // Within favored, probability for extra precision like 1.03

    const rng = seedrandom(seed);

    // Determine overall range
    if (rng() < favoredProbability) {
      // Further refine precision within favored max range
      if (rng() < extraPrecisionProbability) {
        // Generate a high-precision float within the favored range
        return 1 + (rng() * (favoredMax - 1));
      } else {
        // Generate a low-precision float or integer within the favored range
        return Math.ceil(rng() * favoredMax);
      }
    } else {
      // Generate an integer in the unfavored range (4 to totalMax)
      const unfavoredRangeMin = favoredMax + 1;
      const unfavoredRangeSize = totalMax - favoredMax;
      return Math.floor(rng() * unfavoredRangeSize) + unfavoredRangeMin;
    }

  }

  generateDynamicRange(seed, randomPercent) {

    const base = seedrandom(seed)() * 100; // Generates a base modifier using the seed
    const adjustedProbability = (val) => val + (base * 0.01); // Adjust probabilities slightly

    return [
      { limit: adjustedProbability(93), min: 1, max: 2 }, // 90%
      { limit: adjustedProbability(97), min: 3, max: 10 }, // Next 7%
      { limit: adjustedProbability(99.9), min: 10, max: 20 }, // Next 2.9%
      { limit: 100, min: 20, max: 5000 } // Remaining 0.1%
    ].find(range => randomPercent <= range.limit);
  }

  generateWeightedRandomNumber2(seed) {
    // Initialize the seeded random generator
    const rng = seedrandom(seed);
    const randomPercent = rng() * 100;  // Convert random result to a percentile for easier range checking

    // Dynamically determine the range based on the current random percent and adjustments
    const selectedRange = this.generateDynamicRange(seed + 'mod', randomPercent) as any;

    // Use another layer of rng for the final number generation to increase unpredictability
    const finalRng = seedrandom(seed + randomPercent.toString());

    return selectedRange.min + finalRng() * (selectedRange.max - selectedRange.min);

  }

}
