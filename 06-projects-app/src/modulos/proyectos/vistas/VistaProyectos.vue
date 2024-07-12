<template>
    <div class="overflow-x-auto w-full">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th></th>
                    <th>Proyeto</th>
                    <th>Tareas</th>
                    <th>Avance</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(proyecto, index) in proyectosST.proyectosAvance" :key="proyecto.id" class="hover">
                    <th>{{ index +1}}</th>
                    <td>{{ proyecto.nombre }}</td>
                    <td>{{  proyecto.totTareas }}</td>
                    <td>
                        <progress class="progress progress-primary w-56" :value="proyecto.avance" max="100"></progress>
                    </td>
                    <td class="text-right">{{ proyecto.avance }}%</td>
                </tr>
            </tbody>
        </table>

        <!-- modal para la captura de proyecto -->
        <custom-modal :open="customModalOpen" >
            <template #header>
                <h1 class="text-3xl">Titulo de modal</h1>
            </template>

            <template #body>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolor exercitationem quidem, minus fugiat dolorem nulla accusamus amet nesciunt quibusdam eos quam sunt repudiandae consequatur, hic, alias possimus iste molestias!
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end">
                    <button class="btn btn-primary mr-2">Aceptar</button>
                    <button @click="customModalOpen=false" class="btn btn-ghost">Cerrar</button>
                </div>
            </template>
        </custom-modal>
        
        <proyecto-frm
            :open="modalOpen"
            placeholder="Nombre del proyecto"
            titulo="Registrar proyecto"
            subtitulo="Ingrese los datos del proyecto"
            @close="modalOpen=false"
            @value="proyectosST.registrar"
        />

        <fab-button @click="modalOpen=true">
            <icono-agregar />
        </fab-button>

        <fab-button @click="customModalOpen=true" position="bottom-left">
            <icono-mas />
        </fab-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import FabButton from '@/modulos/comun/componentes/FabButton.vue'
import IconoAgregar from '@/modulos/comun/iconos/IconoAgregar.vue'
import IconoMas from '@/modulos/comun/iconos/IconoMas.vue'
import ProyectoFrm from '@/modulos/comun/componentes/ProyectoFrm.vue'
import CustomModal from '@/modulos/comun/componentes/CustomModal.vue'
import { useProyectosStore } from '../store/projects.store'

const proyectosST = useProyectosStore()

// ===============================
// DATA
// ===============================
const modalOpen = ref(false)
const customModalOpen = ref(false)

// ===============================
// METODOS
// ===============================
const registrar = (proyecto: string) => {
    proyectosST.registrar(proyecto)
}
</script>