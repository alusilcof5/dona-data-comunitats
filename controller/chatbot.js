window.WomTechChatbot = (function() {
    'use strict';

    let isOpen = false;
    let conversationHistory = [];
    let isInitialized = false;

    const responses = {
        'directori': {
            keywords: ['directori', 'directorio', 'comunitats', 'comunidades', 'organitzacions', 'organizaciones', 'directory'],
            response: ' A la secció **Directori** pots trobar:\n\n• Llista completa de comunitats de dones en tecnologia a Barcelona\n• Informació de contacte i xarxes socials\n• Descripció de les seves activitats i objectius\n• Enllaços als seus webs oficials\n\nT\'interessa alguna comunitat en particular?',
            quickActions: ['Quantes comunitats hi ha?', 'Com contactar amb una comunitat?', 'Veure secció Estudi']
        },
        'estudi': {
            keywords: ['estudi', 'estudio', 'dades', 'datos', 'estadístiques', 'estadísticas', 'anàlisi', 'análisis', 'percentatges', 'porcentajes', 'salari', 'salarios', 'participació', 'participación', 'dashboard'],
            response: 'A la secció **Estudi** trobaràs:\n\n• Anàlisi estadística de l\'impacte de les comunitats\n• Dades de participació femenina en tecnologia (26% a BCN)\n• Comparatives de salaris per gènere (bretxa de l\'11,9%)\n• Gràfics interactius i visualitzacions\n• Tendències temporals i evolució\n\nQuin tipus de dades t\'interessen més?',
            quickActions: ['Com s\'interpreten els percentatges?', 'Quina metodologia s\'ha utilitzat?', 'Comparar comunitats']
        },
        'informació': {
            keywords: ['informació', 'información', 'info', 'recursos', 'sobre', 'acerca', 'projecte', 'proyecto'],
            response: 'ℹA la secció **Informació** pots accedir a:\n\n• Metodologia de l\'estudi\n• Fonts de dades utilitzades (Ajuntament BCN, Gender Equality Index)\n• Equip responsable del projecte (Ana Silva Córdoba)\n• Recursos addicionals i bibliografia\n• Contacte per a col·laboracions\n\nNecessites informació específica sobre algun aspecte?',
            quickActions: ['Qui va fer aquest estudi?', 'Com col·laborar?', 'Veure metodologia']
        },
        'navegació': {
            keywords: ['navegar', 'navegació', 'com', 'cómo', 'usar', 'utilitzar', 'funciona', 'ayuda'],
            response: 'Per navegar per la plataforma:\n\n• **Directori**: Cerca i filtra comunitats\n• **Estudi**: Explora gràfics interactius amb dades reals\n• **Informació**: Llegeix sobre el projecte i metodologia\n\n💡 **Consell**: Les dades que veus a la pàgina principal són reals del sector tech a Barcelona.\n\nQuina secció vols explorar primer?',
            quickActions: ['Anar al Directori', 'Veure dades de l\'Estudi', 'Llegir més informació']
        },
        'salarios': {
            keywords: ['salarios', 'salaris', 'sou', 'sueldo', 'ingressos', 'remuneració', 'bretxa', 'brecha'],
            response: ' Sobre les **dades salarials** que veus a la pàgina:\n\n• **€45K**: Salari mitjà en tecnologia (UE)\n• **11,9%**: Bretxa salarial de gènere a Espanya (INE)\n• Els percentatges mostren diferències reals per gènere\n• Dades segmentades per experiència i rol\n\n Ves a la secció "Estudi" per explorar anàlisis més detallades.',
            quickActions: ['Com es calculen?', 'Veure comparatives', 'Dades de Barcelona']
        },
        'participació': {
            keywords: ['participació', 'participación', 'dones', 'mujeres', 'femenina', 'género', 'gènere', '26%', 'lideratge'],
            response: '👥 Sobre la **participació femenina** a Barcelona:\n\n• **26%** de dones al sector TIC a Barcelona\n• **8,6%** en rols de lideratge tècnic\n• **+1,9%** de creixement anual\n• **350+** empreses monitoritzades\n\n Aquests dades provenen de l\'Ajuntament de Barcelona i estudis europeus.',
            quickActions: ['Per què tan baix?', 'Veure evolució temporal', 'Comparar amb Europa']
        },
        'estadisticas': {
            keywords: ['estadístiques', 'estadísticas', 'números', 'dades', 'cifres', 'percentatge'],
            response: ' **Estadístiques clau** del sector tech a Barcelona:\n\n• **26%** dones en TIC\n• **8,6%** en posicions tècniques de lideratge\n• **11,9%** bretxa salarial\n• **€45K** salari mitjà\n• **+1,9%** creixement anual\n• **350+** empreses monitoritzades\n\nTotes les dades tenen fonts verificades.',
            quickActions: ['Veure fonts', 'Comparar amb altres ciutats', 'Anar al dashboard']
        }
    };

    const defaultResponse = '🤔 Entenc que necessites ajuda amb la plataforma. Et puc ajudar amb:\n\n• **Directori**: Informació sobre les comunitats\n• **Estudi**: Interpretació de dades i estadístiques  \n• **Informació**: Detalls sobre el projecte\n• **Navegació**: Com utilitzar la plataforma\n\nSobre què t\'agradaria saber més?';

    const quickHelp = [
        'Quines comunitats estan incloses?',
        'Com interpreto els gràfics?',
        'Quines dades puc comparar?',
        'Explica\'m la metodologia'
    ];

    // Elements del DOM
    let elements = {};

    function createChatbotHTML() {
        const chatbotHTML = `
        <div class="wt-chatbot-container" id="wtChatbot">
            <!-- Botó flotant -->
            <button class="wt-chatbot-toggle" id="wtChatbotToggle"> <img src="../assets/images/bot.png" alt="Obrir xatbot" /> </button>

            <!-- Modal del chatbot -->
            <div class="wt-chatbot-modal" id="wtChatbotModal">
                <div class="wt-chatbot-header">
                    <button class="wt-chatbot-close" id="wtChatbotClose">×</button>
                    <div class="wt-chatbot-title">Sóc Lucia</div>
                    <div class="wt-chatbot-subtitle">Sóc la teva guia, la teva asistent</div>
                </div>
                
                <div class="wt-chatbot-messages" id="wtChatbotMessages">
                    <!-- Els missatges s'insereixen aquí dinàmicament -->
                </div>

                <div class="wt-typing-indicator" id="wtTypingIndicator">
                    <span>L'assistent està escrivint</span>
                    <div class="wt-typing-dots">
                        <div class="wt-typing-dot"></div>
                        <div class="wt-typing-dot"></div>
                        <div class="wt-typing-dot"></div>
                    </div>
                </div>
                
                <div class="wt-chatbot-input-container">
                    <div class="wt-chatbot-input-wrapper">
                        <input 
                            type="text" 
                            class="wt-chatbot-input" 
                            id="wtChatbotInput" 
                            placeholder="Escriu la teva pregunta aquí..."
                        >
                        <button class="wt-chatbot-send" id="wtChatbotSend">➤</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    function initializeElements() {
        elements = {
            toggle: document.getElementById('wtChatbotToggle'),
            modal: document.getElementById('wtChatbotModal'),
            close: document.getElementById('wtChatbotClose'),
            messages: document.getElementById('wtChatbotMessages'),
            input: document.getElementById('wtChatbotInput'),
            send: document.getElementById('wtChatbotSend'),
            typing: document.getElementById('wtTypingIndicator')
        };
    }

    function bindEvents() {
        elements.toggle.addEventListener('click', toggle);
        elements.close.addEventListener('click', close);
        elements.send.addEventListener('click', sendMessage);
        elements.input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });

        // Prevenir propagació d'esdeveniments per evitar conflictes
        elements.modal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    function toggle() {
        if (isOpen) {
            close();
        } else {
            open();
        }
    }

    function open() {
        isOpen = true;
        elements.modal.classList.add('wt-show');
        elements.toggle.innerHTML = '×';
        elements.toggle.style.fontSize = '28px';
        elements.input.focus();
    }

    function close() {
        isOpen = false;
        elements.modal.classList.remove('wt-show');
        elements.toggle.innerHTML = '<img src="../assets/images/bot.png" alt="Obrir xatbot" />';
        elements.toggle.style.fontSize = '24px';
    }

    const avatarConfig = {
        bot: '../assets/images/bot.png',        
        user: '../assets/images/avatar-user.jpg',      
        fallbackBot: '🤖',                           
        fallbackUser: '👤'                           
    };

    function createAvatar(isUser = false) {
        const avatar = document.createElement('div');
        avatar.className = 'wt-message-avatar';
        
        const avatarImg = document.createElement('img');
        avatarImg.className = 'wt-avatar-img';
        avatarImg.src = isUser ? avatarConfig.user : avatarConfig.bot;
        avatarImg.alt = isUser ? 'Usuario' : 'Asistente';
        
        avatarImg.onerror = function() {
            avatar.innerHTML = `<div class="wt-avatar-fallback">${isUser ? avatarConfig.fallbackUser : avatarConfig.fallbackBot}</div>`;
        };
        
        avatar.appendChild(avatarImg);
        return avatar;
    }

    function addMessage(content, isUser = false, showQuickActions = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `wt-message ${isUser ? 'wt-user' : 'wt-bot'}`;
        
        const avatar = createAvatar(isUser);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'wt-message-content';
        contentDiv.innerHTML = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        elements.messages.appendChild(messageDiv);

        if (showQuickActions && !isUser) {
            const quickActionsDiv = document.createElement('div');
            quickActionsDiv.className = 'wt-quick-actions';
            
            const actions = getQuickActionsForContent(content);
            actions.forEach(action => {
                const actionBtn = document.createElement('div');
                actionBtn.className = 'wt-quick-action';
                actionBtn.textContent = action;
                actionBtn.addEventListener('click', () => sendQuickMessage(action));
                quickActionsDiv.appendChild(actionBtn);
            });
            
            elements.messages.appendChild(quickActionsDiv);
        }
        
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }

    function getQuickActionsForContent(content) {
        for (const [key, data] of Object.entries(responses)) {
            if (content.includes(data.response.substring(0, 20))) {
                return data.quickActions || quickHelp.slice(0, 3);
            }
        }
        return quickHelp.slice(0, 3);
    }

    function sendQuickMessage(message) {
        elements.input.value = message;
        sendMessage();
    }

    function showTypingIndicator() {
        elements.typing.style.display = 'flex';
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }

    function hideTypingIndicator() {
        elements.typing.style.display = 'none';
    }

    function getAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        for (const [key, data] of Object.entries(responses)) {
            if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return data.response;
            }
        }
        
        if (lowerMessage.includes('quantes') && lowerMessage.includes('comunitat')) {
            return ' El directori inclou **15+ comunitats** actives de dones en tecnologia a Barcelona, des de grans organitzacions fins a grups especialitzats en àrees específiques com AI, desenvolupament web, o ciberseguretat.\n\nT\'interessa alguna àrea tecnològica en particular?';
        }
        
        if (lowerMessage.includes('metodologia') || lowerMessage.includes('metodologia')) {
            return '🔬 La **metodologia de l\'estudi** inclou:\n\n• Enquestes a membres de comunitats\n• Anàlisi de dades públiques de l\'Ajuntament de Barcelona\n• Dades del Gender Equality Index 2024\n• Informació de l\'Institut Nacional d\'Estadística (INE)\n\nPots trobar tots els detalls a la secció "Informació".';
        }
        
        if (lowerMessage.includes('col·laborar') || lowerMessage.includes('colaborar')) {
            return ' Vols **col·laborar** amb el projecte?\n\n• Aporta dades de la teva comunitat\n• Participa en futures enquestes\n• Comparteix l\'estudi a la teva xarxa\n• Contacta amb Ana Silva Córdoba\n\nTroba informació de contacte a "Informació" o a través de LinkedIn/GitHub.';
        }

        if (lowerMessage.includes('Ana Lucía Silva') || lowerMessage.includes('autora') || lowerMessage.includes('qui')) {
            return '👩 **Ana Lucía Silva Córdoba** és l\'autora d\'aquest projecte:\n\n• Estudiant de Màster\n• Especialitzada en anàlisi de dades i tecnologia\n• LinkedIn i GitHub disponibles al peu de pàgina\n• Projecte Final de Màster sobre comunitats tech\n\nVols saber més sobre el projecte?';
        }

        if (lowerMessage.includes('fonts') || lowerMessage.includes('dades') || lowerMessage.includes('source')) {
            return ' **Fonts de dades** utilitzades:\n\n• **Ajuntament de Barcelona**: Dades de participació femenina\n• **Gender Equality Index 2024**: Estadístiques europees\n• **Institut Nacional d\'Estadística (INE)**: Bretxa salarial\n• **Enquestes pròpies**: Dades de comunitats\n\nTotes les fonts estan referenciades a la plataforma.';
        }
        
        return defaultResponse;
    }

    function sendMessage() {
        const message = elements.input.value.trim();
        if (!message) return;
        
        elements.input.disabled = true;
        elements.send.disabled = true;
        
        addMessage(message, true);
        conversationHistory.push({role: 'user', content: message});
        
        elements.input.value = '';
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            
            const response = getAIResponse(message);
            addMessage(response, false, true);
            
            conversationHistory.push({role: 'assistant', content: response});
            
            elements.input.disabled = false;
            elements.send.disabled = false;
            elements.input.focus();
            
            // Limitar historial per evitar desbordament
            if (conversationHistory.length > 20) {
                conversationHistory = conversationHistory.slice(-10);
            }
            
        }, 1000 + Math.random() * 1000);
    }

    function addWelcomeMessage() {
        const welcomeMessage = 'Hola! Sóc el teu assistent per consultar el estudi sobre comunitats de dones en tecnologia a Barcelona.\n\nEt puc ajudar amb:\n• Navegar per les seccions\n• Interpretar les dades de l\'estudi\n• Trobar informació específica\n\nEn què et puc ajudar avui?';
        
        addMessage(welcomeMessage, false, true);
    }

  
    function init(config = {}) {
        if (isInitialized) {
            console.warn('Chatbot ja està inicialitzat');
            return;
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                init(config);
            });
            return;
        }

     
        createChatbotHTML();
        
        
        initializeElements();
        
        
        if (!elements.toggle) {
            console.error('No s\'han pogut crear els elements del chatbot');
            return;
        }

        bindEvents();
        addWelcomeMessage();
        
        isInitialized = true;
        console.log('Chatbot inicialitzat correctament');
    }

    function destroy() {
        if (!isInitialized) return;
        
        close();
        
        // Remoure el chatbot del DOM
        const chatbotContainer = document.getElementById('wtChatbot');
        if (chatbotContainer) {
            chatbotContainer.remove();
        }
        
        isInitialized = false;
    }

    // Exposar API pública
    return {
        init: init,
        destroy: destroy,
        open: open,
        close: close,
        isOpen: () => isOpen
    };
})();

// Auto-inicialització si el DOM ja està llest
if (document.readyState !== 'loading') {
    WomTechChatbot.init();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        WomTechChatbot.init();
    });
}
