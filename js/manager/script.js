currentProduct = []
unProducts = 0

inputQtd = document.getElementById('input-number');
inputQtd.addEventListener('input', ()=>{
    unProducts = inputQtd.value;
    console.log(unProducts);
});

// Função para atualizar a lista de produtos na interface do usuário
function atualizarListaProdutos() {
    // Recupere os dados do Local Storage
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Selecione o elemento onde você deseja exibir a lista de produtos
    const estoquesAtivos = document.querySelector('.estoques-ativos');

    // Limpe a lista atual para evitar duplicatas
    estoquesAtivos.innerHTML = '';

    // Itere sobre os produtos e adicione-os à interface
    produtos.forEach((produto) => {
        const listItem = document.createElement('div');
        listItem.classList.add('estoques-listtile', 'box-flex-row', 'btn-listtile');

        listItem.innerHTML = `
  <span class="desc">${produto.nome}</span>
  <span class="valor-total">${(produto.valor*produto.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
  <span class="quantidade-total">${produto.quantidade} Uni.</span>
  <ion-icon name="trash-outline" class="remover-produto" data-id="${produto.id}"></ion-icon>
`;


        estoquesAtivos.appendChild(listItem);
        listItem.addEventListener('click', () => selecionarProduto(produto.id, produto.nome, produto.valor, produto.quantidade));
        
    });
    // Adicione event listeners para os botões de remover produtos
    const botoesRemover = document.querySelectorAll('.remover-produto');
    botoesRemover.forEach((botao) => {
        botao.addEventListener('click', removerProduto);
    });
}

// Chamar a função para atualizar a lista de produtos quando a página é carregada
window.addEventListener('load', atualizarListaProdutos);

// Função para adicionar um novo produto
function adicionarProduto() {
    // Coletar dados do formulário
    nomeProduto = prompt("Digite o nome do produto:");
    valorProduto = parseFloat(prompt("Digite o valor unitário em R$:"));
    while(isNaN(valorProduto)){
        valorProduto = parseFloat(prompt("Digite o valor unitário em R$:"));
    }
    quantidadeProduto = parseInt(prompt("Digite a quantidade de unidades:"));
    while(isNaN(quantidadeProduto)){
        quantidadeProduto = parseFloat(prompt("Digite a quantidade de unidades"));
    }

    // Verificar se já existem produtos no Local Storage
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Gerar um identificador único (pode ser um UUID aleatório)
    const id = new Date().getTime().toString();

    // Criar um objeto para representar o novo produto
    const novoProduto = {
        id: id,
        nome: nomeProduto,
        valor: valorProduto,
        quantidade: quantidadeProduto,
    };

    // Adicionar o novo produto à lista de produtos
    produtos.push(novoProduto);

    // Armazenar a lista atualizada no Local Storage
    localStorage.setItem('produtos', JSON.stringify(produtos));

    // Atualizar a lista de produtos na interface do usuário
    atualizarListaProdutos();

    // Alerta de sucesso
    alert("Produto adicionado com sucesso!");
}

function removerProduto(event) {
    const idProdutoRemover = event.target.getAttribute('data-id');

    // Recupere os dados do Local Storage
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Encontre o índice do produto a ser removido
    const indexProdutoRemover = produtos.findIndex((produto) => produto.id === idProdutoRemover);

    if (indexProdutoRemover !== -1) {
        // Remova o produto do array
        produtos.splice(indexProdutoRemover, 1);

        // Atualize os dados no Local Storage
        localStorage.setItem('produtos', JSON.stringify(produtos));

        // Atualize a lista de produtos na interface do usuário
        atualizarListaProdutos();

        // Alerta de sucesso
        alert("Produto removido com sucesso!");
    }
}


function venderProduto(){

}


// Chamar a função de adicionar produto quando o botão for clicado
const adicionarBtn = document.querySelector('.btn-add-product');
adicionarBtn.addEventListener('click', adicionarProduto);



function selecionarProduto(id, nome, valor, quantidade){
    currentProduct = {
        id: id,
        nome: nome,
        valor: valor,
        quantidade: quantidade,
    };
}

function venderProduto() {
    if (currentProduct) {

        if (unProducts) {
            currentProduct.quantidade -= parseInt(unProducts);
            
            // Atualize a lista de produtos na interface do usuário
            
            // Atualize os dados no Local Storage
            atualizarProdutoNoLocalStorage(currentProduct);
            atualizarListaProdutos();
            
            // Alerta de sucesso
            alert(`${unProducts} unidades de "${currentProduct.nome}" foram vendidas com sucesso!`);
        } else {
            alert(`Quantidade inválida ou insuficiente para "${currentProduct.nome}".`);
        }
    } else {
        alert('Nenhum produto selecionado.');
    }
}

function reporProduto() {
    if (currentProduct) {

        if (unProducts) {
            currentProduct.quantidade += parseInt(unProducts);
            
            // Atualize a lista de produtos na interface do usuário
            
            
            // Atualize os dados no Local Storage
            atualizarProdutoNoLocalStorage(currentProduct);
            atualizarListaProdutos();
            // Alerta de sucesso
            alert(`${unProducts} unidades de "${currentProduct.nome}" foram repostas com sucesso!`);
        } else {
            alert('Quantidade inválida para reposição.');
        }
    } else {
        alert('Nenhum produto selecionado.');
    }
}

function atualizarProdutoNoLocalStorage(produto) {
    // Recupere os dados do Local Storage
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Encontre o índice do produto a ser atualizado
    const indexProdutoAtualizar = produtos.findIndex((p) => p.id === produto.id);

    if (indexProdutoAtualizar !== -1) {
        produtos[indexProdutoAtualizar] = produto;

        // Atualize os dados no Local Storage
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }
}

// Chamar as funções de vender e repor quando os botões correspondentes forem clicados
const venderBtn = document.getElementById('venderProduto');
const reporBtn = document.getElementById('reporProduto');

venderBtn.addEventListener('click', venderProduto);
reporBtn.addEventListener('click', reporProduto);