package com.ifce.backendapi.controller;

import com.ifce.backendapi.model.Produto;
import com.ifce.backendapi.repository.ProdutoRepositorio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoRepositorio produtoRepositorio;

    public ProdutoController(ProdutoRepositorio produtoRepositorio) {
        this.produtoRepositorio = produtoRepositorio;
    }

    @GetMapping
    public List<Produto> Buscar()
    {
        System.out.println("Buscando Produtos");
        return produtoRepositorio.findAll();
    }

    @PostMapping
    public void Cadastrar(@RequestBody Produto produto)
    {
        System.out.println("Cadastrando Produto");
        produtoRepositorio.save(produto);
    }
}

//Get dudinha.com/api/products
//Post dudinhag.com/api/products