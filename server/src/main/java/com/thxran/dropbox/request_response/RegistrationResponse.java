package com.thxran.dropbox.request_response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegistrationResponse {
    private String username;
    private String email;
}
