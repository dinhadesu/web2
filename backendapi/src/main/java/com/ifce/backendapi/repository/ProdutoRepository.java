package com.ifce.backendapi.repository;

import com.ifce.backendapi.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByNomeContainingIgnoreCase(String nome);

    List<Produto> findByValorBetween(Double valorMinimo, Double valorMaximo);

    List<Produto> findByValorGreaterThan(Double valor);

    List<Produto> findByValorLessThan(Double valor);

    Optional<Produto> findByNome(String nome);

//    boolean existsByNome(String nome);

    @Query("SELECT p FROM Produto p WHERE p.valor <= :valorMaximo ORDER BY p.valor ASC")
    List<Produto> buscarProdutosEmPromocao(@Param("valorMaximo") Double valorMaximo);

//    @Query(value = "SELECT * FROM produtos WHERE valor > :valor ORDER BY valor DESC LIMIT :limite",
//            nativeQuery = true)
//    List<Produto> buscarProdutosMaisCaros(@Param("valor") Double valor, @Param("limite") int limite);
}