package com.thxran.dropbox.request_response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FolderResponse {
    private String user_id;
    private String folder_id;
    private String folder_name;
    private String parent_id;
    private LocalDateTime created_at;
}
