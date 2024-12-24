package com.example.Project.Backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import net.bytebuddy.implementation.bind.annotation.Default;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "PumpMaster")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PumpMaster{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name="PumpName")
    private String pumpName;

    @Column(name = "DispenserType")
    private String dispenserType;

    @Column(name = "UnitName")
    private String unitName;

    @Column(name = "NoOfNozzle")
    private Integer noOfNozzle;

    @Column(name = "StorageCapacity")
    private int storageCapacity;

    @Column(name = "CurrentStaticReading")
    private int currentStaticReading;

    @Column(name = "DispenseStop")
    private String dispenseStop;

    @Column(name = "dispensingStatus")
    @ColumnDefault("true")
    private Boolean dispensingStatus = true;

    @CreatedDate
    @Column(name = "CreatedOn", updatable = false)
    private Instant createdOn = Instant.now();

    @Column(name = "LastModifyOnPetrolPump")
    private Date lastModifyOnPetrolPump;

    @Column(name = "CurrentRate")
    private String currentRate;

    @Column(name = "LastModifyInRate")
    private Date lastModifiedInRate;

}
