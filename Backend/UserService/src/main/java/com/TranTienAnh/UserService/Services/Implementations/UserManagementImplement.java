package com.TranTienAnh.UserService.Services.Implementations;

import com.TranTienAnh.UserService.DTOs.*;
import com.TranTienAnh.UserService.Models.Role;
import com.TranTienAnh.UserService.Models.User;
import com.TranTienAnh.UserService.Repositories.UserRepository;
import com.TranTienAnh.UserService.Services.Interfaces.UserManagementService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserManagementImplement implements UserManagementService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public Response<JWTResponse> login(LoginForm loginForm) {
        Response<JWTResponse> response = new Response<>();

        try {
            User user = userRepository.findByUsername(loginForm.getUsername()).orElse(null);

            if (user != null && passwordEncoder.matches(loginForm.getPassword(), user.getPassword())) {
                JWTResponse jwtResponse = new JWTResponse();
                String token = jwtService.generateToken(user);
                jwtResponse.setToken(token);
                jwtResponse.setRole(user.getRole().name());
                response.setStatusCode(200);
                response.setSuccess(true);
                response.setData(jwtResponse);
            }
            else if (user == null) {
                response.setStatusCode(404);
                response.setSuccess(false);
                response.setMessage("Username Invalid.");
            }
            else {
                response.setStatusCode(400);
                response.setSuccess(false);
                response.setMessage("Wrong Password.");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setSuccess(false);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    private void sendMail(User user, boolean isLibrarian) throws MessagingException {
        String object = isLibrarian ? "Librarian" : "Member";

        StringBuilder html = new StringBuilder();
        html.append("<h3>Welcome, you are now officially a "+ object +" of TienAnh's Library.</h3>");
        html.append("<h3>Here are some information about your account:</h3>");
        html.append("<b>1. General Information</b>");
        html.append("<p>- "+ object +" ID: "+ user.getUserId() +"</p>");
        html.append("<p>- Fullname: "+ user.getFullname() +"</p>");
        html.append("<p>- Email: "+ user.getEmail() +"</p>");
        html.append("<p>- Date Of Birth: "+ user.getDateOfBirth().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) +"</p>");
        html.append("<p>- Address: "+ user.getAddress() +"</p>");
        html.append("<b>2. Account Information</b>");
        html.append("<p>- Username: "+ user.getUsername() +"</p>");
        html.append("<p>- Password: 11111</p>");
        html.append("<p><span style='color: red; font-weight: bold'>Note: </span>Please change your password right after you login for the first time.</p>");

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom("admin@library.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Library account notice");
        helper.setText(html.toString(), true);

        javaMailSender.send(message);
    }

    @Override
    public Response<Void> registration(RegistrationForm registrationForm, boolean isLibrarian) {
        Response<Void> response = new Response<>();

        try {
            Role role = isLibrarian ? Role.LIBRARIAN : Role.MEMBER;
            User user = new User(
                    registrationForm.getUsername(),
                    registrationForm.getFullname(),
                    registrationForm.getEmail(),
                    passwordEncoder.encode("11111"),
                    registrationForm.getDateOfBirth(),
                    registrationForm.getAddress(),
                    role
            );

            User registeredUser = userRepository.save(user);
            sendMail(registeredUser, isLibrarian);
            String userRole = isLibrarian ? "Librarian" : "Member";
            response.setStatusCode(201);
            response.setSuccess(true);
            response.setMessage("Register "+ userRole +" Successfully.");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setSuccess(false);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public Response<Void> changePassword(ChangePasswordForm changePasswordForm, String username) {
        Response<Void> response = new Response<>();

        try {
            User user = userRepository.findByUsername(username).orElse(null);

            if (user != null && passwordEncoder.matches(changePasswordForm.getOldPassword(), user.getPassword()) && changePasswordForm.getNewPassword().equals(changePasswordForm.getReEnterPassword())) {
                user.setPassword(passwordEncoder.encode(changePasswordForm.getNewPassword()));
                userRepository.save(user);
                response.setSuccess(true);
                response.setStatusCode(200);
                response.setMessage("Change Password Successfully.");
            }
            else if (user == null) {
                response.setSuccess(false);
                response.setStatusCode(404);
                response.setMessage("User Not Found.");
            }
            else if (!passwordEncoder.matches(changePasswordForm.getOldPassword(), user.getPassword())) {
                response.setSuccess(false);
                response.setStatusCode(400);
                response.setMessage("Your Old Password Didn't Match.");
            }
            else if (!changePasswordForm.getNewPassword().equals(changePasswordForm.getReEnterPassword())) {
                response.setSuccess(false);
                response.setStatusCode(400);
                response.setMessage("Your New And Re-enter Password Didn't Match.");
            }
            else {
                response.setSuccess(false);
                response.setStatusCode(400);
                response.setMessage("Change Password Failed.");
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public Response<UserDTO> getAllUser(Role role) {
        Response<UserDTO> response = new Response<>();

        try {
            if (role == Role.ADMIN) {
                response.setSuccess(false);
                response.setStatusCode(400);
                response.setMessage("Your Cannot Get Admin Information.");
            }
            else {
                List<User> users = userRepository.findAllByRole(role);

                if (!users.isEmpty()) {
                    List<UserDTO> userDTOs = users.stream()
                                    .map(user -> new UserDTO(user.getUserId(), user.getUsername(), user.getFullname(), user.getEmail(), user.getDateOfBirth(), user.getAddress()))
                                            .toList();
                    response.setSuccess(true);
                    response.setStatusCode(200);
                    response.setDataList(userDTOs);
                }
                else {
                    String userRole = role == Role.LIBRARIAN ? "Librarian" : "Member";
                    response.setSuccess(false);
                    response.setStatusCode(200);
                    response.setMessage("There Are No "+ userRole +".");
                }
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public Response<UserDTO> getUserInfo(Long userId) {
        Response<UserDTO> response = new Response<>();

        try {
            User user = userRepository.findById(userId).orElse(null);

            if (user != null && user.getRole() != Role.ADMIN) {
                UserDTO userDTO = new UserDTO(
                        user.getUserId(),
                        user.getUsername(),
                        user.getFullname(),
                        user.getEmail(),
                        user.getDateOfBirth(),
                        user.getAddress()
                );
                response.setSuccess(true);
                response.setStatusCode(200);
                response.setData(userDTO);
            }
            else if (user == null) {
                response.setSuccess(false);
                response.setStatusCode(404);
                response.setMessage("User Not Found.");
            }
            else if (user.getRole() == Role.ADMIN) {
                response.setSuccess(false);
                response.setStatusCode(400);
                response.setMessage("You Cannot Get Admin Information.");
            }
            else {
                response.setSuccess(false);
                response.setStatusCode(400);
                response.setMessage("Failed To Get Information.");
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public Response<Void> deleteUserAccount(Long userId) {
        Response<Void> response = new Response<>();

        try {
            User user = userRepository.findById(userId).orElse(null);

            if (user != null && user.getRole() != Role.ADMIN) {
                userRepository.delete(user);
                String userRole = user.getRole() == Role.LIBRARIAN ? "Librarian" : "Member";
                response.setSuccess(true);
                response.setStatusCode(200);
                response.setMessage("Delete "+ userRole +" Successfully.");
            }
            else if (user == null) {
                response.setSuccess(false);
                response.setStatusCode(404);
                response.setMessage("User Not Found.");
            }
            else if (user.getRole() == Role.ADMIN) {
                response.setSuccess(false);
                response.setStatusCode(400);
                response.setMessage("You Cannot Delete Admin Account.");
            }
            else {
                response.setSuccess(false);
                response.setStatusCode(400);
                response.setMessage("Failed To Delete Account.");
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }
}
