package com.example.Project.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "AddWorkerDetails")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AddWorkerDetails {
    @Column(name = "Id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "pumpId")
    private Integer pumpId;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "aadhaarcard")
    private String aadhaarCard;

    @Column(name = "mobileNo")
    private String mobileNo;

    @Column(name = "pinCode")
    private String pinCode;

    @Column(name = "joiningDate")
    private String joiningDate;

    @Column(name = "address")
    private String address;

    @Column(name = "salary")
    private String salary;

    @Column(name = "country")
    private String country;

    @Column(name = "state")
    private String state;

    @Column(name = "city")
    private String city;

    @CreatedDate
    @Column(name = "CreatedOn", updatable = false)
    private Instant createdOn = Instant.now();
}
