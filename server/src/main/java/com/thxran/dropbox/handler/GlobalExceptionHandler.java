package com.thxran.dropbox.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.security.authentication.BadCredentialsException;

import java.util.HashSet;
import java.util.Set;

import static com.thxran.dropbox.handler.ApplicationErrorCode.*;
import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException(){
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(ExceptionResponse
                        .builder()
                        .applicationErrorCode(BAD_CREDENTIALS.getCode())
                        .applicationErrorMsg(BAD_CREDENTIALS.getMessage())
                        .error(BAD_CREDENTIALS.getMessage())
                        .build()
                );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException e){
        Set<String> errors = new HashSet<>();

        e.getBindingResult().getAllErrors()
                .forEach((error) -> {
                    var errorMessage = error.getDefaultMessage();
                    errors.add(errorMessage);
                });
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(ExceptionResponse
                        .builder()
                        .validationErrors(errors)
                        .build()
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception e){
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(ExceptionResponse
                        .builder()
                        .applicationErrorMsg("Internal Server Error")
                        .error(e.getMessage())
                        .build()
                );
    }
}