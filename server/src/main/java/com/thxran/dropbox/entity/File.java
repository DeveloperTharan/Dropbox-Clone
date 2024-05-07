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
    private String file_name;
    private String file_type;
    private String file_size;

    @Column(nullable = false)
    private String file_url;

    private boolean is_archived = false;
    private boolean is_favorite = false;

    @ManyToOne
    @JoinColumn(name = "parent_folder_id")
    private Folder parentFolder;

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