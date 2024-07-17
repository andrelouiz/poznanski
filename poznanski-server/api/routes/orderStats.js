const express = require('express');
const router = express.Router();
// Import your middleware
const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payments'); // Corrected import statement

// middleware
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/', async (req, res) => {
  try {
    const result = await Payment.aggregate([
      { $unwind: '$menuItems' }, // Unwind the menuItems array
      {
        $lookup: {
          from: 'menus', // Assuming 'menus' is the collection name for Menu documents
          localField: 'menuItems',
          foreignField: '_id',
          as: 'menuItemDetails'
        }
      },
      { $unwind: '$menuItemDetails' }, // Unwind the menuItemDetails array
      {
        $group: {
          _id: '$menuItemDetails.category', // Group by category from Menu documents
          quantity: { $sum: '$quantity' }, // Sum of quantity from Payments documents
          revenue: { $sum: '$price' } // Sum of price from Payments documents
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id', // Rename _id to category
          quantity: '$quantity',
          revenue: '$revenue'
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;