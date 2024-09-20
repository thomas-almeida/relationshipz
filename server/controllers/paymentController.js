import stripePackage from 'stripe'
import dotenv from 'dotenv'

dotenv.config()
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY)

async function createPaymentLink(req, res) {

    const { productId } = req.body

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: productId?.priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: 'http://localhost:5173/sign-up?paid=true',
            cancel_url: 'http://localhost:5173/',
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