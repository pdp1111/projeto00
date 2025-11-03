/* ============================================
   PROJECTS.JS - GERENCIADOR DE PROJETOS
   Gerenciamento dinâmico de projetos sociais
   ============================================ */

/**
 * Dados dos projetos
 */
const projectsData = [
  {
    id: 1,
    title: 'Educação para Todos',
    category: 'educacao',
    description: 'Oferece aulas de reforço e apoio escolar a crianças em comunidades carentes, promovendo acesso à educação de qualidade.',
    image: 'images/22222.JPG',
    badgeType: 'primary',
    badgeText: 'Educação',
    stat1Value: '200+',
    stat1Label: 'crianças atendidas',
    stat2Value: '15',
    stat2Label: 'professores voluntários',
    stat3Value: '3',
    stat3Label: 'núcleos de atendimento',
    since: 'Em andamento desde 2020',
    detailedDescription: `
      <h4>Sobre o Projeto</h4>
      <p>O projeto Educação para Todos nasceu em 2020 com o objetivo de reduzir a evasão escolar e melhorar o desempenho acadêmico de crianças em comunidades carentes.</p>
      <h4>Como Funciona</h4>
      <ul>
        <li>Aulas de reforço em Português e Matemática</li>
        <li>Apoio com material escolar</li>
        <li>Acompanhamento pedagógico individualizado</li>
        <li>Atividades culturais e recreativas</li>
      </ul>
      <h4>Resultados</h4>
      <p>85% de melhoria nas notas dos alunos participantes e redução de 70% na evasão escolar.</p>
      <h4>Depoimentos</h4>
      <blockquote>"Meu filho melhorou muito na escola depois que começou a participar do projeto!" - Maria, mãe de beneficiário</blockquote>
    `,
    volunteers: 15,
    beneficiaries: 200,
    location: 'Zona Leste de São Paulo'
  },
  {
    id: 2,
    title: 'Mãos que Ajudam',
    category: 'assistencia',
    description: 'Promove a doação de alimentos e roupas para famílias em vulnerabilidade social, garantindo dignidade e suporte básico.',
    image: 'images/33333.jpg',
    badgeType: 'secondary',
    badgeText: 'Assistência',
    stat1Value: '500+',
    stat1Label: 'famílias assistidas mensalmente',
    stat2Value: '50',
    stat2Label: 'voluntários ativos',
    stat3Value: '5',
    stat3Label: 'pontos de distribuição',
    since: 'Em andamento desde 2018',
    detailedDescription: `
      <h4>Sobre o Projeto</h4>
      <p>Desde 2018, o projeto Mãos que Ajudam distribui cestas básicas, roupas e produtos de higiene para famílias em situação de vulnerabilidade.</p>
      <h4>Como Funciona</h4>
      <ul>
        <li>Arrecadação de doações da comunidade</li>
        <li>Triagem e organização dos itens</li>
        <li>Distribuição quinzenal em 5 pontos da cidade</li>
        <li>Cadastro e acompanhamento das famílias</li>
      </ul>
      <h4>Impacto</h4>
      <p>Mais de 500 famílias atendidas mensalmente, garantindo dignidade e segurança alimentar.</p>
      <h4>Como Doar</h4>
      <p>Aceitamos alimentos não perecíveis, roupas em bom estado, produtos de higiene e materiais de limpeza.</p>
    `,
    volunteers: 50,
    beneficiaries: 500,
    location: 'Diversas regiões de São Paulo'
  },
  {
    id: 3,
    title: 'Saúde na Comunidade',
    category: 'saude',
    description: 'Oferece atendimento básico de saúde, palestras educativas e campanhas de prevenção em comunidades carentes.',
    image: 'images/33333.jpg',
    badgeType: 'success',
    badgeText: 'Saúde',
    stat1Value: '300+',
    stat1Label: 'atendimentos por mês',
    stat2Value: '8',
    stat2Label: 'profissionais voluntários',
    stat3Value: '12',
    stat3Label: 'campanhas realizadas',
    since: 'Em andamento desde 2021',
    detailedDescription: `
      <h4>Sobre o Projeto</h4>
      <p>Lançado em 2021, o projeto leva atendimento básico de saúde e educação preventiva para comunidades com difícil acesso a serviços médicos.</p>
      <h4>Serviços Oferecidos</h4>
      <ul>
        <li>Consultas médicas básicas</li>
        <li>Aferição de pressão e glicemia</li>
        <li>Palestras sobre saúde preventiva</li>
        <li>Campanhas de vacinação</li>
        <li>Orientação nutricional</li>
        <li>Primeiros socorros</li>
      </ul>
      <h4>Números</h4>
      <p>Mais de 3.600 atendimentos realizados no último ano, com foco em prevenção e educação em saúde.</p>
      <h4>Próximas Ações</h4>
      <p>Campanha de vacinação contra gripe em abril e mutirão de saúde da mulher em outubro.</p>
    `,
    volunteers: 8,
    beneficiaries: 300,
    location: 'Zona Sul de São Paulo'
  }
];

