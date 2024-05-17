package com.thxran.dropbox.repository;

import com.thxran.dropbox.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, String> {
    Optional<List<Folder>> findByUserIdAndIsArchivedFalse(String userId);
    Optional<List<Folder>> findByParentFolderId(String id);
    Optional<List<Folder>> findByUserIdAndIsArchivedTrue(String userId);
}
