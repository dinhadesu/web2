package com.ifce.backendapi.config;

import com.ifce.backendapi.service.ProdutoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    public CommandLineRunner inicializarDados(ProdutoService produtoService) {
        return args -> {
            try {
                produtoService.inicializarDadosPadroes();
                logger.info("Inicialização de dados concluída com sucesso");
            } catch (Exception e) {
                logger.error("Erro ao inicializar dados: {}", e.getMessage());
            }
        };
    }
}