/**
 * Gerenciador de projetos
 */
class ProjectsManager {
  constructor() {
    this.projects = projectsData;
    this.currentFilter = 'all';
    this.projectsGrid = null;
    this.modal = null;
  }

  /**
   * Inicializa o gerenciador
   */
  init() {
    this.projectsGrid = document.getElementById('projects-grid');
    this.modal = document.getElementById('projectModal');

    if (!this.projectsGrid) {
      console.warn('Grid de projetos não encontrado');
      return;
    }

    // Renderiza projetos
    this.renderProjects();

    // Inicializa filtros
    this.initializeFilters();

    // Cria modal se não existir
    if (!this.modal) {
      this.createModal();
    }
  }

  /**
   * Renderiza os projetos no grid
   * @param {string} filter - Filtro de categoria
   */
  renderProjects(filter = 'all') {
    if (!this.projectsGrid) return;

    // Limpa grid
    DOMUtils.removeAllChildren(this.projectsGrid);

    // Filtra projetos
    const filteredProjects = filter === 'all'
      ? this.projects
      : this.projects.filter(p => p.category === filter);

    // Renderiza cada projeto
    filteredProjects.forEach(project => {
      const card = this.createProjectCard(project);
      this.projectsGrid.appendChild(card);
    });

    // Anima entrada dos cards
    if (window.AnimationUtils) {
      AnimationUtils.animateOnScroll('.card');
    }

    // Mensagem se não houver projetos
    if (filteredProjects.length === 0) {
      const message = DOMUtils.createElement('div', {
        className: 'col-12 text-center'
      }, `
        <div style="padding: var(--esp-5);">
          <h3>😔 Nenhum projeto encontrado</h3>
          <p>Não há projetos nesta categoria no momento.</p>
        </div>
      `);
      this.projectsGrid.appendChild(message);
    }
  }

