// import moment from 'moment'

import dashboard from "./js/controllers/index.js"

dashboard.mostrarPosts()
    .then(() => dashboard.deletarPost())
    .then(() => dashboard.modificarPost())
    .then(() => dashboard.posicionaPerfil())
dashboard.criarPost()
