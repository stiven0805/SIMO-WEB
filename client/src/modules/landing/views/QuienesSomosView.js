/**
 * QuienesSomosView
 * -----------------
 * Renderiza la página "Quiénes somos" de SIMÖ.
 * Pantalla independiente con: ¿Qué es SIMÖ?, Ideales, ¿Cómo participo?
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con QuienesSomosViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { QuienesSomosViewModel } from '../viewmodels/QuienesSomosViewModel.js'
import { bindNavEvents, bindFooterEvents } from './shared/landingShared.js'
import { PublicNav, SharedFooter } from '../../../shared/components/Layouts.js'
import { IdealCard } from '../../../shared/components/Cards.js'
import { IconCheck, IconLeaf, IconPeople, IconStar, IconFlower } from '../../../shared/components/Icons.js'

export class QuienesSomosView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new QuienesSomosViewModel()
    super({ ...options, viewModel })
  }

  // ─── Renderizado ──────────────────────────────────────────────────────────

  /**
   * Genera el HTML completo de la página Quiénes somos.
   * @returns {string}
   */
  render() {
    return `
      <div class="landing landing--about">

        ${PublicNav('quienes-somos', 'blue')}

        <!-- ─── ¿QUÉ ES SIMÖ? ─────────────────────────────────── -->
        <section class="about-hero" id="que-es-simo">
          <div class="about-hero__inner">
            <div class="about-hero__content">
              <h1 class="about-hero__title">
                ¿Qué es<br>
                <span class="about-hero__title-accent">SIMÖ?</span>
              </h1>
              <p class="about-hero__text">
                SIMÖ es una <strong>aplicación que busca transformar</strong> la forma en que reciclamos tecnología, convirtiendo el reciclaje electrónico en una experiencia simple, accesible y participativa.
              </p>
              <p class="about-hero__text">
                A través de recompensas y beneficios, <strong>incentiva a jóvenes y adultos de Medellín</strong> a involucrarse activamente en el cuidado del entorno, promoviendo una cultura tecnológica más consciente y responsable.
              </p>
              <p class="about-hero__text">
                SIMÖ conecta tecnología, comunidad y sostenibilidad para dar <strong>una segunda vida a los dispositivos electrónicos</strong>, evitando que terminen olvidados o desechados sin un proceso adecuado.
              </p>
            </div>
            <div class="about-hero__visual">
              <div class="about-hero__robot-wrapper">
                <img src="./assets/styles/images/cabeza simo.png" class="about-hero__robot" alt="Mascota SIMÖ" />
              </div>
            </div>
          </div>
        </section>

        <!-- ─── IDEALES DE SIMÖ ────────────────────────────────── -->
        <section class="about-ideals" id="ideales">
          <!-- Swirls decorativas rosa simétricas -->
          <img src="./assets/styles/images/DeoracionInicioSuperiorIzquierda.png" class="about-ideals__swirl about-ideals__swirl--left" alt="" />
          <img src="./assets/styles/images/DeoracionInicioSuperiorIzquierda.png" class="about-ideals__swirl about-ideals__swirl--right" alt="" />

          <div class="about-ideals__inner">
            <h2 class="about-ideals__title">¡Ideales de SIMÖ!</h2>
            
            <div class="about-ideals__grid">
              ${IdealCard({ 
                id: 'simplicidad', 
                name: 'Simplicidad', 
                desc: 'Hacer del reciclaje tecnológico un proceso fácil y accesible para todos.', 
                iconSvg: `<img src="./assets/styles/images/estrella 1.png" alt="Simplicidad" class="about-ideals__icon" />` 
              })}
              ${IdealCard({ 
                id: 'conciencia', 
                name: 'Conciencia ambiental', 
                desc: 'Promover hábitos responsables que reduzcan el impacto de los residuos electrónicos.', 
                iconSvg: `<img src="./assets/styles/images/estrella 2.png" alt="Conciencia" class="about-ideals__icon" />` 
              })}
              ${IdealCard({ 
                id: 'comunidad', 
                name: 'Comunidad', 
                desc: 'Conectar personas, empresas y ciudad alrededor de un objetivo común: cuidar el entorno.', 
                iconSvg: `<img src="./assets/styles/images/estrella 3.png" alt="Comunidad" class="about-ideals__icon" />` 
              })}
              ${IdealCard({ 
                id: 'innovacion', 
                name: 'Innovación', 
                desc: 'Usar la tecnología como herramienta para generar cambios positivos y duraderos.', 
                iconSvg: `<img src="./assets/styles/images/estrella 4.png" alt="Innovación" class="about-ideals__icon" />` 
              })}
            </div>
          </div>
        </section>

        <!-- ─── ¿CÓMO PARTICIPO? ──────────────────────────────── -->
        <section class="about-participate" id="como-participo">
          <div class="about-participate__inner">
            <div class="about-participate__header">
              <span class="about-participate__logo">SIMÖ</span>
              <h2 class="about-participate__title">¿Cómo participo en?</h2>
              <p class="about-participate__desc">
                SIMÖ funciona gracias a la participación de dos actores principales
              </p>
            </div>
            
            <div class="about-participate__cards">
              <div class="about-participate__card">
                <img src="./assets/styles/images/estrella 3.png" class="about-participate__card-icon" alt="" />
                <h3 class="about-participate__card-title">Usuario reciclador</h3>
                <p class="about-participate__card-text">
                  Personas que <strong>entregan sus dispositivos</strong> electrónicos en desuso para darles un manejo responsable y contribuir al cuidado ambiental mientras <strong>reciben beneficios</strong> y recompensas.
                </p>
              </div>
              <div class="about-participate__card">
                <img src="./assets/styles/images/estrella 1.png" class="about-participate__card-icon" alt="" />
                <h3 class="about-participate__card-title">Aliado recolector</h3>
                <p class="about-participate__card-text">
                  Empresas o gestores <strong>encargados de recibir</strong>, clasificar y gestionar los dispositivos electrónicos <strong>para asegurar</strong> su correcto reciclaje y reutilización.
                </p>
              </div>
            </div>
          </div>
        </section>

        ${SharedFooter()}

      </div>
    `
  }


  // ─── Binding del ViewModel ────────────────────────────────────────────────

  /** @override */
  _bindViewModel() {
    // Esta vista no tiene estado reactivo del ViewModel
  }

  // ─── Binding de eventos DOM ───────────────────────────────────────────────

  /** @override */
  _bindEvents() {
    bindNavEvents(this)
    bindFooterEvents(this)
  }
}
