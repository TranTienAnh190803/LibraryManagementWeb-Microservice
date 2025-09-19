package com.TranTienAnh.UserService.Repositories;

import com.TranTienAnh.UserService.DTOs.NotificationDTO;
import com.TranTienAnh.UserService.Models.Notification;
import com.TranTienAnh.UserService.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT new com.TranTienAnh.UserService.DTOs.NotificationDTO(n.notificationId, n.message, n.read, n.addBook, n.createAt) " +
            "FROM Notification n " +
            "WHERE n.user = :user")
    List<NotificationDTO> findAllByUser(@Param("user") User user);

    boolean existsByCreateAtAndUser(LocalDate createAt, User user);
}
