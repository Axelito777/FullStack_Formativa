// Consejos adicionales para el botón "Mostrar más"
const consejosAdicionales = [
    {
        emoji: "⏰",
        titulo: "Gestiona tu tiempo de estudio",
        descripcion: "Usa IA para optimizar tu tiempo, pero dedica suficiente tiempo al pensamiento propio.",
        color: "bg-orange-50 border-orange-400"
    },
    {
        emoji: "🔗",
        titulo: "Combina fuentes tradicionales con IA",
        descripcion: "Equilibra el uso de IA con libros, artículos académicos y consultas a profesores.",
        color: "bg-indigo-50 border-indigo-400"
    },
    {
        emoji: "📊",
        titulo: "Evalúa la calidad de las respuestas",
        descripcion: "Desarrolla criterios para distinguir entre respuestas útiles y superficiales de IA.",
        color: "bg-pink-50 border-pink-400"
    }
];

let consejosMostrados = 0;

// Navegación entre páginas
function showPage(pageId) {
    // Ocultar todas las páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Mostrar página seleccionada
    document.getElementById(pageId).classList.remove('hidden');
    
    // Actualizar botones nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-purple-700');
    });
    event.target.classList.add('active', 'bg-purple-700');
    
    // Cargar reflexiones si es necesario
    if (pageId === 'reflexiones') {
        loadReflexiones();
    }
}

// Mostrar más consejos dinámicamente
function mostrarMasConsejos() {
    const lista = document.getElementById('consejos-lista');
    const boton = document.getElementById('mostrar-mas-consejos');
    
    if (consejosMostrados < consejosAdicionales.length) {
        const consejo = consejosAdicionales[consejosMostrados];
        const nuevoConsejo = document.createElement('div');
        nuevoConsejo.className = `${consejo.color} p-4 rounded-lg border-l-4 opacity-0 transition-opacity duration-500`;
        nuevoConsejo.innerHTML = `
            <h3 class="font-semibold text-gray-800 mb-2">${consejo.emoji} ${consejo.titulo}</h3>
            <p class="text-gray-600 text-sm">${consejo.descripcion}</p>
        `;
        
        lista.appendChild(nuevoConsejo);
        
        // Animación de aparición
        setTimeout(() => {
            nuevoConsejo.classList.remove('opacity-0');
        }, 100);
        
        consejosMostrados++;
        
        if (consejosMostrados >= consejosAdicionales.length) {
            boton.textContent = 'Todos los consejos mostrados';
            boton.disabled = true;
            boton.classList.add('bg-gray-400', 'cursor-not-allowed');
            boton.classList.remove('bg-blue-500', 'hover:bg-blue-600');
        }
    }
}

// Sistema de modales
function openModal(casoId) {
    const casos = {
        'caso1': {
            title: '✅ Uso Correcto',
            content: `
                <p class="mb-3"><strong>Situación:</strong> María necesita escribir un ensayo sobre historia.</p>
                <p class="mb-3"><strong>Lo que hizo:</strong></p>
                <ul class="list-disc ml-4 mb-3 text-sm">
                    <li>Usó IA para generar ideas iniciales</li>
                    <li>Investigó en fuentes académicas confiables</li>
                    <li>Escribió con sus propias palabras</li>
                    <li>Citó el uso de IA en su trabajo</li>
                </ul>
                <p class="text-green-600 font-semibold">Resultado: Trabajo original con apoyo ético de IA</p>
            `
        },
        'caso2': {
            title: '❌ Uso Incorrecto',
            content: `
                <p class="mb-3"><strong>Situación:</strong> Juan tiene tarea de matemáticas.</p>
                <p class="mb-3"><strong>Lo que hizo:</strong></p>
                <ul class="list-disc ml-4 mb-3 text-sm">
                    <li>Copió respuestas directamente de ChatGPT</li>
                    <li>No verificó las respuestas</li>
                    <li>No entendió el proceso</li>
                    <li>No mencionó el uso de IA</li>
                </ul>
                <p class="text-red-600 font-semibold">Resultado: Violación de integridad académica</p>
            `
        }
    };
    
    const modal = document.getElementById('modal-overlay');
    const titleEl = document.getElementById('modal-title');
    const contentEl = document.getElementById('modal-content');
    
    titleEl.innerHTML = casos[casoId].title;
    contentEl.innerHTML = casos[casoId].content;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById('modal-overlay').classList.remove('flex');
}

