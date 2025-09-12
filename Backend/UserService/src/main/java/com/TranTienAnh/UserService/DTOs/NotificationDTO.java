package com.TranTienAnh.UserService.DTOs;

import jakarta.persistence.Column;

import java.time.LocalDate;

public class NotificationDTO {
    private Long notificationId;

    private String message;

    private boolean read;

    private boolean addBook;

    private LocalDate createAt;

    public NotificationDTO() {
    }

    public NotificationDTO(Long notificationId, String message, boolean read, boolean addBook, LocalDate createAt) {
        this.notificationId = notificationId;
        this.message = message;
        this.read = read;
        this.addBook = addBook;
        this.createAt = createAt;
    }

    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public boolean isAddBook() {
        return addBook;
    }

    public void setAddBook(boolean addBook) {
        this.addBook = addBook;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }
}
