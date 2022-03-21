import { select } from './utils.js'

/**
 * @brief  Template for cards (HTML)
 * @param {*} data
 * @returns HTML Card Template.
 */
function card_template(data) {
    const title = data.title == "" ? "Sin Titulo" : data.title
    const img_url = data.img_url == "" ? "../assets/img/no_image.png" : data.img_url
    const description = data.description == "" ? "Sin Descripción" : data.description
    const pdf_url = data.pdf_url == "" ? "#" : data.pdf_url
    const html = `
        <div class="card">
            <img src="${img_url}" class="card-img-top" alt="${title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <a href="${pdf_url}" class="btn btn-outline-info btn-lg w-50 mt-4 m-auto">Leer</a>
            </div>
        </div>`
    return html
}

/**
 * @brief Template for subjects (HTML)
 * @param {*} data
 * @returns HTML Subject Template. Ready to be added to the DOM
 */
function subject_template(data) {
    const html = `
        <h2 class="d-flex justify-content-between primary-color">
            ${data.subject_title}
            <div class="icon">
                <a href="${data.zip_url}">
                    <i class="bi bi-cloud-download"></i>
                </a>
            </div>
        </h2>
        <p class="description">${data.subject_description}</p>
        <div class="row d-flex justify-content-center my-5 align-items-center">
            ${data.cards_content
            .map(card => card_template(card))
            .map(card =>
                `<div class="col-lg-3 col-md-6" data-aos="zoom-in">${card}</div>`)
            .join('')
        }
        </div>`
    return html
}

function error_modal(message) {
    return `
    <!-- Vertically centered modal -->
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <!-- Modal -->
        <div class="modal fade" id="modal-1" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabindex="-1" aria-labelledby="modal-1-label" aria-hidden="true">
            <div class="modal-dialog modal-custom">
                <div class="icon-box">
                    <i class="bi bi-x"></i>
                </div>
                <div class="modal-content">
                    <div class="modal-header">
                    </div>
                    <div class="modal-body text-center">
                        <h4>Ooops!</h4>
                        ${message}
                    </div>
                    <div class="modal-footer">
                        <a class="btn btn-secondary p-2" href="../index.html#subjects">Regresar al inicio</a>
                        <button type="button" class="btn btn-warning text-light p-2" data-bs-dismiss="modal"
                                onclick="location.reload()">Reintentar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

/**
 * @brief Get subject data from JSON DB (Local file) and add it to the DOM
 * @param {*} DB
 * @param {*} subject_container_id
 */
function get_subject(DB, subject_container_id, callback) {
    const subject_container = select(subject_container_id)
    fetch(DB)
        .then(response => response.json())
        .then(data => {
            data.subjects.forEach(subject => {
                subject_container.innerHTML += subject_template(subject)
            })
            callback(true)
        })
        .catch(error => {
            console.log(error);
            document.body.innerHTML += error_modal(`
                Ocurrió un error al cargar los datos de la materia.
                <br>Si el problema persiste, por favor contacte al administrador.`
            )

            new bootstrap.Modal(select('#modal-1')).show()

            callback(false)
        })
}


export { get_subject }