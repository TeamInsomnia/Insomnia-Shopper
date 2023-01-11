"use strict";

const {
  db,
  models: { User, Product},
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users ( *** MIMIC THIS FOR "CREATING PRODUCTS"! )
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  // name, desc, price, material, color
  const products = await Promise.all([
    Product.create({
      name: "TABLE",
      description: "Elevated flat surface",
      price: 55672,
      material: "stainless steel",
      color: "red",
    }),
    Product.create({
      name: "SOFA",
      description: "Long armchair",
      price: 314,
      material: "luxurious fluff",
      color: "hazelnut",
    }),
    Product.create({
      name: "CHAIR",
      description: "non-standing person rest",
      price: 8675309,
      material: "bamboo",
      color: "vermillion",
    }),
    Product.create({
      name: "NIGHTSTAND",
      description: "drawers + flat surface",
      price: 8008,
      material: "oak",
      color: "indigo",
    }),
    Product.create({
      name: "WORK DESK",
      description: "Table + drawers",
      price: 272,
      material: "adamantium",
      color: "cerulean",
    }),
  ]);

  console.log(`seeded ${users.length} users and ${products.length} products.`);
  console.log(`Seeded successfully!*!`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
