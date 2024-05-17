package com.thxran.dropbox.entity;

import com.thxran.dropbox.utils.CUID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "folders")
@EntityListeners(AuditingEntityListener.class)
public class Folder {
    @Id
    private String id;

    private String userId;

    private String name;
    private boolean isArchived = false;

    private String parentFolderId;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void generateId() {
        if (id == null) {
            id = CUID.generateCUID();
        }
    }
}