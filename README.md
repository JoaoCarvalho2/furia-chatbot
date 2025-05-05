Um chatbot oficial da FURIA Esports para fornecer informações sobre o time de Counter-Strike 2 (CS2). Desenvolvido com tecnologia de IA generativa da Google (Gemini), o bot responde perguntas sobre jogadores, resultados, próximos jogos e história do time, utilizando apenas fontes oficiais.

Recursos Principais
Respostas baseadas em IA usando o modelo Gemini Flash da Google

Interface moderna com tema inspirado em CS2 e identidade visual da FURIA

Animações fluidas incluindo efeitos de digitação e transições

Design responsivo que funciona em dispositivos móveis e desktop

Integração com busca para informações atualizadas

Perguntas rápidas com botões pré-definidos

Tecnologias Utilizadas
Frontend: HTML5, CSS3, JavaScript (com TailwindCSS e GSAP)

Backend: Node.js com Express

IA: Google Generative AI (Gemini API)

Efeitos visuais: Particles.js para fundo dinâmico

Como Usar
Pré-requisitos
Node.js (v18 ou superior)

Conta no Google AI Studio com chave API válida

NPM ou Yarn instalado


Instalação
Clone o repositório:

bash
git clone https://github.com/seu-usuario/furia-chatbot.git
cd furia-chatbot
Instale as dependências:

bash
npm install
Crie um arquivo .env na raiz do projeto com sua chave API:

GEMINI_API_KEY=sua_chave_aqui
PORT=3000
Inicie o servidor:

bash
npm start
Acesse no navegador:

http://localhost:3000



Personalização
Você pode personalizar o chatbot modificando:

Cores: Edite as variáveis CSS em style.css

Perguntas rápidas: Atualize os botões em index.html

Comportamento da IA: Ajuste o prompt em server.js

Efeitos visuais: Configure as partículas em script.js

Limitações
O chatbot está programado para responder apenas sobre:

Time de CS2 da FURIA

Jogadores e staff

Campeonatos e resultados

Próximos jogos

Para perguntas fora deste escopo, responderá: "não fui programado para responder esse tipo de pergunta".



Contribuição

Contribuições são bem-vindas! Siga estes passos:

Faça um fork do projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request