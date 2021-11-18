const db = require('../config/connection');
const { User, Wishlist, Gift } = require('../models');
const userSeeds = require('./userSeeds.json');

//TODO, create seeds for gifts, Wishlists, and Users and write seeders for them

db.once('open', async () => {
  try {
    await Wishlist.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id,  } = await wishlist.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
