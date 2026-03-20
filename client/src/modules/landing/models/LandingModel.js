/**
 * LandingModel
 * -------------
 * Entidad de datos para la Landing Page.
 * Actualmente no tiene mucha lógica de negocio, pero sigue la arquitectura.
 */

import { BaseModel } from '../../../core/BaseModel.js'

export class LandingModel extends BaseModel {
  defaults() {
    return {
      title: 'Bienvenido a Nuestra Aplicación MVVM',
      description: 'La arquitectura del futuro, disponible hoy. Rápido, modular y escalable.'
    }
  }

  validate() {
    return null
  }
}
