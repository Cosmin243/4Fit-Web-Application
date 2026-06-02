package com.Cosmin._Fit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	CommandLineRunner printConfig(
			@Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri:NU_EXISTA}") String issuer,
			@Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri:NU_EXISTA}") String jwk
	) {
		return args -> {
			System.out.println("ISSUER CONFIG = " + issuer);
			System.out.println("JWK CONFIG = " + jwk);
		};
	}
}