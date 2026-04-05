/**
 * LandingModel
 * -------------
 * Entidad de datos para la Landing Page de SIMÖ.
 * Contiene los textos, ofertas y datos de colaboradores.
 */

import { BaseModel } from '../../../core/BaseModel.js'

export class LandingModel extends BaseModel {
  /**
   * Valores por defecto del modelo de la landing.
   * @returns {object}
   */
  defaults() {
    return {
      title: 'SIMÖ',
      greeting: 'Hola soy',
      description: 'Una iniciativa creada para ayudarte a reciclar tus dispositivos electrónicos.',
      offers: [
        {
          icon: '🔋',
          name: 'Baterías',
          points: 1900,
          quantity: '33x',
          destination: 'EcoCircuit',
        },
        {
          icon: '📱',
          name: 'Teléfono Celular',
          points: 2000,
          quantity: '1x',
          destination: 'ReTec Verde',
        },
        {
          icon: '🔌',
          name: 'Cables Eléctricos',
          points: 1800,
          quantity: '10x',
          destination: 'NovaRecicla',
        },
        {
          icon: '🧊',
          name: 'Refrigerador Grande',
          points: 5000,
          quantity: '33x',
          destination: 'TecnoCiclo',
        },
        {
          icon: '⚡',
          name: 'Cables Eléctricos',
          points: 700,
          quantity: '6x',
          destination: 'GreenVolt',
        },
        {
          icon: '📺',
          name: 'Pantalla de Televisor',
          points: 2900,
          quantity: '33x',
          destination: 'CicloTech',
        },
      ],
      collaborators: [
        { name: 'Falabella', type: 'falabella' },
        { name: 'Puntos Colombia', type: 'puntos' },
        { name: "Betty's Bowls", type: 'bettys' },
        { name: 'Éxito', type: 'exito' },
        { name: 'Alkosto', type: 'alkosto' },
        { name: 'Homecenter', type: 'homecenter' },
        { name: 'Jumbo', type: 'jumbo' },
        { name: 'Rappi', type: 'rappi' },
      ],
    }
  }

  /**
   * Valida los datos del modelo.
   * @returns {null}
   */
  validate() {
    return null
  }
}
