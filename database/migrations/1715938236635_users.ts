import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('first_run').defaultTo(true)
      table.string('sex').defaultTo('male')
      table.integer('age').nullable()
      table.string('orientation').nullable()
    })
  }


}
