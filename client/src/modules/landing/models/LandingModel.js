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
          img: 'Pilas',
          name: 'Baterías',
          points: 1900,
          quantity: '33x',
          destination: 'EcoCircuit',
        },
        {
          img: 'Celular',
          name: 'Teléfono Celular',
          points: 2000,
          quantity: '1x',
          destination: 'ReTec Verde',
        },
        {
          img: 'Cable',
          name: 'Cables Eléctricos',
          points: 1800,
          quantity: '10x',
          destination: 'NovaRecicla',
        },
        {
          img: 'Nevera',
          name: 'Refrigerador Grande',
          points: 5000,
          quantity: '33x',
          destination: 'TecnoCiclo',
        },
        {
          img: 'Cable', // El usuario mencionó "Cable" (singular en la lista, pero hay dos en la imagen original)
          name: 'Cables Eléctricos',
          points: 700,
          quantity: '6x',
          destination: 'GreenVolt',
        },
        {
          img: 'Tv',
          name: 'Pantalla de Televisor',
          points: 2900,
          quantity: '33x',
          destination: 'CicloTech',
        },
      ],
      collaborators: [
        { name: 'Falabella', img: 'Falabella' },
        { name: 'Alkatronic', img: 'Alkatronic' },
        { name: "Betty's Bowls", img: 'Bettys' },
        { name: 'Puntos Colombia', img: 'PuntosColombia' },
        { name: 'Jumbo', img: 'Jumbo' },
        { name: 'Veolia', img: 'Veolia' },
        { name: 'H&M', img: 'HyM' },
        { name: 'Koaj', img: 'Koaj' },
        { name: 'Verdeo', img: 'Verdeo' },
        { name: 'RAEE', img: 'Rafe' },
        { name: 'Red Verde', img: 'RedVerde' },
        { name: 'Eco Computo', img: 'EcoComputo' },
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
