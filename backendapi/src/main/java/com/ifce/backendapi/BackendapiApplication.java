package com.ifce.backendapi;

import com.ifce.backendapi.model.Produto;
import com.ifce.backendapi.repository.ProdutoRepositorio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendapiApplication
{
    public static void main(String[] args) {
        SpringApplication.run(BackendapiApplication.class, args);
    }

    @Bean
    public CommandLineRunner InicializarDados(ProdutoRepositorio produtoRepositorio)
    {
        return args -> {
            if(produtoRepositorio.count()==0)
            {
                produtoRepositorio.save(new Produto(null, "Guitarra", 6500.00, "https://a-static.mlcdn.com.br/%7Bw%7Dx%7Bh%7D/guitarra-infantil-cordas-acos-65cm-educativa-musical-com-som-e-luz-rock-brinquedo-crianca-instrumento-didatico-hyper-club/warriorimportsbr/guitarravermelho/282bebc8836e8fbb2d6a9dfa87d33cd3.jpeg"));
                produtoRepositorio.save(new Produto(null, "[Autografada] Guitarra", 15000.00, "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNUn9QwwO0QrBZyno2-HqThn92aiuii9_D5wLDRoSBbd2pcTphZSUZDidUKguz34TGLSw6LAVpJq49n28el4X2iEEaksGBI0L5D63CRbkEmmai9WWogYdB4UGOa5TVxQNjlaJoSpV9V9w/w640/IRON+MAIDEN+SIGNED+GUITAR+1.jpg"));
                produtoRepositorio.save(new Produto(null, "[Usada] Guitarra", 3000.00, "https://http2.mlstatic.com/D_NQ_NP_853961-MLB84306095221_052025-O-guitarra-vintage-v6m24-preta-usada-tipo-charvel.webp"));
                System.out.println("Dados iniciados de produtos inseridos com sucesso");
            }
        };
    }
}
