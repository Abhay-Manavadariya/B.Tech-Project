package com.example.Project.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "DeviceRawData")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class DeviceRawData {
    @Column(name = "Id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "Uid")
    private Long uid;

    @Column(name = "Request_Params")
    private String requestParams;

    @Column(name = "Response_Params")
    private String responseParams;

    @Column(name = "Msg_Id")
    private String msgId;

    @Column(name = "Address")
    private String address;

    @Column(name = "Entry_Point")
    private String entryPoint;

    @Column(name = "CreateDate")
    private String createDate;

    @Column(name = "Last_Update_Date")
    private String lastUpdateDate;

    @Column(name = "CreatedBy")
    private String createdBy;

    @Column(name = "Last_Updated_By")
    private String lastUpdatedBy;

    @Column(name = "Requested_Date")
    private String requestedDate;

}