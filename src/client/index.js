import './styles/style.scss';

require.context('./media', true)

//import font-awesome
import '../../node_modules/@fortawesome/fontawesome-free/js/all.js'

import { toggleForm, scrollToTopOnClick, addTrip, showSavedTrips, saveTrip, removeTrip } from './js/app.js'

toggleForm()
scrollToTopOnClick()
addTrip()
showSavedTrips()
//testGet()

export {
    saveTrip,
    removeTrip
}