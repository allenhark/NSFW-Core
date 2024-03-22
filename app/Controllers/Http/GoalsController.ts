import { rword } from 'rword';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// Import the seedrandom package
import seedrandom from 'seedrandom';
import _ from 'lodash'

export default class GoalsController {

  public grid: number[][];
  public rewards: number[];
  private rng: any;

  constructor() {
    // Initialize the RNG with a seed
    let words = rword.generate(50);
    let str = _.join(words, ''); // Ensure words are joined without spaces
    let seed = `${Date.now()}_${Math.random() * 0x100000000}_${str}`;

    this.rng = seedrandom(seed);
    this.grid = Array(4).fill(null).map(() => Array(7).fill(0));
    this.rewards = [1.29, 1.72, 2.29, 3.06, 4.08, 5.45, 7.62];

    this.placeMines();
  }

  private placeMines() {
    // Place 1 or 2 mines randomly in each column
    for (let colIndex = 0; colIndex < 7; colIndex++) {
      const mineCount = Math.floor(this.rng() * 2) + 1; // 1 or 2 mines
      let placedMines = 0;

      while (placedMines < mineCount) {
        const rowIndex = Math.floor(this.rng() * 4); // Select a random row within the column

        // Check if the selected position already has a mine (-1)
        if (this.grid[rowIndex][colIndex] !== -1) {
          this.grid[rowIndex][colIndex] = -1; // Place a mine
          placedMines++;
        }
      }
    }
  }


  public show({ request, response }: HttpContextContract) {
    const { row, column } = request.only(['row', 'column']);
    // Validate input
    if (row < 0 || row > 3 || column < 0 || column > 6) {  // Adjust validation for 4x7 grid
      return response.status(400).send({ error: 'Invalid row or column number' });
    }
    // Check for mine
    if (this.grid[row][column] === -1) {
      return response.send({ message: 'Boom! You hit a mine.', game_over: true });
    }
    // No mine, player can proceed
    const reward = this.rewards[column]; // Assuming you want to tie rewards to columns now

    // This logic might need to be adjusted based on how you want rewards to behave
    return response.send({
      message: 'Safe! No mine here.',
      reward: reward,
      game_over: false
    });
  }
}
