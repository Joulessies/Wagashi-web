// This is your test secret API key.
/*const stripe = require('stripe')('sk_test_51RrDUTHRSrsys7NMccC4dtxOeuUvyIQvS3tABEIePDnummfHwhQ7m40Aa7h6eQyzsmpDFcji2OC6CbUGCPk5ehmK00ZYXXwStp');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'https://buy.stripe.com/test_eVq6oHdJv4TkfgieX3bjW00';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));
*/
