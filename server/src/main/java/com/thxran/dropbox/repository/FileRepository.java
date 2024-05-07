package com.thxran.dropbox.repository;

import com.thxran.dropbox.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, String> {}
