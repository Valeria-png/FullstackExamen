<template>
    <div class="flex flex-col md:flex-row gap-4 bg-indigo-50 h-screen">
        <div class="md:w-1/2 w-full p-6">
        <img :src="productImageSRC" 
        class="rounded-xl"
        :alt="productName">
        </div>
        <div class="flex flex-col gap-4 md:w-1/2 w-full info p-6">
            <p class="text-indigo-600">{{ productCategory }}</p>
            <h1 class="text-3xl font-bold">{{ productName }}</h1>
            <div class="flex justify-between">
                <p class="text-4xl">$ {{ productPrice }}</p>
                <button @click="router.push('/')" class="btn bg-indigo-600 hover:bg-indigo-700 text-white">Regresar a inicio</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const productName = ref('');
const productPrice = ref('');
const productCategory = ref('');
const productImageSRC = ref('');

onMounted(() => {
    getProduct(props.id)
})
const getProduct = (id) => {
    fetch (`http://127.0.0.1:3000/api/products/${id}`)
    .then(response =>{
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        productName.value = data.productName;
        productPrice.value = data.price;
        productCategory.value = data.category;
        productImageSRC.value = data.imageSRC;
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

}

const props = defineProps({
    id: Number
})

</script>

<style  scoped>
.info{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>