// Funciones de LocalStorage para reflexiones
function guardarReflexion(reflexion) {
    let reflexiones = JSON.parse(localStorage.getItem('reflexiones-etica-ia')) || [];
    reflexiones.push(reflexion);
    localStorage.setItem('reflexiones-etica-ia', JSON.stringify(reflexiones));
}

function obtenerReflexiones() {
    return JSON.parse(localStorage.getItem('reflexiones-etica-ia')) || [];
}

function borrarMensajes() {
    if (confirm('¿Estás seguro de que quieres borrar todas las reflexiones?')) {
        localStorage.removeItem('reflexiones-etica-ia');
        loadReflexiones();
        
        // Mostrar mensaje de confirmación
        const container = document.getElementById('reflexionesList');
        container.innerHTML = '<p class="text-gray-500 text-center">Todas las reflexiones han sido eliminadas.</p>';
    }
}

// Formulario de reflexiones
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reflexionForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        // Validaciones
        if (!nombre || !email || !mensaje) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        if (mensaje.length < 20) {
            alert('La reflexión debe tener al menos 20 caracteres');
            return;
        }
        
        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor ingresa un correo electrónico válido');
            return;
        }
        
        // Crear reflexión
        const nuevaReflexion = {
            nombre: nombre,
            email: email,
            mensaje: mensaje,
            fecha: new Date().toISOString().split('T')[0]
        };
        
        // Guardar en localStorage
        guardarReflexion(nuevaReflexion);
        
        // Limpiar formulario
        form.reset();
        
        // Mostrar mensaje de confirmación
        const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
        mensajeConfirmacion.classList.remove('hidden');
        setTimeout(() => {
            mensajeConfirmacion.classList.add('hidden');
        }, 3000);
        
        // Recargar lista
        loadReflexiones();
    });
});

// Cargar reflexiones desde localStorage
function loadReflexiones() {
    const container = document.getElementById('reflexionesList');
    const reflexiones = obtenerReflexiones();
    
    if (reflexiones.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center">No hay reflexiones guardadas aún. ¡Sé el primero en compartir!</p>';
        return;
    }
    
    // Mostrar últimas 5 reflexiones
    container.innerHTML = reflexiones.slice(-5).reverse().map(r => `
        <div class="bg-purple-50 p-4 rounded-lg">
            <div class="flex justify-between items-start mb-2">
                <strong class="text-gray-800">${r.nombre}</strong>
                <span class="text-xs text-gray-500">${formatDate(r.fecha)}</span>
            </div>
            <p class="text-sm text-gray-600 mb-2">${r.email}</p>
            <p class="text-gray-700">${r.mensaje}</p>
        </div>
    `).join('');
}

// Función auxiliar para formato de fecha
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-ES');
}

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal-overlay');
    if (e.target === modal) {
        closeModal();
    }
});

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    loadReflexiones();
    
    // Agregar algunas reflexiones de ejemplo si no hay ninguna
    const reflexiones = obtenerReflexiones();
    if (reflexiones.length === 0) {
        const reflexionEjemplo = {
            nombre: "Ana López",
            email: "ana@universidad.edu",
            mensaje: "La IA me ha ayudado mucho a entender conceptos complejos, pero siempre verifico la información con mis profesores y fuentes académicas confiables.",
            fecha: "2024-03-10"
        };
        guardarReflexion(reflexionEjemplo);
        loadReflexiones();
    }
});