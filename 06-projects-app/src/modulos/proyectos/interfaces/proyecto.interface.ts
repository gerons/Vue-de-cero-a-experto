
export interface Proyecto {
    id: string
    nombre: string
    tareas: Tarea[]
}

export interface Tarea {
    id: string
    nombre: string
    fecha_termino?: Date
}