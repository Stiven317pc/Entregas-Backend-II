import TicketModel from '../models/Ticket.js';

export default class TicketDAO {
  async create(ticketData) {
    return TicketModel.create(ticketData);
  }

  async findByCode(code) {
    return TicketModel.findOne({ code });
  }

  async findAll() {
    return TicketModel.find();
  }
}
