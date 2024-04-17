import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('country_id').unsigned().references('id').inTable('countries').onDelete('CASCADE')
      table.string('reference').unique()
      table.float('amount')
      table.enu('status', ['pending', 'success', 'failed']).defaultTo('pending')
      table.string('currency')
      table.string('gateway')
      table.json('meta').nullable()
      table.json('response').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
