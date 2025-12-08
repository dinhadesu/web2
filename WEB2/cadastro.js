document.getElementById('imagemUrl').addEventListener('input', function(e) {
    const url = e.target.value;
    const previewContainer = document.getElementById('preview-container');

    if (url.trim() === '') {
        previewContainer.innerHTML = '<p class="preview-placeholder">A imagem aparecerá aqui quando você inserir a URL</p>';
        return;
    }

    try {
        new URL(url);
        previewContainer.innerHTML = `<img src="${url}" alt="Preview" onerror="this.parentElement.innerHTML='<p class=\\'preview-error\\'>❌ Erro ao carregar imagem</p>'">`;
    } catch {
        previewContainer.innerHTML = '<p class="preview-error">❌ URL inválida</p>';
    }
});

document.getElementById('valor').addEventListener('blur', function(e) {
    if (e.target.value) {
        const valor = parseFloat(e.target.value);
        if (!isNaN(valor)) {
            e.target.value = valor.toFixed(2);
        }
    }
});

function exibirMensagem(mensagem, tipo) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = `
        <div class="message ${tipo}">
            <span>${mensagem}</span>
            <button class="message-close" onclick="this.parentElement.remove()">×</button>
        </div>
    `;

    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 5000);
}

function validarFormulario(dados) {
    let isValido = true;

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    if (dados.nome.length < 3 || dados.nome.length > 100) {
        document.getElementById('error-nome').textContent = 'Nome deve ter entre 3 e 100 caracteres';
        isValido = false;
    }

    if (dados.valor <= 0) {
        document.getElementById('error-valor').textContent = 'Preço deve ser maior que zero';
        isValido = false;
    }

    try {
        new URL(dados.imagemUrl);
    } catch {
        document.getElementById('error-imagemUrl').textContent = 'URL da imagem inválida';
        isValido = false;
    }

    return isValido;
}

async function cadastrarProduto(dados) {
    const apiUrl = 'http://localhost:8080/api/produtos';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro ao cadastrar: Status ${response.status}`);
        }

        const produtoCadastrado = await response.json();
        return produtoCadastrado;

    } catch (error) {
        throw error;
    }
}

document.getElementById('form-cadastro').addEventListener('submit', async function(e) {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value.trim(),
        valor: parseFloat(document.getElementById('valor').value),
        imagemUrl: document.getElementById('imagemUrl').value.trim()
    };

    if (!validarFormulario(dados)) {
        exibirMensagem('Por favor, corrija os erros no formulário', 'error');
        return;
    }

    const btnSubmit = document.querySelector('.btn-submit');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');

    btnSubmit.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    try {
        const produtoCadastrado = await cadastrarProduto(dados);

        exibirMensagem(`✅ Produto "${produtoCadastrado.nome}" cadastrado com sucesso!`, 'success');

        document.getElementById('form-cadastro').reset();
        document.getElementById('preview-container').innerHTML = '<p class="preview-placeholder">A imagem aparecerá aqui quando você inserir a URL</p>';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        exibirMensagem(`❌ Erro ao cadastrar produto: ${error.message}`, 'error');
    } finally {
        btnSubmit.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        const errorElement = document.getElementById(`error-${this.id}`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
});