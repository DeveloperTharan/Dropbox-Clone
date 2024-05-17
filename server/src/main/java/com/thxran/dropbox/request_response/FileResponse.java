package com.thxran.dropbox.request_response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FileResponse {
    private String id;
    private String fileName;
    private String fileType;
    private String fileSize;
    private String fileStoragePath;
    private String fileURL;
    private boolean isArchived;
    private boolean isFavorite;
    private String folder;
    private String user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
