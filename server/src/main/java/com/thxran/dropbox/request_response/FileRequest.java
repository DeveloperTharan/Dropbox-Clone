package com.thxran.dropbox.request_response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileRequest {
    @NotBlank(message = "file name missing!")
    @NotEmpty(message = "file name missing!")
    private String fileName;

    @NotBlank(message = "file type missing!")
    @NotEmpty(message = "file type missing!")
    private String fileType;

    @NotBlank(message = "file size missing!")
    @NotEmpty(message = "file size missing!")
    private String fileSize;

    @NotBlank(message = "file size missing!")
    @NotEmpty(message = "file size missing!")
    private String fileStoragePath;

    @NotBlank(message = "file url missing!")
    @NotEmpty(message = "file url missing!")
    private String fileURL;

    @NotBlank(message = "folder missing!")
    @NotEmpty(message = "folder missing!")
    private String folderId;

    @NotBlank(message = "user-id is missing!")
    @NotEmpty(message = "user-id is missing!")
    private String userId;
}
