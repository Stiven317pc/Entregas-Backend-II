import { twilioClient } from '../config/twilioConfig.js';

export const sendPurchaseMessage = async (userPhone, ticketDTO) => {
  if (!userPhone || !ticketDTO) {
    throw new Error('Datos insuficientes para enviar el mensaje de compra.');
  }

  const message = `
🛒 *Compra realizada con éxito*
*Ticket:* ${ticketDTO.code}
*Monto:* $${ticketDTO.amount}
*Fecha:* ${new Date(ticketDTO.purchase_datetime).toLocaleString()}
Gracias por tu compra, *${ticketDTO.purchaser}*

🛍️ *Productos:*
${ticketDTO.products.map(p => `• ${p.title} x${p.quantity} ($${p.price})`).join('\n')}
`;

  await twilioClient.messages.create({
    from: process.env.TWILIO_PHONE,
    to: `whatsapp:${userPhone}`,
    body: message.trim()
  });
};
