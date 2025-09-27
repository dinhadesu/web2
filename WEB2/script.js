function buscarEExibirProdutosSimples() {
    const gridElement = document.getElementById("produtos-grid");
    const apiUrl = 'http://localhost:8080/api/produtos'; 

    gridElement.innerHTML = '<p>Carregando produtos...</p>';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro de rede ou na API: Status ${response.status}`);
            }
            return response.json();
        })
        .then(produtos => {
            gridElement.innerHTML = ''; 

            if (produtos.length === 0) {
                gridElement.innerHTML = '<p>Nenhum produto cadastrado.</p>';
                return;
            }

            produtos.forEach(produto => {
                gridElement.innerHTML += 
                    `<div class="produto">
                        <div class="produto-img">
                            <img src="${produto.imgUrl}" alt="${produto.nome}">
                        </div>
                        <div class="produto-info">
                            <h3>${produto.nome}</h3>
                            <p class="preco">R$ ${produto.valor.toFixed(2).replace('.', ',')}</p> 
                        </div>
                    </div>`;
            });
        })
        .catch(error => {
            console.error('Falha ao carregar dados:', error);
            gridElement.innerHTML = `<p style="color: red;">Falha na conexão com a API. Detalhe: ${error.message}</p>`;
        });
}

buscarEExibirProdutosSimples();