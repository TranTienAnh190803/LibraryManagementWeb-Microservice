package com.TranTienAnh.UserService.Models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @Column(nullable = false)
    private String message;

    @Column(name = "is_read", nullable = false)
    private boolean read;

    @Column(nullable = false)
    private boolean addBook;

    @Column(nullable = false)
    private LocalDate createAt;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    public Notification() {
    }

    public Notification(String message, boolean read, boolean addBook, LocalDate createAt, User user) {
        this.message = message;
        this.read = read;
        this.addBook = addBook;
        this.createAt = createAt;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
