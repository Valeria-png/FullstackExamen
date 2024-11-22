export const getCategory = (categoryName) => {
  fetch(`http://127.0.0.1:3000/api/products/${categoryName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Productos cargados en el store:', data);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

getCategory('laptops');