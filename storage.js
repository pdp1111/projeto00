/* ============================================
   STORAGE.JS - ARMAZENAMENTO LOCAL
   Gerenciamento de localStorage e sessionStorage
   ============================================ */

/**
 * Classe para gerenciar armazenamento local
 */
class StorageManager {
  constructor(prefix = 'ong_') {
    this.prefix = prefix;
    this.storage = window.localStorage;
    this.session = window.sessionStorage;
  }

  /**
   * Salva item no localStorage
   * @param {string} key - Chave
   * @param {any} value - Valor
   * @param {boolean} useSession - Usar sessionStorage
   * @returns {boolean} Sucesso da operação
   */
  set(key, value, useSession = false) {
    try {
      const storage = useSession ? this.session : this.storage;
      const fullKey = this.prefix + key;
      const serialized = JSON.stringify({
        value: value,
        timestamp: Date.now()
      });
      storage.setItem(fullKey, serialized);
      return true;
    } catch (error) {
      console.error('Erro ao salvar no storage:', error);
      return false;
    }
  }

  /**
   * Recupera item do localStorage
   * @param {string} key - Chave
   * @param {any} defaultValue - Valor padrão
   * @param {boolean} useSession - Usar sessionStorage
   * @returns {any} Valor recuperado
   */
  get(key, defaultValue = null, useSession = false) {
    try {
      const storage = useSession ? this.session : this.storage;
      const fullKey = this.prefix + key;
      const item = storage.getItem(fullKey);
      
      if (!item) {
        return defaultValue;
      }

      const parsed = JSON.parse(item);
      return parsed.value;
    } catch (error) {
      console.error('Erro ao recuperar do storage:', error);
      return defaultValue;
    }
  }

  /**
   * Remove item do storage
   * @param {string} key - Chave
   * @param {boolean} useSession - Usar sessionStorage
   * @returns {boolean} Sucesso da operação
   */
  remove(key, useSession = false) {
    try {
      const storage = useSession ? this.session : this.storage;
      const fullKey = this.prefix + key;
      storage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.error('Erro ao remover do storage:', error);
      return false;
    }
  }

  /**
   * Limpa todo o storage (apenas chaves com prefixo)
   * @param {boolean} useSession - Usar sessionStorage
   */
  clear(useSession = false) {
    try {
      const storage = useSession ? this.session : this.storage;
      const keys = Object.keys(storage);
      
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          storage.removeItem(key);
        }
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao limpar storage:', error);
      return false;
    }
  }

  /**
   * Lista todas as chaves com o prefixo
   * @param {boolean} useSession - Usar sessionStorage
   * @returns {Array} Lista de chaves
   */
  keys(useSession = false) {
    try {
      const storage = useSession ? this.session : this.storage;
      const allKeys = Object.keys(storage);
      
      return allKeys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.replace(this.prefix, ''));
    } catch (error) {
      console.error('Erro ao listar chaves:', error);
      return [];
    }
  }

  /**
   * Verifica se uma chave existe
   * @param {string} key - Chave
   * @param {boolean} useSession - Usar sessionStorage
   * @returns {boolean} Se a chave existe
   */
  has(key, useSession = false) {
    const storage = useSession ? this.session : this.storage;
    const fullKey = this.prefix + key;
    return storage.getItem(fullKey) !== null;
  }

  /**
   * Salva com expiração
   * @param {string} key - Chave
   * @param {any} value - Valor
   * @param {number} expirationMs - Tempo de expiração em ms
   * @param {boolean} useSession - Usar sessionStorage
   */
  setWithExpiry(key, value, expirationMs, useSession = false) {
    try {
      const storage = useSession ? this.session : this.storage;
      const fullKey = this.prefix + key;
      const item = {
        value: value,
        timestamp: Date.now(),
        expiry: Date.now() + expirationMs
      };
      storage.setItem(fullKey, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error('Erro ao salvar com expiração:', error);
      return false;
    }
  }

  /**
   * Recupera item com verificação de expiração
   * @param {string} key - Chave
   * @param {any} defaultValue - Valor padrão
   * @param {boolean} useSession - Usar sessionStorage
   * @returns {any} Valor ou null se expirado
   */
  getWithExpiry(key, defaultValue = null, useSession = false) {
    try {
      const storage = useSession ? this.session : this.storage;
      const fullKey = this.prefix + key;
      const item = storage.getItem(fullKey);
      
      if (!item) {
        return defaultValue;
      }

      const parsed = JSON.parse(item);
      
      // Verifica expiração
      if (parsed.expiry && Date.now() > parsed.expiry) {
        storage.removeItem(fullKey);
        return defaultValue;
      }

      return parsed.value;
    } catch (error) {
      console.error('Erro ao recuperar com expiração:', error);
      return defaultValue;
    }
  }

  /**
   * Retorna tamanho usado do storage
   * @param {boolean} useSession - Usar sessionStorage
   * @returns {number} Tamanho em bytes
   */
  getSize(useSession = false) {
    try {
      const storage = useSession ? this.session : this.storage;
      let size = 0;
      
      Object.keys(storage).forEach(key => {
        if (key.startsWith(this.prefix)) {
          size += storage[key].length + key.length;
        }
      });
      
      return size;
    } catch (error) {
      console.error('Erro ao calcular tamanho:', error);
      return 0;
    }
  }

  /**
   * Exporta todos os dados do storage
   * @param {boolean} useSession - Usar sessionStorage
   * @returns {Object} Objeto com todos os dados
   */
  export(useSession = false) {
    try {
      const storage = useSession ? this.session : this.storage;
      const data = {};
      
      Object.keys(storage).forEach(key => {
        if (key.startsWith(this.prefix)) {
          const cleanKey = key.replace(this.prefix, '');
          data[cleanKey] = this.get(cleanKey, null, useSession);
        }
      });
      
      return data;
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      return {};
    }
  }

  /**
   * Importa dados para o storage
   * @param {Object} data - Dados para importar
   * @param {boolean} useSession - Usar sessionStorage
   * @returns {boolean} Sucesso da operação
   */
  import(data, useSession = false) {
    try {
      Object.keys(data).forEach(key => {
        this.set(key, data[key], useSession);
      });
      return true;
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      return false;
    }
  }
}

