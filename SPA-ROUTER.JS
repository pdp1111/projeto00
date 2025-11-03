/* ============================================
   SPA-ROUTER.JS - SINGLE PAGE APPLICATION
   Sistema de roteamento para navegação SPA
   ============================================ */

class SPARouter {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.loadingElement = null;
    
    // Inicializa o router quando o DOM carregar
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  /**
   * Inicializa o router
   */
  init() {
    // Cria elemento de loading
    this.createLoadingElement();
    
    // Intercepta cliques em links internos
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-route]');
      if (link) {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        this.navigateTo(route);
      }
    });

    // Gerencia botão voltar do navegador
    window.addEventListener('popstate', () => {
      this.loadRoute(window.location.pathname);
    });

    // Carrega rota inicial
    this.loadRoute(window.location.pathname);
  }

  /**
   * Registra uma nova rota
   * @param {string} path - Caminho da rota
   * @param {Function} handler - Função que retorna o conteúdo
   */
  register(path, handler) {
    this.routes[path] = handler;
  }

  /**
   * Navega para uma rota específica
   * @param {string} path - Caminho da rota
   */
  navigateTo(path) {
    window.history.pushState({}, '', path);
    this.loadRoute(path);
  }

  /**
   * Carrega o conteúdo de uma rota
   * @param {string} path - Caminho da rota
   */
  async loadRoute(path) {
    // Normaliza o path
    path = path === '/' ? '/index' : path;
    path = path.replace('.html', '');

    // Mostra loading
    this.showLoading();

    // Busca a rota correspondente
    const handler = this.routes[path];
    
    if (handler) {
      try {
        // Executa o handler da rota
        const content = await handler();
        
        // Atualiza o conteúdo
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.innerHTML = content;
          
          // Executa scripts após carregar conteúdo
          this.executeScripts(mainContent);
          
          // Atualiza navegação ativa
          this.updateActiveNav(path);
          
          // Scroll para o topo
          window.scrollTo(0, 0);
        }
        
        this.currentRoute = path;
      } catch (error) {
        console.error('Erro ao carregar rota:', error);
        this.showError('Erro ao carregar página');
      }
    } else {
      // Rota não encontrada - carrega 404
      this.show404();
    }

    // Esconde loading
    this.hideLoading();
  }

  /**
   * Executa scripts dentro do conteúdo carregado
   * @param {HTMLElement} container - Container com o conteúdo
   */
  executeScripts(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  /**
   * Atualiza o link ativo na navegação
   * @param {string} path - Caminho atual
   */
  updateActiveNav(path) {
    // Remove classe active de todos os links
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
    });

    // Adiciona classe active ao link correspondente
    const activeLink = document.querySelector(`nav a[data-route="${path}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  /**
   * Cria elemento de loading
   */
  createLoadingElement() {
    this.loadingElement = document.createElement('div');
    this.loadingElement.id = 'spa-loading';
    this.loadingElement.innerHTML = `
      <div class="spinner"></div>
      <p>Carregando...</p>
    `;
    this.loadingElement.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    `;
    document.body.appendChild(this.loadingElement);
  }

  /**
   * Mostra indicador de loading
   */
  showLoading() {
    if (this.loadingElement) {
      this.loadingElement.style.display = 'flex';
    }
  }

  /**
   * Esconde indicador de loading
   */
  hideLoading() {
    if (this.loadingElement) {
      setTimeout(() => {
        this.loadingElement.style.display = 'none';
      }, 300);
    }
  }

  /**
   * Mostra página de erro
   * @param {string} message - Mensagem de erro
   */
  showError(message) {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="container">
          <section class="text-center">
            <h2 style="color: var(--cor-erro);">❌ Erro</h2>
            <p>${message}</p>
            <a href="/" data-route="/index" class="btn btn-primary">
              Voltar ao Início
            </a>
          </section>
        </div>
      `;
    }
  }

  /**
   * Mostra página 404
   */
  show404() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="container">
          <section class="text-center">
            <h2 style="font-size: 5rem;">404</h2>
            <h3>Página não encontrada</h3>
            <p>A página que você está procurando não existe.</p>
            <a href="/" data-route="/index" class="btn btn-primary">
              Voltar ao Início
            </a>
          </section>
        </div>
      `;
    }
  }

  /**
   * Retorna a rota atual
   * @returns {string} Rota atual
   */
  getCurrentRoute() {
    return this.currentRoute;
  }
}

// Exporta instância única do router
const router = new SPARouter();

// Torna disponível globalmente
if (typeof window !== 'undefined') {
  window.SPARouter = router;
}