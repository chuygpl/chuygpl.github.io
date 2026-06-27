export default class Proyectos {

    constructor(datos = {}) {
        this.nombre = datos.nombre ?? '';
        this.rol = datos.rol ?? '';
        this.periodo = datos.periodo ?? '';
        this.estado = datos.estado ?? '';
        this.problema = datos.problema ?? '';
        this.descripcion = datos.descripcion ?? '';
        this.resultado = datos.resultado ?? '';
        this.tecnologias = Array.isArray(datos.tecnologias)
            ? datos.tecnologias
            : (datos.tecnologias ? [datos.tecnologias] : []);
        this.imagen = datos.imagen ?? 'img/proyectos/default.png';
        this.url = datos.url ?? '';
    }

    static async obtenerProyectos() {
        try {
            const response = await fetch('./data/datos.json');

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No fue posible cargar los proyectos.`);
            }

            const data = await response.json();

            return (data.proyectos || []).map(
                proyecto => new Proyectos(proyecto)
            );

        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
            return [];
        }
    }

    crearBadgesTecnologias() {
        if (!this.tecnologias.length) return '';

        return this.tecnologias
            .sort()
            .map(tecnologia =>
                `<span class="badge bg-light text-dark border me-1 mb-1">${tecnologia}</span>`
            )
            .join('');
    }

    crearEstado() {

        if (!this.estado) return '';

        const clase = {
            'En producción': 'success',
            'En uso': 'success',
            'Implementado': 'primary',
            'Finalizado': 'secondary'
        }[this.estado] || 'secondary';

        return `<span class="badge bg-${clase}">${this.estado}</span>`;
    }

    crearBoton() {

        if (!this.url) {
            return `
                <span class="badge bg-secondary mt-auto align-self-start">
                    Proyecto privado
                </span>
            `;
        }

        return `
            <a href="${this.url}"
               target="_blank"
               rel="noopener noreferrer"
               class="btn btn-primary mt-auto align-self-start">
                Ver proyecto
            </a>
        `;
    }

    crearCard() {

        return `
            <div class="col-lg-6 mb-4">

                <article class="card proyecto-card shadow-sm border-0 h-100">

                    <img
                        src="${this.imagen}"
                        class="card-img-top proyecto-card-img"
                        alt="Captura del proyecto ${this.nombre}"
                        loading="lazy">

                    <div class="card-body d-flex flex-column">

                        <h3 class="card-title h4 mb-2">
                            ${this.nombre}
                        </h3>

                        <div class="mb-3">

                            ${this.rol
                                ? `<div class="small text-muted">${this.rol}</div>`
                                : ''}

                            ${this.periodo
                                ? `<div class="small text-muted">${this.periodo}</div>`
                                : ''}

                            ${this.crearEstado()}

                        </div>

                        ${this.problema
                            ? `
                                <div class="alert alert-light py-2">
                                    <strong>Problema</strong><br>
                                    ${this.problema}
                                </div>
                              `
                            : ''}

                        <p class="card-text flex-grow-1">
                            ${this.descripcion}
                        </p>

                        ${this.resultado
                            ? `
                                <div class="alert alert-success py-2">
                                    <strong>Resultado</strong><br>
                                    ${this.resultado}
                                </div>
                              `
                            : ''}

                        <div class="mb-3">
                            ${this.crearBadgesTecnologias()}
                        </div>

                        ${this.crearBoton()}

                    </div>

                </article>

            </div>
        `;
    }

}