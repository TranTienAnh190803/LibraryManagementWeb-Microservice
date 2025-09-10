package com.TranTienAnh.UserService.Controllers;

import com.TranTienAnh.UserService.DTOs.JWTResponse;
import com.TranTienAnh.UserService.DTOs.LoginForm;
import com.TranTienAnh.UserService.DTOs.RegistrationForm;
import com.TranTienAnh.UserService.DTOs.Response;
import com.TranTienAnh.UserService.Services.Interfaces.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/register")
    private ResponseEntity<Response<Void>> registration(@RequestBody RegistrationForm registrationForm, @RequestParam("isLibrarian") boolean isLibrarian) {
        Response<Void> response = userManagementService.registration(registrationForm, isLibrarian);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
