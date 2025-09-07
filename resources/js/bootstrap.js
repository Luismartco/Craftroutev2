//agregué este archivo
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importar el gestor de CSRF
import './utils/csrfManager.js';

// Configuración de axios para Laravel
import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Configurar CSRF token
const token = document.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
}

// Interceptor de request para verificar token antes de enviar
window.axios.interceptors.request.use(
    async (config) => {
        // Verificar si el token existe y no está expirado
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor de response mejorado
window.axios.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response && error.response.status === 419) {
            console.warn('Token CSRF expirado, renovando automáticamente...');
            
            try {
                // Usar el CSRF Manager para renovar el token
                const newToken = await window.csrfManager.refreshToken();
                
                if (newToken) {
                    // Reintentar la petición original con el nuevo token
                    const originalRequest = error.config;
                    originalRequest.headers['X-CSRF-TOKEN'] = newToken;
                    return window.axios(originalRequest);
                }
            } catch (refreshError) {
                console.error('Error al renovar token:', refreshError);
            }
            
            // Si no se puede renovar, recargar la página
            console.warn('No se pudo renovar el token, recargando página...');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);