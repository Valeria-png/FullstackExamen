import { data } from 'autoprefixer';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('products', {
    state: () => ({
      products: [],
      isLoading: false
    }),
    actions: {
      
      getData () {
        this.isLoading = true
        fetch('http://127.0.0.1:3000/api/products')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            this.products = data;
            console.log('Productos cargados en el store:', data);
            
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          })
          .finally(() => {
            this.isLoading = false
          }) 
       
      }
    },
    getters: {
      getProducts: (state) => state.products
    },
  })