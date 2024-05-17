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
@Table(name = "files")
@EntityListeners(AuditingEntityListener.class)
public class File {
    @Id
    private String id;
    private String fileName;
    private String fileType;
    private String fileSize;
    private String fileStoragePath;

    @Column(nullable = false)
    private String fileURL;

    private boolean isArchived = false;
    private boolean isFavorite = false;

    @Column(nullable = false)
    private String folderId;

    @Column(nullable = false)
    private String userId;

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