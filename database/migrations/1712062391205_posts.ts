import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uuid').nullable().unique()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('type', ['text', 'image', 'video']).nullable()
      table.enu('status', ['draft', 'published', 'archived']).defaultTo('draft')
      table.enu('visibility', ['free', 'premium']).defaultTo('free')
      table.text('content').nullable()
      table.json('video').nullable()
      table.string('country').nullable()
      table.string('city').nullable()
      table.string('country_code').nullable()
      table.integer('likes_count').defaultTo(0)
      table.integer('comments_count').defaultTo(0)
      table.integer('shares_count').defaultTo(0)
      table.integer('views_count').defaultTo(0)
      table.integer('saved_count').defaultTo(0)
      table.boolean('allow_comments').defaultTo(true)
      table.boolean('allow_shares').defaultTo(true)
      table.boolean('flagged').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
