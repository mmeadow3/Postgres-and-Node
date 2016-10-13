'use strict'

module.exports.up = (knex, Promise) =>
  knex.schema.createTable('Users', table => {
    table.increments()
    table.string('email').unique()
    table.string('password')
  })

module.exports.down = (knex, Promise) =>
  knex.schema.dropTable('Users')