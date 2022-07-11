import Api from "../models/Api.js"

class Login {
    
    static async logar() {
        const form = document.querySelector("#login")
        const btn = document.querySelector("#btnLogin")
        const btnRegister = document.querySelector("#btnRegister")

        btnRegister.addEventListener("click", async () => {
            window.location.href = "/src/pages/cadastro.html"
        })

        btn.addEventListener("click", async (e) => {
            e.preventDefault()

            const email = form.email.value
            const password = form.password.value

            const data = {
                email: email,
                password: password
            }

            Api.login(data)
                .then(console.log("Sucesso!!"))
                .catch(err => console.log(err))

            
        })

    }
}

Login.logar()

export default Login