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
      <div class="landing">

        ${PublicNav('quienes-somos', 'blue')}

        <!-- ─── ¿QUÉ ES SIMÖ? ─────────────────────────────────── -->
        <section class="about-what" id="que-es-simo">
          <div class="about-what__inner">
            <div class="about-what__content">
              <h1 class="about-what__title">¿Qué es<br><span class="about-what__title--accent">SIMÖ</span>?</h1>
              <p class="about-what__text">
                SIMÖ es una aplicación que busca <strong>transformar la forma en que
                reciclamos la tecnología</strong>, convirtiendo el reciclaje electrónico
                en una experiencia accesible, gratificante y responsable.
              </p>
              <p class="about-what__text">
                A través de <strong>recompensas e incentivos</strong>, SIMÖ motiva a
                jóvenes y comunidades a reciclar sus dispositivos electrónicos de
                manera responsable, promoviendo una cultura tecnológica más
                consciente y sostenible.
              </p>
              <p class="about-what__text">
                SIMÖ mezcla <strong>tecnología, creatividad y sostenibilidad</strong>
                para lograr que la segunda vida de tus dispositivos electrónicos,
                además de ayudar al planeta, también genere valor y beneficio a
                sus propietarios.
              </p>
            </div>
            <div class="about-what__visual">
              <div class="about-what__badge">
                <span class="about-what__badge-label">OBJETIVO</span>
                <p class="about-what__badge-text">Reciclar para transformar</p>
              </div>
              <div class="about-what__decor">
                ${IconFlower('#DB0076', '#FFCD1C', 100)}
                ${IconFlower('#FFCD1C', '#334E9D', 100)}
                ${IconFlower('#2E7D32', '#FFCD1C', 100)}
              </div>
            </div>
          </div>
        </section>

        <!-- ─── IDEALES DE SIMÖ ────────────────────────────────── -->
        <section class="about-ideals" id="ideales">
          <div class="about-ideals__inner">
            <h2 class="about-ideals__title">¡Ideales de <span>SIMÖ</span>!</h2>
            <div class="about-ideals__flowers">
              ${IconFlower('#DB0076', '#FFCD1C', 80)}
              ${IconFlower('#FFCD1C', '#334E9D', 80)}
              ${IconFlower('#2E7D32', '#FFCD1C', 80)}
              ${IconFlower('#334E9D', '#DB0076', 80)}
              ${IconFlower('#DB0076', '#334E9D', 80)}
              ${IconFlower('#FFCD1C', '#DB0076', 80)}
              ${IconFlower('#2E7D32', '#334E9D', 80)}
              ${IconFlower('#334E9D', '#FFCD1C', 80)}
            </div>
            <div class="about-ideals__grid">
              ${IdealCard({ id: 'simplicidad', name: 'Simplicidad', desc: 'Hacer del reciclaje tecnológico un proceso fácil y accesible para todos.', iconSvg: IconCheck() })}
              ${IdealCard({ id: 'conciencia', name: 'Conciencia ambiental', desc: 'Promover hábitos responsables que reduzcan el impacto de los residuos electrónicos.', iconSvg: IconLeaf() })}
              ${IdealCard({ id: 'comunidad', name: 'Comunidad', desc: 'Conectar personas, empresas y cadenas de reciclaje bajo un objetivo común: cuidar el medio ambiente.', iconSvg: IconPeople() })}
              ${IdealCard({ id: 'innovacion', name: 'Innovación', desc: 'Usar la tecnología como herramienta para generar cambios positivos en ciudades.', iconSvg: IconStar() })}
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
                SIMÖ funciona gracias a la participación de dos actores principales:
              </p>
            </div>
            <div class="about-participate__cards">
              <div class="about-participate__card about-participate__card--user">
                <h3 class="about-participate__card-title">Usuario reciclador</h3>
                <p class="about-participate__card-text">
                  Personas que entregan sus dispositivos electrónicos en desuso
                  para darles una segunda vida mientras acceden al catálogo
                  ambiental, obteniendo beneficios y recompensas.
                </p>
              </div>
              <div class="about-participate__card about-participate__card--ally">
                <h3 class="about-participate__card-title">Aliado recolector</h3>
                <p class="about-participate__card-text">
                  Empresas o gestores encargados de recibir, clasificar y
                  gestionar los dispositivos, ofreciendo a los recicladores
                  una plataforma para consignar su correcto reciclaje y
                  reutilización.
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
