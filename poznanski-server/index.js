const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Function to start the db
const startServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}>@poznanski.wtv42cv.mongodb.net/?retryWrites=true&w=majority&appName=poznanski`
    );
    console.log("Mongodb connected successfully!");

    // Import routes
    const menuRoutes = require("./api/routes/menuRoutes");
    const cartsRoutes = require("./api/routes/cartRoutes");
    const usersRoutes = require("./api/routes/userRoutes");
    const paymentRoutes = require("./api/routes/paymentRoutes");
    const adminStats = require('./api/routes/adminStats');
    const orderStats = require('./api/routes/orderStats');

    // JWT related API
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    // Routes
    app.use("/menu", menuRoutes);
    app.use("/carts", cartsRoutes);
    app.use("/Users", usersRoutes);
    app.use("/payments", paymentRoutes);
    app.use("/admin-stats", adminStats);
    app.use("/order-stats", orderStats);

    // Payment methods routes
    const verifyToken = require('./api/middlewares/verifyToken');

    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);

      // Create a PaymentIntent 
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.get("/", (req, res) => {
      res.send("Poznanski Server is Running!");
    });

    // Start listening on the defined port
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

  } catch (error) {
    console.error("Error connecting to MongoDB: " + error);
    setTimeout(startServer, 5000); // Retry connection after 5 seconds
  }
};

// Start the server
startServer();
