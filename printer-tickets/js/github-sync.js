// Sistema de Sincronización con GitHub para Tickets
class GitHubSync {
    constructor() {
        this.githubToken = null;
        this.username = null;
        this.repoName = 'tickets-mcqueen';
        this.filePath = 'tickets.json';
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupAuthButton();
    }

    // Verificar si ya está autenticado
    checkAuthStatus() {
        const savedToken = localStorage.getItem('github_token');
        const savedUsername = localStorage.getItem('github_username');
        
        if (savedToken && savedUsername) {
            this.githubToken = savedToken;
            this.username = savedUsername;
            this.isAuthenticated = true;
            this.updateAuthUI();
            this.loadExistingTickets();
        }
    }

    // Configurar botón de autenticación
    setupAuthButton() {
        const authButton = document.getElementById('githubAuthBtn');
        if (authButton) {
            authButton.addEventListener('click', () => {
                if (this.isAuthenticated) {
                    this.logout();
                } else {
                    this.authenticate();
                }
            });
        }
    }

    // Autenticación con GitHub
    async authenticate() {
        const token = prompt('Ingresa tu GitHub Personal Access Token:');
        if (!token) return;

        try {
            // Verificar que el token es válido
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                const userData = await response.json();
                this.githubToken = token;
                this.username = userData.login;
                this.isAuthenticated = true;

                // Guardar en localStorage
                localStorage.setItem('github_token', token);
                localStorage.setItem('github_username', userData.login);

                this.updateAuthUI();
                this.createRepoIfNotExists();
                this.loadExistingTickets();
                
                this.showNotification('✅ Autenticado con GitHub exitosamente!', 'success');
            } else {
                throw new Error('Token inválido');
            }
        } catch (error) {
            this.showNotification('❌ Error de autenticación. Verifica tu token.', 'error');
            console.error('Error de autenticación:', error);
        }
    }

    // Cerrar sesión
    logout() {
        this.githubToken = null;
        this.username = null;
        this.isAuthenticated = false;
        
        localStorage.removeItem('github_token');
        localStorage.removeItem('github_username');
        
        this.updateAuthUI();
        this.showNotification('👋 Sesión cerrada', 'info');
    }

    // Actualizar interfaz de autenticación
    updateAuthUI() {
        const authButton = document.getElementById('githubAuthBtn');
        const userInfo = document.getElementById('userInfo');
        
        if (authButton) {
            if (this.isAuthenticated) {
                authButton.innerHTML = '<i class="fab fa-github"></i> Cerrar Sesión';
                authButton.className = 'btn btn-secondary';
            } else {
                authButton.innerHTML = '<i class="fab fa-github"></i> Conectar GitHub';
                authButton.className = 'btn btn-primary';
            }
        }

        if (userInfo) {
            if (this.isAuthenticated) {
                userInfo.innerHTML = `
                    <div class="user-info">
                        <i class="fab fa-github"></i>
                        <span>Conectado como: <strong>${this.username}</strong></span>
                        <div class="sync-status">
                            <i class="fas fa-sync-alt"></i>
                            <span>Sincronizado</span>
                        </div>
                    </div>
                `;
                userInfo.style.display = 'block';
            } else {
                userInfo.style.display = 'none';
            }
        }
    }

    // Crear repositorio si no existe
    async createRepoIfNotExists() {
        try {
            // Verificar si el repositorio existe
            const response = await fetch(`https://api.github.com/repos/${this.username}/${this.repoName}`, {
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.status === 404) {
                // Crear repositorio
                await fetch('https://api.github.com/user/repos', {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${this.githubToken}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.repoName,
                        description: 'Tickets de amor de Rayo McQueen - Sincronizados entre dispositivos',
                        private: false,
                        auto_init: true
                    })
                });
                
                this.showNotification('📁 Repositorio creado exitosamente!', 'success');
            }
        } catch (error) {
            console.error('Error creando repositorio:', error);
        }
    }

    // Guardar ticket en GitHub
    async saveTicket(ticket) {
        if (!this.isAuthenticated) {
            this.showNotification('⚠️ Debes autenticarte con GitHub primero', 'warning');
            return false;
        }

        try {
            // Obtener tickets existentes
            const existingTickets = await this.getExistingTickets();
            
            // Añadir nuevo ticket con información del usuario
            const ticketWithUser = {
                ...ticket,
                id: Date.now(),
                user: this.username,
                timestamp: new Date().toISOString(),
                device: navigator.userAgent
            };

            existingTickets.push(ticketWithUser);

            // Guardar en GitHub
            const content = JSON.stringify(existingTickets, null, 2);
            const encodedContent = btoa(unescape(encodeURIComponent(content)));

            const response = await fetch(`https://api.github.com/repos/${this.username}/${this.repoName}/contents/${this.filePath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Nuevo ticket de amor generado por ${this.username}`,
                    content: encodedContent,
                    sha: await this.getFileSHA()
                })
            });

            if (response.ok) {
                this.showNotification('💾 Ticket guardado en GitHub!', 'success');
                return true;
            } else {
                throw new Error('Error guardando en GitHub');
            }
        } catch (error) {
            console.error('Error guardando ticket:', error);
            this.showNotification('❌ Error guardando ticket', 'error');
            return false;
        }
    }

    // Obtener tickets existentes
    async getExistingTickets() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.username}/${this.repoName}/contents/${this.filePath}`, {
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                const content = atob(data.content);
                return JSON.parse(content);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error obteniendo tickets:', error);
            return [];
        }
    }

    // Cargar tickets existentes en la interfaz
    async loadExistingTickets() {
        if (!this.isAuthenticated) return;

        try {
            const tickets = await this.getExistingTickets();
            const ticketsStack = document.getElementById('ticketsStack');
            
            if (ticketsStack && tickets.length > 0) {
                // Limpiar tickets existentes (excepto el mensaje de bienvenida)
                const existingTickets = ticketsStack.querySelectorAll('.ticket');
                existingTickets.forEach(ticket => ticket.remove());

                // Añadir tickets desde GitHub
                tickets.reverse().forEach(ticket => {
                    const ticketElement = this.createTicketElementFromData(ticket);
                    ticketsStack.insertBefore(ticketElement, ticketsStack.firstChild);
                });

                // Actualizar contador
                const counter = document.getElementById('ticketCounter');
                if (counter) {
                    counter.textContent = tickets.length;
                }

                this.showNotification(`📥 ${tickets.length} tickets cargados desde GitHub`, 'info');
            }
        } catch (error) {
            console.error('Error cargando tickets:', error);
        }
    }

    // Crear elemento de ticket desde datos de GitHub
    createTicketElementFromData(ticketData) {
        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket';
        ticketElement.setAttribute('data-user', ticketData.user);
        ticketElement.setAttribute('data-timestamp', ticketData.timestamp);

        // Crear decoración dinámicamente
        let decorationHTML = '';
        if (ticketData.decoration && ticketData.decoration.type === 'image') {
            decorationHTML = `<img src="${ticketData.decoration.content}" alt="${ticketData.decoration.alt}" class="ticket-decoration-image">`;
        } else if (ticketData.decoration) {
            decorationHTML = `<div class="ticket-decoration">${ticketData.decoration.content}</div>`;
        }

        ticketElement.innerHTML = `
            ${decorationHTML}
            <div class="ticket-header">
                <span class="ticket-number">Ticket #${ticketData.id}</span>
                <span class="ticket-date">${new Date(ticketData.timestamp).toLocaleDateString('es-ES')}</span>
            </div>
            <div class="ticket-content">
                <div class="ticket-message">${ticketData.message}</div>
            </div>
            <div class="ticket-footer">
                <span class="ticket-signature">${ticketData.closingPhrase}</span>
                <div class="ticket-user-info">
                    <span class="ticket-user">👤 ${ticketData.user}</span>
                    <span class="ticket-id">ID: ${ticketData.id}</span>
                </div>
            </div>
        `;

        return ticketElement;
    }

    // Obtener SHA del archivo para actualizaciones
    async getFileSHA() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.username}/${this.repoName}/contents/${this.filePath}`, {
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data.sha;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    // Mostrar notificaciones
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);

        // Botón de cerrar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }
}

// Exportar para uso global
window.GitHubSync = GitHubSync;
