<template>
    <div class="flex flex-col">
        <!-- menu superior -->
         <menu-superior />

        <main class="flex flex-row">
            <!-- menu lateral -->
             <menu-lateral />

            <!-- router view -->
             <router-view />
        </main>
    </div>
</template>

<script lang="ts" setup>
import MenuSuperior from '@/modulos/comun/componentes/MenuSuperior.vue'
import MenuLateral from '@/modulos/proyectos/componentes/MenuLateral.vue'
</script>