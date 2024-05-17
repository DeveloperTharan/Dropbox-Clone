package com.thxran.dropbox.request_response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UserResponse {
    private String id;
    private String name;
    private String email;
    private String image_url;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
