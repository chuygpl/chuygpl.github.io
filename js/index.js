import Proyectos from './Proyectos.js';

async function cargarDatos() {
    try {
        const response = await fetch('./data/datos.json');

        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudo cargar el archivo de datos.`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        return null;
    }
}

function crearTimeline(experiencia = []) {

    return experiencia.map(item => `
        <div class="timeline-item">

            <div class="timeline-marker"></div>

            <div class="timeline-content">

                <h3 class="h5 mb-1">${item.cargo}</h3>

                <p class="text-muted mb-2">
                    <strong>${item.empresa}</strong><br>
                    ${item.periodo}<br>
                    ${item.ubicacion}
                </p>

                <ul class="mb-0">
                    ${item.logros.map(logro => `<li>${logro}</li>`).join('')}
                </ul>

            </div>

        </div>
    `).join('');

}

function crearFormacion(formacion = []) {

    return formacion.map(item => `
        <div class="col-md-6 mb-4">

            <div class="card h-100 shadow-sm border-0">

                <div class="card-body">

                    <h3 class="h5 card-title">
                        ${item.titulo}
                    </h3>

                    <p class="text-muted mb-0">
                        ${item.institucion}<br>
                        ${item.periodo}
                    </p>

                </div>

            </div>

        </div>
    `).join('');

}

function crearHabilidades(habilidades = {}) {

    const categorias = [
        ['backend', 'Backend'],
        ['frontend', 'Frontend'],
        ['basesDeDatos', 'Bases de datos'],
        ['infraestructura', 'Infraestructura']
    ];

    const tarjetas = categorias.map(([clave, titulo]) => `

        <div class="col-md-6 col-lg-3 mb-4">

            <div class="card h-100 shadow-sm border-0">

                <div class="card-body">

                    <h3 class="h6 text-uppercase text-muted mb-3">
                        ${titulo}
                    </h3>

                    ${(habilidades[clave] || []).map(item =>
                        `<span class="badge bg-light text-dark border me-1 mb-1">${item}</span>`
                    ).join('')}

                </div>

            </div>

        </div>

    `).join('');

    const dominios = `

        <div class="col-12">

            <div class="card shadow-sm border-0">

                <div class="card-body">

                    <h3 class="h6 text-uppercase text-muted text-center mb-3">
                        Dominios de experiencia
                    </h3>

                    <div class="text-center">

                        ${(habilidades.dominios || []).map(item =>
                            `<span class="badge bg-primary me-1 mb-1">${item}</span>`
                        ).join('')}

                    </div>

                </div>

            </div>

        </div>

    `;

    return tarjetas + dominios;

}

document.addEventListener('DOMContentLoaded', async () => {

    const datos = await cargarDatos();

    if (!datos) return;

    const {
        proyectos = [],
        experiencia = [],
        formacion = [],
        habilidades = {}
    } = datos;

    document.getElementById('listaProyectos').innerHTML =
        proyectos
            .map(proyecto => new Proyectos(proyecto).crearCard())
            .join('');

    document.getElementById('listaExperiencia').innerHTML =
        crearTimeline(experiencia);

    document.getElementById('listaFormacion').innerHTML =
        crearFormacion(formacion);

    document.getElementById('listaHabilidades').innerHTML =
        crearHabilidades(habilidades);

});