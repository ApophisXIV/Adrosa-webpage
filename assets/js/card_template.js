/**
* Card Template
*/
export default function card_template(data) {
    const html = `
        <div class="card">
            <img src="${data.img_url}" class="card-img-top" alt="${data.title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.description}</p>
                <a href="${data.pdf_link}" class="btn btn-outline-info btn-lg w-50 mt-4 m-auto">Leer</a>
            </div>
        </div>`
    return html
}

export default function subject_template(data){
    const html = `
        <h2 class="d-flex justify-content-between primary-color">
            ${data.subject_title}
        <div class="icon"><a href="#"><i class="bi bi-cloud-download"></i></a></div></h2>
        <p class="description">${data.subject_description}</p>
        <div class="row d-flex justify-content-center my-5 align-items-center">
            ${data.cards}
        </div>`
    return html
}