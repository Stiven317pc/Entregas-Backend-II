import ProductRepository from '../repositories/product.repository.js';

const productRepo = new ProductRepository();

export default function setupProductSocket(io) {
  io.on('connection', (socket) => {
    console.log('🧠 Cliente conectado al socket');

    socket.on('createProduct', async (data) => {
      try {
        await productRepo.createProduct(data);
        const products = await productRepo.getAllProducts();
        socket.emit('publishProducts', products);
      } catch (error) {
        socket.emit('statusError', error.message);
      }
    });

    socket.on('deleteProduct', async ({ pid }) => {
      try {
        await productRepo.deleteProduct(pid);
        const products = await productRepo.getAllProducts();
        io.emit('publishProducts', products); 
      } catch (error) {
        socket.emit('statusError', error.message);
      }
    });
  });
}
