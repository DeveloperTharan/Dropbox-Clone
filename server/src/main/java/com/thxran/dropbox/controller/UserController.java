package com.thxran.dropbox.controller;

import com.thxran.dropbox.request_response.UserUpdateRequest;
import com.thxran.dropbox.request_response.UserUpdateResponse;
import com.thxran.dropbox.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam String id) {
        service.deleteUser(id);
        return ResponseEntity.accepted().body("User deleted.");
    }

    @PatchMapping("/update")
    public ResponseEntity<UserUpdateResponse> updateUser(
            @RequestParam String id,
            @RequestBody UserUpdateRequest request
    ) {
        return ResponseEntity.ok().body(service.update(id, request));
    }
}
