package com.thxran.dropbox.repository;

import com.thxran.dropbox.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FileRepository extends JpaRepository<File, String> {
    Optional<List<File>> findByFolderIdAndIsArchivedFalse(String folderId);
    Optional<List<File>> findByUserIdAndIsArchivedTrue(String userId);
    Optional<List<File>> findByFolderId(String folderId);
    Optional<List<File>> findByUserIdAndIsFavoriteTrue(String userId);
    Optional<List<File>> findByUserId(String userId);
}
