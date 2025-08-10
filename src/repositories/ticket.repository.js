import TicketDAO from '../daos/ticket.dao.js';

const ticketDAO = new TicketDAO(); 

export default class TicketRepository {
  async createTicket(ticketData) {
    return await ticketDAO.create(ticketData);
  }

  async getTicketByCode(code) {
    return await ticketDAO.findByCode(code);
  }

  async getAllTickets() {
    return await ticketDAO.findAll();
  }
}
