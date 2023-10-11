import { GithubUser } from "./GithubUser.js";

// classe que vai conter a lógica dos dados - Como os dados serão estruturados

export class Favorites { // cria a classe Favorites 
    constructor(root)   { // construtor de classe 
        this.root = document.querySelector(root); // cria o root da classe Favorites passando o root como parâmetro 
        this.load(); // cria a função load() da classe Favorites 
    }

    load() { // cria a função load() da classe Favorites
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []; // cria o array entries passando o JSON.parse(localStorage.getItem('@github-favorites:')) || [] como parâmetro
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries)); // cria o localStorage.setItem('@github-favorites:', JSON.stringify(this.entries)) como parâmetro
    }

    async add(username) {
        try {
            const userExists = this.entries.find(entry => entry.login === username); 

            if(userExists) {
                throw new Error('Usuário já cadastrado!');
            }

            const user = await GithubUser.search(username);

            if(user.login === undefined) {
                throw new Error('Usuário não encontrado');
            }

            this.entries = [user, ...this.entries]; // cria uma nova copia do array original e adiciona o user como parâmetro
            this.update(); // chama a função update() da classe Favorites
            this.save(); // chama a função save() da classe Favorites

        } catch(error) {
            alert(error.message);
        }
    }

    delete(user) { // cria a função delete() da classe Favorites 
        this.entries = this.entries // cria uma copia do array original, filtra e retorna o array filtrado
            .filter((entry) => entry.login !== user.login)
        // se for diferente(verdadeiro), então mantém os dados, se for igual(falso), exclui 
        this.update()
        this.save()
    }
}




// Classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites { // extends = herdar a classe Favorites 
    constructor(root) { // construtor de classe 
        super(root); // chama o construtor da classe Favorites passando o root como parâmetro 

        this.tbody = this.root.querySelector('table tbody'); // cria o tbody da tabela passando o root como parâmetro 

        this.update(); // chama a função update() da classe Favorites 
        this.onadd(); // chama a função onadd() da classe Favorites
    }

    onadd() {
        const addButton = this.root.querySelector('.search button'); // cria o botão passando o root como parâmetro
        addButton.onclick = () => { // cria o onclick do botão passando o onclick como parâmetro
            const { value } = this.root.querySelector('.search input'); // cria o value do input passando o root como parâmetro
            
            this.add(value); // chama a função add() da classe Favorites passando o value como parâmetro
        }     
    }

    update() { // cria a função update() da classe Favorites 
        this.removeAllTr() // chama a função removeAllTr() da classe Favorites 
        
        this.entries.forEach((user) => { // percorre o array de usuários e cria uma linha para cada um 
            const row = this.createRow() // cria uma nova linha passando o createRow() como parâmetro 
            
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`; // cria o src da imagem passando o login como parâmetro 
            row.querySelector('.user img').alt = `Imagem de ${user.name}`; // cria o alt da imagem passando o nome como parâmetro 
            row.querySelector('.user a').href = `https://github.com/${user.login}`; // cria o href do link passando o login como parâmetro 
            row.querySelector('.user p').textContent = user.name; // cria o texto do p passando o nome como parâmetro
            row.querySelector('.user span').textContent = user.login; // cria o texto do span passando o login como parâmetro
            row.querySelector('.repositories').textContent = user.public_repos; // cria o texto do repositories passando o public_repos como parâmetro
            row.querySelector('.followers').textContent = user.followers; // cria o texto do followers passando o followers como parâmetro

            row.querySelector('.remove').onclick = () => { // cria o onclick do remove passando o onclick como parâmetro 
                const isOk = confirm('Tem certeza que deseja remover esse usuário?') // cria a confirmação passando a confirmação como parâmetro
                if(isOk) {
                    this.delete(user) // chama a função delete() da classe Favorites passando o user como parâmetro     
                }
            }

            this.tbody.append(row) // adiciona a linha na tabela passando o tbody como parâmetro 
            
        })

    }
    
    createRow() { // cria a função createRow() da classe Favorites 
        const tr = document.createElement('tr') // cria o tr passando o tr como parâmetro 
        // cria o html da tabela passando o tr como parâmetro 
        tr.innerHTML = ` 
        <td class="user">
            <img src="https://github.com/Gisellebm.png" alt="">
            <a href="https://github.com/Gisellebm" target="_blank">
                <p>Giselle Macedo</p>
                <span>gisellebm</span>
            </a>
        </td>
        <td class="repositories">110</td>
        <td class="followers">62</td>
        <td>
            <button class="remove ph-bold ph-trash"></button>
        </td>
        `

        return tr
    }

    removeAllTr() { // cria a função removeAllTr() da classe Favorites 
        this.tbody.querySelectorAll('tr').forEach((tr) => { // percorre o tbody e exclui as linhas passando o tbody como parâmetro 
            tr.remove(); // exclui a linha passando o tr como parâmetro 
        })       
    }
} 

