package com.example.backblogpessoal.infra.config;

import com.example.backblogpessoal.infra.security.SecurityFilter;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.web.SecurityFilterChain;

import static org.mockito.Mockito.mock;

@TestConfiguration
public class TestSecurityConfig {

    @Bean
    @Primary
    public SecurityFilterChain securityFilterChain() {
        return mock(SecurityFilterChain.class);
    }

    @Bean
    @Primary
    public SecurityFilter securityFilter() {
        return mock(SecurityFilter.class);
    }
}
