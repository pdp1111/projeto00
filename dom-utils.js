/* ============================================
   DOM-UTILS.JS - UTILIDADES DE MANIPULAÇÃO DOM
   Funções auxiliares para manipulação do DOM
   ============================================ */

/**
 * Utilitários para manipulação do DOM
 */
const DOMUtils = {
  /**
   * Cria um elemento com atributos e conteúdo
   * @param {string} tag - Tag do elemento
   * @param {Object} attributes - Atributos do elemento
   * @param {string|HTMLElement} content - Conteúdo do elemento
   * @returns {HTMLElement} Elemento criado
   */
  createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    // Adiciona atributos
    Object.keys(attributes).forEach(key => {
      if (key === 'className') {
        element.className = attributes[key];
      } else if (key === 'style' && typeof attributes[key] === 'object') {
        Object.assign(element.style, attributes[key]);
      } else if (key.startsWith('data-')) {
        element.setAttribute(key, attributes[key]);
      } else {
        element[key] = attributes[key];
      }
    });
    
    // Adiciona conteúdo
    if (typeof content === 'string') {
      element.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      element.appendChild(content);
    } else if (Array.isArray(content)) {
      content.forEach(child => {
        if (child instanceof HTMLElement) {
          element.appendChild(child);
        }
      });
    }
    
    return element;
  },

  /**
   * Remove todos os filhos de um elemento
   * @param {HTMLElement} element - Elemento pai
   */
  removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  },

  /**
   * Adiciona classe com verificação
   * @param {HTMLElement} element - Elemento
   * @param {string} className - Nome da classe
   */
  addClass(element, className) {
    if (element && !element.classList.contains(className)) {
      element.classList.add(className);
    }
  },

  /**
   * Remove classe com verificação
   * @param {HTMLElement} element - Elemento
   * @param {string} className - Nome da classe
   */
  removeClass(element, className) {
    if (element && element.classList.contains(className)) {
      element.classList.remove(className);
    }
  },

  /**
   * Toggle classe
   * @param {HTMLElement} element - Elemento
   * @param {string} className - Nome da classe
   */
  toggleClass(element, className) {
    if (element) {
      element.classList.toggle(className);
    }
  },

  /**
   * Verifica se elemento tem classe
   * @param {HTMLElement} element - Elemento
   * @param {string} className - Nome da classe
   * @returns {boolean} Se tem a classe
   */
  hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
  },

  /**
   * Busca elemento pai que corresponde ao seletor
   * @param {HTMLElement} element - Elemento inicial
   * @param {string} selector - Seletor CSS
   * @returns {HTMLElement|null} Elemento pai encontrado
   */
  closest(element, selector) {
    return element ? element.closest(selector) : null;
  },

  /**
   * Insere elemento após outro
   * @param {HTMLElement} newElement - Novo elemento
   * @param {HTMLElement} referenceElement - Elemento de referência
   */
  insertAfter(newElement, referenceElement) {
    if (referenceElement && referenceElement.parentNode) {
      referenceElement.parentNode.insertBefore(
        newElement,
        referenceElement.nextSibling
      );
    }
  },

  /**
   * Mostra elemento com fade in
   * @param {HTMLElement} element - Elemento
   * @param {number} duration - Duração em ms
   */
  fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      element.style.opacity = Math.min(progress / duration, 1);
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  },

  /**
   * Esconde elemento com fade out
   * @param {HTMLElement} element - Elemento
   * @param {number} duration - Duração em ms
   */
  fadeOut(element, duration = 300) {
    element.style.opacity = 1;
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      element.style.opacity = 1 - Math.min(progress / duration, 1);
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    }
    
    requestAnimationFrame(animate);
  },

  /**
   * Slide down (mostra com deslize)
   * @param {HTMLElement} element - Elemento
   * @param {number} duration - Duração em ms
   */
  slideDown(element, duration = 300) {
    element.style.display = 'block';
    const height = element.scrollHeight;
    element.style.height = '0';
    element.style.overflow = 'hidden';
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      element.style.height = `${Math.min(progress / duration, 1) * height}px`;
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.height = '';
        element.style.overflow = '';
      }
    }
    
    requestAnimationFrame(animate);
  },

  /**
   * Slide up (esconde com deslize)
   * @param {HTMLElement} element - Elemento
   * @param {number} duration - Duração em ms
   */
  slideUp(element, duration = 300) {
    const height = element.scrollHeight;
    element.style.height = `${height}px`;
    element.style.overflow = 'hidden';
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      element.style.height = `${height * (1 - Math.min(progress / duration, 1))}px`;
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
        element.style.height = '';
        element.style.overflow = '';
      }
    }
    
    requestAnimationFrame(animate);
  },

  /**
   * Delega evento
   * @param {HTMLElement} parent - Elemento pai
   * @param {string} eventType - Tipo do evento
   * @param {string} selector - Seletor dos filhos
   * @param {Function} handler - Handler do evento
   */
  delegate(parent, eventType, selector, handler) {
    parent.addEventListener(eventType, (event) => {
      const target = event.target.closest(selector);
      if (target && parent.contains(target)) {
        handler.call(target, event);
      }
    });
  },

  /**
   * Debounce de função
   * @param {Function} func - Função para debounce
   * @param {number} wait - Tempo de espera em ms
   * @returns {Function} Função com debounce
   */
  debounce(func, wait = 250) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle de função
   * @param {Function} func - Função para throttle
   * @param {number} limit - Limite em ms
   * @returns {Function} Função com throttle
   */
  throttle(func, limit = 250) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Verifica se elemento está visível no viewport
   * @param {HTMLElement} element - Elemento
   * @returns {boolean} Se está visível
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Scroll suave para elemento
   * @param {HTMLElement} element - Elemento alvo
   * @param {number} offset - Offset em pixels
   */
  scrollToElement(element, offset = 0) {
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  },

  /**
   * Copia texto para clipboard
   * @param {string} text - Texto para copiar
   * @returns {Promise} Promise da operação
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback para navegadores antigos
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  },

  /**
   * Formata data para exibição
   * @param {Date|string} date - Data
   * @param {string} format - Formato (ptBR, en, iso)
   * @returns {string} Data formatada
   */
  formatDate(date, format = 'ptBR') {
    const d = new Date(date);
    
    if (format === 'ptBR') {
      return d.toLocaleDateString('pt-BR');
    } else if (format === 'en') {
      return d.toLocaleDateString('en-US');
    } else if (format === 'iso') {
      return d.toISOString().split('T')[0];
    }
    
    return d.toLocaleDateString();
  },

  /**
   * Sanitiza HTML para prevenir XSS
   * @param {string} html - HTML para sanitizar
   * @returns {string} HTML sanitizado
   */
  sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  },

  /**
   * Gera ID único
   * @returns {string} ID único
   */
  generateId() {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};

