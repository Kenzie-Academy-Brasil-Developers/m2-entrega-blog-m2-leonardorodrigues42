import Api from "../models/Api.js"

class dashboard {
    
    static async mostrarPosts() {
        if (Api.validacao.userId) {

            
            let posts = await Api.vizualizarPosts()
            .then(response => {
                if (response !== undefined) {
                    console.log("Validado")
                    return response
                }else {
                    window.location.href = "/Entregas/m2-entrega-blog-m2-leonardorodrigues42/src/pages/login.html"                      
                }
                
            })
            .catch(error => console.log(error))
            
            const views = document.querySelector("#containerPosts")
            const ulPosts = document.createElement("ul")
            ulPosts.id = "posts"
            
            views.appendChild(ulPosts)
            
            
            
            posts.data.forEach(post => {
                
                const postCard = document.createElement("li")
                postCard.id = "postCard"
                
                const cabecalho = document.createElement("div")
                cabecalho.id = "cabecalho"
                
                const conteudo = document.createElement("div")
                conteudo.id = "conteudo"
                
                const data = moment(post.createdAt).format("L")

                cabecalho.insertAdjacentHTML('afterbegin',
                `<img class="imgUsuario" src="${post.user.avatarUrl}"
                    <div>
                    
                    </div>`
                    )>
                                
                conteudo.insertAdjacentHTML('afterbegin', `
                <div class="name">${post.user.username}</div>
                <div class="conteudo">${post.content}</div>`)
                
                const principal = document.createElement('div')
                principal.id = 'principal'
                
                const div = document.createElement("div")
                div.className = "controle"


                div.innerText = ("beforeend", `${data}`)

                principal.append(cabecalho, conteudo)

                postCard.append(principal, div)

                if (post.user.id == Api.validacao.userId) {
                    const btnDeletar = document.createElement('button')
                    const btnModificar = document.createElement('button')

                    btnDeletar.id = `${post.id}`
                    btnModificar.id = `${post.id}`

                    btnDeletar.className = "btnDeletar"
                    btnModificar.className = "btnModificar"

                    btnDeletar.innerText = 'Deletar'
                    btnModificar.innerText = 'Modificar'

                    div.append(btnDeletar, btnModificar)

                } 

                ulPosts.appendChild(postCard)
            })

            const btnLogout = document.querySelector("#logout")

            btnLogout.addEventListener("click", () => {
                localStorage.removeItem("user")
                location.reload()
            })

        } else {
            console.log("Acesso negado")
            window.location.href = "/Entregas/m2-entrega-blog-m2-leonardorodrigues42/src/pages/login.html"
        }
    }

    static async criarPost() {

        const post = document.querySelector("#criarPost")
        const btnCriar = document.querySelector("#criar")

        btnCriar.addEventListener("click", async (e) => {
            e.preventDefault()
            console.log(post.value)

            if(post.value !== "") {
                const data = {
                    "content": post.value
                }
                console.log(data)

                await Api.fazerPost(data)                    
            }

            location.reload()
        })
    }

    static async deletarPost() {

        const btnDeletar = document.querySelectorAll(".btnDeletar")

        btnDeletar.forEach(post => {
            post.addEventListener("click", async (e) => {
                const post = e.target
                await Api.deletarPost(post.id)
                
                location.reload()
            })
        })
    }

    static async modificarPost() {
        const btnModificar = document.querySelectorAll(".btnModificar")

        btnModificar.forEach(post => {
            post.addEventListener("click", async (e) => {
                
                const post = e.target
                const novoConteudo = {
                    content: prompt("Faça sua alteraçao")
            }
                await Api.modificarPost(post.id, novoConteudo)
                
                location.reload()
            })
        })
    }

    static async posicionaPerfil() {
        const imgPerfil = document.querySelector("#imgPerfil")
        const tituloPerfil = document.querySelector("#tituloPerfil")

        const user = await Api.getUser(Api.validacao.userId)

        console.log(user)

        imgPerfil.src = user.avatarUrl
        tituloPerfil.innerText = user.username
    }
}

export default dashboard