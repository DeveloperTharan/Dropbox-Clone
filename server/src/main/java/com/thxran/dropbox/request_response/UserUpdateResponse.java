package com.thxran.dropbox.request_response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserUpdateResponse {
    private String userid;
    private String updated_username;
    private String updated_image_url;
}