/**
 * Utilitários para animações
 */
const AnimationUtils = {
  /**
   * Anima contadores numéricos
   * @param {string} selector - Seletor dos elementos
   * @param {number} duration - Duração em ms
   */
  animateCounters(selector, duration = 2000) {
    const elements = document.querySelectorAll(`${selector} [data-count]`);
    
    elements.forEach(element => {
      const target = parseInt(element.getAttribute('data-count'));
      const start = 0;
      const startTime = performance.now();
      
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const current = Math.floor(start + (target - start) * easeProgress);
        element.textContent = current + (target > 99 ? '+' : '');
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target + (target > 99 ? '+' : '');
        }
      }
      
      requestAnimationFrame(updateCounter);
    });
  },

  /**
   * Anima fade in de elementos quando entram no viewport
   * @param {string} selector - Seletor dos elementos
   */
  animateOnScroll(selector) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  },

  /**
   * Adiciona efeito parallax a um elemento
   * @param {string} selector - Seletor do elemento
   * @param {number} speed - Velocidade do efeito (0.1 a 1)
   */
  parallax(selector, speed = 0.5) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const handleScroll = DOMUtils.throttle(() => {
      const scrolled = window.pageYOffset;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
  }
};

// Adiciona animações CSS necessárias
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100px);
      }
    }
  `;
  document.head.appendChild(style);
}

// Exporta utilitários
if (typeof window !== 'undefined') {
  window.DOMUtils = DOMUtils;
  window.AnimationUtils = AnimationUtils;
}