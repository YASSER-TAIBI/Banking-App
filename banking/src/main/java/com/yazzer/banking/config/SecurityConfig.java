package com.yazzer.banking.config;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.filters.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration // indique à Spring que cette classe fournit des beans (objets gérés par le conteneur Spring).
@EnableWebSecurity // active la configuration de Spring Security pour ton application.
@RequiredArgsConstructor // (Lombok) : génère un constructeur qui prend en argument tous les champs final de la classe. C’est pratique pour l’injection de dépendances via le constructeur.
public class SecurityConfig {

    private final UserDetailsService userDetailsService; // interface Spring qui permet de charger un utilisateur (username, mot de passe, rôles). Tu fournis une implémentation qui va chercher les utilisateurs (BDD, mémoire...).
    private final JwtAuthenticationFilter jwtAuthFilter; // un filtre personnalisé (probablement ton code) qui vérifie le JWT dans les requêtes entrantes et authentifie l’utilisateur si le JWT est valide.

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { // règles de sécurité HTTP (qui peut accéder à quoi, quels filtres).
        http
                // Désactive CSRF si tu fais du REST (parce qu’on n’utilise pas de sessions et de formulaires HTML. Si tu fais une app web avec formulaires, ne le désactive pas.)
                .csrf(csrf -> csrf.disable())

                // Autorise certaines requêtes publiques
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/auth/**"
                        ).permitAll()
                        .anyRequest()
                        .authenticated()
                )

                // Gestion des sessions : pas de session côté serveur (JWT stateless)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Provider et filtre JWT
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        return http.build();
    }

    //@Bean
    public CorsFilter corsFilter() {
        return null;
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() { // règles CORS (qui peut appeler ton API depuis un autre domaine).
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("http://localhost:4200")); // ton frontend Angular par ex.
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(List.of("*"));
//        config.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception { // manager global d’authentification.
        return config.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() { // (DaoAuthenticationProvider) : comment valider un login/password (utilise UserDetailsService + PasswordEncoder).
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() { // comment chiffrer / vérifier les mots de passe.
        return new BCryptPasswordEncoder();
    }
}
