/**
 * LandingModel
 * -------------
 * Entidad de datos para la Landing Page de SIMÖ.
 * Contiene los textos, ofertas y datos de colaboradores.
 */

import { BaseModel } from '../../../core/BaseModel.js'

import ImgPilas from '../../../../assets/styles/images/Pilas.png';
import ImgCelular from '../../../../assets/styles/images/Celular.png';
import ImgCable from '../../../../assets/styles/images/Cable.png';
import ImgNevera from '../../../../assets/styles/images/Nevera.png';
import ImgTv from '../../../../assets/styles/images/Tv.png';

import ImgFalabella from '../../../../assets/styles/images/Falabella.png';
import ImgAlkatronic from '../../../../assets/styles/images/Alkatronic.png';
import ImgBettys from '../../../../assets/styles/images/Bettys.png';
import ImgPuntosColombia from '../../../../assets/styles/images/PuntosColombia.png';
import ImgJumbo from '../../../../assets/styles/images/Jumbo.png';
import ImgVeolia from '../../../../assets/styles/images/Veolia.png';
import ImgHyM from '../../../../assets/styles/images/HyM.png';
import ImgKoaj from '../../../../assets/styles/images/Koaj.png';
import ImgVerdeo from '../../../../assets/styles/images/Verdeo.png';
import ImgRafe from '../../../../assets/styles/images/Rafe.png';
import ImgRedVerde from '../../../../assets/styles/images/RedVerde.png';
import ImgEcoComputo from '../../../../assets/styles/images/EcoComputo.png';

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
          imgSrc: ImgPilas,
          name: 'Baterías',
          points: 1900,
          quantity: '33x',
          destination: 'EcoCircuit',
        },
        {
          imgSrc: ImgCelular,
          name: 'Teléfono Celular',
          points: 2000,
          quantity: '1x',
          destination: 'ReTec Verde',
        },
        {
          imgSrc: ImgCable,
          name: 'Cables Eléctricos',
          points: 1800,
          quantity: '10x',
          destination: 'NovaRecicla',
        },
        {
          imgSrc: ImgNevera,
          name: 'Refrigerador Grande',
          points: 5000,
          quantity: '33x',
          destination: 'TecnoCiclo',
        },
        {
          imgSrc: ImgCable,
          name: 'Cables Eléctricos',
          points: 700,
          quantity: '6x',
          destination: 'GreenVolt',
        },
        {
          imgSrc: ImgTv,
          name: 'Pantalla de Televisor',
          points: 2900,
          quantity: '33x',
          destination: 'CicloTech',
        },
      ],
      collaborators: [
        { name: 'Falabella', imgSrc: ImgFalabella },
        { name: 'Alkatronic', imgSrc: ImgAlkatronic },
        { name: "Betty's Bowls", imgSrc: ImgBettys },
        { name: 'Puntos Colombia', imgSrc: ImgPuntosColombia },
        { name: 'Jumbo', imgSrc: ImgJumbo },
        { name: 'Veolia', imgSrc: ImgVeolia },
        { name: 'H&M', imgSrc: ImgHyM },
        { name: 'Koaj', imgSrc: ImgKoaj },
        { name: 'Verdeo', imgSrc: ImgVerdeo },
        { name: 'RAEE', imgSrc: ImgRafe },
        { name: 'Red Verde', imgSrc: ImgRedVerde },
        { name: 'Eco Computo', imgSrc: ImgEcoComputo },
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
