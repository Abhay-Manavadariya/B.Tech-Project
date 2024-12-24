package com.example.Project.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "AddPetrolNewStock")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AddNewStockOfPetrol {
    @Column(name = "Id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "pumpId")
    private Integer pumpId;

    @Column(name = "remark")
    private String remark;

    @Column(name = "AddNewStockOfPetrolLitre")
    private int addNewStockOfPetrolLitre;

    @Column(name = "OldStockOfPetrolLitre")
    private int oldStockOfPetrolLitre;

    @Column(name = "NewCurrentStockOfPetrolLitre")
    private int newCurrentStockOfPetrolLitre;

    @Column(name = "AddNewStockDate")
    private String addNewStockDate;

    @Column(name = "petrolRate")
    private float petrolRate;

    @CreatedDate
    @Column(name = "CreatedOn", updatable = false)
    private Instant createdOn = Instant.now();
}
