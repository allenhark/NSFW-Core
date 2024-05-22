import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.specificType('location', 'POINT').nullable()
      table.integer('altitude').nullable()
      table.boolean('visible').defaultTo(false)
      table.boolean('is_online').defaultTo(false)
      table.text('bio').nullable()
      table.string('road').nullable()
      table.string('state').nullable()
      table.string('agora').nullable()
      table.index('location', 'SPATIAL')
    })
  }

}
