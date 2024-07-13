<template>
    <div>
        <!-- component -->
        <!-- Create By Joker Banny -->
        <!-- Header Navbar -->
        <TopMenu />


        

        
        <RouterView />

        <!-- Footer -->
        <CustomFooter />
    </div>
</template>

<script lang="ts" setup>
import TopMenu from '../components/TopMenu.vue';
import CustomFooter from '../components/CustomFooter.vue';
import { RouterView } from 'vue-router';

</script>