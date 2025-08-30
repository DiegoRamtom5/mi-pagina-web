// Impresora de Tickets de Rayo McQueen
class LightningMcQueenPrinter {
    constructor() {
        this.ticketCounter = 0;
        this.isPrinting = false;
        this.particles = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createParticles();
        this.hideWelcomeMessage();
        this.setupAudio();
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
    }

    setupAudio() {
        // Crear elementos de audio para efectos sonoros
        this.printSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        this.ticketSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFS4HO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        
        // Configurar audio
        this.printSound.volume = 0.3;
        this.ticketSound.volume = 0.2;
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

        // Efectos visuales y sonoros
        this.playPrintSound();
        this.createPrintingEffects();
        this.updatePrinterStatus('Imprimiendo...');

        // Simular tiempo de impresión
        await this.delay(1500);

        // Generar ticket
        const ticket = generateTicket();
        this.createTicketElement(ticket);

        // Efectos finales
        this.playTicketSound();
        this.createLightningEffect();
        
        // Efecto especial si el ticket tiene imagen
        if (ticket.decoration.type === 'image') {
            this.createImageEffect(ticket.decoration.content);
        }
        
        this.updatePrinterStatus('Listo');

        this.isPrinting = false;
    }

    createTicketElement(ticket) {
        const ticketsStack = document.getElementById('ticketsStack');
        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket ticket-printing';

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

        // Añadir al stack
        ticketsStack.insertBefore(ticketElement, ticketsStack.firstChild);

        // Efecto de entrada
        setTimeout(() => {
            ticketElement.style.transform = 'translateX(0)';
            ticketElement.style.opacity = '1';
        }, 100);

        // Scroll hacia el nuevo ticket
        setTimeout(() => {
            ticketElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }

    createPrintingEffects() {
        const printerMachine = document.querySelector('.printer-machine');
        const printButton = document.getElementById('printButton');

        // Efecto de vibración
        printerMachine.classList.add('printing');
        printButton.style.transform = 'scale(0.95)';

        // Crear efecto de chispas
        this.createSparkEffect(printerMachine);

        setTimeout(() => {
            printerMachine.classList.remove('printing');
            printButton.style.transform = '';
        }, 500);
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
        imageEffect.innerHTML = `<img src="${imageSrc}" alt="Efecto especial">`;
        container.appendChild(imageEffect);

        setTimeout(() => {
            if (imageEffect.parentNode) {
                imageEffect.parentNode.removeChild(imageEffect);
            }
        }, 1000);
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
        if (this.printSound) {
            this.printSound.currentTime = 0;
            this.printSound.play().catch(e => console.log('Audio no disponible'));
        }
    }

    playTicketSound() {
        if (this.ticketSound) {
            this.ticketSound.currentTime = 0;
            this.ticketSound.play().catch(e => console.log('Audio no disponible'));
        }
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
        animation: image-celebration 1s ease-out;
    }

    .image-effect img {
        width: 100px;
        height: 100px;
        object-fit: contain;
        filter: drop-shadow(0 0 20px rgba(241, 196, 15, 0.8));
    }

    @keyframes image-celebration {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.8) rotate(360deg);
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
