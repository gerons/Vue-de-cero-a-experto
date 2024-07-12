import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import type { Proyecto } from "../interfaces/proyecto.interface";
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from "@vueuse/core";

export const useProyectosStore = defineStore('proyectos', () => {
    const proyectos = ref( useLocalStorage<Proyecto[]>('proyectos', []) )

    const registrar = (nombre: string) => {
        if (nombre.length === 0) return

        proyectos.value.push({
            id: uuidv4(),
            nombre,
            tareas: []
        })
    }

    const registrarTarea = (idProyecto:string, nombre: string) => {
        if (idProyecto.length === 0) return
        if (nombre.trim().length === 0) return

        const proyecto = proyectos.value.find(p => p.id === idProyecto)
        if (!proyecto) return

        proyecto.tareas.push({
            id: uuidv4(),
            nombre
        })
    }

    const toggleTask = (idProyecto: string, idTarea: string) => {
        const proyecto = proyectos.value.find(p => p.id === idProyecto)
        if (!proyecto) return

        const tarea = proyecto.tareas.find(t => t.id === idTarea)
        if (!tarea) return

        tarea.fecha_termino = tarea.fecha_termino ? undefined : new Date()
    }

    return {
        // estados
        proyectos,
        // getters
        listaProyectos: computed(() => [ ...proyectos.value ]),
        sinProyectos: computed(() => proyectos.value.length === 0),
        proyectosAvance: computed(() => {
            return proyectos.value.map(p => {
                const totTareas = p.tareas.length
                const tareasCompletadas = p.tareas.filter(t => t.fecha_termino).length
                const avance = (totTareas === 0) ? 0 : (tareasCompletadas / totTareas) * 100

                return {
                    id: p.id,
                    nombre: p.nombre,
                    totTareas: totTareas,
                    avance: Math.round(avance)
                }
            })
        }),
        // metodos
        registrar, registrarTarea, toggleTask
    }
})