/**
 * Gerenciador específico para formulários
 */
class FormStorageManager extends StorageManager {
  constructor() {
    super('form_');
  }

  /**
   * Salva rascunho do formulário
   * @param {string} formId - ID do formulário
   * @param {Object} data - Dados do formulário
   */
  saveDraft(formId, data) {
    return this.set(`draft_${formId}`, data);
  }

  /**
   * Recupera rascunho do formulário
   * @param {string} formId - ID do formulário
   * @returns {Object|null} Dados do rascunho
   */
  getDraft(formId) {
    return this.get(`draft_${formId}`, null);
  }

  /**
   * Remove rascunho do formulário
   * @param {string} formId - ID do formulário
   */
  removeDraft(formId) {
    return this.remove(`draft_${formId}`);
  }

  /**
   * Salva submissão do formulário
   * @param {string} formId - ID do formulário
   * @param {Object} data - Dados submetidos
   */
  saveSubmission(formId, data) {
    const submissions = this.get('submissions', []);
    submissions.push({
      formId: formId,
      data: data,
      timestamp: new Date().toISOString()
    });
    return this.set('submissions', submissions);
  }

  /**
   * Recupera submissões
   * @param {string} formId - ID do formulário (opcional)
   * @returns {Array} Lista de submissões
   */
  getSubmissions(formId = null) {
    const submissions = this.get('submissions', []);
    
    if (formId) {
      return submissions.filter(s => s.formId === formId);
    }
    
    return submissions;
  }

  /**
   * Limpa submissões antigas
   * @param {number} daysOld - Dias de antiguidade
   */
  clearOldSubmissions(daysOld = 30) {
    const submissions = this.get('submissions', []);
    const cutoffDate = Date.now() - (daysOld * 24 * 60 * 60 * 1000);
    
    const filtered = submissions.filter(s => {
      const timestamp = new Date(s.timestamp).getTime();
      return timestamp > cutoffDate;
    });
    
    return this.set('submissions', filtered);
  }
}

/**
 * Gerenciador de preferências do usuário
 */
class PreferencesManager extends StorageManager {
  constructor() {
    super('pref_');
  }

  /**
   * Salva tema
   * @param {string} theme - Tema (light, dark, auto)
   */
  setTheme(theme) {
    return this.set('theme', theme);
  }

  /**
   * Recupera tema
   * @returns {string} Tema atual
   */
  getTheme() {
    return this.get('theme', 'light');
  }

  /**
   * Salva idioma
   * @param {string} language - Código do idioma
   */
  setLanguage(language) {
    return this.set('language', language);
  }

  /**
   * Recupera idioma
   * @returns {string} Idioma atual
   */
  getLanguage() {
    return this.get('language', 'pt-BR');
  }

  /**
   * Salva tamanho de fonte
   * @param {string} size - Tamanho (small, medium, large)
   */
  setFontSize(size) {
    return this.set('fontSize', size);
  }

  /**
   * Recupera tamanho de fonte
   * @returns {string} Tamanho atual
   */
  getFontSize() {
    return this.get('fontSize', 'medium');
  }

  /**
   * Salva consentimento de cookies
   * @param {boolean} consent - Consentimento
   */
  setCookieConsent(consent) {
    return this.set('cookieConsent', consent);
  }

  /**
   * Verifica consentimento de cookies
   * @returns {boolean|null} Consentimento ou null se não definido
   */
  getCookieConsent() {
    return this.get('cookieConsent', null);
  }

  /**
   * Salva preferências de notificação
   * @param {Object} preferences - Preferências
   */
  setNotificationPreferences(preferences) {
    return this.set('notifications', preferences);
  }

  /**
   * Recupera preferências de notificação
   * @returns {Object} Preferências
   */
  getNotificationPreferences() {
    return this.get('notifications', {
      email: true,
      sms: false,
      push: false
    });
  }
}

// Instâncias globais
const storage = new StorageManager();
const formStorage = new FormStorageManager();
const preferences = new PreferencesManager();

// Exporta gerenciadores
if (typeof window !== 'undefined') {
  window.StorageManager = storage;
  window.FormStorage = formStorage;
  window.Preferences = preferences;
}

// Auto-salvar rascunhos de formulários
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[data-autosave]');
    
    forms.forEach(form => {
      const formId = form.id || 'default';
      
      // Recupera rascunho
      const draft = formStorage.getDraft(formId);
      if (draft) {
        // Preenche campos com rascunho
        Object.keys(draft).forEach(key => {
          const field = form.querySelector(`[name="${key}"]`);
          if (field) {
            field.value = draft[key];
          }
        });
        
        // Mostra aviso
        const alert = document.createElement('div');
        alert.className = 'alert alert-info';
        alert.textContent = 'Rascunho recuperado automaticamente';
        form.insertBefore(alert, form.firstChild);
        
        setTimeout(() => alert.remove(), 3000);
      }
      
      // Auto-salva ao digitar (com debounce)
      const autoSave = DOMUtils.debounce(() => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        formStorage.saveDraft(formId, data);
      }, 1000);
      
      form.addEventListener('input', autoSave);
      
      // Remove rascunho ao submeter
      form.addEventListener('submit', () => {
        formStorage.removeDraft(formId);
      });
    });
  });
}