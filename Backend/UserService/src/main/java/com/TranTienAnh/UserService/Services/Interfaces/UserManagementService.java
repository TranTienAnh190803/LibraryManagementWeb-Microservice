package com.TranTienAnh.UserService.Services.Interfaces;

import com.TranTienAnh.UserService.DTOs.*;
import com.TranTienAnh.UserService.Models.Role;

public interface UserManagementService {
    public Response<JWTResponse> login(LoginForm loginForm);

    public Response<Void> registration(RegistrationForm registrationForm, boolean isLibrarian);

    public Response<Void> changePassword(ChangePasswordForm changePasswordForm, String username);

    public Response<UserDTO> getAllUser(Role role);

    public Response<UserDTO> getUserInfo(Long userId);

    public Response<Void> deleteUserAccount(Long userId);
}
