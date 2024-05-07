package com.thxran.dropbox.repository;

import com.thxran.dropbox.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, String> {}
