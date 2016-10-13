'use strict'

module.exports.up = (knex, Promise) =>
    knex.schema.table('Users', table => table.string('Name'))

module.exports.down = (knex, Promise) =>
    knex.schema.table('Users', table => table.dropColumn('Name'))