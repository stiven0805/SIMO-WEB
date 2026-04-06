/**
 * landingShared.js
 * -----------------
 * Funciones compartidas para renderizar el Nav y Footer
 * reutilizados en todas las vistas públicas (Landing, QuiénesSomos, Descargar).
 *
 * No es un ViewModel ni una View, es un helper de renderizado.
 */

import { eventBus } from '../../../../shared/utils/eventBus.js'

/**
 * Renderiza el HTML del Nav con la barra magenta superior.
 * @param {string} activePage - Página activa para resaltar ('home'|'quienes-somos'|'descargar'|'colaboraciones')
 * @returns {string}
 */
export function renderNav(activePage = 'home') {
  /**
   * Genera la clase activa si corresponde.
   * @param {string} page
   * @returns {string}
   */
  const activeClass = (page) => page === activePage ? 'landing-nav__link--active' : ''

  return `
    <!-- ─── TOP STRIP (Barra magenta arriba del nav) ──────── -->
    <div class="landing-topstrip"></div>

    <!-- ─── NAV ───────────────────────────────────────────── -->
    <header class="landing-nav">
      <div class="landing-nav__inner">
        <div class="landing-nav__brand">
          <a href="#" class="landing-nav__logo landing-nav__page-link" data-page="home">SIMÖ</a>
        </div>
        <nav class="landing-nav__links" id="nav-links">
          <a href="#" class="landing-nav__link landing-nav__page-link ${activeClass('quienes-somos')}" data-page="quienes-somos">Quiénes somos</a>
          <a href="#" class="landing-nav__link landing-nav__page-link ${activeClass('descargar')}" data-page="descargar">Descargar</a>
          <div class="landing-nav__dropdown" id="nav-dropdown-ayuda">
            <a href="#" class="landing-nav__link landing-nav__link--dropdown" id="dropdown-toggle-ayuda">Ayuda Con la app</a>
            <div class="landing-nav__dropdown-menu" id="dropdown-menu-ayuda">
              <a href="#" class="landing-nav__dropdown-item">Cómo reciclar</a>
              <a href="#" class="landing-nav__dropdown-item">Cómo canjear recompensas</a>
              <a href="#" class="landing-nav__dropdown-item">Selección de roles y Modificar usuario</a>
            </div>
          </div>
          <a href="#" class="landing-nav__link landing-nav__page-link ${activeClass('colaboraciones')}" data-page="home">Colaboraciones</a>
          <button class="landing-nav__login-btn" id="nav-login-btn">Iniciar Sesión</button>
        </nav>
        <button class="landing-nav__hamburger" id="nav-hamburger" aria-label="Menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `
}

/**
 * Renderiza el HTML del Footer compartido.
 * @returns {string}
 */
export function renderFooter() {
  return `
    <footer class="landing-footer">
      <div class="landing-footer__inner">
        <div class="landing-footer__top">
          <a href="#" class="landing-footer__logo landing-nav__page-link" data-page="home">SIMÖ</a>
          <div class="landing-footer__social">
            <a href="#" class="landing-footer__social-link" aria-label="Twitter">𝕏</a>
            <a href="#" class="landing-footer__social-link" aria-label="YouTube">▶</a>
            <a href="#" class="landing-footer__social-link" aria-label="Google">G</a>
            <a href="#" class="landing-footer__social-link" aria-label="Instagram">📷</a>
            <a href="#" class="landing-footer__social-link" aria-label="Facebook">f</a>
          </div>
        </div>

        <div class="landing-footer__columns">
          <div class="landing-footer__col">
            <p class="landing-footer__col-title">Aplicación</p>
            <a href="#" class="landing-footer__col-link landing-nav__page-link" data-page="descargar">Descargar app</a>
            <a href="#" class="landing-footer__col-link">Dispositivos disponibles</a>
          </div>
          <div class="landing-footer__col">
            <p class="landing-footer__col-title">Beneficios</p>
            <a href="#" class="landing-footer__col-link">Próximas ofertas</a>
            <a href="#" class="landing-footer__col-link">Empresas colaboradoras</a>
          </div>
          <div class="landing-footer__col">
            <p class="landing-footer__col-title">¿Qué somos?</p>
            <a href="#" class="landing-footer__col-link landing-nav__page-link" data-page="quienes-somos">Nuestros ideales</a>
          </div>
          <div class="landing-footer__col">
            <p class="landing-footer__col-title">Ayuda</p>
            <a href="#" class="landing-footer__col-link">Correo de soporte</a>
          </div>
        </div>

        <div class="landing-footer__bottom">
          <p class="landing-footer__copy">© 2026 SIMÖ – Reciclar para transformar</p>
          <a href="#" class="landing-footer__terms">Términos y condiciones</a>
        </div>
      </div>
    </footer>
  `
}

/**
 * Enlaza los eventos de navegación del Nav compartido.
 * Debe llamarse desde _bindEvents() de cada View.
 * @param {import('../../../../core/BaseView').BaseView} view - Instancia de la View
 */
export function bindNavEvents(view) {
  // Navegación entre páginas
  const pageLinks = view.$$('.landing-nav__page-link')
  pageLinks.forEach(link => {
    view._addEvent(link, 'click', (event) => {
      event.preventDefault()
      const page = link.getAttribute('data-page')
      if (page) {
        eventBus.emit('landing:navigate', page)
      }
    })
  })

  // Dropdown "Ayuda con la app"
  const dropdownToggle = view.$('#dropdown-toggle-ayuda')
  const dropdownContainer = view.$('#nav-dropdown-ayuda')
  if (dropdownToggle && dropdownContainer) {
    view._addEvent(dropdownToggle, 'click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      dropdownContainer.classList.toggle('landing-nav__dropdown--open')
    })

    view._addEvent(document, 'click', (event) => {
      if (!dropdownContainer.contains(event.target)) {
        dropdownContainer.classList.remove('landing-nav__dropdown--open')
      }
    })
  }

  // Dropdown items (cerrar menú al click)
  const dropdownItems = view.$$('.landing-nav__dropdown-item')
  dropdownItems.forEach(item => {
    view._addEvent(item, 'click', (event) => {
      event.preventDefault()
      if (dropdownContainer) {
        dropdownContainer.classList.remove('landing-nav__dropdown--open')
      }
    })
  })

  // Login
  const loginBtn = view.$('#nav-login-btn')
  if (loginBtn) {
    view._addEvent(loginBtn, 'click', () => {
      eventBus.emit('landing:goToLogin')
    })
  }

  // Hamburger (mobile)
  const hamburger = view.$('#nav-hamburger')
  const navLinksEl = view.$('#nav-links')
  if (hamburger && navLinksEl) {
    view._addEvent(hamburger, 'click', () => {
      hamburger.classList.toggle('landing-nav__hamburger--active')
      navLinksEl.classList.toggle('landing-nav__links--open')
    })
  }
}

/**
 * Enlaza los eventos del Footer compartido.
 * @param {import('../../../../core/BaseView').BaseView} view - Instancia de la View
 */
export function bindFooterEvents(view) {
  const footerPageLinks = view.$$('.landing-footer .landing-nav__page-link')
  footerPageLinks.forEach(link => {
    view._addEvent(link, 'click', (event) => {
      event.preventDefault()
      const page = link.getAttribute('data-page')
      if (page) {
        eventBus.emit('landing:navigate', page)
      }
    })
  })
}
