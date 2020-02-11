const db_name = 'db_local_storage'
const db_data = new Array()

// Valores iniciais
db_data[1] = {name:'Fabio', age: 39}
db_data[2] = {name:'Talita', age: 30}
db_data[4] = {name:'Isabela', age: 1}
fSyncData()


// Cadastra ou atualiza um item na base de dados
function fUpsert(){
    const data = mountItemData()

    if(isNaN(parseInt(data.id)))
    {
        // Define um index auto-increment no insert
        data.id = fGetAllItems().length
    }

    // Inibe cadastro e atualização de registro vazios 
    if(!!data.name.trim() && !!data.age.trim())
    {
        db_data[data.id] = {name: data.name, age: data.age}
    
        clearFormData()
        fSyncData()
    }
}

// Exclui um item na base de dados
function fDelete(id){
    
    console.log(`Id ${id} removido!`)

    delete db_data[id]

    fSyncData()
    
}

// Seta o item no formulário para atualização
function fSetItem(id){

    document.getElementById("id").value = id
    document.getElementById("name").value = db_data[id].name
    document.getElementById("age").value = db_data[id].age
}

// Registra na base de dados os dados atualizados
function fSyncData(){

    localStorage.setItem(db_name, JSON.stringify(db_data))

    createDataTable(db_data)
}

// Retorna um array com todos os itens da base de dados
function fGetAllItems() {
    return JSON.parse(localStorage.getItem(db_name))
}

// Prepara objeto para armazena-lo na base de dados
function mountItemData(){
    const id = document.getElementById("id").value
    const name = document.getElementById("name").value
    const age = document.getElementById("age").value

    return {id, name, age}
}

// Limpa campos após ação de cadastro e edição
function clearFormData(){
    document.getElementById("id").value = ''
    document.getElementById("name").value = ''
    document.getElementById("age").value = ''
}

// Monta a tabela com itens armazenados na base de dados
function createDataTable(db_data)
{
    // Cria cada linha <tr> com registros da base de dados
    const linhas = db_data.map((item, id) => {

        const tdId = document.createElement('td')
        tdId.innerHTML = id

        const tdName = document.createElement('td')
        tdName.innerHTML = item.name

        const tdAge = document.createElement('td')
        tdAge.innerHTML = item.age

        const tdAct = document.createElement('td')
        tdAct.innerHTML = `
            <button id="edit_${id}" act="${id}" class="btn btn-sm btn-outline-primary" onclick="fSetItem(this.attributes.act.value)">Edit</button>
            <button id="delete_${id}" act="${id}" class="btn btn-sm btn-outline-danger" onclick="fDelete(this.attributes.act.value)" >Delete</button>
        `

        const tr = document.createElement('tr')
        tr.appendChild(tdId)
        tr.appendChild(tdName)
        tr.appendChild(tdAge)
        tr.appendChild(tdAct)
        
        return tr

    })

    const tbody = document.getElementById("items");
    tbody.innerHTML = "";

    const tabela = document.getElementById('items')
    linhas.forEach(item => tabela.appendChild(item))
}
function changeView(id){

    const url = window.location.origin
    let page

    if(id == 'bootstrap')
    {
        page = `${url}/crud-with-bootstrap.html`
    }
    else
    {
        page = `${url}/index.html`
    }

    window.open(page, '_self')
}
