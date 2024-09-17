import stripePackage from 'stripe'
import dotenv from 'dotenv'

dotenv.config()
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY)

async function createPaymentLink(req, res) {

    const { productId, customerData } = req.body

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: productId?.priceId, // O ID do produto cadastrado no Stripe
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: 'https://seusite.com/sucesso', // Substitua pelas URLs apropriadas
            cancel_url: 'https://seusite.com/cancelar',
            customer_email: customerData?.email,
        })

        res.json({
            url: session.url
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao criar sessão de checkout' });
    }

}

export default {
    createPaymentLink
}