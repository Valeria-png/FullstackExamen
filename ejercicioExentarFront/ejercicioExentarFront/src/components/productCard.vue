<template>
    <div>
        <div class="card bg-base-100 md:w-64 w-52 shadow-xl">
        <figure class="md:h-48 h-36 relative">
            <img
            :src="props.imgSRC"
            :alt="props.name"
            class="w-full h-full object-cover" />
            <p class="rounded-full bg-indigo-600 text-white p-2 absolute top-3 right-3"> {{ props.id }}</p>
        </figure>   
        <div class="card-body">
            <p class="text-indigo-600 text-sm">{{ props.category }}</p>
            <h2 class="card-title text-2xl">{{ props.name }}</h2>

            <div class="card-actions md:justify-between justify-center">
                <p class="font-bold">$ {{ props.price }}</p>
                <button @click="router.push(`/producto/${props.id}`)" class="btn bg-indigo-600 hover:bg-indigo-700 text-white">Ver más información</button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
    id: Number,
    name: String,
    price: Number,
    category: String,
    imgSRC: String,
})
</script>

<style scoped>
.card{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>