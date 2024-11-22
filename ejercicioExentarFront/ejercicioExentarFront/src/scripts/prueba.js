async function fetchProducts() {
    try {
      const products = [];
      const response = await fetch('http://127.0.0.1:3000/api/products');
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      products.push(...data);
      console.log(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  fetchProducts();

  