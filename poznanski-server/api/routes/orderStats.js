const express = require('express');
const router = express.Router();
// Import your models
const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payments'); 

// middleware
router.get('/', async (req, res) => {
  try {
    // Count of users, menu items, and orders
    const users = await User.countDocuments();
    const menuItems = await Menu.countDocuments();
    const orders = await Payment.countDocuments();

    // Total revenue calculation
    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: '$price'
          }
        }
      }
    ]);

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;

    // Calculate statistics by category
    const categoryStats = await Payment.aggregate([
      {
        $unwind: '$menuItems'
      },
      {
        $lookup: {
          from: 'menus', 
          localField: 'menuItems',
          foreignField: '_id',
          as: 'menuItemDetails'
        }
      },
      {
        $unwind: '$menuItemDetails'
      },
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

    res.json({
      users,
      menuItems,
      orders,
      revenue,
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
