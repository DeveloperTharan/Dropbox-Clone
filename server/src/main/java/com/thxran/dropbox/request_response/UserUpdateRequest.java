package com.thxran.dropbox.request_response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserUpdateRequest {
    private String username;
    private String image_url;
}
