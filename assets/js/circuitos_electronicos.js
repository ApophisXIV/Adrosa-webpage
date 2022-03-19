
import card_template from './card_template.js'
import subject_template from './subject_template.js'

/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

/**
 * Load images, title and description from JSON DB
 */
window.addEventListener('load', () => {
    fetch('../assets/db/circuitos_electronicos.json')
        .then(response => response.json())
        .then(data => {
            const subject = data.subjects[0].map(subject => subject_template(subject))

            const card_html = data.subjects[0].cards_content.
                map(card => card_template(card)).
                map(card => `<div class="col-lg-3 col-md-6" data-aos="zoom-in"> ${card} </div>`)
            select('#card-container').innerHTML = card_html.join('')
        })
});

