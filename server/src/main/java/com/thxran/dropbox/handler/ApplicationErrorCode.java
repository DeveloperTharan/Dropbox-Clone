package com.thxran.dropbox.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
public enum ApplicationErrorCode {
    NO_CODE(0, NOT_IMPLEMENTED, "No code"),
    INCORRECT_PASSWORD(300, BAD_REQUEST, "Incorrect password"),
    NEW_PASSWORD_DOES_NOT_MATCH(301, BAD_REQUEST, "Password does not match"),
    BAD_CREDENTIALS(304, FORBIDDEN, "Bad credentials"),
    ;

    private final int code;
    private final String message;
    private final HttpStatus statusCode;

    ApplicationErrorCode(
            int code,
            HttpStatus statusCode,
            String message) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
