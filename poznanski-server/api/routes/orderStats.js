const express = require('express');
const router = express.Router();
const Payment = require('../models/Payments');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/', async (req, res) => {
  try {
    const result = await Payment.aggregate([
      { $unwind: '$menuItems' },
      {
        $lookup: {
          from: 'menus',
          localField: 'menuItems',
          foreignField: '_id',
          as: 'menuItemDetails'
        }
      },
      { $unwind: '$menuItemDetails' },
      {
        $group: {
          _id: '$menuItemDetails.category',
          quantity: { $sum: '$quantity' },
          revenue: { $sum: '$price' }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
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
    console.error('Error fetching order stats:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

// In your main server file
const orderStats = require('./api/routes/orderStats');
app.use('/order-stats', orderStats);
