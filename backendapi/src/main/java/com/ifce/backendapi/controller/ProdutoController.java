package com.ifce.backendapi.controller;

import com.ifce.backendapi.model.Produto;
import com.ifce.backendapi.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {
    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarTodos() {
        List<Produto> produtos = produtoService.buscarTodos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return produtoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Produto>> buscarPorNome(@RequestParam String nome) {
        List<Produto> produtos = produtoService.buscarPorNome(nome);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/faixa-preco")
    public ResponseEntity<List<Produto>> buscarPorFaixaDePreco(
            @RequestParam Double valorMinimo,
            @RequestParam Double valorMaximo) {
        List<Produto> produtos = produtoService.buscarPorFaixaDePreco(valorMinimo, valorMaximo);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/maior-que")
    public ResponseEntity<List<Produto>> buscarMaiorQue(@RequestParam Double valor) {
        List<Produto> produtos = produtoService.buscarMaiorQue(valor);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/menor-que")
    public ResponseEntity<List<Produto>> buscarMenorQue(@RequestParam Double valor) {
        List<Produto> produtos = produtoService.buscarMenorQue(valor);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/promocao")
    public ResponseEntity<List<Produto>> buscarEmPromocao(@RequestParam(defaultValue = "5000") Double valorMaximo) {
        List<Produto> produtos = produtoService.buscarEmPromocao(valorMaximo);
        return ResponseEntity.ok(produtos);
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@Valid @RequestBody Produto produto) {
        Produto novoProduto = produtoService.salvar(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produto) {
        try {
            Produto produtoAtualizado = produtoService.atualizar(id, produto);
            return ResponseEntity.ok(produtoAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            produtoService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}