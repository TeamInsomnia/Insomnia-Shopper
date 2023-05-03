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
      name: "Table",
      description: "Wooden round table with four supportive legs",
      price: 500,
      material: "Wood",
      color: "Brown",
      imageUrl:
        "https://secure.img1-cg.wfcdn.com/im/32274058/compr-r85/1530/153082342/geary-round-dining-table.jpg",
    }),
    Product.create({
      name: "Sofa",
      description:
        "Modern sofa with ample seating for guests - comfortable, and stylish",
      price: 300,
      material: "Linen",
      color: "Hazelnut",
      imageUrl:
        "https://richmedia.ca-richimage.com/ImageDelivery/imageService?profileId=12026540&id=1743605&recipeId=729",
    }),
    Product.create({
      name: "Chair",
      description:
        "This armless chair is great for single person use and lounging",
      price: 200,
      material: "Linen",
      color: "Light Cobalt Blue",
      imageUrl:
        "https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&itemId=1570087-847&recipeName=680",
    }),
    Product.create({
      name: "Nightstand",
      description:
        "Elegant nightstand, perfect for any bedroom. This nightstand features high-quality wood and a sleek surface",
      price: 100,
      material: "Oak",
      color: "Indigo",
      imageUrl:
        "https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202232/0102/hudson-26-nightstand-1-z.jpg",
    }),
    Product.create({
      name: "Work Desk",
      description:
        "47 inch work desk with sleek wooden finish. Contained elevated wood surface for additional storage.",
      price: 700,
      material: "Wood",
      color: "Brown",
      imageUrl:
        "https://thegadgetflow.com/wp-content/uploads/2019/02/work-desk-2019-feb07-featured-dd.jpeg",
    }),
  ]);
  Product.create({
    name: "Bed Frame",
    description:
      "Platform queen sized bed frame, ample storage space under the bed",
    price: 3,
    material: "Linen",
    color: "Green",
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
