package com.example.BackBlogPessoal.Repository;

import com.example.BackBlogPessoal.Models.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    UserDetails findByUsuario(String usuario);
    User findById(Long id);

}
