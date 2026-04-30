(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();class z{constructor(){this._baseUrl="",this._defaultHeaders={"Content-Type":"application/json"},this._interceptors={request:[],response:[]}}setBaseUrl(e){this._baseUrl=e}setHeader(e,a){this._defaultHeaders[e]=a}removeHeader(e){delete this._defaultHeaders[e]}setAuthToken(e){this.setHeader("Authorization",`Bearer ${e}`)}clearAuthToken(){this.removeHeader("Authorization")}addInterceptor(e,a){this._interceptors[e].push(a)}get(e,a={}){return this._request(e,{...a,method:"GET"})}post(e,a,i={}){return this._request(e,{...i,method:"POST",body:JSON.stringify(a)})}put(e,a,i={}){return this._request(e,{...i,method:"PUT",body:JSON.stringify(a)})}patch(e,a,i={}){return this._request(e,{...i,method:"PATCH",body:JSON.stringify(a)})}delete(e,a={}){return this._request(e,{...a,method:"DELETE"})}async _request(e,a={}){let i={...a,headers:{...this._defaultHeaders,...a.headers||{}}};for(const l of this._interceptors.request)i=await l(i);const t=`${this._baseUrl}${e}`;let o;try{o=await fetch(t,i)}catch(l){throw new Error(`Error de red: ${l.message}`)}for(const l of this._interceptors.response)o=await l(o);if(!o.ok){const l=await o.json().catch(()=>({})),d=new Error(l.message||`HTTP ${o.status}`);throw d.status=o.status,d.body=l,d}return(o.headers.get("content-type")||"").includes("application/json")?o.json():o.text()}}const g=new z;class q{constructor(e={}){this._data={},this._listeners={},this._init(e)}_init(e){const a=this.defaults();Object.assign(this._data,a,e)}defaults(){return{}}get(e){return this._data[e]}set(e,a){typeof e=="object"?Object.entries(e).forEach(([i,t])=>{this._data[i]=t,this._notify(i,t)}):(this._data[e]=a,this._notify(e,a))}validate(){return{valid:!0,errors:[]}}toJSON(){return{...this._data}}fromJSON(e){this.set(e)}on(e,a){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(a)}off(e,a){this._listeners[e]&&(this._listeners[e]=this._listeners[e].filter(i=>i!==a))}_notify(e,a){(this._listeners[e]||[]).forEach(o=>o(a,e)),(this._listeners["*"]||[]).forEach(o=>o(a,e))}}class T extends q{defaults(){return{id:null,email:"",name:"",role:"guest",isAuthenticated:!1,createdAt:null}}validate(){const e=[];return(!this.get("email")||!this._isValidEmail(this.get("email")))&&e.push("El email no es válido."),(!this.get("name")||this.get("name").trim().length<2)&&e.push("El nombre debe tener al menos 2 caracteres."),{valid:e.length===0,errors:e}}get fullInfo(){return`${this.get("name")} <${this.get("email")}>`}get isAdmin(){return this.get("role")==="admin"}_isValidEmail(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}}class G{constructor(){this._user=new T,this._token=null,this._listeners=[]}get user(){return this._user}get token(){return this._token}get isAuthenticated(){return this._user.get("isAuthenticated")&&this._token!==null}setSession(e){this._token=e.token,this._user.fromJSON({...e.user,isAuthenticated:!0}),this._persist(),this._notifyListeners()}clearSession(){this._token=null,this._user=new T,this._clearPersisted(),this._notifyListeners()}restore(){try{const e=sessionStorage.getItem("auth_session");if(!e)return;const a=JSON.parse(e);this.setSession(a)}catch{this.clearSession()}}_persist(){sessionStorage.setItem("auth_session",JSON.stringify({token:this._token,user:this._user.toJSON()}))}_clearPersisted(){sessionStorage.removeItem("auth_session")}subscribe(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(a=>a!==e)}}_notifyListeners(){this._listeners.forEach(e=>e({isAuthenticated:this.isAuthenticated,user:this._user.toJSON()}))}}const h=new G;class Q{constructor(){this._events={}}on(e,a){return this._events[e]||(this._events[e]=[]),this._events[e].push(a),()=>this.off(e,a)}once(e,a){const i=(...t)=>{a(...t),this.off(e,i)};this.on(e,i)}off(e,a){this._events[e]&&(this._events[e]=this._events[e].filter(i=>i!==a))}emit(e,a){(this._events[e]||[]).forEach(t=>t(a))}clear(e){delete this._events[e]}clearAll(){this._events={}}}const n=new Q;class u{constructor(e={}){this._viewModel=e.viewModel||null,this._container=this._resolveContainer(e.container),this._eventHandlers=[],this._vmSubscriptions=[],this._isMounted=!1}_resolveContainer(e){return typeof e=="string"?document.querySelector(e):e||null}async mount(){if(!this._container){console.error(`[BaseView] No se encontró el contenedor para ${this.constructor.name}`);return}this._container.innerHTML=this.render(),this._bindViewModel(),this._bindEvents(),this._isMounted=!0,this._viewModel&&await this._viewModel.onMount()}destroy(){this._eventHandlers.forEach(({element:e,event:a,handler:i})=>{e.removeEventListener(a,i)}),this._vmSubscriptions.forEach(({key:e,handler:a})=>{this._viewModel&&this._viewModel.off(e,a)}),this._viewModel&&this._viewModel.onDestroy(),this._eventHandlers=[],this._vmSubscriptions=[],this._isMounted=!1}render(){return""}updatePartial(e,a){const i=this._container.querySelector(e);i&&(i.innerHTML=a)}_bindViewModel(){}_subscribe(e,a){this._viewModel&&(this._viewModel.on(e,a),this._vmSubscriptions.push({key:e,handler:a}))}_bindEvents(){}_addEvent(e,a,i){let t;if(typeof e=="string"?t=this._container.querySelector(e):t=e,!t){console.warn(`[BaseView] No se encontró el elemento: ${e}`);return}t.addEventListener(a,i),this._eventHandlers.push({element:t,event:a,handler:i})}$(e){return this._container?this._container.querySelector(e):null}$$(e){return this._container?this._container.querySelectorAll(e):[]}}class _{constructor(e={}){this._state={},this._listeners={},this._model=e.model||null,this._isLoading=!1,this._error=null,this._initState()}_initState(){this.setState({isLoading:!1,error:null})}getState(e){return this._state[e]}setState(e){const a={...this._state};Object.assign(this._state,e),Object.keys(e).forEach(i=>{a[i]!==this._state[i]&&this._notify(i,this._state[i])}),this._notify("*",this._state)}startLoading(){this.setState({isLoading:!0,error:null})}stopLoading(){this.setState({isLoading:!1})}setError(e){const a=e instanceof Error?e.message:e;this.setState({isLoading:!1,error:a})}clearError(){this.setState({error:null})}async onMount(){}onDestroy(){this._listeners={}}on(e,a){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(a)}off(e,a){this._listeners[e]&&(this._listeners[e]=this._listeners[e].filter(i=>i!==a))}_notify(e,a){(this._listeners[e]||[]).forEach(t=>t(a))}}class U extends q{defaults(){return{title:"SIMÖ",greeting:"Hola soy",description:"Una iniciativa creada para ayudarte a reciclar tus dispositivos electrónicos.",offers:[{icon:"🔋",name:"Baterías",points:1900,quantity:"33x",destination:"EcoCircuit"},{icon:"📱",name:"Teléfono Celular",points:2e3,quantity:"1x",destination:"ReTec Verde"},{icon:"🔌",name:"Cables Eléctricos",points:1800,quantity:"10x",destination:"NovaRecicla"},{icon:"🧊",name:"Refrigerador Grande",points:5e3,quantity:"33x",destination:"TecnoCiclo"},{icon:"⚡",name:"Cables Eléctricos",points:700,quantity:"6x",destination:"GreenVolt"},{icon:"📺",name:"Pantalla de Televisor",points:2900,quantity:"33x",destination:"CicloTech"}],collaborators:[{name:"Falabella",type:"falabella"},{name:"Puntos Colombia",type:"puntos"},{name:"Betty's Bowls",type:"bettys"},{name:"Éxito",type:"exito"},{name:"Alkosto",type:"alkosto"},{name:"Homecenter",type:"homecenter"},{name:"Jumbo",type:"jumbo"},{name:"Rappi",type:"rappi"}]}}validate(){return null}}class Z extends _{_initState(){const e=new U;this.setState({title:e.get("title"),greeting:e.get("greeting"),description:e.get("description"),offers:e.get("offers"),collaborators:e.get("collaborators")})}goToLogin(){n.emit("landing:goToLogin")}goToDownload(){n.emit("landing:goToDownload")}}function w(s){s.$$(".landing-nav__page-link").forEach(d=>{s._addEvent(d,"click",M=>{M.preventDefault();const P=d.getAttribute("data-page");P&&n.emit("landing:navigate",P)})});const a=s.$("#dropdown-toggle-ayuda"),i=s.$("#nav-dropdown-ayuda");a&&i&&(s._addEvent(a,"click",d=>{d.preventDefault(),d.stopPropagation(),i.classList.toggle("landing-nav__dropdown--open")}),s._addEvent(document,"click",d=>{i.contains(d.target)||i.classList.remove("landing-nav__dropdown--open")})),s.$$(".landing-nav__dropdown-item").forEach(d=>{s._addEvent(d,"click",M=>{M.preventDefault(),i&&i.classList.remove("landing-nav__dropdown--open")})});const o=s.$("#nav-login-btn");o&&s._addEvent(o,"click",()=>{n.emit("landing:goToLogin")});const r=s.$("#nav-hamburger"),l=s.$("#nav-links");r&&l&&s._addEvent(r,"click",()=>{r.classList.toggle("landing-nav__hamburger--active"),l.classList.toggle("landing-nav__links--open")})}function I(s){s.$$(".landing-nav__page-link").forEach(l=>{s._addEvent(l,"click",d=>{d.preventDefault();const M=l.getAttribute("data-page");M&&n.emit("landing:navigate",M)})});const a=s.$("#dropdown-toggle-ayuda"),i=s.$("#nav-dropdown-ayuda");a&&i&&(s._addEvent(a,"click",l=>{l.preventDefault(),l.stopPropagation(),i.classList.toggle("landing-nav__dropdown--open")}),s._addEvent(document,"click",l=>{i.contains(l.target)||i.classList.remove("landing-nav__dropdown--open")}));const t=s.$("#nav-user-btn");t&&s._addEvent(t,"click",()=>{n.emit("landing:navigate","perfil")});const o=s.$("#nav-hamburger"),r=s.$("#nav-links");o&&r&&s._addEvent(o,"click",()=>{o.classList.toggle("landing-nav__hamburger--active"),r.classList.toggle("landing-nav__links--open")})}function m(s){s.$$(".landing-footer .landing-nav__page-link").forEach(a=>{s._addEvent(a,"click",i=>{i.preventDefault();const t=a.getAttribute("data-page");t&&n.emit("landing:navigate",t)})})}const p=(s="#DB0076",e="#FFCD1C",a=80)=>`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="${a}" height="${a}">
    <rect x="38" y="5" width="24" height="90" rx="2" fill="${s}"/>
    <rect x="5" y="38" width="90" height="24" rx="2" fill="${s}"/>
    <rect x="18" y="18" width="24" height="64" rx="2" fill="${s}" transform="rotate(45 50 50)"/>
    <rect x="18" y="18" width="64" height="24" rx="2" fill="${s}" transform="rotate(45 50 50)"/>
    <circle cx="50" cy="50" r="18" fill="${s}"/>
    <circle cx="50" cy="50" r="13" fill="${e}"/>
  </svg>
`,J=()=>`
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" stroke="#334E9D" stroke-width="3" fill="none"/>
    <path d="M16 24L22 30L32 18" stroke="#334E9D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`,Y=()=>`
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20S35.04 4 24 4z" stroke="#2E7D32" stroke-width="3" fill="none"/>
    <path d="M16 32c0-8 8-12 8-20s8 12 8 20" stroke="#2E7D32" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M18 28h12" stroke="#2E7D32" stroke-width="2" stroke-linecap="round"/>
  </svg>
`,W=()=>`
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="20" r="7" stroke="#DB0076" stroke-width="2.5" fill="none"/>
    <circle cx="30" cy="20" r="7" stroke="#DB0076" stroke-width="2.5" fill="none"/>
    <path d="M10 38c0-6 4-10 8-10h12c4 0 8 4 8 10" stroke="#DB0076" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  </svg>
`,X=()=>`
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6l4 12h12l-10 7 4 13-10-8-10 8 4-13-10-7h12z" stroke="#FFCD1C" stroke-width="2.5" fill="none"/>
  </svg>
`,K=()=>`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
`,H=s=>({Celular:"📱",Batería:"🔋",Baterías:"🔋",Tablet:"📟",Laptop:"💻"})[s]||"📦",B=(s=120)=>`
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}">
    <rect x="45" y="5" width="30" height="110" rx="2" fill="#FFCD1C"/>
    <rect x="5" y="45" width="110" height="30" rx="2" fill="#FFCD1C"/>
    <rect x="21" y="21" width="30" height="78" rx="2" fill="#FFCD1C" transform="rotate(45 60 60)"/>
    <rect x="21" y="21" width="78" height="30" rx="2" fill="#FFCD1C" transform="rotate(45 60 60)"/>
    <circle cx="60" cy="60" r="22" fill="#FFCD1C"/>
    <circle cx="60" cy="60" r="17" fill="#334E9D"/>
  </svg>
`,N=()=>`
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
`,ee=()=>`
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
`,D=s=>`
  <div class="ayuda-hero__decor ayuda-hero__decor--flower-1">${s}</div>
  <div class="ayuda-hero__decor ayuda-hero__decor--diamond">◆</div>
`,y=(s="home",e="default")=>{const a=e==="blue"?"landing-header--blue":"",i=t=>t===s?"landing-nav__link--active":"";return`
    <div class="landing-header ${a}">
      <div class="landing-topstrip"></div>
      <header class="landing-nav">
        <div class="landing-nav__inner">
          <div class="landing-nav__brand">
            <a href="#" class="landing-nav__logo landing-nav__page-link" data-page="home">SIMÖ</a>
          </div>
          <nav class="landing-nav__links" id="nav-links">
            <a href="#" class="landing-nav__link landing-nav__page-link ${i("quienes-somos")}" data-page="quienes-somos">Quiénes somos</a>
            <a href="#" class="landing-nav__link landing-nav__page-link ${i("descargar")}" data-page="descargar">Descargar</a>
            <div class="landing-nav__dropdown" id="nav-dropdown-ayuda">
              <a href="#" class="landing-nav__link landing-nav__link--dropdown" id="dropdown-toggle-ayuda">Ayuda Con la app</a>
              <div class="landing-nav__dropdown-menu" id="dropdown-menu-ayuda">
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="como-reciclar">Cómo reciclar</a>
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="como-canjear">Cómo canjear recompensas</a>
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="roles">Selección de roles y Modificar usuario</a>
              </div>
            </div>
            <a href="#" class="landing-nav__link landing-nav__page-link ${i("colaboraciones")}" data-page="colaboraciones">Colaboraciones</a>
            <button class="landing-nav__login-btn" id="nav-login-btn">Iniciar Sesión</button>
          </nav>
          <button class="landing-nav__hamburger" id="nav-hamburger" aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
    </div>
  `},R=(s="")=>{const e=a=>a===s?"landing-nav__link--active":"";return`
    <div class="landing-header">
      <div class="landing-topstrip"></div>
      <header class="landing-nav">
        <div class="landing-nav__inner">
          <div class="landing-nav__brand">
            <a href="#" class="landing-nav__logo landing-nav__page-link" data-page="home">SIMÖ</a>
          </div>
          <nav class="landing-nav__links" id="nav-links">
            <a href="#" class="landing-nav__link landing-nav__page-link ${e("quienes-somos")}" data-page="quienes-somos">Quiénes somos</a>
            <a href="#" class="landing-nav__link landing-nav__page-link ${e("descargar")}" data-page="descargar">Descargar</a>
            <div class="landing-nav__dropdown" id="nav-dropdown-ayuda">
              <a href="#" class="landing-nav__link landing-nav__link--dropdown" id="dropdown-toggle-ayuda">Ayuda Con la app</a>
              <div class="landing-nav__dropdown-menu" id="dropdown-menu-ayuda">
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="como-reciclar">Cómo reciclar</a>
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="como-canjear">Cómo canjear recompensas</a>
                <a href="#" class="landing-nav__dropdown-item landing-nav__page-link" data-page="roles">Selección de roles y Modificar usuario</a>
              </div>
            </div>
            <a href="#" class="landing-nav__link landing-nav__page-link ${e("colaboraciones")}" data-page="colaboraciones">Colaboraciones</a>
            <button class="landing-nav__user-btn" id="nav-user-btn" aria-label="Perfil de usuario">
              ${K()}
            </button>
          </nav>
          <button class="landing-nav__hamburger" id="nav-hamburger" aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
    </div>
  `},f=()=>`
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
`,C=({id:s,name:e,desc:a,iconSvg:i})=>`
  <div class="about-ideals__card" id="ideal-${s}">
    <div class="about-ideals__card-icon">${i}</div>
    <h3 class="about-ideals__card-name">${e}</h3>
    <p class="about-ideals__card-desc">${a}</p>
  </div>
`,ae=s=>`
  <div class="historial-card historial-card--${s.color}">
    <div class="historial-card__device">
      <span class="historial-card__qty">${s.quantity}</span>
      <span class="historial-card__icon">${H(s.device)}</span>
      <span class="historial-card__label">${s.device}</span>
    </div>
    <div class="historial-card__info">
      <p class="historial-card__company">${s.company} <span class="historial-card__status-text">${s.status}</span></p>
      <p class="historial-card__desc">${s.statusDesc}</p>
      <p class="historial-card__date">Fecha: ${s.date}</p>
    </div>
  </div>
`,se=s=>{const e=p("#FFCD1C","#DB0076",22);return`
    <div class="notif-card" id="notif-${s.id}">
      <div class="notif-card__device">
        <span class="notif-card__qty">${s.quantity}</span>
        <span class="notif-card__icon">${H(s.device)}</span>
        <span class="notif-card__label">${s.device}</span>
      </div>
      <div class="notif-card__info">
        <p class="notif-card__row">Destino: <strong>${s.destination}</strong></p>
        <p class="notif-card__row">Electrodoméstico: ${s.device}</p>
        <p class="notif-card__row">Fecha: ${s.date}</p>
      </div>
      <div class="notif-card__right">
        <div class="notif-card__points">
          ${e}
          <span>${s.points}</span>
        </div>
        <p class="notif-card__status notif-card__status--${s.statusColor}">Estado: <strong>${s.status}</strong></p>
      </div>
    </div>
  `},S=({number:s,title:e,desc:a})=>`
  <div class="download-steps__card">
    <div class="download-steps__card-number">${s}</div>
    <h3 class="download-steps__card-title">${e}</h3>
    <p class="download-steps__card-desc">${a}</p>
  </div>
`,c=({name:s,type:e})=>`
  <div class="colabs-logo colabs-logo--${e}">
    <span>${s}</span>
  </div>
`,v=(s,e)=>`
  <div class="ayuda-hero__step">
    <span class="ayuda-hero__step-num">${s}</span>
    <p class="ayuda-hero__step-text">${e}</p>
  </div>
`,ie=s=>`
  <div class="ayuda-phone">
    <div class="ayuda-phone__screen">
      <div class="ayuda-phone__topbar">
        <span class="ayuda-phone__logo">SIMÖ</span>
      </div>
      <div class="ayuda-phone__body">
        <div class="ayuda-phone__points-badge" style="background:${s};">
          <span>🪙</span>
          <strong>1100</strong>
        </div>
        <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px;"></div>
        <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px; width: 75%;"></div>
        <div style="display:flex; gap:6px; margin-top:8px;">
          <div style="background:#e8e8e8; border-radius:6px; height: 28px; flex:1;"></div>
          <div style="background:#e8e8e8; border-radius:6px; height: 28px; flex:1;"></div>
        </div>
      </div>
      <div class="ayuda-phone__bottombar">
        <span>⌂</span><span>☰</span><span>◻</span><span>👤</span>
      </div>
    </div>
  </div>
`,V=(s="#DB0076")=>`
  <div class="ayuda-phone">
    <div class="ayuda-phone__screen">
      <div class="ayuda-phone__topbar">
        <span class="ayuda-phone__logo">SIMÖ</span>
        <span style="font-size:0.55rem; color:#999;">●●●</span>
      </div>
      <div class="ayuda-phone__body">
        <p style="font-family:'Outfit',sans-serif; font-size:0.7rem; font-weight:800; color:#1a1a1a; margin-bottom:4px;">¡HOLA!<br>BIENVENIDO</p>
        <div style="background:${s}; border-radius:20px; padding:4px 0; text-align:center; color:#fff; font-size:0.6rem; font-weight:700; margin-bottom:6px;">Iniciar sesión</div>
        <div style="background:#f0f0f0; border-radius:20px; padding:4px 0; text-align:center; color:#1a1a1a; font-size:0.6rem; font-weight:700;">INICIAR COMO APP</div>
      </div>
      <div class="ayuda-phone__bottombar">
        <span>⌂</span><span>☰</span><span>◻</span><span>👤</span>
      </div>
    </div>
  </div>
`,j=(s=!1)=>`
  <div class="ayuda-phone">
    <div class="ayuda-phone__screen">
      <div class="ayuda-phone__topbar">
        <span class="ayuda-phone__logo">SIMÖ</span>
        <span style="font-size:0.55rem; color:#999;">●●●</span>
      </div>
      <div class="ayuda-phone__body">
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
          <div style="width:28px; height:28px; background:#FFCD1C; border-radius:50%;"></div>
          <div>
            <div style="background:#eee; height:8px; border-radius:4px; width:60px; margin-bottom:3px;"></div>
            <div style="background:#eee; height:7px; border-radius:4px; width:40px;"></div>
          </div>
        </div>
        ${s?`
          <div style="background:#eee; height:11px; border-radius:4px; margin-bottom:4px;"></div>
          <div style="background:#eee; height:11px; border-radius:4px; margin-bottom:4px;"></div>
          <div style="background:#eee; height:11px; border-radius:4px; margin-bottom:4px; width:70%;"></div>
          <div style="background:#DB0076; border-radius:20px; padding:3px 0; text-align:center; color:#fff; font-size:0.55rem; font-weight:700; margin-top:4px;">Confirmar</div>
        `:`
          <div style="background:#DB0076; border-radius:6px; height:22px; margin-bottom:4px;"></div>
          <div style="background:#eee; height:10px; border-radius:4px; margin-bottom:4px;"></div>
          <div style="background:#eee; height:10px; border-radius:4px; width:60%;"></div>
        `}
      </div>
      <div class="ayuda-phone__bottombar">
        <span>⌂</span><span>☰</span><span>◻</span><span>👤</span>
      </div>
    </div>
  </div>
`,te=s=>`
  <div class="offer-card">
    <div class="offer-card__icon-wrapper">
      <span class="offer-card__badge">${s.quantity}</span>
      <span class="offer-card__icon">${s.icon}</span>
    </div>
    <div class="offer-card__points">
      <span class="offer-card__points-icon">🪙</span>
      ${s.points}
    </div>
    <p class="offer-card__name">${s.name}</p>
    <p class="offer-card__dest">Destino: ${s.destination}</p>
  </div>
`;class A extends u{constructor(e={}){const a=e.viewModel||new Z;super({...e,viewModel:a})}render(){return`
      <div class="landing">

        ${y("home")}

        <!-- ─── HERO ────────────────────────────────────────────── -->
        <section class="landing-hero" id="hero">
          <div class="landing-hero__flower landing-hero__flower--big">${B(120)}</div>
          <div class="landing-hero__flower landing-hero__flower--small">${B(80)}</div>
          <div class="landing-hero__circle landing-hero__circle--blue"></div>
          <div class="landing-hero__circle landing-hero__circle--yellow-ring"></div>
          <div class="landing-hero__triangle landing-hero__triangle--yellow-1"></div>
          <div class="landing-hero__triangle landing-hero__triangle--yellow-2"></div>
          <div class="landing-hero__dot landing-hero__dot--1"></div>
          <div class="landing-hero__dot landing-hero__dot--2"></div>

          <div class="landing-hero__inner">
            <div class="landing-hero__robot">
              <img
                src="./assets/images/robot-simo.png"
                alt="SIMÖ Robot Mascota"
                class="landing-hero__robot-img"
                id="robot-img"
              />
            </div>

            <div class="landing-hero__content">
              <p class="landing-hero__greeting" id="landing-greeting">Hola soy</p>
              <h1 class="landing-hero__title" id="landing-title">SIMÖ</h1>
              <p class="landing-hero__subtitle">Únete a nosotros</p>

              <div class="landing-hero__text-block">
                <p class="landing-hero__text">
                  Soy SIMÖ, <strong>una iniciativa creada para ayudarte a reciclar tus
                  dispositivos electrónicos</strong> de forma fácil, responsable y con
                  beneficios para ti.
                </p>
              </div>

              <div class="landing-hero__text-block">
                <p class="landing-hero__text">
                  Te acompaño en el proceso de <strong>darle otra vida a la tecnología</strong>,
                  conectándote con opciones de reciclaje seguras mientras ganas
                  recompensas por cuidar el planeta.
                </p>
              </div>

              <div class="landing-hero__text-block">
                <p class="landing-hero__text">
                  <a href="#descargar" class="landing-nav__page-link" data-page="descargar">Descarga la aplicación</a> y empieza a reciclar de una manera sencilla,
                  consciente y con impacto positivo para el medio ambiente.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ─── WAVE TRANSITION ────────────────────────────────── -->
        <div class="landing-wave">
          <span class="landing-wave__star">✦</span>
          <svg class="landing-wave__svg" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0C360 70 1080 70 1440 0V80H0V0Z" fill="#FFFCE7"/>
            <path d="M0 10C360 80 1080 80 1440 10V0C1080 70 360 70 0 0Z" fill="#DB0076"/>
          </svg>
        </div>

        <!-- ─── OFFERS ──────────────────────────────────────────── -->
        <section class="landing-offers" id="ofertas">
          <div class="landing-offers__inner">
            <div class="landing-offers__text">
              <h2 class="landing-offers__title">
                <span class="landing-offers__title-top">¡Ofertas</span>
                <span class="landing-offers__title-bottom">próximas!</span>
              </h2>
              <p class="landing-offers__desc">
                Muy pronto en Simo encontrarás <strong>ofertas y beneficios</strong>
                especiales diseñados para premiar tu compromiso con el
                reciclaje electrónico.
              </p>
              <p class="landing-offers__desc">
                Al reciclar tus dispositivos podrás acceder a <strong>recompensas
                exclusivas, descuentos en marcas aliadas</strong> y experiencias
                sostenibles que impulsan un estilo de vida más consciente.
              </p>
              <p class="landing-offers__desc">
                Estas ofertas estarán disponibles <strong>dentro de la aplicación</strong> y se
                actualizarán constantemente para que cada acción que realices
                tenga un impacto positivo, tanto para ti como para el planeta.
              </p>
            </div>

            <div class="landing-offers__grid-wrapper">
              <h3 class="landing-offers__grid-title">¡Recicladores buscan tus electrodomésticos!</h3>
              <div class="landing-offers__grid" id="offers-grid">
                ${(this._viewModel.getState("offers")||[]).map(e=>te(e)).join("")}
              </div>
              <p class="landing-offers__date">Próximamente · <span>18 de julio de 2026</span></p>
            </div>
          </div>
        </section>

        <!-- ─── COLLABORATORS ────────────────────────────────────── -->
        <section class="landing-collabs" id="colaboraciones">
          <div class="landing-collabs__inner">
            <h2 class="landing-collabs__title">¡Colaboradores en SIMÖ!</h2>
            <p class="landing-collabs__desc">
              Empresas y marcas aliadas que <strong>recompensan tu compromiso</strong> con el reciclaje.
              Acumula puntos en SIMÖ y canjéalos por beneficios, descuentos y experiencias
              sostenibles en nuestros establecimientos asociados.
            </p>
            <div class="landing-collabs__carousel">
              <div class="landing-collabs__track" id="collabs-track">
                ${this._renderCollabLogos()}
                ${this._renderCollabLogos()}
              </div>
            </div>
          </div>
        </section>

        ${f()}

      </div>
    `}_renderCollabLogos(){return(this._viewModel.getState("collaborators")||[]).map(a=>`
      <div class="landing-collabs__logo-item">
        <span class="landing-collabs__logo-text landing-collabs__logo-text--${a.type}">
          ${a.name}
        </span>
      </div>
    `).join("")}_bindViewModel(){this._subscribe("title",e=>{const a=this.$("#landing-title");a&&(a.textContent=e)}),this._subscribe("greeting",e=>{const a=this.$("#landing-greeting");a&&(a.textContent=e)})}_bindEvents(){w(this),m(this),this.$$('a[href^="#"]').forEach(a=>{a.classList.contains("landing-nav__page-link")||this._addEvent(a,"click",i=>{const t=a.getAttribute("href");if(t&&t.startsWith("#")&&t.length>1){i.preventDefault();const o=document.querySelector(t);o&&o.scrollIntoView({behavior:"smooth"})}})})}}class oe extends _{_initState(){this.setState({pageTitle:"Quiénes somos — SIMÖ"})}}class ne extends u{constructor(e={}){const a=e.viewModel||new oe;super({...e,viewModel:a})}render(){return`
      <div class="landing">

        ${y("quienes-somos","blue")}

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
                ${p("#DB0076","#FFCD1C",100)}
                ${p("#FFCD1C","#334E9D",100)}
                ${p("#2E7D32","#FFCD1C",100)}
              </div>
            </div>
          </div>
        </section>

        <!-- ─── IDEALES DE SIMÖ ────────────────────────────────── -->
        <section class="about-ideals" id="ideales">
          <div class="about-ideals__inner">
            <h2 class="about-ideals__title">¡Ideales de <span>SIMÖ</span>!</h2>
            <div class="about-ideals__flowers">
              ${p("#DB0076","#FFCD1C",80)}
              ${p("#FFCD1C","#334E9D",80)}
              ${p("#2E7D32","#FFCD1C",80)}
              ${p("#334E9D","#DB0076",80)}
              ${p("#DB0076","#334E9D",80)}
              ${p("#FFCD1C","#DB0076",80)}
              ${p("#2E7D32","#334E9D",80)}
              ${p("#334E9D","#FFCD1C",80)}
            </div>
            <div class="about-ideals__grid">
              ${C({id:"simplicidad",name:"Simplicidad",desc:"Hacer del reciclaje tecnológico un proceso fácil y accesible para todos.",iconSvg:J()})}
              ${C({id:"conciencia",name:"Conciencia ambiental",desc:"Promover hábitos responsables que reduzcan el impacto de los residuos electrónicos.",iconSvg:Y()})}
              ${C({id:"comunidad",name:"Comunidad",desc:"Conectar personas, empresas y cadenas de reciclaje bajo un objetivo común: cuidar el medio ambiente.",iconSvg:W()})}
              ${C({id:"innovacion",name:"Innovación",desc:"Usar la tecnología como herramienta para generar cambios positivos en ciudades.",iconSvg:X()})}
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

        ${f()}

      </div>
    `}_bindViewModel(){}_bindEvents(){w(this),m(this)}}class re extends _{_initState(){this.setState({pageTitle:"Descargar — SIMÖ"})}}class le extends u{constructor(e={}){const a=e.viewModel||new re;super({...e,viewModel:a})}render(){return`
      <div class="landing">

        ${y("descargar")}

        <!-- ─── DESCARGAR HERO ─────────────────────────────────── -->
        <section class="download-hero">
          <div class="download-hero__inner">
            <div class="download-hero__content">
              <h1 class="download-hero__title">Descarga <span>SIMÖ</span></h1>
              <p class="download-hero__subtitle">¡Comienza a reciclar desde tu teléfono!</p>
              <p class="download-hero__text">
                Descarga nuestra aplicación y empieza a <strong>reciclar tus
                dispositivos electrónicos</strong> de forma fácil y segura.
                Gana recompensas por cada dispositivo que recicles y
                contribuye a un planeta más sostenible.
              </p>
              <div class="download-hero__stores">
                <a href="#" class="download-hero__store-btn download-hero__store-btn--google" id="download-google-play">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.196 12l2.502-2.492zM5.864 2.658L16.8 9.99l-2.302 2.302L5.864 2.658z"/>
                  </svg>
                  <div class="download-hero__store-text">
                    <span class="download-hero__store-label">DESCÁRGALA EN</span>
                    <span class="download-hero__store-name">Google Play</span>
                  </div>
                </a>
                <a href="#" class="download-hero__store-btn download-hero__store-btn--apple" id="download-app-store">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div class="download-hero__store-text">
                    <span class="download-hero__store-label">DESCÁRGALA EN</span>
                    <span class="download-hero__store-name">App Store</span>
                  </div>
                </a>
              </div>
              <div class="download-hero__features">
                <div class="download-hero__feature">
                  <span class="download-hero__feature-icon">🔄</span>
                  <span class="download-hero__feature-text">Recicla fácil</span>
                </div>
                <div class="download-hero__feature">
                  <span class="download-hero__feature-icon">🏆</span>
                  <span class="download-hero__feature-text">Gana puntos</span>
                </div>
                <div class="download-hero__feature">
                  <span class="download-hero__feature-icon">🌍</span>
                  <span class="download-hero__feature-text">Cuida el planeta</span>
                </div>
              </div>
            </div>
            <div class="download-hero__visual">
              <div class="download-hero__phone-mockup">
                <div class="download-hero__phone-screen">
                  <div class="download-hero__phone-header">
                    <span class="download-hero__phone-logo">SIMÖ</span>
                  </div>
                  <div class="download-hero__phone-body">
                    <p class="download-hero__phone-greeting">¡Hola!</p>
                    <p class="download-hero__phone-text">Empieza a reciclar hoy</p>
                    <div class="download-hero__phone-cards">
                      <div class="download-hero__phone-card download-hero__phone-card--yellow"></div>
                      <div class="download-hero__phone-card download-hero__phone-card--blue"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="download-hero__decor">
                <div class="download-hero__decor-circle download-hero__decor-circle--1"></div>
                <div class="download-hero__decor-circle download-hero__decor-circle--2"></div>
                ${p("#FFCD1C","#DB0076",100)}
              </div>
            </div>
          </div>
        </section>

        <!-- ─── PASOS PARA DESCARGAR ──────────────────────────── -->
        <section class="download-steps">
          <div class="download-steps__inner">
            <h2 class="download-steps__title">¿Cómo <span>empezar</span>?</h2>
            <div class="download-steps__grid">
              ${S({number:1,title:"Descarga la app",desc:"Descarga SIMÖ desde Google Play o App Store completamente gratis."})}
              ${S({number:2,title:"Regístrate",desc:"Crea tu cuenta en pocos segundos con tu correo electrónico."})}
              ${S({number:3,title:"Empieza a reciclar",desc:"Registra tus dispositivos, ubica puntos de recolección y gana recompensas."})}
            </div>
          </div>
        </section>

        ${f()}

      </div>
    `}_bindViewModel(){}_bindEvents(){w(this),m(this)}}class de extends _{_initState(){}}class ce extends u{constructor(e={}){const a=e.viewModel||new de;super({...e,viewModel:a})}render(){return`
      <div class="landing">

        ${y("","blue")}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="ayuda-hero ayuda-hero--blue">
          ${D(p("#DB0076","#FFCD1C",80))}
          <div class="ayuda-hero__decor ayuda-hero__decor--triangle-1">▲</div>
          <div class="ayuda-hero__decor ayuda-hero__decor--triangle-2">▶</div>
          <div class="ayuda-hero__inner">
            <div class="ayuda-hero__content">
              <p class="ayuda-hero__pre">Cómo</p>
              <h1 class="ayuda-hero__title">Reciclar</h1>
              <p class="ayuda-hero__desc">
                Reciclar en SIMÖ es un <strong>proceso simple y accesible</strong> que te permite
                entregar tus dispositivos electrónicos de manera responsable,
                contribuyendo activamente al cuidado del medio ambiente.
              </p>
              <p class="ayuda-hero__desc">
                A través de un sistema fácil de usar, <strong>puedes registrar los
                equipos que deseas reciclar</strong>, coordinar su entrega y asegurarte
                de que sean gestionados correctamente.
              </p>
            </div>

            <div class="ayuda-hero__steps">
              ${v(1,"Desde la pantalla principal, <strong>ingresa al menú</strong> de Opciones y selecciona la sección Reciclar para comenzar el proceso.")}
              ${v(2,"Selecciona el tipo de dispositivo que deseas entregar. La aplicación mostrará categorías para facilitar la selección.")}
              ${v(3,"Escoge si deseas llevar el dispositivo a un punto de recolección o solicitar recogida.")}
              ${v(4,"Revisa la información y <strong>confirma la solicitud.</strong> El estado cambiará cuando el proceso sea validado.")}
            </div>
          </div>
        </section>

        <!-- ─── MOCKUPS ────────────────────────────────────────── -->
        <section class="ayuda-mockups">
          <div class="ayuda-mockups__inner">
            ${[{num:1,label:"Desde la pantalla principal, ingresa al menú de Opciones y selecciona la sección Reciclar para comenzar el proceso.",color:"#FFCD1C"},{num:2,label:"Selecciona el tipo de dispositivo que deseas entregar. La aplicación mostrará categorías para facilitar la selección.",color:"#DB0076"},{num:3,label:"Escoge si deseas llevar el dispositivo a un punto de recolección o solicitar recogida.",color:"#FFCD1C"},{num:4,label:"Revisa la información y confirma la solicitud. El estado cambiará cuando el proceso sea validado.",color:"#334E9D"}].map(e=>`
              <div class="ayuda-mockups__item">
                <span class="ayuda-mockups__step-num">${e.num}</span>
                <div class="ayuda-phone">
                  <div class="ayuda-phone__screen">
                    <div class="ayuda-phone__topbar">
                      <span class="ayuda-phone__logo">SIMÖ</span>
                    </div>
                    <div class="ayuda-phone__body">
                      <div class="ayuda-phone__block" style="background:${e.color}; height: 28px; border-radius: 6px; margin-bottom: 8px;"></div>
                      <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px;"></div>
                      <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px; width: 70%;"></div>
                      <div class="ayuda-phone__block" style="background: ${e.color}33; height: 40px; border-radius: 8px; margin-top: 8px;"></div>
                    </div>
                    <div class="ayuda-phone__bottombar">
                      <span>⌂</span><span>☰</span><span>◻</span><span>👤</span>
                    </div>
                  </div>
                </div>
                <p class="ayuda-mockups__caption">${e.label}</p>
              </div>
            `).join("")}
          </div>
        </section>

        ${f()}

      </div>
    `}_bindViewModel(){}_bindEvents(){w(this),m(this)}}class pe extends _{_initState(){}}class ue extends u{constructor(e={}){const a=e.viewModel||new pe;super({...e,viewModel:a})}render(){return`
      <div class="landing">

        ${y("","blue")}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="ayuda-hero ayuda-hero--blue">
          ${D(p("#FFCD1C","#DB0076",80))}
          <div class="ayuda-hero__inner">
            <div class="ayuda-hero__content">
              <p class="ayuda-hero__pre">Cómo</p>
              <h1 class="ayuda-hero__title ayuda-hero__title--yellow">canjear</h1>
              <p class="ayuda-hero__desc">
                Los puntos acumulados <strong>pueden convertirse en beneficios</strong>
                dentro de las empresas colaboradoras.
              </p>
              <p class="ayuda-hero__desc">
                permitiéndote acceder a <strong>recompensas</strong>, descuentos y
                experiencias mientras apoyas iniciativas sostenibles y fomentas
                un impacto positivo en el cuidado del medio ambiente.
              </p>
            </div>

            <div class="ayuda-hero__steps">
              ${v(1,"Ingresa a la sección <strong>Recompensas o Canjear</strong> desde el menú principal.")}
              ${v(2,"<strong>Visualiza las ofertas disponibles</strong> y revisa cuántos puntos necesitas.")}
              ${v(3,"Elige el beneficio que <strong>deseas canjear.</strong>")}
              ${v(4,"Confirma la acción y <strong>recibe tu cupón</strong> en tu correo electrónico.")}
            </div>
          </div>
        </section>

        <!-- ─── MOCKUPS ────────────────────────────────────────── -->
        <section class="ayuda-mockups">
          <div class="ayuda-mockups__inner">
            ${[{num:1,label:"Ingresa a la sección Recompensas o Canjear desde el menú principal.",color:"#FFCD1C"},{num:2,label:"Visualiza las ofertas disponibles y revisa cuántos puntos necesitas.",color:"#FFCD1C"},{num:3,label:"Elige el beneficio que deseas canjear.",color:"#DB0076"},{num:4,label:"Confirma la acción y recibe tu cupón en tu correo electrónico.",color:"#DB0076"}].map(e=>`
              <div class="ayuda-mockups__item">
                <span class="ayuda-mockups__step-num">${e.num}</span>
                ${ie(e.color)}
                <p class="ayuda-mockups__caption">${e.label}</p>
              </div>
            `).join("")}
          </div>
        </section>

        ${f()}

      </div>
    `}_bindViewModel(){}_bindEvents(){w(this),m(this)}}class _e extends _{_initState(){}}class he extends u{constructor(e={}){const a=e.viewModel||new _e;super({...e,viewModel:a})}render(){return`
      <div class="landing">

        ${y("","blue")}

        <!-- ─── HERO "ROLES" ──────────────────────────────────── -->
        <section class="ayuda-hero ayuda-hero--blue">
          ${D(p("#FFCD1C","#334E9D",80))}
          <div class="ayuda-hero__inner ayuda-hero__inner--roles">
            <div class="ayuda-hero__content">
              <h1 class="ayuda-hero__title--roles">Roles...</h1>
              <p class="ayuda-hero__desc">
                En SIMÖ puedes elegir el rol que mejor se adapte a tu participación
                dentro de la aplicación.
              </p>
              <p class="ayuda-hero__desc">
                Cada rol está diseñado para ofrecer funciones específicas según la
                forma en que desees contribuir: ya sea reciclando dispositivos o apoyando el proceso.
              </p>

              <div class="ayuda-roles__steps">
                ${v(1,'Cuando <strong>estés iniciando</strong>, dale el <strong>botón "Tú eres"</strong> y escoge el rol que quieras tener.')}
                ${v(2,"Si vas a entregar dispositivos, <strong>elige usuario reciclador</strong>; si vas a recolos, <strong>selecciona usuario recolector</strong>.")}
              </div>
            </div>

            <div class="ayuda-hero__phones-pair">
              ${V("#DB0076")}
              ${V("#DB0076")}
            </div>
          </div>
        </section>

        <!-- ─── Modificar usuario ──────────────────────────────── -->
        <section class="ayuda-modificar">
          <div class="ayuda-modificar__inner">
            <div class="ayuda-modificar__phones">
              ${j(!1)}
              ${j(!0)}
            </div>

            <div class="ayuda-modificar__content">
              <p class="ayuda-modificar__pre">Modificar</p>
              <h2 class="ayuda-modificar__title">usuario</h2>
              <p class="ayuda-modificar__desc">
                Puedes actualizar tu información personal en cualquier momento para mantener tus datos al día.
              </p>

              <div class="ayuda-modificar__steps">
                ${v(1,"Accede al <strong>apartado Usuario</strong> desde el menú inferior y Presiona el botón <strong>Editar perfil</strong>.")}
                ${v(2,"Modifica nombre, teléfono, dirección o correo electrónico y <strong>confirma para actualizar tu información.</strong>")}
              </div>
            </div>
          </div>
        </section>

        ${f()}

      </div>
    `}_bindViewModel(){}_bindEvents(){w(this),m(this)}}class ve extends _{_initState(){}}class ge extends u{constructor(e={}){const a=e.viewModel||new ve;super({...e,viewModel:a})}render(){return`
      <div class="landing">

        ${y("colaboraciones")}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="colabs-hero">
          ${ee()}
          <div class="colabs-hero__inner">
            <p class="colabs-hero__logo-text">SIMÖ</p>
            <h1 class="colabs-hero__title">Colaboradores SIMÖ</h1>
            <p class="colabs-hero__desc">
              En esta sección encontrarás las <strong>empresas y organizaciones</strong> que hacen posible el
              ecosistema de SIMÖ. Con tu participación, la aplicación puede ofrecer el reciclaje
              electrónico y ofrecer beneficios a quienes forma parte de esta iniciativa.
            </p>
          </div>
        </section>

        <!-- ─── EMPRESAS QUE RECOMPENSAN ─────────────────────── -->
        <section class="colabs-section">
          <div class="colabs-section__inner">
            <div class="colabs-card">
              <h2 class="colabs-card__title">Empresas que recompensan</h2>
              <p class="colabs-card__desc">
                Estas empresas apoyan la iniciativa ofreciendo beneficios, descuentos y recompensas a los
                usuarios que reciclan sus dispositivos electrónicos a través de SIMÖ. Tu participación impulsa
                una cultura más responsable con la tecnología y el medio ambiente.
              </p>
              <div class="colabs-card__grid">
                ${c({name:"H&M",type:"hm"})}
                ${c({name:"KOAJ",type:"koaj"})}
                ${c({name:"verdeo",type:"verdeo"})}
                ${c({name:"falabella.",type:"falabella"})}
                ${c({name:"⬛ Alkatronic<br><small>professional</small>",type:"alkatronic"})}
                ${c({name:"Betty's<br>bowls",type:"bettys"})}
                ${c({name:"Ⓟ Puntos<br>Colombia",type:"puntos"})}
                ${c({name:"JUMBO",type:"jumbo"})}
                ${c({name:"∼elo∼",type:"elo"})}
              </div>
            </div>
          </div>
        </section>

        <!-- ─── EMPRESAS DE RECOLECCIÓN ───────────────────────── -->
        <section class="colabs-section colabs-section--last">
          <div class="colabs-section__inner">
            <div class="colabs-card">
              <h2 class="colabs-card__title">Empresas de recolección</h2>
              <p class="colabs-card__desc">
                Estas organizaciones están encargadas de recibir, clasificar y gestionar los
                dispositivos electrónicos que se reciclan. Su trabajo permite asegurar que los equipos
                tengan un proceso adecuado de reutilización o reciclaje, reduciendo el impacto
                ambiental de los residuos tecnológicos.
              </p>
              <div class="colabs-card__grid">
                ${c({name:"⚙ RAEE",type:"raee"})}
                ${c({name:"RED VERDE",type:"red-verde"})}
                ${c({name:"♲ ECO<br>CÓMPUTO",type:"eco-computo"})}
                ${c({name:"RESITER",type:"resiter"})}
                ${c({name:"recopila",type:"recopila"})}
                ${c({name:"⏻ Full Circle<br>ELECTRONICS",type:"full-circle"})}
                ${c({name:"🌿 RECO",type:"reco"})}
                ${c({name:"⊙ VEOLIA",type:"veolia"})}
                ${c({name:"ecorecyclar",type:"ecorecyclar"})}
              </div>
            </div>
          </div>
        </section>

        ${f()}

      </div>
    `}_bindViewModel(){}_bindEvents(){w(this),m(this)}}class me{async login(e){return g.post("/api/auth/login",e)}async register(e){return g.post("/api/auth/register",e)}async logout(){return g.post("/api/auth/logout",{})}}const O=new me;class fe extends _{_initState(){this.setState({isLoading:!1,error:null,nombre:"",password:"",fieldErrors:{}})}updateField(e,a){const i=e==="email"?"nombre":e;this.setState({[i]:a,error:null});const t={...this.getState("fieldErrors")};delete t[i],this.setState({fieldErrors:t})}async submitLogin(){if(this._validateForm()){this.startLoading();try{const e=await O.login({nombre:this.getState("nombre"),password:this.getState("password")});this.stopLoading(),e.data&&e.data.token?n.emit("auth:loginSuccess",{user:e.data.user,token:e.data.token}):n.emit("auth:closeModal")}catch(e){this.stopLoading(),alert("Error iniciando sesión: "+(e.message||"Usuario o contraseña incorrectos.")),this.setState({error:"Usuario o contraseña incorrectos."})}}}_validateForm(){const e={},a=this.getState("nombre"),i=this.getState("password");return a||(e.nombre="Ingresa tu nombre de usuario."),i||(e.password="Ingresa tu contraseña."),Object.keys(e).length>0?(this.setState({fieldErrors:e}),!1):!0}}class be extends u{constructor(e={}){const a=e.viewModel||new fe;super({...e,viewModel:a})}render(){return`
      <div class="auth-modal__overlay" id="auth-overlay">
        <div class="auth-modal__card">
          <h1 class="auth-modal__title">¡Bienvenido a SIMÖ!</h1>

          <div id="login-error" class="alert alert--error" style="display:none; margin-top:1rem;"></div>

          <form id="login-form" class="auth-modal__form" novalidate>
            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="nombre">Nombre de usuario</label>
              <input
                class="auth-modal__input"
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre de usuario"
                autocomplete="username"
              />
              <span class="form-error" id="nombre-error"></span>
            </div>

            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="password">Contraseña</label>
              <input
                class="auth-modal__input"
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                autocomplete="current-password"
              />
              <span class="form-error" id="password-error"></span>
            </div>

            <a href="#" class="auth-modal__link" id="link-recovery">¿Olvidaste tu contraseña?</a>

            <div class="auth-modal__actions">
              <button
                class="auth-modal__btn auth-modal__btn--primary"
                type="submit"
                id="login-submit"
              >
                Iniciar sesión
              </button>
              
              <button
                class="auth-modal__btn auth-modal__btn--secondary"
                type="button"
                id="btn-register"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    `}_bindViewModel(){this._subscribe("isLoading",e=>{const a=this.$("#login-submit");a&&(a.disabled=e,a.textContent=e?"Iniciando...":"Iniciar sesión")}),this._subscribe("error",e=>{const a=this.$("#login-error");a&&(e?(a.textContent=e,a.style.display="block"):a.style.display="none")}),this._subscribe("fieldErrors",e=>{this._renderFieldErrors(e)})}_bindEvents(){this._addEvent("#auth-overlay","click",e=>{e.target.id==="auth-overlay"&&n.emit("auth:closeModal")}),this._addEvent("#nombre","input",e=>{this._viewModel.updateField("nombre",e.target.value)}),this._addEvent("#password","input",e=>{this._viewModel.updateField("password",e.target.value)}),this._addEvent("#login-form","submit",async e=>{e.preventDefault(),await this._viewModel.submitLogin()}),this._addEvent("#link-recovery","click",e=>{e.preventDefault(),n.emit("auth:goToRecovery")}),this._addEvent("#btn-register","click",e=>{e.preventDefault(),n.emit("auth:goToRegister")})}_renderFieldErrors(e={}){["email","password"].forEach(i=>{const t=this.$(`#${i}-error`),o=this.$(`#${i}`);if(!t||!o)return;const r=e[i]||"";t.textContent=r,r?o.style.borderColor="#dc2626":o.style.borderColor="var(--simo-text-dark, #1a1a1a)"})}}class we extends _{_initState(){this.setState({nombre:"",cedula:"",email:"",password:"",confirmPassword:"",error:null})}updateField(e,a){console.log("[RegisterViewModel] updateField:",e,"=",a),this.setState({[e]:a,error:null})}async submitRegister(){console.log("[RegisterViewModel] submitRegister() llamado. Estado actual:",JSON.stringify(this._state));const{nombre:e,cedula:a,email:i,password:t,confirmPassword:o}=this._state;if(!e||!a||!i||!t){console.warn("[RegisterViewModel] Campos faltantes:",{nombre:!!e,cedula:!!a,email:!!i,password:!!t}),alert("Error: Todos los campos son obligatorios (Nombre, Cédula, Correo, Contraseña)."),this.setState({error:"Todos los campos son obligatorios"});return}if(t!==o){alert("Error: Las contraseñas no coinciden."),this.setState({error:"Las contraseñas no coinciden"});return}try{this.setState({error:"Registrando..."}),console.log("[RegisterViewModel] Enviando petición a /api/auth/register con:",{nombre:e,email:i,cedula:a});const r=await O.register({nombre:e,email:i,password:t,cedula:a});console.log("[RegisterViewModel] Respuesta del servidor:",r),r.data&&r.data.token?n.emit("auth:loginSuccess",{user:r.data.user,token:r.data.token}):n.emit("auth:closeModal")}catch(r){console.error("[RegisterViewModel] Error en registro:",r),alert("Error: "+(r.message||"Error al registrar usuario")),this.setState({error:r.message||"Error al registrar usuario"})}}}class ye extends u{constructor(e={}){const a=e.viewModel||new we;super({...e,viewModel:a})}render(){return`
      <div class="auth-modal__overlay" id="auth-overlay">
        <div class="auth-modal__card" style="max-height: 90vh; overflow-y: auto;">
          <h1 class="auth-modal__title">¡Bienvenido a SIMÖ!</h1>
          <p class="auth-modal__subtitle">No solo son puntos, es cuidar<br>el medio ambiente</p>

          <form id="register-form" class="auth-modal__form" novalidate onsubmit="event.preventDefault();">
            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="nombre">Nombre de usuario</label>
              <input
                class="auth-modal__input"
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre de usuario"
              />
            </div>
            
            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="cedula">Cédula</label>
              <input
                class="auth-modal__input"
                type="text"
                id="cedula"
                name="cedula"
                placeholder="Tu documento de identidad"
              />
            </div>

            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="email">Correo electrónico</label>
              <input
                class="auth-modal__input"
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                autocomplete="email"
              />
            </div>

            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="password">Contraseña</label>
              <input
                class="auth-modal__input"
                type="password"
                id="password"
                name="password"
                placeholder="Crea una contraseña"
                autocomplete="new-password"
              />
            </div>

            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="confirmPassword">Confirmar contraseña</label>
              <input
                class="auth-modal__input"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirma la contraseña"
                autocomplete="new-password"
              />
            </div>

            <div id="register-error" class="auth-modal__error" style="color: red; margin-top: 10px; text-align: center;"></div>

            <p class="auth-modal__helper-text">Usa ocho o más letras, números y símbolos</p>

            <div class="auth-modal__actions" style="margin-top: 1rem;">
              <button
                class="auth-modal__btn auth-modal__btn--primary"
                type="submit"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    `}_bindEvents(){this._addEvent("#auth-overlay","click",e=>{e.target.id==="auth-overlay"&&n.emit("auth:closeModal")}),this._addEvent("#nombre","input",e=>{this._viewModel.updateField("nombre",e.target.value)}),this._addEvent("#cedula","input",e=>{this._viewModel.updateField("cedula",e.target.value)}),this._addEvent("#email","input",e=>{this._viewModel.updateField("email",e.target.value)}),this._addEvent("#password","input",e=>{this._viewModel.updateField("password",e.target.value)}),this._addEvent("#confirmPassword","input",e=>{this._viewModel.updateField("confirmPassword",e.target.value)}),this._addEvent("#register-form","submit",async e=>{e.preventDefault(),e.stopPropagation(),console.log("[RegisterView] submit event fired"),await this._viewModel.submitRegister()}),this._addEvent('button[type="submit"]',"click",async e=>{e.preventDefault(),e.stopPropagation(),console.log("[RegisterView] button click fired"),await this._viewModel.submitRegister()})}_bindViewModel(){this._subscribe("error",e=>{const a=this.$("#register-error");a&&(a.textContent=e||"")})}}class Me extends _{_initState(){this.setState({email:""})}updateField(e,a){this.setState({[e]:a})}async submitRecovery(){console.log("Recuperando password de",this.getState("email")),n.emit("auth:recoverySent")}}class xe extends u{constructor(e={}){const a=e.viewModel||new Me;super({...e,viewModel:a})}render(){return`
      <div class="auth-modal__overlay" id="auth-overlay">
        <div class="auth-modal__card">
          <h1 class="auth-modal__title">Restablece tu contraseña</h1>
          <p class="auth-modal__subtitle">¿Cuál es tu correo electrónico?</p>

          <form id="recovery-form" class="auth-modal__form" novalidate>
            <div class="auth-modal__form-group">
              <input
                class="auth-modal__input"
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                autocomplete="email"
              />
            </div>

            <div class="auth-modal__actions" style="margin-top: 0.5rem;">
              <button
                class="auth-modal__btn auth-modal__btn--primary"
                type="submit"
              >
                Enviar correo electrónico de restablecimiento de contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    `}_bindEvents(){this._addEvent("#auth-overlay","click",e=>{e.target.id==="auth-overlay"&&n.emit("auth:closeModal")}),this._addEvent("#email","input",e=>{this._viewModel.updateField("email",e.target.value)}),this._addEvent("#recovery-form","submit",async e=>{e.preventDefault(),await this._viewModel.submitRecovery()})}}class Ee extends _{_initState(){}}class Ce extends u{constructor(e={}){const a=e.viewModel||new Ee;super({...e,viewModel:a})}render(){return`
      <div class="auth-modal__overlay" id="auth-overlay">
        <div class="auth-modal__card auth-modal__card--info">
          <h1 class="auth-modal__title">Correo de recuperación enviado</h1>
        </div>
      </div>
    `}_bindEvents(){this._addEvent("#auth-overlay","click",e=>{e.target.id==="auth-overlay"&&n.emit("auth:closeModal")})}}class ke extends _{_initState(){}}class $e extends u{constructor(e={}){const a=e.viewModel||new ke;super({...e,viewModel:a})}render(){return`
      <div class="auth-modal__overlay" id="auth-overlay">
        <div class="auth-modal__card auth-modal__card--info">
          <h1 class="auth-modal__title" style="margin-bottom: 1rem;">Confirma tu cuenta</h1>
          <p class="auth-modal__subtitle" style="margin-bottom: 0;">Revisa tu correo electrónico</p>
        </div>
      </div>
    `}_bindEvents(){this._addEvent("#auth-overlay","click",e=>{e.target.id==="auth-overlay"&&n.emit("auth:closeModal")})}}class Se{async fetchProfile(){return g.get("/api/user/profile")}async updateProfile(e){return g.patch("/api/user/profile",e)}async fetchPoints(){return g.get("/api/user/points")}async fetchStats(){return g.get("/api/user/stats")}}const k=new Se;class Ie extends _{_initState(){this.setState({user:null,points:0,devicesRecycled:0,kgAvoided:0,isEditing:!1,editForm:{nombre:"",telefono:"",direccion:""},isLoading:!1})}async onMount(){this.setState({user:h.user});try{const e=k.fetchProfile().catch(d=>(console.warn("No se pudo cargar perfil fresco",d),{usuario:h.user})),a=k.fetchStats().catch(d=>(console.warn("No se pudieron cargar stats",d),{dispositivos_reciclados:0,kg_evitados:0})),i=k.fetchPoints().catch(d=>(console.warn("No se pudieron cargar puntos",d),{puntos:0})),[t,o,r]=await Promise.all([e,a,i]),l=t.usuario;this.setState({user:l,editForm:{nombre:l.nombre||"",telefono:l.telefono||"",direccion:l.direccion||""},points:r.puntos||0,devicesRecycled:o.dispositivos_reciclados||0,kgAvoided:o.kg_evitados||0}),h.setSession({token:h.token,user:l})}catch(e){console.error("Error general cargando perfil:",e)}}toggleEdit(){this.setState({isEditing:!this.getState("isEditing")})}updateEditField(e,a){const i={...this.getState("editForm")};i[e]=a,this.setState({editForm:i})}async saveProfile(){this.setState({isLoading:!0});try{const e=this.getState("editForm"),i=(await k.updateProfile(e)).usuario;this.setState({user:i,isEditing:!1,isLoading:!1}),h.setSession({token:h.token,user:i})}catch(e){console.error("Error actualizando:",e),alert("Error al actualizar perfil"),this.setState({isLoading:!1})}}logout(){n.emit("auth:logout")}}class L extends u{constructor(e={}){const a=e.viewModel||new Ie;super({...e,viewModel:a})}render(){return`
      <div class="landing">

        ${R("perfil")}

        <!-- ─── HERO PERFIL ──────────────────────────────────── -->
        <section class="perfil-hero">
          <div class="perfil-hero__inner">

            <!-- Columna izquierda: Datos del usuario -->
            <div class="perfil-hero__left">
              <div id="perfil-display-mode">
                <div class="perfil-info-list">
                  <div class="perfil-info-item">
                    <span class="perfil-info-item__icon">👤</span>
                    <span class="perfil-info-item__text" id="perfil-name">Usuario</span>
                  </div>
                  <div class="perfil-info-item">
                    <span class="perfil-info-item__icon">🪪</span>
                    <span class="perfil-info-item__text" id="perfil-cedula">--</span>
                  </div>
                  <div class="perfil-info-item">
                    <span class="perfil-info-item__icon">📞</span>
                    <span class="perfil-info-item__text" id="perfil-telefono">--</span>
                  </div>
                  <div class="perfil-info-item">
                    <span class="perfil-info-item__icon">🏠</span>
                    <span class="perfil-info-item__text" id="perfil-direccion">--</span>
                  </div>
                  <div class="perfil-info-item">
                    <span class="perfil-info-item__icon">✉</span>
                    <span class="perfil-info-item__text" id="perfil-email">--</span>
                  </div>
                </div>
                <button class="perfil-btn perfil-btn--edit" id="perfil-edit-btn">Editar información</button>
              </div>

              <!-- Formulario de Edición (Oculto por defecto) -->
              <div id="perfil-edit-mode" style="display: none; width: 100%;">
                <form id="perfil-edit-form" class="auth-modal__form" style="padding: 0;">
                  <div class="auth-modal__form-group">
                    <label class="auth-modal__label">Nombre</label>
                    <input class="auth-modal__input" type="text" id="edit-nombre" />
                  </div>
                  <div class="auth-modal__form-group">
                    <label class="auth-modal__label">Teléfono</label>
                    <input class="auth-modal__input" type="text" id="edit-telefono" />
                  </div>
                  <div class="auth-modal__form-group">
                    <label class="auth-modal__label">Dirección</label>
                    <input class="auth-modal__input" type="text" id="edit-direccion" />
                  </div>
                  <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button type="submit" class="perfil-btn perfil-btn--edit" id="perfil-save-btn">Guardar</button>
                    <button type="button" class="perfil-btn" id="perfil-cancel-btn" style="background: transparent; border: 1px solid white; color: white;">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Columna derecha: Avatar + Puntos -->
            <div class="perfil-hero__right" style="display: flex; flex-direction: column; align-items: flex-end;">
              
              <div style="display: flex; align-items: center; gap: 1.5rem;">
                <!-- Botón de cerrar cuenta a la izquierda del avatar -->
                <button class="perfil-btn perfil-btn--logout" id="perfil-logout-btn" style="margin: 0; white-space: nowrap;">Cerrar cuenta</button>
                
                <!-- Avatar -->
                <div class="perfil-avatar-block" style="flex-direction: column; align-items: center; gap: 0; margin: 0;">
                  <div class="perfil-avatar" style="width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--simo-amarillo, #FFCD1C); background: #FFFCE7; position: relative; overflow: hidden; display: flex; justify-content: center; align-items: flex-end;">
                    <!-- Imagen base del avatar -->
                    <img src="./assets/images/usuario.png" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjQwIiByPSIyMCIgZmlsbD0iI0Y1QzE2QyIvPjxwYXRoIGQ9Ik0yMCAxMDBjMC0zMCAxMC00MCAzMC00MHMzMCAxMCAzMCA0MHoiIGZpbGw9IiM2QzM4RkYiLz48cmVjdCB4PSIyMCIgeT0iNzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0ZGQ0QxQyIvPjwvc3ZnPg=='">
                    <!-- Texto sobre el cartel amarillo -->
                    <div id="perfil-avatar-name" style="position: absolute; bottom: 15px; text-align: center; font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 700; color: #1a1a1a; line-height: 1.1; width: 60px;">
                      Juan<br>Sebastián
                    </div>
                  </div>
                </div>
              </div>

              <!-- Puntos -->
              <div class="perfil-points-badge" style="margin-top: 1.5rem; width: 220px; justify-content: space-between; padding: 1rem 1.5rem;">
                <div class="perfil-points-badge__flower" style="width: 60px; height: 60px;">
                  <img src="./assets/images/flor.png" alt="Flor" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAgMGwyMCAyMC0yMCAyMC0yMC0yMHoiIGZpbGw9IiNGRkNEOEYiLz48cGF0aCBkPSJNMTAwIDUwbC0yMCAyMC0yMC0yMDIwLTIweiIgZmlsbD0iI0ZGQ0Q4RiIvPjxwYXRoIGQ9Ik01MCAxMDBMNzAgODBsLTIwLTIwLTIwIDIweiIgZmlsbD0iI0ZGQ0Q4RiIvPjxwYXRoIGQ9Ik0wIDUwbDIwLTIwIDIwIDIwLTIwIDIweiIgZmlsbD0iI0ZGQ0Q4RiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjE4IiBmaWxsPSIjREIwMDc2IiBzdHJva2U9IiNGRkNEOEYiIHN0cm9rZS13aWR0aD0iNCIvPjwvc3ZnPg=='">
                </div>
                <span class="perfil-points-badge__num" id="perfil-points" style="font-size: 2.8rem; color: #334E9D;">1100</span>
              </div>
            </div>

          </div>
        </section>

        <!-- ─── IMPACTO ──────────────────────────────────────── -->
        <section class="perfil-impacto">
          <div class="perfil-impacto__inner">
            <!-- Botones navegación -->
            <div class="perfil-impacto__nav">
              <button class="perfil-impacto__nav-btn" id="btn-historial">Historial</button>
              <button class="perfil-impacto__nav-btn" id="btn-notificaciones">Notificaciones</button>
            </div>

            <!-- Sección ¡Impacto con SIMÖ! -->
            <div class="perfil-impacto__content">
              <h2 class="perfil-impacto__title">¡Impacto con SIMÖ!</h2>
              <div class="perfil-impacto__body">
                <div class="perfil-impacto__text-block">
                  <p class="perfil-impacto__stat" id="perfil-stat-devices">Has reciclado <strong>3 dispositivos</strong></p>
                  <p class="perfil-impacto__stat" id="perfil-stat-kg">Evitaste <strong>12 kg de residuos electrónicos</strong></p>
                  <p class="perfil-impacto__desc">
                    Gracias por ayudar a reducir la contaminación y construir una<br>
                    Medellín más sostenible.
                  </p>
                  <p class="perfil-impacto__thanks">¡Muchas gracias por ser parte del cambio!</p>
                </div>
                <div class="perfil-impacto__icon">
                  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
                    <path d="M40 8 C20 8 8 22 8 38 C8 54 20 68 40 72" stroke="#2E7D32" stroke-width="5" fill="none" stroke-linecap="round"/>
                    <path d="M40 8 C60 8 72 22 72 38 C72 54 60 68 40 72" stroke="#2E7D32" stroke-width="5" fill="none" stroke-linecap="round"/>
                    <path d="M30 20 L40 8 L50 20" fill="#2E7D32"/>
                    <path d="M56 55 L40 72 L24 55" fill="#2E7D32"/>
                    <path d="M8 38 L20 30 L20 46 Z" fill="#2E7D32"/>
                    <path d="M72 38 L60 30 L60 46 Z" fill="#2E7D32"/>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </section>

        ${f()}

      </div>
    `}_bindViewModel(){this._subscribe("user",e=>{if(!e)return;const a=this.$("#perfil-name"),i=this.$("#perfil-cedula"),t=this.$("#perfil-telefono"),o=this.$("#perfil-direccion"),r=this.$("#perfil-email"),l=this.$("#perfil-avatar-name");if(a&&(a.textContent=e.nombre||"Usuario"),i&&(i.textContent=e.cedula||"--"),t&&(t.textContent=e.telefono||"--"),o&&(o.textContent=e.direccion||"--"),r&&(r.textContent=e.email||"--"),l){const d=(e.nombre||"Usuario").split(" ");l.innerHTML=d.slice(0,2).join("<br>")}}),this._subscribe("editForm",e=>{const a=this.$("#edit-nombre"),i=this.$("#edit-telefono"),t=this.$("#edit-direccion");a&&a.value!==e.nombre&&(a.value=e.nombre),i&&i.value!==e.telefono&&(i.value=e.telefono),t&&t.value!==e.direccion&&(t.value=e.direccion)}),this._subscribe("isEditing",e=>{const a=this.$("#perfil-display-mode"),i=this.$("#perfil-edit-mode");a&&i&&(a.style.display=e?"none":"block",i.style.display=e?"block":"none")}),this._subscribe("points",e=>{const a=this.$("#perfil-points");a&&(a.textContent=e)}),this._subscribe("devicesRecycled",e=>{const a=this.$("#perfil-stat-devices");a&&(a.innerHTML=`Has reciclado <strong>${e} dispositivos</strong>`)}),this._subscribe("kgAvoided",e=>{const a=this.$("#perfil-stat-kg");a&&(a.innerHTML=`Evitaste <strong>${e} kg de residuos electrónicos</strong>`)})}_bindEvents(){I(this),m(this),this._addEvent("#perfil-edit-btn","click",()=>{this._viewModel.toggleEdit()}),this._addEvent("#perfil-cancel-btn","click",()=>{this._viewModel.toggleEdit()}),this._addEvent("#edit-nombre","input",e=>{this._viewModel.updateEditField("nombre",e.target.value)}),this._addEvent("#edit-telefono","input",e=>{this._viewModel.updateEditField("telefono",e.target.value)}),this._addEvent("#edit-direccion","input",e=>{this._viewModel.updateEditField("direccion",e.target.value)}),this._addEvent("#perfil-edit-form","submit",e=>{e.preventDefault(),this._viewModel.saveProfile()}),this._addEvent("#perfil-logout-btn","click",()=>{this._viewModel.logout()}),this._addEvent("#btn-historial","click",()=>{n.emit("landing:navigate","historial")}),this._addEvent("#btn-notificaciones","click",()=>{n.emit("landing:navigate","notificaciones")})}}class De extends _{_initState(){this.setState({items:[{id:1,quantity:"1x",device:"Celular",color:"gray",company:"EcoTech",status:"Acepto tu solicitud",statusDesc:"Tu reciclaje fue aceptado por el punto seleccionado.",date:"04/03/2026"},{id:2,quantity:"2x",device:"Celular",color:"gray",company:"Monterrey",status:"En camino",statusDesc:"El recolector va camino a tu ubicación.",date:"04/03/2026"},{id:3,quantity:"21x",device:"Batería",color:"yellow",company:"Electro Healt",status:"Entrega registrada",statusDesc:"El punto de reciclaje confirmó la recepción de tu dispositivo. Ahora se le acumularon los puntos",date:"03/02/2026"},{id:4,quantity:"1x",device:"Tablet",color:"pink",company:"Machine Tecno",status:"Solicitud cancelada",statusDesc:"Tu solicitud a Machine Tecno fue cancelada. Puedes crear una nueva cuando lo desees.",date:"01/13/2026"}]})}}class Re extends u{constructor(e={}){const a=e.viewModel||new De;super({...e,viewModel:a})}render(){const e=this._viewModel.getState("items")||[];return`
      <div class="landing">

        ${R("historial")}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="historial-hero">
          ${N()}
          <div class="historial-hero__inner">
            <p class="historial-hero__pre">MI</p>
            <h1 class="historial-hero__title">Historial</h1>
          </div>
        </section>

        <!-- ─── ITEMS ─────────────────────────────────────────── -->
        <section class="historial-items">
          <div class="historial-items__inner" id="historial-list">
            ${e.map(a=>ae(a)).join("")}
          </div>
        </section>

        ${f()}

      </div>
    `}_bindViewModel(){}_bindEvents(){I(this),m(this)}}class Ae extends _{_initState(){this.setState({items:[{id:1,quantity:"1x",device:"Celular",destination:"Ecotech",points:1780,date:"04/03/2026",status:"En proceso",statusColor:"process"},{id:2,quantity:"2x",device:"Celular",destination:"Monterrey",points:1150,date:"04/03/2026",status:"En proceso",statusColor:"process"},{id:3,quantity:"21x",device:"Baterías",destination:"Electro Healt",points:1100,date:"03/02/2026",status:"Completo",statusColor:"complete"}]})}}class Le extends u{constructor(e={}){const a=e.viewModel||new Ae;super({...e,viewModel:a})}render(){const e=this._viewModel.getState("items")||[];return`
      <div class="landing">

        ${R("notificaciones")}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="historial-hero">
          ${N()}
          <div class="historial-hero__inner">
            <p class="historial-hero__pre">MIS</p>
            <h1 class="historial-hero__title">Notificaciones</h1>
            <p class="historial-hero__subtitle">Dale clic para más información...</p>
          </div>
        </section>

        <!-- ─── ITEMS ─────────────────────────────────────────── -->
        <section class="historial-items">
          <div class="historial-items__inner">
            ${e.map(a=>se(a)).join("")}
          </div>
        </section>

        ${f()}

      </div>
    `}_bindViewModel(){}_bindEvents(){I(this),m(this)}}g.setBaseUrl("http://localhost:3000");h.restore();h.token&&g.setAuthToken(h.token);let $=null,b=null;async function x(s){$&&$.destroy(),F(),$=new s({container:"#app"}),await $.mount(),window.scrollTo({top:0,behavior:"instant"})}async function E(s){b&&b.destroy();const e=document.getElementById("modal-root");e&&(e.innerHTML=""),b=new s({container:"#modal-root"}),await b.mount()}function F(){b&&(b.destroy(),b=null);const s=document.getElementById("modal-root");s&&(s.innerHTML="")}const Fe={home:A,"quienes-somos":ne,descargar:le,"como-reciclar":ce,"como-canjear":ue,roles:he,colaboraciones:ge,perfil:L,historial:Re,notificaciones:Le};h.isAuthenticated?x(L):x(A);n.on("auth:loginSuccess",({user:s,token:e}={})=>{s&&e&&(h.setSession({token:e,user:s}),g.setAuthToken(e)),F(),x(L)});n.on("auth:logout",()=>{h.clearSession(),g.clearAuthToken(),x(A)});n.on("landing:goToLogin",()=>E(be));n.on("auth:goToRegister",()=>E(ye));n.on("auth:goToRecovery",()=>E(xe));n.on("auth:recoverySent",()=>E(Ce));n.on("auth:confirmAccount",()=>E($e));n.on("auth:closeModal",()=>F());n.on("landing:navigate",s=>{const e=Fe[s];e&&x(e)});
