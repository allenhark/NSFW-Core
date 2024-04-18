import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'countries'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('flag').nullable()
      table.string('currency').nullable()
      table.string('currency_symbol').nullable()
      table.json('translations').nullable()
      table.string('iso2').nullable()
      table.string('iso3').nullable()

    })
  }


}
