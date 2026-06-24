import Proyectos from './Proyectos.js';

async function cargarDatos() {
    const response = await fetch('./data/datos.json');
    return response.json();
}

function crearTimeline(experiencia) {
    return experiencia.map(item => `
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3 class="h5 mb-1">${item.cargo}</h3>
                <p class="text-muted mb-2">
                    <strong>${item.empresa}</strong> · ${item.periodo} · ${item.ubicacion}
                </p>
                <ul class="mb-0">
                    ${item.logros.map(logro => `<li>${logro}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function crearFormacion(formacion) {
    return formacion.map(item => `
        <div class="col-md-6 mb-4">
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h3 class="h5 card-title">${item.titulo}</h3>
                    <p class="text-muted mb-0">${item.institucion} · ${item.periodo}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function crearHabilidades(habilidades) {
    const categorias = [
        { clave: 'backend', titulo: 'Backend' },
        { clave: 'frontend', titulo: 'Frontend' },
        { clave: 'basesDeDatos', titulo: 'Bases de datos' },
        { clave: 'infra', titulo: 'Infraestructura' }
    ];

    const bloques = categorias.map(({ clave, titulo }) => `
        <div class="col-md-6 col-lg-3 mb-4">
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h3 class="h6 text-uppercase text-muted">${titulo}</h3>
                    <p class="mb-0">${habilidades[clave].join(', ')}</p>
                </div>
            </div>
        </div>
    `).join('');

    const dominios = `
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-body text-center">
                    <h3 class="h6 text-uppercase text-muted mb-2">Dominios de negocio</h3>
                    <p class="mb-0">${habilidades.dominios.join(' · ')}</p>
                </div>
            </div>
        </div>
    `;

    return bloques + dominios;
}

document.addEventListener('DOMContentLoaded', async () => {
    const datos = await cargarDatos();

    const contenedorProyectos = document.getElementById('listaProyectos');
    const contenedorExperiencia = document.getElementById('listaExperiencia');
    const contenedorFormacion = document.getElementById('listaFormacion');
    const contenedorHabilidades = document.getElementById('listaHabilidades');

    const proyectos = await Proyectos.obtenerProyectos();
    proyectos.forEach(proyecto => {
        contenedorProyectos.innerHTML += proyecto.crearCard();
    });

    contenedorExperiencia.innerHTML = crearTimeline(datos.experiencia);
    contenedorFormacion.innerHTML = crearFormacion(datos.formacion);
    contenedorHabilidades.innerHTML = crearHabilidades(datos.habilidades);
});
