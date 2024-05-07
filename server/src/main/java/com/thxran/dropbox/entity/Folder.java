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
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String name;
    private boolean is_archived = false;

    @OneToMany(mappedBy = "parentFolder", cascade = CascadeType.REMOVE)
    private List<File> files;

    @OneToMany(mappedBy = "parentFolder", cascade = CascadeType.REMOVE)
    private List<Folder> subFolders;

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
