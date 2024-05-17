package com.thxran.dropbox.service;

import com.thxran.dropbox.entity.User;
import com.thxran.dropbox.jwt.JwtService;
import com.thxran.dropbox.repository.UserRepository;
import com.thxran.dropbox.request_response.AuthenticationRequest;
import com.thxran.dropbox.request_response.AuthenticationResponse;
import com.thxran.dropbox.request_response.RegistrationRequest;
import com.thxran.dropbox.request_response.RegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public RegistrationResponse signup(RegistrationRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        var savedUser = userRepository.save(user);

        return RegistrationResponse.builder()
                .username(savedUser.getName())
                .email(savedUser.getEmail())
                .build();
    }

    public AuthenticationResponse signin(AuthenticationRequest request) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        var claims = new HashMap<String, Object>();
        var user = (User) authentication.getPrincipal();

        claims.put("username", user.getName());
        claims.put("image_url", user.getImage_url() != null ? user.getImage_url() : "");

        var jwtToken = jwtService.generateToken(claims, user);

        return AuthenticationResponse.builder()
                .user_id(user.getId())
                .token(jwtToken).build();
    }
}
