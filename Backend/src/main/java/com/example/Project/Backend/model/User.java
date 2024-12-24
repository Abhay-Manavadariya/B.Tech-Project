package com.example.Project.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;

@Table(name = "userdetails")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Column(name = "Id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Email",unique = true)
    private String email;

    @Column(name = "Password")
    private String password;

    @CreatedDate
    @Column(name = "CreatedOn", updatable = false)
    private Instant createdOn = Instant.now();
}
