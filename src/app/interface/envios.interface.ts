export interface LogisticaTerrestre {
  placa_vehiculo: string
  bodega_id: string
}

export interface LogisticaMaritima {
  numero_flota: string
  puerto_id: string
}

export interface EnviosInterface {

  _id?: string

  numero_guia: string
  cliente_id: string
  producto_id: string

  cantidad_producto: number
  precio_envio: number

  fecha_registro: Date
  fecha_entrega: Date

  tipo_envio: string

  logistica: any
}