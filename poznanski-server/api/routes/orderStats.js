const express = require('express');
const router = express.Router();

// Import your models
const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payments'); 

router.get('/', async (req, res) => {
  try {
    // Step 1: Check the Payment data structure
    const paymentData = await Payment.find().limit(10); // Adjust the limit as needed
    console.log('Payment Data:', paymentData); // Log Payment data to check its structure
    
    // Step 2: Check the Menu data structure
    const menuData = await Menu.find().limit(10); // Adjust the limit as needed
    console.log('Menu Data:', menuData); // Log Menu data to check its structure

    // Step 3: Run the aggregation pipeline
    const result = await Payment.aggregate([
      {
        $unwind: '$menuItems' // Ensure menuItems is an array
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
        $unwind: '$menuItemDetails' // Ensure menuItemDetails is correctly populated
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

    console.log('Aggregation Result:', result); // Log the result to see what the aggregation returns

    res.json(result);
  } catch (error) {
    console.error('Error during aggregation:', error); // Log any errors that occur
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
