import stripePackage from 'stripe';
import dotenv from 'dotenv';
//import userController from './userController'; // Controller onde está o método signUp

dotenv.config();
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  //const bufferReq = Buffer.from(req.body)

  try {
    // Verifica a assinatura do webhook usando o corpo da requisição como buffer
    const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        'whsec_83dc9205f3736548f57f6fea26d993918e290c531a3888b211b22d2c841852cd'
     );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Coletar os dados da sessão
      const customerEmail = session.customer_details.email;

      res.status(200).json({ received: true });
    } else {
      res.status(400).end('Evento não suportado');
    }
  } catch (error) {
    console.error('Erro no webhook', error.message);
    res.status(400).send(`Webhook error: ${error.message}`);
  }
}

export default {
  handleStripeWebhook
};
