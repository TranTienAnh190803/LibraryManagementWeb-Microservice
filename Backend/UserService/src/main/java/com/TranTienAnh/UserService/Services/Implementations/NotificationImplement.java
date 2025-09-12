package com.TranTienAnh.UserService.Services.Implementations;

import com.TranTienAnh.UserService.DTOs.NotificationDTO;
import com.TranTienAnh.UserService.DTOs.Response;
import com.TranTienAnh.UserService.Models.Notification;
import com.TranTienAnh.UserService.Models.Role;
import com.TranTienAnh.UserService.Models.User;
import com.TranTienAnh.UserService.Repositories.NotificationRepository;
import com.TranTienAnh.UserService.Repositories.UserRepository;
import com.TranTienAnh.UserService.Services.Interfaces.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationImplement implements NotificationService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Response<NotificationDTO> getAllNotification(String username) {
        Response<NotificationDTO> response = new Response<>();

        try {
            User user = userRepository.findByUsername(username).orElse(null);

            if (user != null) {
                List<NotificationDTO> notifications = notificationRepository.findAllByUser(user);

                if (!notifications.isEmpty()) {
                    response.setDataList(notifications);
                    response.setSuccess(true);
                    response.setStatusCode(200);
                }
                else {
                    response.setSuccess(false);
                    response.setStatusCode(200);
                    response.setMessage("There Are No Notification.");
                }
            }
            else {
                response.setSuccess(false);
                response.setStatusCode(404);
                response.setMessage("User Not Found.");
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public Response<Void> sendNewBookNotification() {
        Response<Void> response = new Response<>();

        try {
            List<User> members = userRepository.findAllByRole(Role.MEMBER);

            if (!members.isEmpty()) {
                List<Notification> notifications = new ArrayList<>();
                for (User member : members) {
                    Notification notification = new Notification(
                            "The Library Has Added More Books.",
                            false,
                            true,
                            LocalDate.now(),
                            member
                    );
                    notifications.add(notification);
                }
                notificationRepository.saveAll(notifications);
            }
            response.setSuccess(true);
            response.setStatusCode(201);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }
}
