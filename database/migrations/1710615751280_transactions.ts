import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('till_deposit_id').unsigned().references('id').inTable('till_deposits').onDelete('CASCADE').nullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').nullable()
      table.string('code')
      table.enu('type', ['deposit', 'withdraw'])
      table.float('user_amount')
      table.float('amount')
      table.string('date')
      table.string('time')
      table.string('till_name')
      table.boolean('system_accepted').defaultTo(false)
      table.boolean('processed').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
