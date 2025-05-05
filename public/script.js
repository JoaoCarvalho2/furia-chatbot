document.addEventListener('DOMContentLoaded', function() {
  // Partículas
  particlesJS('particles-js', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: ['#f5c518', '#7928ca'] },
      shape: { type: 'polygon', polygon: { nb_sides: 6 } },
      opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.1 } },
      size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
      line_linked: { enable: true, distance: 150, color: '#f5c518', opacity: 0.3, width: 1 },
      move: { enable: true, speed: 1.5, attract: { enable: true, rotateX: 600, rotateY: 1200 } }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.5 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });

  // Animação de entrada com GSAP
  if (window.gsap) {
    const timeline = gsap.timeline();
    timeline
      .from('.logo-container', { duration: 0.8, y: -50, opacity: 0 })
      .from('.status-indicator', { duration: 0.5, opacity: 0, x: 20 }, '-=0.4')
      .from('.chat-container', { duration: 0.8, opacity: 0, y: 30 }, '-=0.2')
      .from('.hud-corner, .hud-line', { duration: 0.8, opacity: 0, scale: 0.8, stagger: 0.1 }, '-=0.5')
      .from('#chat-form', { duration: 0.6, opacity: 0, y: 20 }, '-=0.3')
      .from('.quick-questions', { duration: 0.6, opacity: 0, y: 10 }, '-=0.4')
      .from('footer', { duration: 0.5, opacity: 0 }, '-=0.2');

    gsap.fromTo('.bot-message', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 });
  }

  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chat = document.getElementById('chat');
  const typingIndicator = document.getElementById('typing-indicator');

  // Função para adicionar uma mensagem do usuário
  function addUserMessage(text) {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                now.getMinutes().toString().padStart(2, '0');
    
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', 'user-message');
    messageEl.innerHTML = `
      <div class="message-content user-content">
        <div class="message-header">
          <span class="message-sender">Você</span>
          <span class="message-time">${time}</span>
        </div>
        <div class="message-text">
          ${text}
        </div>
      </div>
    `;
    chat.appendChild(messageEl);
    chat.scrollTop = chat.scrollHeight;
  }

  // Função para adicionar uma mensagem do bot com efeito de digitação
  function typeBotMessage(text) {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                now.getMinutes().toString().padStart(2, '0');
    
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', 'bot-message');
    messageEl.innerHTML = `
      <div class="message-avatar">
        <img src="https://api.draft5.gg/teams/330/logo" alt="FURIA Bot" class="h-8 w-8">
      </div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-sender">FURIA Bot</span>
          <span class="message-time">${time}</span>
        </div>
        <div class="message-text">
          <span id="typing-message-${Date.now()}" class="inline-block"></span>
        </div>
      </div>
    `;
    
    chat.appendChild(messageEl);
    chat.scrollTop = chat.scrollHeight;
    
    const typingId = messageEl.querySelector('[id^="typing-message-"]');
    let index = 0;
    
    function typeNextChar() {
      if (index < text.length) {
        typingId.innerHTML += text.charAt(index);
        index++;
        chat.scrollTop = chat.scrollHeight;
        // Acelerando a animação de digitação para 5ms (era 15ms)
        setTimeout(typeNextChar, 5);
      }
    }
    
    typeNextChar();
  }

  // Função regular para adicionar uma mensagem do bot (sem animação)
  function addBotMessage(text) {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                now.getMinutes().toString().padStart(2, '0');
    
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', 'bot-message');
    messageEl.innerHTML = `
      <div class="message-avatar">
        <img src="https://api.draft5.gg/teams/330/logo" alt="FURIA Bot" class="h-8 w-8">
      </div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-sender">FURIA Bot</span>
          <span class="message-time">${time}</span>
        </div>
        <div class="message-text">
          ${text}
        </div>
      </div>
    `;
    chat.appendChild(messageEl);
    chat.scrollTop = chat.scrollHeight;
  }

  // Mostrar indicador de digitação (pensando)
  function showTyping() {
    typingIndicator.classList.remove('hidden');
    typingIndicator.innerHTML = `
      <div class="message bot-message thinking-message">
        <div class="message-avatar">
          <img src="https://api.draft5.gg/teams/330/logo" alt="FURIA Bot" class="h-8 w-8">
        </div>
        <div class="message-content">
          <div class="message-header">
            <span class="message-sender">FURIA Bot</span>
            <span class="message-time">Agora</span>
          </div>
          <div class="message-text">
            <span class="typing-dots">
              <span>.</span><span>.</span><span>.</span>
            </span>
          </div>
        </div>
      </div>
    `;
    
    // Animar os pontos com GSAP se disponível
    if (window.gsap) {
      gsap.to(typingIndicator.querySelectorAll('.typing-dots span'), {
        y: -5,
        opacity: 1,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 0.4
      });
    }
    
    chat.scrollTop = chat.scrollHeight;
  }

  // Esconder indicador de digitação
  function hideTyping() {
    typingIndicator.classList.add('hidden');
  }

  async function fetchBotResponse(message) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error('Erro na resposta do servidor');

      const data = await response.json();
      return data.reply;

    } catch (error) {
      console.error('Erro ao obter resposta:', error);
      return 'Desculpe, ocorreu um erro. Tente novamente mais tarde.';
    }
  }

  // Função principal para processar o envio do chat
  chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    userInput.value = '';

    showTyping();

    try {
      const botResponse = await fetchBotResponse(message);
      hideTyping();

      setTimeout(() => {
        typeBotMessage(botResponse);
      }, 300);
    } catch (err) {
      hideTyping();
      setTimeout(() => {
        addBotMessage('Erro técnico. Tente novamente mais tarde.');
      }, 300);
    }
  });

  // Botões de perguntas rápidas
  const quickButtons = document.querySelectorAll('.quick-btn');
  quickButtons.forEach(button => {
    button.addEventListener('click', function() {
      userInput.value = this.textContent;
      // Desabilita os botões durante o processamento para evitar cliques múltiplos
      quickButtons.forEach(btn => btn.disabled = true);
      chatForm.dispatchEvent(new Event('submit'));
      // Habilita os botões novamente após 2 segundos
      setTimeout(() => {
        quickButtons.forEach(btn => btn.disabled = false);
      }, 2000);
    });
  });
});