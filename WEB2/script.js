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
                                    <a href="detalhes.html?id=${produto.id}" class="produto-link">
                                        <div class="produto-img">
                                            <img src="${produto.imagemUrl}" alt="${produto.nome}">
                                        </div>
                                        <div class="produto-info">
                                            <h3>${produto.nome}</h3>
                                            <p class="preco">R$ ${produto.valor.toFixed(2).replace('.', ',')}</p>
                                        </div>
                                    </a>
                                </div>`;
                        });
        })
        .catch(error => {
            console.error('Falha ao carregar dados:', error);
            gridElement.innerHTML = `<p style="color: red;">Falha na conexão com a API. Detalhe: ${error.message}</p>`;
        });
}

buscarEExibirProdutosSimples();

// Estado dos filtros
let filtrosAplicados = {
    nome: '',
    precoMin: null,
    precoMax: null,
    tipoFiltro: 'todos'
};

// Função principal para buscar produtos
function buscarEExibirProdutos(filtros = {}) {
    const gridElement = document.getElementById("produtos-grid");
    const contadorElement = document.getElementById("contador-produtos");

    let apiUrl = 'http://localhost:8080/api/produtos';

    gridElement.innerHTML = '<p>Carregando produtos...</p>';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro de rede ou na API: Status ${response.status}`);
            }
            return response.json();
        })
        .then(produtos => {
            // Aplicar filtros no frontend
            let produtosFiltrados = aplicarFiltros(produtos, filtros);

            gridElement.innerHTML = '';

            if (produtosFiltrados.length === 0) {
                gridElement.innerHTML = '<p class="mensagem-vazio">Nenhum produto encontrado com os filtros aplicados.</p>';
                contadorElement.textContent = '0 produtos encontrados';
                return;
            }

            // Atualizar contador
            contadorElement.textContent = `${produtosFiltrados.length} produto${produtosFiltrados.length !== 1 ? 's' : ''} encontrado${produtosFiltrados.length !== 1 ? 's' : ''}`;

            produtosFiltrados.forEach(produto => {
                gridElement.innerHTML +=
                    `<div class="produto">
                        <a href="detalhes.html?id=${produto.id}" class="produto-link">
                            <div class="produto-img">
                                <img src="${produto.imagemUrl}" alt="${produto.nome}">
                            </div>
                            <div class="produto-info">
                                <h3>${produto.nome}</h3>
                                <p class="preco">R$ ${produto.valor.toFixed(2).replace('.', ',')}</p>
                            </div>
                        </a>
                    </div>`;
            });
        })
        .catch(error => {
            console.error('Falha ao carregar dados:', error);
            gridElement.innerHTML = `<p style="color: red;">Falha na conexão com a API. Detalhe: ${error.message}</p>`;
            contadorElement.textContent = '';
        });
}

// Função para aplicar filtros
function aplicarFiltros(produtos, filtros) {
    let resultado = [...produtos];

    // Filtro por nome
    if (filtros.nome && filtros.nome.trim() !== '') {
        const nomeBusca = filtros.nome.toLowerCase();
        resultado = resultado.filter(p =>
            p.nome.toLowerCase().includes(nomeBusca)
        );
    }

    // Filtro por faixa de preço
    if (filtros.precoMin !== null && filtros.precoMin !== '') {
        resultado = resultado.filter(p => p.valor >= parseFloat(filtros.precoMin));
    }

    if (filtros.precoMax !== null && filtros.precoMax !== '') {
        resultado = resultado.filter(p => p.valor <= parseFloat(filtros.precoMax));
    }

    // Filtros rápidos
    if (filtros.tipoFiltro === 'promocao') {
        resultado = resultado.filter(p => p.valor <= 5000);
    } else if (filtros.tipoFiltro === 'premium') {
        resultado = resultado.filter(p => p.valor > 10000);
    }

    return resultado;
}

