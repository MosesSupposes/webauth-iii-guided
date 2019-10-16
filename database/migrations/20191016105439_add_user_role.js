
exports.up = function(knex) {
  return knex.schema.table('users', tbl => {
      tbl.string('role', 64).defaultTo('regular user')
  })
};

exports.down = function(knex) {
  return knex.schema.table('users', tbl => {
      tbl.dropColumn('role')
  })
};
