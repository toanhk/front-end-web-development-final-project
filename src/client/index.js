import { handleSubmit } from './js/formHandler'
import { displaySavedTrips } from './js/localStorage'

import './styles/flexlayout.scss'
import './styles/style.scss'
import './styles/tablet.scss'

window.addEventListener('DOMContentLoaded', () => {
    displaySavedTrips()
});

document.querySelector("#clear-storage").addEventListener('click', function () {
    localStorage.removeItem("trips")
});

export {
    handleSubmit,
    displaySavedTrips
}