"use strict";

const {
  db,
  models: { User, Product, Order },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      email: "notafakeemail@fakeemail.com",
      isAdmin: true,
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "fakeemail@email.mail",
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "TABLE",
      description: "Elevated flat surface",
      price: 500,
      material: "stainless steel",
      color: "red",
      imageUrl:
        "https://secure.img1-cg.wfcdn.com/im/32274058/compr-r85/1530/153082342/geary-round-dining-table.jpg",
    }),
    Product.create({
      name: "SOFA",
      description: "Long armchair",
      price: 300,
      material: "luxurious fluff",
      color: "hazelnut",
      imageUrl:
        "https://richmedia.ca-richimage.com/ImageDelivery/imageService?profileId=12026540&id=1743605&recipeId=729",
    }),
    Product.create({
      name: "CHAIR",
      description: "non-standing person rest",
      price: 200,
      material: "bamboo",
      color: "vermillion",
      imageUrl:
        "https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&itemId=1570087-847&recipeName=680",
    }),
    Product.create({
      name: "NIGHTSTAND",
      description: "drawers + flat surface",
      price: 100,
      material: "oak",
      color: "indigo",
      imageUrl:
        "https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202232/0102/hudson-26-nightstand-1-z.jpg",
    }),
    Product.create({
      name: "WORK DESK",
      description: "Table + drawers",
      price: 700,
      material: "adamantium",
      color: "cerulean",
      imageUrl:
        "https://thegadgetflow.com/wp-content/uploads/2019/02/work-desk-2019-feb07-featured-dd.jpeg",
    }),
  ]);
  Product.create({
    name: "BED",
    description: "Sleepy Surface",
    price: 3,
    material: "goose feathers",
    color: "white",
    imageUrl:
      "https://www.ikea.com/us/en/images/products/tufjord-upholstered-bed-frame-djuparp-dark-green__1101321_pe866585_s5.jpg",
  }),
    await Promise.all([
      Order.create({
        userId: 1,
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

if (module === require.main) {
  runSeed();
}

module.exports = seed;
