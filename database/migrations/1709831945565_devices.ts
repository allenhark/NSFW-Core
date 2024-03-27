import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'devices'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('brand').nullable()
      table.string('fcm_token').nullable()
      table.string('design_name').nullable()
      table.string('model_name').nullable()
      table.string('os_name').nullable()
      table.string('os_version').nullable()
      table.string('device_name').nullable()
      table.string('manufacturer').nullable()
      table.string('uuid').notNullable().unique()
      table.string('referrer').nullable()
      table.string('install_time').nullable()
      table.string('build_version').nullable()
      table.string('run_time_version').nullable()
      table.string('language').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
