<template>
  <div class="md:flex">
    <div class="flex flex-col gap-1 md:w-1/3 w-full">
      <div class="collapse">
        <input type="radio" name="my-accordion-1"  />
        <div class="collapse-title text-xl font-medium">Añadir Producto</div>
        <div class="collapse-content ">
          <div class="box">
            <label for="">Nombre del Producto</label>
            <input type="text" v-model="newProductName" id="" class="">
          </div>
          <div class="box">
            <label for="">Precio</label>
            <input type="text" name="" v-model="newProductPrice" id="" class="">
          </div>
          <div class="box">
            <label for="">Categoría</label>
            <input type="text" name="" v-model="newProductCategory" id="" class="">
          </div>
          <div class="box">
            <label for="">Link de la imagen</label>
            <input type="text" name=" " v-model="newProductImageSRC" id="" class="">
          </div>
          <button @click="postNewProduct" class="btn bg-indigo-600 hover:bg-indigo-700 text-white">Guardar Producto</button>
        </div>
    </div>
    <!-- <div class="collapse">
      <input type="radio" v-model="searchTerm" name="my-accordion-1" checked="checked" />
      <div @click="productStore.getCategory(searchTerm)" class="collapse-title text-xl font-medium">Buscar Productos de una Categoría</div>
      <div class="collapse-content">
        <input type="text">
        <button type="" class="btn bg-indigo-600 hover:bg-indigo-700 text-white">🔎Buscar</button>
      </div>
    </div> -->
    <div class="collapse">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">Eliminar Producto</div>
      <div class="collapse-content">
        <input type="text" v-model="productToDelete" placeholder="ID (número) del Producto">
        <button type="" @click="deleteProduct(productToDelete)" class="btn bg-indigo-600 hover:bg-indigo-700 text-white">🗑️Eliminar</button>
      </div>
    </div>
    <div class="collapse">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">Editar Producto</div>
      <div class="collapse-content">
        <label for="">Ingresa el ID del producto a editar</label>
        <input type="text" v-model="productIdToEdit" placeholder="ID (número) del Producto">
        <label for="">Nombre del Producto</label>
        <input type="text" v-model="productNameEdit" name="" id="" class="">
        <label for="">Precio</label>
        <input type="text" v-model="productPriceEdit" name="" id="" class="">
        <label for="">Categoría</label>
        <input type="text" v-model="productCategoryEdit" name="" id="" class="">
        <label for="">Link de la imagen</label>
        <input type="text" v-model="productImageSRCEdit" name="" id="" class="">
        <button @click="updateProduct(productIdToEdit)" class="btn bg-indigo-600 hover:bg-indigo-700 text-white">Guardar Cambios</button>
      </div>
    </div>
  </div>
    <div class="md:w-2/3 w-full flex flex-wrap p-4 gap-4">
      <!-- Mostrar mensaje mientras cargan los datos -->
      <div v-if="isLoading" class="text-center w-full">
        Cargando productos...
      </div>
      <!-- Mostrar productos si ya están cargados -->
      <productCard
        v-else
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :category="product.category"
        :imgSRC="product.imageSRC"
      />
      <!-- Mensaje si no hay productos -->
      <div v-if="!isLoading && products.length === 0" class="text-center w-full">
        No hay productos disponibles.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import productCard from '@/components/productCard.vue';
import { useProductStore } from '@/stores/products';

const newProductName = ref('');
const newProductPrice = ref('');
const newProductCategory = ref('');
const newProductImageSRC = ref('');

const productNameEdit = ref('');
const productPriceEdit = ref('');
const productCategoryEdit = ref('');
const productImageSRCEdit = ref('');
const productIdToEdit = ref('');

const productToDelete=ref('');
const postNewProduct = () => {
  fetch('http://127.0.0.1:3000/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productName: newProductName.value,
    price: newProductPrice.value,
    category: newProductCategory.value,
    imageSRC: newProductImageSRC.value,
  }),
})
    newProductName.value = '';
    newProductPrice.value = '';
    newProductCategory.value = '';
    newProductImageSRC.value = '';
    window.location.reload();
}
const updateProduct = (id) => {
  fetch(`http://127.0.0.1:3000/api/products/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productName: productNameEdit.value,
    price: productPriceEdit.value,
    category: productCategoryEdit.value,
    imageSRC: productImageSRCEdit.value,
  }),
})
    productNameEdit.value = '';
    productPriceEdit.value = '';
    productCategoryEdit.value = '';
    productImageSRCEdit.value = '';
    window.location.reload();
}

const deleteProduct = (id) => {
  fetch(`http://127.0.0.1:3000/api/products/${id}`, {
  method: 'DELETE',
})
    productToDelete.value = '';
    window.location.reload();
}


const productStore = useProductStore();

const searchTerm = ref('');



onMounted(() => {
  productStore.getData();
});

const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);




</script>
<style scoped>
    input{
    @apply rounded-xl;
    @apply outline-none;
    @apply bg-indigo-50;
    @apply h-12;
    @apply p-2;
  }
  .box{
    @apply flex;
    @apply flex-col;
    @apply gap-2;
  }
  label{
    @apply font-semibold;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .collapse{
    @apply bg-pink-200;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  
  }
  .collapse-content{
    @apply flex;
    @apply flex-col;
    @apply gap-2;
    @apply p-2;
  }
</style>