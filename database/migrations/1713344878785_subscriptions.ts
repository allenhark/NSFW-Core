import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('author_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('payment_id').unsigned().references('id').inTable('payments').onDelete('CASCADE')
      table.float('amount')
      table.boolean('active').defaultTo(false)
      table.boolean('auto_renew').defaultTo(false)
      table.timestamp('expires_at', { useTz: true })
      table.timestamp('trial_ends_at', { useTz: true })
      table.boolean('credited').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
