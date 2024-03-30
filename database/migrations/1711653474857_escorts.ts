import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'escorts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('uuid').notNullable()
      table.string('name').nullable()
      table.string('gender').nullable()
      table.string('phone').nullable()
      table.string('telegram').nullable()
      table.string('whatsapp').nullable()
      table.string('age').nullable()
      table.string('country').nullable()
      table.string('country_code').nullable()
      table.string('city').nullable()
      table.string('region').nullable()
      table.text('bio').nullable()
      table.text('services').nullable()
      table.string('price').nullable()

      table.boolean('gay').defaultTo(false)
      table.boolean('lesbian').defaultTo(false)
      table.boolean('straight').defaultTo(true)

      table.boolean('show_profile').defaultTo(true)
      table.boolean('link_profile').defaultTo(true)

      table.boolean('is_active').defaultTo(false)
      table.dateTime('next_subscription_renew').nullable()
      table.integer('views').defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
