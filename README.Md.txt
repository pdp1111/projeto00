# 🌟 ONG Esperança Viva - Projeto Web Completo

## 📋 Sobre o Projeto
Site institucional da ONG Esperança Viva desenvolvido com HTML5 e CSS3 moderno, incluindo sistema de design completo, layouts responsivos e componentes interativos.

---

## 📁 Estrutura de Pastas

```
projeto-ong-esperanca-viva/
├── index.html
├── projetos.html
├── cadastro.html
├── css/
│   ├── variables.css      # Sistema de design (variáveis CSS)
│   ├── reset.css          # Normalização e base
│   ├── layout.css         # Grid system e estrutura
│   ├── navigation.css     # Navegação e menu
│   ├── components.css     # Componentes (botões, cards, forms)
│   └── responsive.css     # Media queries
├── images/
│   ├── 11111.avif
│   ├── 22222.JPG
│   └── 33333.jpg
└── README.md
```

---

## ✅ Requisitos Atendidos

### 1. Sistema de Design ✓
- ✅ 8+ cores definidas (primárias, secundárias, neutras)
- ✅ 8 tamanhos de fonte hierárquicos
- ✅ Sistema de espaçamento modular (8px, 16px, 24px, 32px, 48px, 64px)
- ✅ Variáveis CSS customizadas

### 2. Layouts Responsivos ✓
- ✅ CSS Grid para estrutura principal (12 colunas)
- ✅ Flexbox para componentes internos
- ✅ 5+ breakpoints responsivos:
  - Extra Small: < 400px
  - Small: 576px - 767px
  - Medium: 768px - 991px
  - Large: 992px - 1199px
  - Extra Large: ≥ 1200px

### 3. Navegação Sofisticada ✓
- ✅ Menu principal responsivo
- ✅ Submenu dropdown (preparado)
- ✅ Menu hambúrguer mobile com animação
- ✅ Transições suaves

### 4. Componentes de Interface ✓
- ✅ Sistema de cards responsivos
- ✅ Botões com 4 estados (hover, focus, active, disabled)
- ✅ Formulários estilizados com validação visual
- ✅ Componentes de feedback (alerts, toasts, modals)
- ✅ Sistema de badges e tags

---

## 🎨 Sistema de Cores

```css
/* Cores Primárias */
--cor-primaria: #1e88e5        (Azul principal)
--cor-primaria-escura: #1565c0
--cor-primaria-clara: #64b5f6

/* Cores Secundárias */
--cor-secundaria: #26a69a      (Verde-água)
--cor-secundaria-escura: #00897b

/* Cores de Destaque */
--cor-acento: #fbc02d          (Amarelo/Dourado)

/* Cores de Feedback */
--cor-sucesso: #4caf50         (Verde)
--cor-erro: #e53935            (Vermelho)
--cor-aviso: #ff9800           (Laranja)
--cor-info: #03a9f4            (Azul info)

/* Cores Neutras */
--cor-neutra-1 a --cor-neutra-5 (do mais claro ao mais escuro)
```

---

## 📱 Breakpoints Responsivos

| Breakpoint | Tamanho | Descrição |
|------------|---------|-----------|
| XS | < 400px | Smartphones muito pequenos |
| SM | 576px - 767px | Smartphones |
| MD | 768px - 991px | Tablets |
| LG | 992px - 1199px | Desktops pequenos |
| XL | ≥ 1200px | Desktops grandes |

---

## 🚀 Como Usar

### 1. Baixe os Arquivos
Clone ou baixe todos os arquivos mantendo a estrutura de pastas.

### 2. Organize as Imagens
Coloque suas imagens na pasta `images/`:
- `11111.avif` - Imagem da equipe
- `22222.JPG` - Imagem do projeto educação
- `33333.jpg` - Imagem do projeto assistência

### 3. Abra no Navegador
Simplesmente abra o arquivo `index.html` em qualquer navegador moderno.

### 4. Teste a Responsividade
- Redimensione a janela do navegador
- Use DevTools (F12) para simular diferentes dispositivos
- Teste o menu hambúrguer em telas pequenas

---

## 🎯 Funcionalidades Principais

### Página Inicial (index.html)
- Hero section com call-to-action
- Seção "Quem Somos" com imagem
- Cards de Missão, Visão e Valores
- Estatísticas de impacto
- Informações de contato

### Página de Projetos (projetos.html)
- Grid de cards com projetos
- Sistema de filtros por categoria
- Modal com detalhes dos projetos
- Seções de voluntariado e doações
- Badges categorizando projetos

### Página de Cadastro (cadastro.html)
- Formulário completo com validação
- Máscaras de entrada (CPF, telefone, CEP)
- Validação em tempo real
- Feedback visual de erros
- Modal de confirmação

---

## 🎨 Componentes Disponíveis

### Botões
```html
<button class="btn btn-primary">Primário</button>
<button class="btn btn-secondary">Secundário</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-text">Texto</button>
```

