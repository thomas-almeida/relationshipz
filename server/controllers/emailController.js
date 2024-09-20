import nodemailer from 'nodemailer'
import QRCode from 'qrcode'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contato.thomasalmeidard@gmail.com',
    pass: 'spxl oyfm gplx hpsk',
  },
})

async function sendEmail(req, res) {
  try {
    const { email, link } = req.body

    // Gera o QR Code a partir do link
    const qrCode = await QRCode.toDataURL(link)
    const qrCodeFilename = 'meu-site-qrcode.png'

    // Conteúdo do e-mail
    const mailOptions = {
      from: 'contato.thomasalmeidard@gmail.com',
      to: email,
      subject: 'Seu QR Code Chegou 💕',
      html: `
      <h1>Aqui está o seu QR Code</h1>
      <h3>
        Olá, sou Thomas, o criador do Goals e este email aqui é pra te enviar seu QR Code com o seu site personalizado, escaneie o código abaixo para acessar o link e compartilhe este QR Code para surpreender seu amor
      </h3>
      `,
      attachments: [{
        filename: qrCodeFilename,
        path: qrCode,
        cid: 'qrcode'
      }]
    }

    // Envia o e-mail
    const info = await transporter.sendMail(mailOptions)

    console.log(`Email enviado com sucesso para ✉${email}`)
    res.status(200).json({ message: 'E-mail enviado com sucesso!', info })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar o e-mail', details: error.message })
  }
}

export default {
  sendEmail,
}
