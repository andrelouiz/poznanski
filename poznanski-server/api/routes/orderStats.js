const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment'); // Corrected import statement (singular 'Payment')

// Middleware
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, async (req, res) => {
  try {
    // Aggregate pipeline to fetch payment statistics
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
          revenue: { $sum: { $multiply: ['$quantity', '$price'] } } // Calculate revenue as sum of (quantity * price)
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

    // Validate result
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No payment statistics found' });
    }

    // Return the aggregated result
    res.json(result);
  } catch (error) {
    console.error('Error fetching payment statistics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