  /**
   * Cria card de projeto
   * @param {Object} project - Dados do projeto
   * @returns {HTMLElement} Card do projeto
   */
  createProjectCard(project) {
    const card = DOMUtils.createElement('article', {
      className: 'card col-12 col-md-6 col-lg-4',
      'data-category': project.category,
      'data-project-id': project.id
    });

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="card-image">
      <div class="card-body">
        <div class="flex justify-between align-center" style="margin-bottom: var(--esp-2);">
          <h3 class="card-title" style="margin: 0;">${project.title}</h3>
          <span class="badge badge-${project.badgeType}">${project.badgeText}</span>
        </div>
        <p class="card-text">${project.description}</p>
        <ul class="card-text">
          <li><strong>${project.stat1Value}</strong> ${project.stat1Label}</li>
          <li><strong>${project.stat2Value}</strong> ${project.stat2Label}</li>
          <li><strong>${project.stat3Value}</strong> ${project.stat3Label}</li>
        </ul>
      </div>
      <div class="card-footer">
        <span class="text-sm text-claro">${project.since}</span>
        <button class="btn btn-sm btn-primary" onclick="ProjectsManager.showDetails(${project.id})">
          Saiba Mais
        </button>
      </div>
    `;

    return card;
  }

  /**
   * Inicializa filtros
   */
  initializeFilters() {
    const filters = document.getElementById('project-filters');
    if (!filters) return;

    // Delega eventos aos botões de filtro
    DOMUtils.delegate(filters, 'click', '.tag', (e) => {
      const filter = e.target.getAttribute('data-filter');
      
      // Atualiza UI dos filtros
      filters.querySelectorAll('.tag').forEach(tag => {
        DOMUtils.removeClass(tag, 'active');
      });
      DOMUtils.addClass(e.target, 'active');

      // Aplica filtro
      this.currentFilter = filter;
      this.renderProjects(filter);
    });
  }

  /**
   * Mostra detalhes do projeto
   * @param {number} projectId - ID do projeto
   */
  static showDetails(projectId) {
    const manager = window.ProjectsManager || new ProjectsManager();
    const project = manager.projects.find(p => p.id === projectId);

    if (!project) {
      console.error('Projeto não encontrado:', projectId);
      return;
    }

    const modal = document.getElementById('projectModal');
    if (!modal) {
      console.error('Modal não encontrado');
      return;
    }

    // Atualiza conteúdo do modal
    const modalTitle = modal.querySelector('#modalTitle');
    const modalBody = modal.querySelector('#modalBody');

    if (modalTitle) {
      modalTitle.textContent = project.title;
    }

    if (modalBody) {
      modalBody.innerHTML = `
        <div class="project-details">
          <img src="${project.image}" alt="${project.title}" 
               style="width: 100%; border-radius: var(--borda-radius-md); margin-bottom: var(--esp-3);">
          
          <div class="flex gap-2 flex-wrap" style="margin-bottom: var(--esp-3);">
            <span class="badge badge-${project.badgeType}">${project.badgeText}</span>
            <span class="badge badge-light">📍 ${project.location}</span>
            <span class="badge badge-light">👥 ${project.volunteers} voluntários</span>
            <span class="badge badge-light">✨ ${project.beneficiaries}+ beneficiados</span>
          </div>

          ${project.detailedDescription}

          <div class="alert alert-info" style="margin-top: var(--esp-4);">
            <strong>Quer participar?</strong> Cadastre-se como voluntário e escolha este projeto!
          </div>
        </div>
      `;
    }

    // Mostra modal
    modal.classList.add('active');

    // Salva visualização no histórico
    manager.saveView(projectId);
  }

  /**
   * Cria modal dinamicamente
   */
  createModal() {
    const modal = DOMUtils.createElement('div', {
      id: 'projectModal',
      className: 'modal'
    }, `
      <div class="modal-backdrop" onclick="closeModal()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modalTitle">Detalhes do Projeto</h3>
          <button class="alert-close" onclick="closeModal()" aria-label="Fechar">&times;</button>
        </div>
        <div class="modal-body" id="modalBody">
          <p>Carregando informações...</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="closeModal()">Fechar</button>
          <a href="/cadastro" data-route="/cadastro" class="btn btn-primary">Quero Participar</a>
        </div>
      </div>
    `);

    document.body.appendChild(modal);
    this.modal = modal;
  }

  /**
   * Salva visualização do projeto
   * @param {number} projectId - ID do projeto
   */
  saveView(projectId) {
    try {
      const views = window.StorageManager?.get('project_views', []) || [];
      views.push({
        projectId: projectId,
        timestamp: new Date().toISOString()
      });
      window.StorageManager?.set('project_views', views);
    } catch (error) {
      console.warn('Erro ao salvar visualização:', error);
    }
  }

  /**
   * Retorna projetos mais visualizados
   * @param {number} limit - Limite de resultados
   * @returns {Array} Projetos mais visualizados
   */
  getMostViewed(limit = 3) {
    try {
      const views = window.StorageManager?.get('project_views', []) || [];
      const counts = {};

      views.forEach(view => {
        counts[view.projectId] = (counts[view.projectId] || 0) + 1;
      });

      const sorted = Object.entries(counts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, limit)
        .map(([id]) => parseInt(id));

      return this.projects.filter(p => sorted.includes(p.id));
    } catch (error) {
      console.warn('Erro ao buscar mais visualizados:', error);
      return [];
    }
  }

  /**
   * Busca projetos
   * @param {string} query - Termo de busca
   * @returns {Array} Projetos encontrados
   */
  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.projects.filter(project =>
      project.title.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery) ||
      project.category.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Retorna estatísticas gerais
   * @returns {Object} Estatísticas
   */
  getStats() {
    return {
      totalProjects: this.projects.length,
      totalVolunteers: this.projects.reduce((sum, p) => sum + p.volunteers, 0),
      totalBeneficiaries: this.projects.reduce((sum, p) => sum + p.beneficiaries, 0),
      categories: [...new Set(this.projects.map(p => p.category))]
    };
  }
}

/**
 * Fecha modal de projeto
 */
function closeModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Instância global
const projectsManager = new ProjectsManager();

// Exporta gerenciador
if (typeof window !== 'undefined') {
  window.ProjectsManager = projectsManager;
  window.closeModal = closeModal;
}

// Inicializa automaticamente se estiver na página de projetos
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('projects-grid')) {
      projectsManager.init();
    }
  });
}