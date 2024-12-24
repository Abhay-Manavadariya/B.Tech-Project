package com.example.Project.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;
import java.util.Date;

@Entity
@Table(name = "DeviceFirmware")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class DeviceFirmware {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Uid")
    private String uid;

    @Column(name = "batch")
    private String batch;

    @Column(name = "cmd")
    private String cmd;

    @Column(name = "value")
    private String value;

    @Column(name = "sendTime")
    private Date sendTime;

    @Column(name = "status")
    private String status;

    @CreatedDate
    @Column(name = "CreatedOn", updatable = false)
    private Instant createdOn = Instant.now();

    @Column(name = "action")
    private String action;
}
