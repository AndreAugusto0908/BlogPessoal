package com.example.backblogpessoal.repository;

import com.example.backblogpessoal.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    UserDetails findByUsuario(String usuario);
    User findById(Long id);

}