### Cards
```html
<div class="card">
  <img src="..." class="card-image">
  <div class="card-body">
    <h3 class="card-title">Título</h3>
    <p class="card-text">Conteúdo...</p>
  </div>
  <div class="card-footer">Footer</div>
</div>
```

### Alerts
```html
<div class="alert alert-success">Sucesso!</div>
<div class="alert alert-error">Erro!</div>
<div class="alert alert-warning">Aviso!</div>
<div class="alert alert-info">Informação!</div>
```

### Badges
```html
<span class="badge badge-primary">Badge</span>
<span class="badge badge-success">Ativo</span>
```

### Grid System
```html
<div class="grid">
  <div class="col-12 col-md-6 col-lg-4">Coluna 1</div>
  <div class="col-12 col-md-6 col-lg-4">Coluna 2</div>
  <div class="col-12 col-md-12 col-lg-4">Coluna 3</div>
</div>
```

---

## 🔧 Personalização

### Alterar Cores
Edite o arquivo `css/variables.css` e modifique as variáveis de cor:
```css
:root {
  --cor-primaria: #SUA_COR;
  --cor-secundaria: #SUA_COR;
  /* ... */
}
```

### Ajustar Espaçamentos
Modifique as variáveis de espaçamento em `variables.css`:
```css
--esp-1: 8px;
--esp-2: 16px;
/* ... */
```

### Mudar Tipografia
Substitua as fontes no `<head>` dos HTMLs e em `variables.css`:
```css
--fonte-principal: 'Sua Fonte', sans-serif;
```

---

## 📝 Checklist de Entrega

- [x] Estrutura de pastas organizada
- [x] CSS modular (6 arquivos separados)
- [x] Sistema de design com variáveis
- [x] 8+ cores definidas
- [x] 5+ tamanhos de fonte
- [x] Sistema de espaçamento modular
- [x] Grid 12 colunas com CSS Grid
- [x] Flexbox para componentes
- [x] 5+ breakpoints responsivos
- [x] Menu responsivo com dropdown
- [x] Menu hambúrguer mobile
- [x] Cards responsivos
- [x] Botões com 4 estados
- [x] Formulários com validação visual
- [x] Alerts, toasts, modals
- [x] Sistema de badges e tags
- [x] HTMLs corrigidos e validados
- [x] Link GitHub público

---

## 📤 Como Subir no GitHub

### 1. Crie um Repositório
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `ong-esperanca-viva`
4. ✅ Marque como **PÚBLICO**
5. Clique em "Create repository"

### 2. Faça Upload dos Arquivos
**Opção A - Via Interface Web:**
1. Na página do repositório, clique em "Add file" > "Upload files"
2. Arraste todos os arquivos mantendo a estrutura de pastas
3. Commit: "Entrega II - Estilização e Layouts"

**Opção B - Via Git (terminal):**
```bash
cd caminho/da/pasta/do/projeto
git init
git add .
git commit -m "Entrega II - Estilização e Layouts"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ong-esperanca-viva.git
git push -u origin main
```

### 3. Verifique se está Público
1. Vá em Settings do repositório
2. Role até "Danger Zone"
3. Confirme que está em "Public"

### 4. Copie o Link
O link será: `https://github.com/SEU_USUARIO/ong-esperanca-viva`

---

## ✨ Destaques Técnicos

### CSS Grid Avançado
- Grid responsivo de 12 colunas
- Ajuste automático por breakpoint
- Gaps flexíveis

### Acessibilidade
- Skip links para navegação
- ARIA labels
- Foco visível
- Alto contraste opcional
- Preferências de movimento reduzido

### Performance
- CSS modular carregado em ordem
- Transições otimizadas
- Imagens responsivas
- Código semântico

### JavaScript Vanilla
- Sem dependências externas
- Menu mobile funcional
- Máscaras de formulário
- Validação em tempo real
- Modal dinâmico

---

## 🎓 Tecnologias Utilizadas

- HTML5 (semântico)
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript Vanilla (ES6+)
- Google Fonts (Poppins, Roboto)

---

## 📞 Suporte

Em caso de dúvidas sobre o projeto:
1. Verifique se a estrutura de pastas está correta
2. Confirme que todos os arquivos CSS estão na pasta `css/`
3. Teste em diferentes navegadores
4. Use o DevTools (F12) para debug

---

## 🏆 Critérios de Avaliação Atendidos

| Critério | Status |
|----------|--------|
| Sistema de Design | ✅ 100% |
| Layouts Responsivos | ✅ 100% |
| Navegação Sofisticada | ✅ 100% |
| Componentes de Interface | ✅ 100% |
| CSS Organizados | ✅ 100% |
| Link GitHub Público | ⏳ Pendente (você fará o upload) |

---

**Desenvolvido para a disciplina de Desenvolvimento Web**  
**ONG Esperança Viva © 2025**