# 🚀 Workaholic - Painel de Produtividade Premium

Um painel web minimalista e sofisticado projetado especificamente para ficar aberto em tempo integral no segundo monitor durante o expediente. Reúne ferramentas essenciais em uma única página com foco na produtividade e design premium.

## 🌐 **Demo Online**

**🔗 Acesse agora:** [https://gabeflowers.github.io/workaholic](https://gabeflowers.github.io/workaholic)

![Painel de Produtividade](https://img.shields.io/badge/Status-Online-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-success)

## ✨ Funcionalidades

### 🎨 **Sistema de Tema Dark/Light**
- **Alternância intuitiva**: Botão no header (☀️/🌙)
- **Atalho rápido**: `Ctrl + Shift + T` para alternar
- **Persistência**: Salva preferência no localStorage
- **Transições suaves**: Animações elegantes entre temas

### 📋 Mini-Kanban "Todo/Done"
- **Duas colunas fixas**: "A Fazer" e "Concluído"
- **Drag & Drop**: Arraste tarefas entre colunas com animações suaves
- **Edição inline**: Duplo clique para editar tarefas
- **Títulos e descrições**: Suporte completo a texto rico
- **Persistência local**: Dados salvos automaticamente no navegador
- **Contadores dinâmicos**: Visualização em tempo real do progresso

### 📝 Notas Rápidas Premium
- **3 cores temáticas**: Amarelo, azul e verde com gradientes
- **Edição intuitiva**: Duplo clique para editar, Ctrl+Enter para salvar
- **Títulos opcionais**: Organize suas notas com títulos
- **Salvamento automático**: Nunca perca suas ideias
- **Animações elegantes**: Transições suaves e feedback visual
- **Interface moderna**: Design glass morphism com bordas coloridas

### 🕐 Relógio Digital Elegante
- **Fonte premium**: SF Pro Rounded para máxima legibilidade
- **Formato 24h**: Horário profissional
- **Data completa**: Dia da semana, data e mês
- **Atualização em tempo real**: Precisão de segundo
- **Design minimalista**: Integração perfeita com o layout

### 🎵 Music Player Avançado
- **YouTube Lofi**: 7 playlists pré-configuradas de música lofi, jazz e ambientes
- **Spotify integrado**: Suporte a playlists, álbuns e músicas individuais
- **Sistema de abas**: Alterne facilmente entre YouTube e Spotify
- **Playlists curadas**: Lofi Hip Hop, Coffee Shop Jazz, Rain Sounds, Synthwave
- **Altura otimizada**: Player compacto que não requer rolagem
- **Autoplay inteligente**: Reprodução automática sem interrupções

## 🎨 Design System Premium

### Fontes Profissionais
- **SF Pro Display**: Interface principal (Regular, Medium)
- **SF Pro Text**: Títulos e destaques (Black)
- **SF Pro Rounded**: Relógio e elementos especiais
- **Neulis Alt**: Logotipos e títulos principais (Black)

### Glass Morphism
- **Transparências elegantes**: Efeitos de vidro com blur
- **Bordas suaves**: Cantos arredondados e sombras sutis
- **Gradientes modernos**: Cores harmoniosas e profissionais
- **Animações fluidas**: Transições com cubic-bezier

### Paleta de Cores
#### Tema Dark (Padrão)
- **Gradiente principal**: #1a1a2e → #0f3460
- **Cards**: Transparências brancas com blur
- **Texto**: Branco com opacidades variadas

#### Tema Light
- **Gradiente principal**: #f8fafc → #cbd5e1
- **Cards**: Brancos com transparências
- **Texto**: Tons escuros com opacidades

### Playlists YouTube Incluídas
- **🎵 Lofi Hip Hop Radio 24/7** - Beats to Study/Relax
- **🌙 Chill Lofi Mix** - Deep Focus
- **📚 Study With Me** - Lofi Beats
- **☕ Coffee Shop Jazz** - Relaxing Background Music
- **🌧️ Rain & Jazz** - Cozy Coffee Shop Ambience
- **🌆 Synthwave Chillout** - Retro Vibes
- **🌲 Forest Sounds** - Nature Ambience

## ⌨️ Atalhos de Teclado

| Atalho | Função |
|--------|--------|
| `Ctrl + Shift + T` | Alternar tema (Dark/Light) |
| `Ctrl + T` | Nova tarefa |
| `Ctrl + N` | Nova nota |
| `Ctrl + Enter` | Salvar (em formulários) |
| `Esc` | Cancelar edição |
| `Duplo clique` | Editar item |
| `?` | Mostrar/ocultar ajuda |

## 🛠️ Tecnologias

### Core
- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna e rápida

### Styling
- **TailwindCSS** - Framework CSS utilitário
- **CSS Custom Properties** - Variáveis CSS nativas para temas
- **Animações CSS** - Transições e keyframes

### Estado e Dados
- **Zustand** - Gerenciamento de estado leve
- **localStorage** - Persistência local
- **Tratamento de erros** - Recuperação automática de dados

### Drag & Drop
- **@dnd-kit/core** - Sistema de drag and drop
- **@dnd-kit/sortable** - Ordenação por arrastar
- **@dnd-kit/utilities** - Utilitários para transformações

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js 18+ ou Yarn 1.22+

### Instalação Local
```bash
# Clone o repositório
git clone https://github.com/gabeflowers/workaholic.git
cd workaholic

# Instale as dependências
yarn install

# Inicie o servidor de desenvolvimento
yarn dev
```

### Acesso Local
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Deploy
```bash
# Build para produção
yarn build

# Deploy para GitHub Pages
yarn deploy
```

## 📱 Layout Otimizado

### Segunda Tela (Recomendado)
- **Resolução mínima**: 1920x1080
- **Layout 12 colunas**: 8 colunas para Kanban, 4 para notas/música
- **Altura otimizada**: `calc(100vh - 140px)` para máximo aproveitamento

### Responsividade
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Adaptação automática das colunas
- **Mobile**: Stack vertical para melhor usabilidade

## 🎯 Casos de Uso

### Desenvolvedores
- Acompanhar tarefas do sprint
- Notas rápidas de debugging
- Música para concentração
- Monitoramento de tempo

### Designers
- Lista de revisões e feedbacks
- Inspirações e referências
- Playlists criativas
- Controle de deadlines

### Gerentes de Projeto
- Overview de tarefas da equipe
- Notas de reuniões
- Acompanhamento de progresso
- Ambiente produtivo

## 🔧 Personalização

### Temas
O sistema de temas utiliza CSS Variables para mudanças instantâneas:

```css
:root {
  --bg-primary: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
  --text-primary: rgba(255, 255, 255, 0.95);
  /* ... outras variáveis */
}

.theme-light {
  --bg-primary: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%);
  --text-primary: rgba(15, 23, 42, 0.95);
  /* ... outras variáveis */
}
```

### Cores das Notas
As cores podem ser alteradas facilmente no arquivo `src/index.css`:

```css
.note-yellow {
  background: linear-gradient(135deg, rgba(255, 235, 59, 0.2) 0%, rgba(255, 193, 7, 0.15) 100%);
}
```

### Fontes
Para usar fontes diferentes, substitua os arquivos em `public/fonts/` e atualize as declarações `@font-face` no CSS.

### Layout
O grid pode ser ajustado em `src/App.tsx` alterando as classes `col-span-*`.

## 📊 Performance

### Otimizações
- **Lazy loading**: Componentes carregados sob demanda
- **Memoização**: React.memo em componentes críticos
- **Debounce**: Salvamento automático otimizado
- **Code splitting**: Chunks separados para vendor, dnd e store
- **CSS Variables**: Mudanças de tema sem re-render

### Métricas
- **First Paint**: < 1s
- **Interactive**: < 2s
- **Bundle size**: < 500KB gzipped
- **Lighthouse Score**: 95+

## 🚀 Deploy Automático

### GitHub Actions
O projeto inclui workflow automático que:
- **Instala dependências** com cache do Yarn
- **Executa build** otimizado para produção
- **Deploy automático** no GitHub Pages
- **Ativado** a cada push na branch `main`

### Configuração Manual
```bash
# Build local
yarn build

# Deploy manual
yarn deploy
```

## 🔮 Roadmap

### Próximas Funcionalidades
- [ ] **Widgets adicionais**: Clima, calendário, RSS
- [ ] **Sincronização na nuvem**: Backup automático
- [ ] **Atalhos customizáveis**: Configuração de hotkeys
- [ ] **Exportação de dados**: JSON, CSV, PDF
- [ ] **Integração com APIs**: Trello, Notion, GitHub
- [ ] **Modo foco**: Ocultar distrações temporariamente

### Melhorias Técnicas
- [ ] **PWA**: Instalação como app nativo
- [ ] **Offline support**: Funcionamento sem internet
- [ ] **Performance**: Otimizações avançadas
- [ ] **Acessibilidade**: WCAG 2.1 AA compliance
- [ ] **Testes**: Cobertura de 90%+
- [ ] **Internacionalização**: Suporte a múltiplos idiomas

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **SF Pro Fonts** - Apple Inc.
- **Neulis Alt** - Fonte premium para títulos
- **TailwindCSS** - Framework CSS incrível
- **React Team** - Por tornar o desenvolvimento divertido
- **Vite** - Build tool super rápida
- **GitHub Pages** - Hospedagem gratuita e confiável

---

**Desenvolvido com ❤️ para maximizar sua produtividade** ⚡

**🔗 Acesse agora:** [https://gabeflowers.github.io/workaholic](https://gabeflowers.github.io/workaholic) 