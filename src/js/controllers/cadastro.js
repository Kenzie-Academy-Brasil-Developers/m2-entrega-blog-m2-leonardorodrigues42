import Api from "../models/Api.js"

class Cadastro {

    static async cadastrar() {
        const btn = document.querySelector("#btn")

        btn.addEventListener("click", async (e) => {
            e.preventDefault()
        
            const form = document.querySelector("#cadastro")

            const username = form.username.value
            const email = form.email.value
            const avatar = form.avatar.value
            const password = form.password.value

            const data = {
                username: username,
                email: email,
                avatarUrl: avatar,
                password: password
            }

            Api.cadastrar(data)
        
        })
    }
}

Cadastro.cadastrar()

export default Cadastro