package com.thxran.dropbox.request_response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {
    private String user_id;
    private String token;
}
