export default class TicketDTO {
  constructor(ticket) {
    this.code = ticket.code;
    this.purchase_datetime = ticket.purchase_datetime;
    this.amount = ticket.amount;

    this.purchaser = {
      name: ticket.purchaser?.name || 'Sin nombre',
      email: ticket.purchaser?.email || 'Sin email',
      phone: ticket.purchaser?.phone || 'Sin teléfono',
    };

    this.products = ticket.products.map(p => ({
      title: p.product?.title || 'Producto desconocido',
      price: p.product?.price || 0,
      category: p.product?.category || 'Sin categoría',
      quantity: p.quantity,
    }));
  }
}
