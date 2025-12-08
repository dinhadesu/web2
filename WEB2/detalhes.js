function obterIdDaUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function formatarData(dataString) {
    if (!dataString) return 'Não disponível';

    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function carregarDetalhesProduto() {
    const produtoId = obterIdDaUrl();
    const detalhesElement = document.getElementById("produto-detalhes");
    const apiUrl = `http://localhost:8080/api/produtos/${produtoId}`;

    if (!produtoId) {
        detalhesElement.innerHTML = `
            <div class="erro">
                <p>Produto não encontrado!</p>
                <a href="index.html" class="btn-voltar">Voltar para a loja</a>
            </div>
        `;
        return;
    }

    detalhesElement.innerHTML = '<p>Carregando detalhes do produto...</p>';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Produto não encontrado: Status ${response.status}`);
            }
            return response.json();
        })
        .then(produto => {
            detalhesElement.innerHTML = `
                <div class="produto-detalhado">
                    <div class="produto-imagem-grande">
                        <img src="${produto.imagemUrl}" alt="${produto.nome}">
                    </div>

                    <div class="produto-informacoes">
                        <h2>${produto.nome}</h2>

                        <div class="preco-destaque">
                            <span class="label">Preço:</span>
                            <span class="valor">R$ ${produto.valor.toFixed(2).replace('.', ',')}</span>
                        </div>

                        <div class="produto-meta">
                            <p><strong>ID do Produto:</strong> ${produto.id}</p>
                            <p><strong>Cadastrado em:</strong> ${formatarData(produto.dataCadastro)}</p>
                            <p><strong>Última atualização:</strong> ${formatarData(produto.dataAtualizacao)}</p>
                        </div>

                        <div class="acoes">
                            <button class="btn-comprar">Adicionar ao Carrinho</button>
                            <button class="btn-favorito">❤ Favoritar</button>
                        </div>

                        <div class="descricao">
                            <h3>Descrição do Produto</h3>
                            <p>Este é um produto exclusivo da nossa loja. Entre em contato para mais informações sobre disponibilidade e formas de pagamento.</p>
                        </div>
                    </div>
                </div>
            `;

            document.querySelector('.btn-comprar').addEventListener('click', () => {
                alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
            });

            document.querySelector('.btn-favorito').addEventListener('click', (e) => {
                e.target.classList.toggle('favoritado');
                const texto = e.target.classList.contains('favoritado') ? '❤️ Favoritado' : '❤ Favoritar';
                e.target.textContent = texto;
            });
        })
        .catch(error => {
            console.error('Falha ao carregar detalhes:', error);
            detalhesElement.innerHTML = `
                <div class="erro">
                    <p style="color: red;">Erro ao carregar produto: ${error.message}</p>
                    <a href="index.html" class="btn-voltar">Voltar para a loja</a>
                </div>
            `;
        });
}

carregarDetalhesProduto();