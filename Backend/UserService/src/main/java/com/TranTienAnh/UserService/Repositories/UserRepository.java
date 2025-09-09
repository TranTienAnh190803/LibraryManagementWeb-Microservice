package com.TranTienAnh.UserService.Repositories;

import com.TranTienAnh.UserService.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
