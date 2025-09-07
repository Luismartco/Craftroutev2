// Gestor de tokens CSRF para evitar errores 419
class CSRFManager {
    constructor() {
        this.tokenRefreshInterval = null;
        this.isRefreshing = false;
        this.pendingRequests = [];
        this.init();
    }

    init() {
        // Renovar token cada 30 minutos
        this.startTokenRefresh();
        
        // Renovar token antes de que expire (cada 25 minutos)
        this.tokenRefreshInterval = setInterval(() => {
            this.refreshTokenSilently();
        }, 25 * 60 * 1000); // 25 minutos
    }

    async refreshTokenSilently() {
        if (this.isRefreshing) return;
        
        this.isRefreshing = true;
        
        try {
            const response = await fetch('/api/csrf-token', {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                this.updateToken(data.csrf_token);
                console.log('Token CSRF renovado automáticamente');
            }
        } catch (error) {
            console.error('Error al renovar token CSRF:', error);
        } finally {
            this.isRefreshing = false;
        }
    }

    async refreshToken() {
        if (this.isRefreshing) {
            // Si ya se está renovando, esperar a que termine
            return new Promise((resolve) => {
                this.pendingRequests.push(resolve);
            });
        }
        
        this.isRefreshing = true;
        
        try {
            const response = await fetch('/api/csrf-token', {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                this.updateToken(data.csrf_token);
                
                // Resolver todas las peticiones pendientes
                this.pendingRequests.forEach(resolve => resolve(data.csrf_token));
                this.pendingRequests = [];
                
                return data.csrf_token;
            }
        } catch (error) {
            console.error('Error al renovar token CSRF:', error);
            throw error;
        } finally {
            this.isRefreshing = false;
        }
    }

    updateToken(newToken) {
        // Actualizar el meta tag
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
            metaTag.setAttribute('content', newToken);
        }
        
        // Actualizar el header de axios
        if (window.axios) {
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = newToken;
        }
        
        // Actualizar todos los formularios
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const tokenInput = form.querySelector('input[name="_token"]');
            if (tokenInput) {
                tokenInput.value = newToken;
            }
        });
    }

    startTokenRefresh() {
        // Renovar token cada 30 minutos
        setInterval(() => {
            this.refreshTokenSilently();
        }, 30 * 60 * 1000);
    }

    destroy() {
        if (this.tokenRefreshInterval) {
            clearInterval(this.tokenRefreshInterval);
        }
    }
}

// Crear instancia global
window.csrfManager = new CSRFManager();

export default CSRFManager;
