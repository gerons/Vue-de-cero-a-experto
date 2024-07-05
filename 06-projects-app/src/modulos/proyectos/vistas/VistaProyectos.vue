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
                </tr>
            </thead>
            <tbody>
                <tr class="hover">
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
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
            @value="registrar"
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


// ===============================
// DATA
// ===============================
const modalOpen = ref(false)
const customModalOpen = ref(false)

// ===============================
// METODOS
// ===============================
const registrar = (proyecto: string) => {
    console.log({proyecto})
}
</script>