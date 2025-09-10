package com.TranTienAnh.UserService.Services.Interfaces;

import com.TranTienAnh.UserService.DTOs.JWTResponse;
import com.TranTienAnh.UserService.DTOs.LoginForm;
import com.TranTienAnh.UserService.DTOs.RegistrationForm;
import com.TranTienAnh.UserService.DTOs.Response;

public interface UserManagementService {
    public Response<JWTResponse> login(LoginForm loginForm);

    public Response<Void> registration(RegistrationForm registrationForm, boolean isLibrarian);
}
