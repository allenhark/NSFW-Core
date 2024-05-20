import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.specificType('location', 'POINT').nullable()
      table.integer('altitude').nullable()
      //table.specificType('location', 'GEOMETRY').nullable().index('idx_location');
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.index('location', 'SPATIAL')
      // table.index('locations', 'SPATIAL')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
