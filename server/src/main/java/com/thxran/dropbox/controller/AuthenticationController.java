package com.thxran.dropbox.controller;

import com.thxran.dropbox.request_response.AuthenticationRequest;
import com.thxran.dropbox.request_response.AuthenticationResponse;
import com.thxran.dropbox.request_response.RegistrationRequest;
import com.thxran.dropbox.request_response.RegistrationResponse;
import com.thxran.dropbox.service.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "authentication")
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<RegistrationResponse> signup(@RequestBody RegistrationRequest request){
        return ResponseEntity.accepted().body(service.signup(request));
    }

    @PostMapping("/sign-in")
    public ResponseEntity<AuthenticationResponse> signin(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok().body(service.signin(request));
    }
}
