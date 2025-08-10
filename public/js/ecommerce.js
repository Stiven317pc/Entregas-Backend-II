showButtonCart();

async function addToCart(pid) {
  let cartId = localStorage.getItem('cartId');

  if (!cartId || typeof cartId !== 'string' || cartId.length !== 24) {
    try {
      const createCartResponse = await fetch('/api/carts', { method: 'POST' });
      const createCart = await createCartResponse.json();

      if (createCart.status === 'error') {
        return alert(createCart.message);
      }

      cartId = createCart.payload._id;
      localStorage.setItem('cartId', cartId);
    } catch (error) {
      console.error('⛔ Error al crear carrito:', error.message);
      return alert('No se pudo crear el carrito');
    }
  }

  try {
    const addProductResponse = await fetch(`/api/carts/${cartId}/product/${pid}`, {
      method: 'POST'
    });

    const addProduct = await addProductResponse.json();

    if (addProduct.status === 'error') {
      return alert(addProduct.message);
    }

    showButtonCart();
    alert('Producto añadido satisfactoriamente!');
  } catch (error) {
    console.error('⛔ Error al añadir producto:', error.message);
    alert('No se pudo añadir el producto');
  }
}

function showButtonCart() {
  let cartId = localStorage.getItem('cartId');

  if (!cartId || typeof cartId !== 'string' || cartId.length !== 24) {
    fetch('/api/carts', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          cartId = data.payload._id;
          localStorage.setItem('cartId', cartId);
          assignCartButton(cartId);
        } else {
          console.warn('⚠️ No se pudo generar el carrito:', data.message);
        }
      })
      .catch(err => console.error('⛔ Error al generar carrito desde navbar:', err));
  } else {
    assignCartButton(cartId);
  }
}

function assignCartButton(cartId) {
  const button = document.querySelector('#button-cart');
  const box = document.querySelector('.view-cart');

  if (button) {
    button.setAttribute("href", `/cart/${cartId}`);
  }

  if (box) {
    box.style.display = "block";
  }
}
