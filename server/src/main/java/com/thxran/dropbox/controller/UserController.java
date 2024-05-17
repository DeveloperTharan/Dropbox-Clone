package com.thxran.dropbox.controller;

import com.thxran.dropbox.entity.User;
import com.thxran.dropbox.request_response.UserResponse;
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

    @GetMapping("/get")
    public ResponseEntity<UserResponse> getUser(@RequestParam("id") String id) {
        return ResponseEntity.ok().body(service.getUserById(id));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam("id") String id) {
        service.deleteUser(id);
        return ResponseEntity.accepted().body("User deleted.");
    }

    @PatchMapping("/update")
    public ResponseEntity<UserUpdateResponse> updateUser(
            @RequestParam("id") String id,
            @RequestBody UserUpdateRequest request
    ) {
        return ResponseEntity.ok().body(service.update(id, request));
    }
}
