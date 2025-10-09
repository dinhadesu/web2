package com.ifce.backendapi.service;

import com.ifce.backendapi.model.Produto;
import com.ifce.backendapi.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarTodos() {
        return produtoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarPorFaixaDePreco(Double valorMinimo, Double valorMaximo) {
        return produtoRepository.findByValorBetween(valorMinimo, valorMaximo);
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarMaiorQue(Double valor) {
        return produtoRepository.findByValorGreaterThan(valor);
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarMenorQue(Double valor) {
        return produtoRepository.findByValorLessThan(valor);
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarEmPromocao(Double valorMaximo) {
        return produtoRepository.buscarProdutosEmPromocao(valorMaximo);
    }

    @Transactional
    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto atualizar(Long id, Produto produtoAtualizado) {
        return produtoRepository.findById(id)
                .map(produto -> {
                    produto.setNome(produtoAtualizado.getNome());
                    produto.setValor(produtoAtualizado.getValor());
                    produto.setImagemUrl(produtoAtualizado.getImagemUrl());
                    return produtoRepository.save(produto);
                })
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com id: " + id));
    }

    @Transactional
    public void deletar(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado com id: " + id);
        }
        produtoRepository.deleteById(id);
    }

    @Transactional
    public void inicializarDadosPadroes() {
        if (produtoRepository.count() == 0) {
            List<Produto> produtosPadroes = List.of(
                    Produto.builder()
                            .nome("Guitarra")
                            .valor(6500.00)
                            .imagemUrl("https://a-static.mlcdn.com.br/%7Bw%7Dx%7Bh%7D/guitarra-infantil-cordas-acos-65cm-educativa-musical-com-som-e-luz-rock-brinquedo-crianca-instrumento-didatico-hyper-club/warriorimportsbr/guitarravermelho/282bebc8836e8fbb2d6a9dfa87d33cd3.jpeg")
                            .build(),

                    Produto.builder()
                            .nome("[Autografada] Guitarra")
                            .valor(15000.00)
                            .imagemUrl("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNUn9QwwO0QrBZyno2-HqThn92aiuii9_D5wLDRoSBbd2pcTphZSUZDidUKguz34TGLSw6LAVpJq49n28el4X2iEEaksGBI0L5D63CRbkEmmai9WWogYdB4UGOa5TVxQNjlaJoSpV9V9w/w640/IRON+MAIDEN+SIGNED+GUITAR+1.jpg")
                            .build(),

                    Produto.builder()
                            .nome("[Usada] Guitarra")
                            .valor(3000.00)
                            .imagemUrl("https://http2.mlstatic.com/D_NQ_NP_853961-MLB84306095221_052025-O-guitarra-vintage-v6m24-preta-usada-tipo-charvel.webp")
                            .build()
            );

            produtoRepository.saveAll(produtosPadroes);
        }
    }
}
