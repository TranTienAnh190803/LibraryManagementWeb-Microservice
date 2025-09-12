package com.TranTienAnh.UserService.Services.Interfaces;

import com.TranTienAnh.UserService.DTOs.NotificationDTO;
import com.TranTienAnh.UserService.DTOs.Response;

public interface NotificationService {
    public Response<NotificationDTO> getAllNotification(String username);

    public Response<Void> sendNewBookNotification();
}
