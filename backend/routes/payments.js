const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');

router.post('/create-payment-intent', auth, async (req, res) => {
    const { amount } = req.body; // amount in cents
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card'],
        description: 'E-commerce Payment',
      });
  
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;
