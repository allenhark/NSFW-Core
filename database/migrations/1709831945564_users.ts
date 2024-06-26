import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uuid').nullable().unique()
      table.string('phone', 13).nullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.float('balance').defaultTo(0)
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('username').nullable()
      table.string('email').nullable()
      table.json('avatar')
      table.json('background')
      table.string('wallet').nullable()
      table.string('referral_code').nullable()
      table.integer('referral_id').nullable()
      table.string('country').nullable()
      table.string('region').nullable()
      table.string('city').nullable()
      table.string('country_code').nullable()

      table.string('language').nullable()
      table.string('wallet_address').nullable()
      table.enum('wallet_network', ['trc20', 'erc20', 'bep20']).defaultTo('trc20')
      table.float('wallet_balance').defaultTo(0)
      table.boolean('active').defaultTo(true)
      table.boolean('verified').defaultTo(false)
      table.boolean('is_creator').defaultTo(false)
      table.integer('followers').defaultTo(0)
      table.integer('following').defaultTo(0)
      table.integer('subscribers').defaultTo(0)
      table.float('fee').defaultTo(0)
      table.float('total_earnings').defaultTo(0)
      table.float('unpaid_earnings').defaultTo(0)
      table.float('total_spent').defaultTo(0)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
