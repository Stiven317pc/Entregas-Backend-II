import { transporter } from '../config/mailerConfig.js';

export const sendTicketEmail = async (ticketDTO) => {
  const html = `
    <h2>🎟️ Ticket: ${ticketDTO.code}</h2>
    <p><strong>Fecha:</strong> ${ticketDTO.purchase_datetime}</p>
    <p><strong>Total:</strong> $${ticketDTO.amount}</p>
    <h3>🛍️ Productos</h3>
    ${ticketDTO.products.map(p => `
      <div>
        <p><strong>${p.title}</strong></p>
        <p>Precio: $${p.price}</p>
        <p>Cantidad: ${p.quantity}</p>
      </div>
    `).join('')}
  `;

  await transporter.sendMail({
    from: '"Ecommerce App" <no-reply@ecommerce.com>',
    to: ticketDTO.email,
    subject: 'Resumen de tu compra',
    html
  });
};
