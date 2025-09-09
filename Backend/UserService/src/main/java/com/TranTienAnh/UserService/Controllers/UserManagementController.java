package com.TranTienAnh.UserService.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserManagementController {
    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
