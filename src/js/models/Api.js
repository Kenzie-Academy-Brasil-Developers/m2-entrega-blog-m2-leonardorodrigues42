class Api {

    static url = "https://blog-m2.herokuapp.com"

    static validacao = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false

    static async cadastrar(data) {
        await fetch(this.url+"/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => window.location.href = "/Entregas/m2-entrega-blog-m2-leonardorodrigues42/src/pages/login.html")
        .catch(error => console.log(error))
    }

    static async login(data) {
        fetch(this.url+"/users/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => localStorage.setItem("user", JSON.stringify(response)))
        .then(() => window.location.href = "/Entregas/m2-entrega-blog-m2-leonardorodrigues42/index.html")
        .catch(error => console.log(error))

    }

    static async vizualizarPosts(page=""){
        return fetch(this.url+"/posts/"+`${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+this.validacao.token
            },
            method: "GET"
        })
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.log(err))
        
    }

    static async fazerPost(conteudo) {
        await fetch(this.url+"/posts", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+this.validacao.token
            },
            method: "POST",
            body: JSON.stringify(conteudo)
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    static async deletarPost(id) {
        await fetch(this.url+`/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+this.validacao.token
            },
            method: 'DELETE',
        })
    }

    static async modificarPost(id, data) {
        await fetch(this.url+`/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+this.validacao.token
            },
            method: "PATCH",
            body: JSON.stringify(data)
        })
    }

    static async getUser(id){
        return await fetch(this.url+`/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+this.validacao.token
            },
            method: "GET"
        })
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.log(error))
    }
}



export default Api

