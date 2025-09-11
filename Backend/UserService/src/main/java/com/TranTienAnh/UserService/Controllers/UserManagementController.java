package com.TranTienAnh.UserService.Controllers;

import com.TranTienAnh.UserService.DTOs.*;
import com.TranTienAnh.UserService.Models.Role;
import com.TranTienAnh.UserService.Services.Interfaces.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserManagementController {
    @Autowired
    private UserManagementService userManagementService;

    @PostMapping("/login")
    public ResponseEntity<Response<JWTResponse>> login(@RequestBody LoginForm loginForm) {
        Response<JWTResponse> response = userManagementService.login(loginForm);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/admin/register")
    public ResponseEntity<Response<Void>> registration(@RequestBody RegistrationForm registrationForm, @RequestParam("isLibrarian") boolean isLibrarian) {
        Response<Void> response = userManagementService.registration(registrationForm, isLibrarian);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/librarian-member/change-password")
    public ResponseEntity<Response<Void>> changePassword(@RequestBody ChangePasswordForm changePasswordForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response<Void> response = userManagementService.changePassword(changePasswordForm, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/admin/get-all-user")
    public ResponseEntity<Response<UserDTO>> getAllUser(@RequestParam("role") Role role) {
        Response<UserDTO> response = userManagementService.getAllUser(role);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/admin/get-user-info")
    public ResponseEntity<Response<UserDTO>> getUserInfo(@RequestParam("userId") Long userId) {
        Response<UserDTO> response = userManagementService.getUserInfo(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete-user-account")
    public ResponseEntity<Response<Void>> deleteUserAccount(@RequestParam("userId") Long userId) {
        Response<Void> response = userManagementService.deleteUserAccount(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
