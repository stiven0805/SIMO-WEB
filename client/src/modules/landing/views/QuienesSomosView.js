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
import { renderNav, renderFooter, bindNavEvents, bindFooterEvents } from './shared/landingShared.js'

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

        ${renderNav('quienes-somos')}

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
              ${this._renderFloralDecor()}
            </div>
          </div>
        </section>

        <!-- ─── IDEALES DE SIMÖ ────────────────────────────────── -->
        <section class="about-ideals" id="ideales">
          <div class="about-ideals__inner">
            <h2 class="about-ideals__title">¡Ideales de <span>SIMÖ</span>!</h2>
            <div class="about-ideals__flowers">
              ${this._renderFlowerRow()}
            </div>
            <div class="about-ideals__grid">
              ${this._renderIdealCard('simplicidad', 'Simplicidad', 'Hacer del reciclaje tecnológico un proceso fácil y accesible para todos.', this._iconCheck())}
              ${this._renderIdealCard('conciencia', 'Conciencia ambiental', 'Promover hábitos responsables que reduzcan el impacto de los residuos electrónicos.', this._iconLeaf())}
              ${this._renderIdealCard('comunidad', 'Comunidad', 'Conectar personas, empresas y cadenas de reciclaje bajo un objetivo común: cuidar el medio ambiente.', this._iconPeople())}
              ${this._renderIdealCard('innovacion', 'Innovación', 'Usar la tecnología como herramienta para generar cambios positivos en ciudades.', this._iconStar())}
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

        ${renderFooter()}

      </div>
    `
  }

  // ─── Helpers de renderizado ────────────────────────────────────────────────

  /**
   * Renderiza las flores decorativas junto al badge.
   * @returns {string}
   */
  _renderFloralDecor() {
    return `
      <div class="about-what__decor">
        <svg class="about-what__decor-flower about-what__decor-flower--1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="38" y="5" width="24" height="90" rx="2" fill="#DB0076"/>
          <rect x="5" y="38" width="90" height="24" rx="2" fill="#DB0076"/>
          <rect x="18" y="18" width="24" height="64" rx="2" fill="#DB0076" transform="rotate(45 50 50)"/>
          <rect x="18" y="18" width="64" height="24" rx="2" fill="#DB0076" transform="rotate(45 50 50)"/>
          <circle cx="50" cy="50" r="18" fill="#DB0076"/>
          <circle cx="50" cy="50" r="13" fill="#FFCD1C"/>
        </svg>
        <svg class="about-what__decor-flower about-what__decor-flower--2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="38" y="5" width="24" height="90" rx="2" fill="#FFCD1C"/>
          <rect x="5" y="38" width="90" height="24" rx="2" fill="#FFCD1C"/>
          <rect x="18" y="18" width="24" height="64" rx="2" fill="#FFCD1C" transform="rotate(45 50 50)"/>
          <rect x="18" y="18" width="64" height="24" rx="2" fill="#FFCD1C" transform="rotate(45 50 50)"/>
          <circle cx="50" cy="50" r="18" fill="#FFCD1C"/>
          <circle cx="50" cy="50" r="13" fill="#334E9D"/>
        </svg>
        <svg class="about-what__decor-flower about-what__decor-flower--3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="38" y="5" width="24" height="90" rx="2" fill="#2E7D32"/>
          <rect x="5" y="38" width="90" height="24" rx="2" fill="#2E7D32"/>
          <rect x="18" y="18" width="24" height="64" rx="2" fill="#2E7D32" transform="rotate(45 50 50)"/>
          <rect x="18" y="18" width="64" height="24" rx="2" fill="#2E7D32" transform="rotate(45 50 50)"/>
          <circle cx="50" cy="50" r="18" fill="#2E7D32"/>
          <circle cx="50" cy="50" r="13" fill="#FFCD1C"/>
        </svg>
      </div>
    `
  }

  /**
   * Renderiza la fila de flores decorativas de la sección Ideales.
   * @returns {string}
   */
  _renderFlowerRow() {
    const flowers = [
      { petal: '#DB0076', center: '#FFCD1C' },
      { petal: '#FFCD1C', center: '#334E9D' },
      { petal: '#2E7D32', center: '#FFCD1C' },
      { petal: '#334E9D', center: '#DB0076' },
      { petal: '#DB0076', center: '#334E9D' },
      { petal: '#FFCD1C', center: '#DB0076' },
      { petal: '#2E7D32', center: '#334E9D' },
      { petal: '#334E9D', center: '#FFCD1C' },
    ]
    return flowers.map((c, i) => `
      <svg class="about-ideals__flower about-ideals__flower--${i + 1}" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="4" width="20" height="72" rx="2" fill="${c.petal}"/>
        <rect x="4" y="30" width="72" height="20" rx="2" fill="${c.petal}"/>
        <rect x="15" y="15" width="20" height="50" rx="2" fill="${c.petal}" transform="rotate(45 40 40)"/>
        <rect x="15" y="15" width="50" height="20" rx="2" fill="${c.petal}" transform="rotate(45 40 40)"/>
        <circle cx="40" cy="40" r="14" fill="${c.petal}"/>
        <circle cx="40" cy="40" r="10" fill="${c.center}"/>
      </svg>
    `).join('')
  }

  /**
   * Renderiza una tarjeta de ideal individual.
   * @param {string} id - Identificador del ideal
   * @param {string} name - Nombre del ideal
   * @param {string} desc - Descripción del ideal
   * @param {string} iconSvg - SVG del icono
   * @returns {string}
   */
  _renderIdealCard(id, name, desc, iconSvg) {
    return `
      <div class="about-ideals__card" id="ideal-${id}">
        <div class="about-ideals__card-icon">${iconSvg}</div>
        <h3 class="about-ideals__card-name">${name}</h3>
        <p class="about-ideals__card-desc">${desc}</p>
      </div>
    `
  }

  /**
   * Icono SVG de check (Simplicidad).
   * @returns {string}
   */
  _iconCheck() {
    return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="#334E9D" stroke-width="3" fill="none"/>
      <path d="M16 24L22 30L32 18" stroke="#334E9D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }

  /**
   * Icono SVG de hoja (Conciencia ambiental).
   * @returns {string}
   */
  _iconLeaf() {
    return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20S35.04 4 24 4z" stroke="#2E7D32" stroke-width="3" fill="none"/>
      <path d="M16 32c0-8 8-12 8-20s8 12 8 20" stroke="#2E7D32" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M18 28h12" stroke="#2E7D32" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  }

  /**
   * Icono SVG de personas (Comunidad).
   * @returns {string}
   */
  _iconPeople() {
    return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="20" r="7" stroke="#DB0076" stroke-width="2.5" fill="none"/>
      <circle cx="30" cy="20" r="7" stroke="#DB0076" stroke-width="2.5" fill="none"/>
      <path d="M10 38c0-6 4-10 8-10h12c4 0 8 4 8 10" stroke="#DB0076" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>`
  }

  /**
   * Icono SVG de estrella (Innovación).
   * @returns {string}
   */
  _iconStar() {
    return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6l4 12h12l-10 7 4 13-10-8-10 8 4-13-10-7h12z" stroke="#FFCD1C" stroke-width="2.5" fill="none"/>
    </svg>`
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
