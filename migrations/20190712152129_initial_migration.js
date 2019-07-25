exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id").primary();
      table
        .uuid("uuid")
        .unique()
        .notNullable()
        .index();
      table.timestamps(true, true);
    })
    .createTable("devices", table => {
      table.increments("id").primary();
      table
        .string("hash_id")
        .unique()
        .notNullable()
        .index();
      // table.string("mac_address").index();
      table.string("os_type").nullable();
      table.string("cpu_model").nullable();
      table.bigInteger("total_mem").nullable();
      table.integer("num_logical_cores").nullable();
      table.float("cpu_speed").nullable();
      table
        .uuid("user_uuid")
        .index()
        .notNullable()
        .references("uuid")
        .inTable("users");
      table.timestamps(true, true);
    })
    .createTable("metrics", table => {
      table.increments("id").primary();
      table.float("mem_usage").nullable();
      table.integer("up_time").nullable();
      table.float("cpu_load").nullable();
      table.float("cpu_temp").nullable();
      table.float("sent_bytes").nullable();
      table.float("received_bytes").nullable();
      table
        .string("device_hash")
        .index()
        .notNullable()
        .references("hash_id")
        .inTable("devices");
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {};
