/* ============================================
   MAIN.JS - ARQUIVO PRINCIPAL
   Inicialização e integração de todos os módulos
   ============================================ */

/**
 * Aplicação principal
 */
class App {
  constructor() {
    this.initialized = false;
    this.modules = {};
    
    // Aguarda DOM carregar
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  /**
   * Inicializa a aplicação
   */
  async init() {
    if (this.initialized) return;
    
    console.log('🚀 Inicializando ONG Esperança Viva...');
    
    try {
      // Inicializa módulos base
      this.initializeNavigation();
      this.initializeTheme();
      this.initializeForms();
      this.initializeAnimations();
      this.initializeModals();
      
      // Registra rotas SPA
      this.registerRoutes();
      
      // Inicializa funcionalidades específicas da página
      this.initializePageSpecific();
      
      this.initialized = true;
      console.log('✅ Aplicação inicializada com sucesso!');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar aplicação:', error);
    }
  }

  /**
   * Inicializa navegação
   */
  initializeNavigation() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-nav');
    
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });

      // Fecha menu ao clicar fora
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      });

      // Fecha menu ao redimensionar para desktop
      window.addEventListener('resize', DOMUtils.debounce(() => {
        if (window.innerWidth > 768) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      }, 250));
    }

    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            DOMUtils.scrollToElement(target, 80);
          }
        }
      });
    });

    // Destaca seção ativa na navegação ao scroll
    this.highlightActiveSection();
  }

  /**
   * Destaca seção ativa no menu
   */
  highlightActiveSection() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
  }

  /**
   * Inicializa tema
   */
  initializeTheme() {
    const savedTheme = window.Preferences?.getTheme() || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Detecta preferência do sistema
    if (savedTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.setAttribute(
        'data-theme',
        prefersDark.matches ? 'dark' : 'light'
      );

      prefersDark.addEventListener('change', (e) => {
        document.documentElement.setAttribute(
          'data-theme',
          e.matches ? 'dark' : 'light'
        );
      });
    }
  }

  /**
   * Inicializa formulários
   */
  initializeForms() {
    // Máscara de inputs
    this.initializeInputMasks();

    // Validação de formulário de cadastro
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
      const validator = new FormValidator('cadastroForm');
      
      // Regras customizadas
      validator.setRules({
        nome: (value) => {
          if (value.split(' ').length < 2) {
            return 'Digite nome e sobrenome';
          }
        },
        motivos: (value) => {
          if (value.length < 20) {
            return 'Escreva pelo menos 20 caracteres';
          }
        }
      });
      
      this.modules.formValidator = validator;
    }

    // Auto-save de rascunhos
    document.querySelectorAll('form').forEach(form => {
      if (form.hasAttribute('data-autosave')) {
        form.setAttribute('data-autosave', 'true');
      }
    });
  }

  /**
   * Inicializa máscaras de input
   */
  initializeInputMasks() {
    // Máscara de telefone
    document.querySelectorAll('input[type="tel"]').forEach(input => {
      input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
          value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
          value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        e.target.value = value;
      });
    });

    // Máscara de CPF
    document.querySelectorAll('input[name="cpf"]').forEach(input => {
      input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
          value = value.replace(/(\d{3})(\d)/, '$1.$2');
          value = value.replace(/(\d{3})(\d)/, '$1.$2');
          value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        e.target.value = value;
      });
    });

    // Máscara de CEP
    document.querySelectorAll('input[name="cep"]').forEach(input => {
      input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
          value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = value;
      });

      // Busca CEP automaticamente
      input.addEventListener('blur', async function() {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length === 8) {
          await app.buscarCEP(cep);
        }
      });
    });
  }

  /**
   * Busca informações de CEP
   * @param {string} cep - CEP para buscar
   */
  async buscarCEP(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        // Preenche campos automaticamente
        const enderecoInput = document.querySelector('input[name="endereco"]');
        const cidadeInput = document.querySelector('input[name="cidade"]');
        const estadoSelect = document.querySelector('select[name="estado"]');

        if (enderecoInput && !enderecoInput.value) {
          enderecoInput.value = `${data.logradouro}, ${data.bairro}`;
        }
        if (cidadeInput) {
          cidadeInput.value = data.localidade;
        }
        if (estadoSelect) {
          estadoSelect.value = data.uf;
        }

        // Feedback visual
        const cepInput = document.querySelector('input[name="cep"]');
        if (cepInput) {
          DOMUtils.addClass(cepInput, 'valid');
        }
      }
    } catch (error) {
      console.warn('Erro ao buscar CEP:', error);
    }
  }

  /**
   * Inicializa animações
   */
  initializeAnimations() {
    // Anima contadores na home
    const impactStats = document.getElementById('impact-stats');
    if (impactStats) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.AnimationUtils?.animateCounters('#impact-stats', 2000);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(impactStats);
    }

    // Fade in de elementos ao scroll
    if (window.AnimationUtils) {
      AnimationUtils.animateOnScroll('.card, section');
    }
  }

  /**
   * Inicializa modals
   */
  initializeModals() {
    // Fecha modals ao clicar no backdrop
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        const modal = e.target.closest('.modal');
        if (modal) {
          modal.classList.remove('active');
        }
      }
    });

    // Fecha modals com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
          activeModal.classList.remove('active');
        }
      }
    });
  }

  /**
   * Registra rotas SPA
   */
  registerRoutes() {
    if (!window.SPARouter) return;

    // Rota inicial
    window.SPARouter.register('/index', () => {
      return window.PageTemplates?.home() || '';
    });

    // Rota de projetos
    window.SPARouter.register('/projetos', () => {
      return window.PageTemplates?.projects() || '';
    });

    // Rota de cadastro (mantém HTML estático por ter formulário complexo)
    window.SPARouter.register('/cadastro', async () => {
      const response = await fetch('cadastro.html');
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const content = doc.querySelector('main').innerHTML;
      return content;
    });
  }

  /**
   * Inicializa funcionalidades específicas da página
   */
  initializePageSpecific() {
    const path = window.location.pathname;

    // Página de projetos
    if (path.includes('projetos') || path.includes('projects')) {
      if (window.ProjectsManager) {
        window.ProjectsManager.init();
      }
    }

    // Página de cadastro
    if (path.includes('cadastro')) {
      // Já inicializado em initializeForms
    }
  }

  /**
   * Mostra modal de sucesso
   */
  static showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  /**
   * Esconde modal de sucesso
   */
  static hideSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }
}

// Inicializa aplicação
const app = new App();

// Torna disponível globalmente
if (typeof window !== 'undefined') {
  window.app = app;
  window.showSuccessModal = App.showSuccessModal;
  window.hideSuccessModal = App.hideSuccessModal;
}

// Log de debug em desenvolvimento
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  console.log('%c🌟 ONG Esperança Viva', 'font-size: 20px; font-weight: bold; color: #1e88e5;');
  console.log('%cModo Desenvolvimento Ativo', 'color: #4caf50;');
}