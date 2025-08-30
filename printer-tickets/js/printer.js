// Impresora de Tickets de Rayo McQueen
class LightningMcQueenPrinter {
    constructor() {
        this.ticketCounter = 0;
        this.isPrinting = false;
        this.particles = [];
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createParticles();
        this.hideWelcomeMessage();
        this.setupAudio();
        this.setupResponsiveHandlers();
    }

    setupEventListeners() {
        const printButton = document.getElementById('printButton');
        const clearButton = document.getElementById('clearButton');
        const welcomeMessage = document.getElementById('welcomeMessage');

        printButton.addEventListener('click', () => this.printTicket());
        clearButton.addEventListener('click', () => this.clearTickets());
        
        // Ocultar mensaje de bienvenida al hacer clic
        welcomeMessage.addEventListener('click', () => {
            this.hideWelcomeMessage();
        });

        // Efectos de hover en el botón
        printButton.addEventListener('mouseenter', () => {
            this.createButtonEffect(printButton);
        });

        // Activar audio en la primera interacción del usuario
        this.setupAudioActivation();
    }

    setupAudioActivation() {
        const activateAudio = () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume().then(() => {
                    console.log('🎵 Audio activado correctamente');
                });
            }
        };

        // Activar audio en cualquier interacción del usuario
        document.addEventListener('click', activateAudio, { once: true });
        document.addEventListener('keydown', activateAudio, { once: true });
        document.addEventListener('touchstart', activateAudio, { once: true });
    }

    setupAudio() {
        // Crear elementos de audio para efectos sonoros usando Web Audio API
        this.audioContext = null;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API no soportado');
        }
    }

    createBeepSound(frequency = 800, duration = 200, type = 'sine') {
        if (!this.audioContext) {
            this.initAudioContext();
        }
        
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }

    createPrintSound() {
        // Sonido de impresión - simula el ruido de una impresora
        this.createBeepSound(800, 200, 'sawtooth');
        setTimeout(() => {
            this.createBeepSound(600, 150, 'square');
        }, 100);
        setTimeout(() => {
            this.createBeepSound(1000, 100, 'sine');
        }, 200);
        setTimeout(() => {
            this.createBeepSound(400, 300, 'sawtooth');
        }, 400);
    }

    createTicketSound() {
        // Sonido de ticket completado - melodía ascendente
        this.createBeepSound(600, 100, 'sine');
        setTimeout(() => {
            this.createBeepSound(800, 100, 'sine');
        }, 100);
        setTimeout(() => {
            this.createBeepSound(1000, 150, 'sine');
        }, 200);
    }

    createParticles() {
        const container = document.getElementById('particlesContainer');
        
        setInterval(() => {
            if (this.particles.length < 20) {
                this.createParticle(container);
            }
        }, 500);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        container.appendChild(particle);
        this.particles.push(particle);

        // Remover partícula después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            this.particles = this.particles.filter(p => p !== particle);
        }, 8000);
    }

    hideWelcomeMessage() {
        const welcomeMessage = document.getElementById('welcomeMessage');
        setTimeout(() => {
            welcomeMessage.classList.add('hidden');
        }, 3000);
    }

    async printTicket() {
        if (this.isPrinting) return;

        this.isPrinting = true;
        this.ticketCounter++;

        // Actualizar contador
        document.getElementById('ticketCounter').textContent = this.ticketCounter;

        // Generar ticket primero para saber si tiene imagen
        const ticket = generateTicket();

        // Efectos visuales y sonoros
        this.playPrintSound();
        this.createPrintingEffects();
        this.updatePrinterStatus('Imprimiendo...');
        this.createProgressBar();
        
        // Efecto especial si el ticket tiene imagen (durante la impresión)
        if (ticket.decoration.type === 'image') {
            this.createImageEffect(ticket.decoration.content);
        }

        // Simular tiempo de impresión (aumentado para mejor experiencia)
        await this.delay(2500);

        // Crear el ticket
        this.createTicketElement(ticket);

        // Efectos finales
        this.playTicketSound();
        this.createLightningEffect();
        this.removeProgressBar();
        
        this.updatePrinterStatus('Listo');

        this.isPrinting = false;
    }

    createTicketElement(ticket) {
        // Crear el ticket temporalmente en la abertura de la impresora
        this.createTicketFromPrinter(ticket);
    }

    createTicketFromPrinter(ticket) {
        const ticketSlot = document.querySelector('.ticket-slot');
        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket-emerging';

        const ticketNumber = this.ticketCounter.toString().padStart(3, '0');
        const currentDate = new Date().toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Crear decoración dinámicamente
        let decorationHTML = '';
        if (ticket.decoration.type === 'image') {
            decorationHTML = `<img src="${ticket.decoration.content}" alt="${ticket.decoration.alt}" class="ticket-decoration-image">`;
        } else {
            decorationHTML = `<div class="ticket-decoration">${ticket.decoration.content}</div>`;
        }

        ticketElement.innerHTML = `
            ${decorationHTML}
            <div class="ticket-header">
                <span class="ticket-number">Ticket #${ticketNumber}</span>
                <span class="ticket-date">${currentDate}</span>
            </div>
            <div class="ticket-content">
                <div class="ticket-message">${ticket.message}</div>
            </div>
            <div class="ticket-footer">
                <span class="ticket-signature">${ticket.closingPhrase}</span>
                <span class="ticket-id">ID: ${Date.now()}</span>
            </div>
        `;

        // Posicionar el ticket en la abertura de la impresora
        const slotRect = ticketSlot.getBoundingClientRect();
        
        ticketElement.style.position = 'fixed';
        ticketElement.style.left = slotRect.left + 'px';
        ticketElement.style.top = slotRect.top + 'px';
        ticketElement.style.width = slotRect.width + 'px';
        ticketElement.style.zIndex = '1000';
        ticketElement.style.transform = 'translateY(0) scale(0.8)';
        ticketElement.style.opacity = '0';
        ticketElement.style.overflow = 'hidden';

        document.body.appendChild(ticketElement);

        // Efecto de brillo en la abertura
        this.createSlotGlow();
        
        // Crear partículas que salgan de la abertura
        this.createSlotParticles();

        // La animación CSS se encarga de la emergencia del ticket

        // Mover el ticket hacia la sección de tickets después de que salga completamente
        setTimeout(() => {
            const ticketsStack = document.getElementById('ticketsStack');
            const targetRect = ticketsStack.getBoundingClientRect();
            
            // Crear efecto de estela durante el vuelo
            this.createFlightTrail(ticketElement);
            
            // Añadir efecto de vuelo más visible
            ticketElement.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            ticketElement.style.left = targetRect.left + 'px';
            ticketElement.style.top = targetRect.top + 'px';
            ticketElement.style.transform = 'translateY(0) scale(0.9)';
            ticketElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            ticketElement.style.zIndex = '1001';
            
            // Efecto de rotación durante el vuelo
            setTimeout(() => {
                ticketElement.style.transform = 'translateY(-10px) scale(0.95) rotate(2deg)';
            }, 300);
            
            setTimeout(() => {
                ticketElement.style.transform = 'translateY(0) scale(0.9) rotate(0deg)';
            }, 1200);
        }, 1800);

        // Finalizar la animación y añadir al stack
        setTimeout(() => {
            ticketElement.style.position = 'static';
            ticketElement.style.width = '';
            ticketElement.style.left = '';
            ticketElement.style.top = '';
            ticketElement.style.transform = '';
            ticketElement.style.transition = '';
            ticketElement.style.overflow = '';
            ticketElement.style.boxShadow = '';
            ticketElement.className = 'ticket';
            
            const ticketsStack = document.getElementById('ticketsStack');
            ticketsStack.insertBefore(ticketElement, ticketsStack.firstChild);
            
            // Scroll hacia el nuevo ticket
            setTimeout(() => {
                this.scrollToTicket(ticketElement);
            }, 100);
        }, 3300);
    }

    setupResponsiveHandlers() {
        // Detectar cambios en el tamaño de pantalla
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
        });
    }

    scrollToTicket(ticketElement) {
        // En móviles, hacer scroll hacia la sección de tickets
        if (this.isMobile) {
            const ticketsSection = document.getElementById('ticketsStack');
            if (ticketsSection) {
                // Crear indicador visual de scroll en móviles
                this.createScrollIndicator();
                
                // Scroll suave hacia la sección de tickets
                ticketsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
                
                // Añadir un pequeño delay para asegurar que el scroll se complete
                setTimeout(() => {
                    // Scroll adicional hacia el ticket específico si es necesario
                    ticketElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest',
                        inline: 'nearest'
                    });
                    
                    // Remover el indicador después del scroll
                    this.removeScrollIndicator();
                }, 800);
            }
        } else {
            // En desktop, scroll hacia el ticket específico
            ticketElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    createScrollIndicator() {
        // Crear indicador visual para móviles
        const indicator = document.createElement('div');
        indicator.id = 'scroll-indicator';
        indicator.style.position = 'fixed';
        indicator.style.top = '20px';
        indicator.style.left = '50%';
        indicator.style.transform = 'translateX(-50%)';
        indicator.style.background = 'rgba(231, 76, 60, 0.9)';
        indicator.style.color = 'white';
        indicator.style.padding = '10px 20px';
        indicator.style.borderRadius = '25px';
        indicator.style.fontSize = '14px';
        indicator.style.fontWeight = 'bold';
        indicator.style.zIndex = '9999';
        indicator.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        indicator.style.animation = 'fadeInOut 2s ease-in-out';
        indicator.innerHTML = '📱 Desplazándose a los tickets...';
        
        document.body.appendChild(indicator);
    }

    removeScrollIndicator() {
        const indicator = document.getElementById('scroll-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    createPrintingEffects() {
        const printerMachine = document.querySelector('.printer-machine');
        const printButton = document.getElementById('printButton');

        // Efecto de vibración más largo
        printerMachine.classList.add('printing');
        printButton.style.transform = 'scale(0.95)';

        // Crear efecto de chispas múltiples durante la impresión
        this.createSparkEffect(printerMachine);
        
        // Más chispas durante el proceso
        setTimeout(() => {
            this.createSparkEffect(printerMachine);
        }, 800);
        
        setTimeout(() => {
            this.createSparkEffect(printerMachine);
        }, 1600);

        setTimeout(() => {
            printerMachine.classList.remove('printing');
            printButton.style.transform = '';
        }, 2500);
    }



    createProgressBar() {
        const screen = document.querySelector('.printer-screen');
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="progress-text">Imprimiendo ticket...</div>
        `;
        
        screen.appendChild(progressContainer);
        
        // Animar la barra de progreso
        setTimeout(() => {
            const progressFill = progressContainer.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = '100%';
            }
        }, 100);
    }

    removeProgressBar() {
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            progressContainer.remove();
        }
    }

    createSlotGlow() {
        const ticketSlot = document.querySelector('.ticket-slot');
        const slotGlow = document.createElement('div');
        slotGlow.className = 'slot-glow';
        slotGlow.style.position = 'absolute';
        slotGlow.style.top = '0';
        slotGlow.style.left = '0';
        slotGlow.style.width = '100%';
        slotGlow.style.height = '100%';
        slotGlow.style.background = 'linear-gradient(45deg, transparent, rgba(241, 196, 15, 0.6), transparent)';
        slotGlow.style.animation = 'slot-glow 1s ease-out';
        slotGlow.style.pointerEvents = 'none';
        slotGlow.style.borderRadius = '10px';

        ticketSlot.appendChild(slotGlow);

        setTimeout(() => {
            if (slotGlow.parentNode) {
                slotGlow.parentNode.removeChild(slotGlow);
            }
        }, 1000);
    }

    createSlotParticles() {
        const ticketSlot = document.querySelector('.ticket-slot');
        const slotRect = ticketSlot.getBoundingClientRect();
        
        // Crear múltiples partículas que salgan de la abertura
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = (slotRect.left + slotRect.width / 2) + 'px';
                particle.style.top = (slotRect.top + slotRect.height / 2) + 'px';
                particle.style.width = '3px';
                particle.style.height = '3px';
                particle.style.background = '#f1c40f';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '999';
                particle.style.boxShadow = '0 0 6px #f1c40f';
                
                document.body.appendChild(particle);
                
                // Animar la partícula
                const angle = (Math.PI * 2 * i) / 8;
                const distance = 30 + Math.random() * 20;
                const endX = slotRect.left + slotRect.width / 2 + Math.cos(angle) * distance;
                const endY = slotRect.top + slotRect.height / 2 + Math.sin(angle) * distance;
                
                particle.style.transition = 'all 0.8s ease-out';
                particle.style.left = endX + 'px';
                particle.style.top = endY + 'px';
                particle.style.opacity = '0';
                particle.style.transform = 'scale(0)';
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 800);
            }, i * 100);
        }
    }

    createFlightTrail(ticketElement) {
        // Crear estela de partículas durante el vuelo
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const trail = document.createElement('div');
                trail.style.position = 'fixed';
                trail.style.left = ticketElement.style.left;
                trail.style.top = ticketElement.style.top;
                trail.style.width = '4px';
                trail.style.height = '4px';
                trail.style.background = 'rgba(231, 76, 60, 0.6)';
                trail.style.borderRadius = '50%';
                trail.style.pointerEvents = 'none';
                trail.style.zIndex = '1000';
                trail.style.boxShadow = '0 0 8px rgba(231, 76, 60, 0.8)';
                
                document.body.appendChild(trail);
                
                trail.style.transition = 'all 1s ease-out';
                trail.style.opacity = '0';
                trail.style.transform = 'scale(0) translateY(20px)';
                
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 1000);
            }, i * 200);
        }
    }

    createSparkEffect(container) {
        for (let i = 0; i < 5; i++) {
            const spark = document.createElement('div');
            spark.style.position = 'absolute';
            spark.style.width = '4px';
            spark.style.height = '4px';
            spark.style.background = '#f1c40f';
            spark.style.borderRadius = '50%';
            spark.style.left = Math.random() * 100 + '%';
            spark.style.top = Math.random() * 100 + '%';
            spark.style.animation = 'sparkle 0.5s ease-out forwards';
            spark.style.pointerEvents = 'none';

            container.appendChild(spark);

            setTimeout(() => {
                if (spark.parentNode) {
                    spark.parentNode.removeChild(spark);
                }
            }, 500);
        }
    }

    createLightningEffect() {
        const container = document.querySelector('.printer-container');
        const lightning = document.createElement('div');
        lightning.className = 'lightning-effect';
        container.appendChild(lightning);

        setTimeout(() => {
            if (lightning.parentNode) {
                lightning.parentNode.removeChild(lightning);
            }
        }, 300);
    }

    createImageEffect(imageSrc) {
        const container = document.querySelector('.printer-container');
        const imageEffect = document.createElement('div');
        imageEffect.className = 'image-effect';
        imageEffect.innerHTML = `
            <div class="image-glow"></div>
            <img src="${imageSrc}" alt="Efecto especial">
        `;
        container.appendChild(imageEffect);

        // La animación dura lo mismo que la impresión (2.5 segundos)
        setTimeout(() => {
            if (imageEffect.parentNode) {
                imageEffect.parentNode.removeChild(imageEffect);
            }
        }, 2500);
    }

    createButtonEffect(button) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.marginLeft = -size / 2 + 'px';
        ripple.style.marginTop = -size / 2 + 'px';

        button.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    updatePrinterStatus(status) {
        const statusIndicator = document.getElementById('statusIndicator');
        statusIndicator.textContent = `● ${status}`;

        // Cambiar color según el estado
        if (status === 'Imprimiendo...') {
            statusIndicator.style.background = '#e74c3c';
            statusIndicator.style.boxShadow = '0 0 20px rgba(231, 76, 60, 0.5)';
        } else {
            statusIndicator.style.background = '#f1c40f';
            statusIndicator.style.boxShadow = '0 0 20px rgba(241, 196, 15, 0.3)';
        }
    }

    clearTickets() {
        const ticketsStack = document.getElementById('ticketsStack');
        const tickets = ticketsStack.querySelectorAll('.ticket');

        // Animación de salida
        tickets.forEach((ticket, index) => {
            setTimeout(() => {
                ticket.style.transform = 'translateX(100%)';
                ticket.style.opacity = '0';
                setTimeout(() => {
                    if (ticket.parentNode) {
                        ticket.parentNode.removeChild(ticket);
                    }
                }, 300);
            }, index * 100);
        });

        // Resetear contador
        this.ticketCounter = 0;
        document.getElementById('ticketCounter').textContent = '0';

        // Efecto de limpieza
        this.createClearEffect();
    }

    createClearEffect() {
        const ticketsContainer = document.getElementById('ticketsContainer');
        const clearEffect = document.createElement('div');
        clearEffect.style.position = 'absolute';
        clearEffect.style.top = '0';
        clearEffect.style.left = '0';
        clearEffect.style.width = '100%';
        clearEffect.style.height = '100%';
        clearEffect.style.background = 'linear-gradient(45deg, transparent, rgba(241, 196, 15, 0.3), transparent)';
        clearEffect.style.animation = 'clear-sweep 1s ease-out';
        clearEffect.style.pointerEvents = 'none';

        ticketsContainer.appendChild(clearEffect);

        setTimeout(() => {
            if (clearEffect.parentNode) {
                clearEffect.parentNode.removeChild(clearEffect);
            }
        }, 1000);
    }

    playPrintSound() {
        // Activar el contexto de audio si está suspendido
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        this.createPrintSound();
    }

    playTicketSound() {
        // Activar el contexto de audio si está suspendido
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        this.createTicketSound();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Efectos adicionales CSS
const additionalStyles = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(180deg);
            opacity: 0;
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes clear-sweep {
        0% {
            transform: translateX(-100%);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .ticket-printing {
        animation: ticket-print 1s ease-in-out;
    }

    @keyframes ticket-print {
        0% {
            transform: translateY(100px) scale(0.8);
            opacity: 0;
        }
        50% {
            transform: translateY(-10px) scale(1.05);
            opacity: 0.8;
        }
        100% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
    }

    .image-effect {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        pointer-events: none;
        animation: image-celebration 2.5s ease-in-out;
    }

    .image-effect img {
        width: 120px;
        height: 120px;
        object-fit: contain;
        filter: drop-shadow(0 0 25px rgba(241, 196, 15, 0.9));
        position: relative;
        z-index: 2;
    }

    .image-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(241, 196, 15, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        animation: glow-pulse 2.5s ease-in-out;
        z-index: 1;
    }

    @keyframes glow-pulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        20% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.6;
        }
        80% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0.3;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }

    @keyframes image-celebration {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
        }
        15% {
            transform: translate(-50%, -50%) scale(1.1) rotate(90deg);
            opacity: 0.8;
        }
        30% {
            transform: translate(-50%, -50%) scale(1.3) rotate(180deg);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2) rotate(270deg);
            opacity: 1;
        }
        70% {
            transform: translate(-50%, -50%) scale(1.1) rotate(360deg);
            opacity: 0.9;
        }
        85% {
            transform: translate(-50%, -50%) scale(1.0) rotate(450deg);
            opacity: 0.7;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.8) rotate(540deg);
            opacity: 0;
        }
    }


`;

// Inyectar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicializar la impresora cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    const printer = new LightningMcQueenPrinter();
    
    // Efecto de bienvenida
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    console.log('🏁 Impresora de Rayo McQueen cargada correctamente! ⚡');
});

// Función para generar efectos de teclado
document.addEventListener('keydown', function(e) {
    // Espacio para imprimir
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const printButton = document.getElementById('printButton');
        if (printButton) {
            printButton.click();
        }
    }
    
    // Escape para limpiar
    if (e.code === 'Escape') {
        const clearButton = document.getElementById('clearButton');
        if (clearButton) {
            clearButton.click();
        }
    }
});

// Función para efectos de mouse
document.addEventListener('mousemove', function(e) {
    // Crear estelas de partículas siguiendo el mouse
    if (Math.random() < 0.1) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#f1c40f';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.animation = 'mouse-trail 1s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
});

// Estilos para el efecto de estela del mouse
const mouseTrailStyles = `
    @keyframes mouse-trail {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;

const mouseTrailStyleSheet = document.createElement('style');
mouseTrailStyleSheet.textContent = mouseTrailStyles;
document.head.appendChild(mouseTrailStyleSheet);
