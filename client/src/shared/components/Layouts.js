/**
 * Layouts.js
 * ----------
 * Componentes de estructura y navegación para SIMÖ.
 */

import { IconUser } from './Icons.js';

/**
 * Decoraciones de Hero (Líneas curvas blancas)
 */
export const HeroDecos = () => `
  <div class="historial-hero__deco historial-hero__deco--left">
    <svg viewBox="0 0 80 260" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 10 Q10 80 50 130 Q10 180 60 250" stroke="rgba(255,255,255,0.35)" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="historial-hero__deco historial-hero__deco--right">
    <svg viewBox="0 0 80 260" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 10 Q70 80 30 130 Q70 180 20 250" stroke="rgba(255,255,255,0.35)" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>
  </div>
`;

/**
 * Decoraciones de Hero para Colaboraciones (Líneas curvas blancas)
 */
export const ColabsHeroDecos = () => `
  <div class="colabs-hero__deco colabs-hero__deco--left">
    <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 10 Q20 60 80 100 Q20 140 100 190" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="colabs-hero__deco colabs-hero__deco--right">
    <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 10 Q100 60 40 100 Q100 140 20 190" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>
  </div>
`;

/**
 * Decoraciones de Hero para Ayuda (Flor + Diamante)
 * @param {string} flowerSvg
 * @returns {string}
 */
export const AyudaHeroDecorations = (flowerSvg) => `
  <div class="ayuda-hero__decor ayuda-hero__decor--flower-1">${flowerSvg}</div>
  <div class="ayuda-hero__decor ayuda-hero__decor--diamond">◆</div>
`;

/**
 * Navegación Pública
 */
export const PublicNav = (activePage = 'home', theme = 'default') => {
  const themeClass = theme === 'blue' ? 'landing-header--blue' : '';
  const activeClass = (page) => page === activePage ? 'landing-nav__link--active' : '';

  return `
    <div class="landing-header ${themeClass}">
      <div class="landing-topstrip"></div>
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
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="como-reciclar">Cómo reciclar</a>
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="como-canjear">Cómo canjear recompensas</a>
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="roles">Selección de roles y Modificar usuario</a>
              </div>
            </div>
            <a href="#" class="landing-nav__link landing-nav__page-link ${activeClass('colaboraciones')}" data-page="colaboraciones">Colaboraciones</a>
            <button class="landing-nav__login-btn" id="nav-login-btn">Iniciar Sesión</button>
          </nav>
          <button class="landing-nav__hamburger" id="nav-hamburger" aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
    </div>
  `;
};

/**
 * Navegación Autenticada
 */
export const AuthNav = (activePage = '') => {
  const activeClass = (page) => page === activePage ? 'landing-nav__link--active' : '';

  return `
    <div class="landing-header">
      <div class="landing-topstrip"></div>
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
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="como-reciclar">Cómo reciclar</a>
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="como-canjear">Cómo canjear recompensas</a>
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="roles">Selección de roles y Modificar usuario</a>
              </div>
            </div>
            <a href="#" class="landing-nav__link landing-nav__page-link ${activeClass('colaboraciones')}" data-page="colaboraciones">Colaboraciones</a>
            <button class="landing-nav__user-btn" id="nav-user-btn" aria-label="Perfil de usuario">
              ${IconUser()}
            </button>
          </nav>
          <button class="landing-nav__hamburger" id="nav-hamburger" aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
    </div>
  `;
};

/**
 * Footer Compartido
 */
export const SharedFooter = () => `
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
`;
