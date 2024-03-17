import OddsHistory from 'App/Models/OddsHistory'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'

export default class Cleanup extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everyTwoMinutes()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmp/adonis5-scheduler/locks/your-class-name`
   */
  public static get useLock() {
    return true
  }

  public async handle() {
    console.log('Handle Cleanup')
    // Remove this promise and insert your code:
    await OddsHistory.query().where('active', false).delete()
  }
}
