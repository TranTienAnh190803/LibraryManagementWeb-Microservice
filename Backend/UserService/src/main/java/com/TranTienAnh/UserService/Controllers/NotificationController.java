package com.TranTienAnh.UserService.Controllers;

import com.TranTienAnh.UserService.DTOs.NotificationDTO;
import com.TranTienAnh.UserService.DTOs.Response;
import com.TranTienAnh.UserService.Services.Interfaces.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/member/get-all-notification")
    public ResponseEntity<Response<NotificationDTO>> getAllNotification() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response<NotificationDTO> response = notificationService.getAllNotification(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/librarian/send-new-book-notification")
    public ResponseEntity<Response<Void>> sendNewBookNotification() {
        Response<Void> response = notificationService.sendNewBookNotification();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
