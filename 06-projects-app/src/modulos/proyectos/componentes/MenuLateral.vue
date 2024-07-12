<template>
    <aside class="bg-base-200 w-72 min-h-screen">
        <h2 class="text-lg font-bold mx-4">
            <router-link to="/proyectos">Proyectos</router-link>
        </h2>
        
        <p 
            v-if="proyectoST.sinProyectos"
            class="text-sm text-gray-500 mx-4"
        >
            No hay proyectos
        </p>

        <ul v-else class="menu">
            <li v-for="proyecto in proyectoST.listaProyectos" :key="proyecto.id">
                <template v-if="proyecto.tareas.length > 0">
                    <details>
                    <summary>
                        <RouterLink :to="`/proyecto/${proyecto.id}`">
                            {{ proyecto.nombre }}
                        </RouterLink>
                    </summary>
                    <ul>
                        <li v-for="tarea in proyecto.tareas" :key="tarea.id">
                            <RouterLink :to="`/proyecto/${proyecto.id}`">{{ tarea.nombre }}</RouterLink>
                        </li>
                    </ul>
                    </details>
                </template>
                
                <template v-else>
                    <RouterLink :to="`/proyecto/${proyecto.id}`">
                        {{ proyecto.nombre }}
                    </RouterLink>
                </template>
            </li>
        </ul>
    </aside>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { useProyectosStore } from '../store/projects.store';


const proyectoST = useProyectosStore()
</script>