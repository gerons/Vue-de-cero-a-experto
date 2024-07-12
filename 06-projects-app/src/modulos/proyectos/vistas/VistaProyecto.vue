<template>
    <div class="w-full">
        <section class="m-2">
            <BreadCrumbs :nombre="proyecto?.nombre ?? 'sin nombre'"/>
        </section>

        <section class="m-2">
            <div class="overflow-x-auto">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th class="w-14">Completada</th>
                            <th>Tarea</th>
                            <th>Completada en</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="hover" v-for="tarea in proyecto?.tareas" :key="tarea.id">
                            <th>
                                <input
                                @change="proyectoST.toggleTask(proyecto?.id ?? '', tarea.id)"
                                    type="checkbox"
                                    :checked="!!tarea.fecha_termino"
                                    class="checkbox checkbox-sm checkbox-primary"
                                >
                            </th>
                            <td>{{ tarea.nombre }}</td>
                            <td>{{ tarea.fecha_termino }}</td>
                        </tr>

                        <tr class="hover">
                            <th></th>
                            <td>
                                <input
                                    v-model="nuevaTarea"
                                    @keyup.enter="registrarTarea"
                                    type="text"
                                    class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                                    placeholder="Nueva tarea"
                                >
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';

import BreadCrumbs from '@/modulos/comun/componentes/BreadCrumbs.vue';
import { useProyectosStore } from '../store/projects.store';
import type { Proyecto } from '../interfaces/proyecto.interface';

interface Props {
    id: string
}

const props = defineProps<Props>()
const proyectoST = useProyectosStore()
const router = useRouter()

const proyecto = ref<Proyecto|null>()
const nuevaTarea = ref('')

watch(
    () => props.id, 
    () => {
        proyecto.value = proyectoST.listaProyectos.find((item) => item.id === props.id)

        if (!proyecto.value) {
            router.replace('/')
        }
    },
    { 
        immediate: true 
    }
)

const registrarTarea = () => {
    if (!proyecto.value) return

    proyectoST.registrarTarea(proyecto.value.id, nuevaTarea.value)

    nuevaTarea.value = ''
}
</script>