// Função para exibir filtros ativos
function atualizarFiltrosAtivos() {
    const filtrosAtivosElement = document.getElementById('filtros-ativos');
    const badges = [];

    if (filtrosAplicados.nome) {
        badges.push(`<span class="badge-filtro">Nome: "${filtrosAplicados.nome}" <button onclick="removerFiltro('nome')">×</button></span>`);
    }

    if (filtrosAplicados.precoMin !== null && filtrosAplicados.precoMin !== '') {
        badges.push(`<span class="badge-filtro">Preço mínimo: R$ ${parseFloat(filtrosAplicados.precoMin).toFixed(2)} <button onclick="removerFiltro('precoMin')">×</button></span>`);
    }

    if (filtrosAplicados.precoMax !== null && filtrosAplicados.precoMax !== '') {
        badges.push(`<span class="badge-filtro">Preço máximo: R$ ${parseFloat(filtrosAplicados.precoMax).toFixed(2)} <button onclick="removerFiltro('precoMax')">×</button></span>`);
    }

    if (filtrosAplicados.tipoFiltro === 'promocao') {
        badges.push(`<span class="badge-filtro">🔥 Em Promoção <button onclick="removerFiltro('tipoFiltro')">×</button></span>`);
    } else if (filtrosAplicados.tipoFiltro === 'premium') {
        badges.push(`<span class="badge-filtro">⭐ Premium <button onclick="removerFiltro('tipoFiltro')">×</button></span>`);
    }

    if (badges.length > 0) {
        filtrosAtivosElement.innerHTML = '<p><strong>Filtros ativos:</strong></p>' + badges.join(' ');
        filtrosAtivosElement.style.display = 'block';
    } else {
        filtrosAtivosElement.style.display = 'none';
    }
}

// Função para remover filtro individual
function removerFiltro(tipo) {
    if (tipo === 'nome') {
        filtrosAplicados.nome = '';
        document.getElementById('filtro-nome').value = '';
    } else if (tipo === 'precoMin') {
        filtrosAplicados.precoMin = null;
        document.getElementById('filtro-preco-min').value = '';
    } else if (tipo === 'precoMax') {
        filtrosAplicados.precoMax = null;
        document.getElementById('filtro-preco-max').value = '';
    } else if (tipo === 'tipoFiltro') {
        filtrosAplicados.tipoFiltro = 'todos';
    }

    buscarEExibirProdutos(filtrosAplicados);
    atualizarFiltrosAtivos();
}

// Event Listeners
document.getElementById('btn-aplicar-filtros').addEventListener('click', () => {
    filtrosAplicados.nome = document.getElementById('filtro-nome').value;
    filtrosAplicados.precoMin = document.getElementById('filtro-preco-min').value;
    filtrosAplicados.precoMax = document.getElementById('filtro-preco-max').value;

    buscarEExibirProdutos(filtrosAplicados);
    atualizarFiltrosAtivos();
});

document.getElementById('btn-limpar-filtros').addEventListener('click', () => {
    filtrosAplicados = {
        nome: '',
        precoMin: null,
        precoMax: null,
        tipoFiltro: 'todos'
    };

    document.getElementById('filtro-nome').value = '';
    document.getElementById('filtro-preco-min').value = '';
    document.getElementById('filtro-preco-max').value = '';

    buscarEExibirProdutos(filtrosAplicados);
    atualizarFiltrosAtivos();
});

// Filtros rápidos
document.querySelectorAll('.btn-filtro-rapido').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const tipo = e.target.getAttribute('data-tipo');

        // Limpar outros filtros ao usar filtro rápido
        filtrosAplicados = {
            nome: '',
            precoMin: null,
            precoMax: null,
            tipoFiltro: tipo
        };

        document.getElementById('filtro-nome').value = '';
        document.getElementById('filtro-preco-min').value = '';
        document.getElementById('filtro-preco-max').value = '';

        // Destacar botão ativo
        document.querySelectorAll('.btn-filtro-rapido').forEach(b => b.classList.remove('ativo'));
        e.target.classList.add('ativo');

        buscarEExibirProdutos(filtrosAplicados);
        atualizarFiltrosAtivos();
    });
});

// Busca em tempo real no campo de nome (opcional - com delay)
let timeoutBusca;
document.getElementById('filtro-nome').addEventListener('input', (e) => {
    clearTimeout(timeoutBusca);
    timeoutBusca = setTimeout(() => {
        filtrosAplicados.nome = e.target.value;
        buscarEExibirProdutos(filtrosAplicados);
        atualizarFiltrosAtivos();
    }, 500); // Aguarda 500ms após parar de digitar
});

// Inicializar
buscarEExibirProdutos(filtrosAplicados);