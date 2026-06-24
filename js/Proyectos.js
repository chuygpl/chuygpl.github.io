export default class Proyectos {

    constructor(datos) {
        this.nombre = datos.nombre;
        this.rol = datos.rol || '';
        this.periodo = datos.periodo || '';
        this.estado = datos.estado || '';
        this.problema = datos.problema || '';
        this.descripcion = datos.descripcion;
        this.resultado = datos.resultado || '';
        this.tecnologias = datos.tecnologias;
        this.imagen = datos.imagen;
        this.url = datos.url;
    }

    static async obtenerProyectos() {
        const response = await fetch('./data/datos.json');
        const data = await response.json();

        return data.proyectos.map(proyecto => new Proyectos(proyecto));
    }

    crearCard() {
        const meta = [this.rol, this.periodo, this.estado].filter(Boolean).join(' · ');

        return `
            <div class="col-lg-6 mb-4">
                <article class="card proyecto-card shadow h-100">

                    <img src="${this.imagen}"
                         class="card-img-top proyecto-card-img"
                         alt="Captura del proyecto ${this.nombre}"
                         loading="lazy">

                    <div class="card-body d-flex flex-column">

                        <h3 class="card-title h5">
                            ${this.nombre}
                        </h3>

                        ${meta ? `<p class="text-muted small mb-2">${meta}</p>` : ''}

                        ${this.problema ? `<p class="card-text"><strong>Problema:</strong> ${this.problema}</p>` : ''}

                        <p class="card-text flex-grow-1">
                            ${this.descripcion}
                        </p>

                        ${this.resultado ? `<p class="card-text"><strong>Resultado:</strong> ${this.resultado}</p>` : ''}

                        <p class="text-muted small mb-3">
                            ${this.tecnologias}
                        </p>

                        <a href="${this.url}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="btn btn-primary mt-auto align-self-start">
                            Ver proyecto
                        </a>

                    </div>

                </article>
            </div>
        `;
    }
}
