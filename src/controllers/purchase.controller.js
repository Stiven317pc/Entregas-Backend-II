import TicketRepository from '../repositories/ticket.repository.js';
import TicketDTO from '../dtos/TicketDTO.js';
import { sendPurchaseMessage } from '../services/twilio.service.js';
import { sendTicketEmail } from '../services/mail.service.js';

export const purchaseCart = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.cartId) {
      return res.status(400).render('notFound', { message: 'Usuario o carrito no válido.' });
    }

    const ticket = await TicketRepository.createFromCart(user.cartId, user);
    const ticketDTO = new TicketDTO(ticket);

    await sendPurchaseMessage(ticketDTO.phone, ticketDTO);
    await sendTicketEmail(ticketDTO);

    res.render('successPurchase', { ticket: ticketDTO });
  } catch (error) {
    console.error('Error en la compra:', error);
    res.status(500).render('notFound', { message: 'No se pudo completar la compra.' });
  }
};
