package com.thxran.dropbox.service;

import com.thxran.dropbox.repository.UserRepository;
import com.thxran.dropbox.request_response.UserUpdateRequest;
import com.thxran.dropbox.request_response.UserUpdateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public void deleteUser(String id) {
        var user = repository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found")
        );
        repository.delete(user);
    }

    public UserUpdateResponse update(String id, UserUpdateRequest request) {
        var user = repository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found")
        );

        user.setUsername(request.getUsername() != null ? request.getUsername() : user.getName());
        user.setImage_url(request.getImage_url() != null ? request.getImage_url() : user.getImage_url());

        repository.save(user);

        return UserUpdateResponse.builder()
                .userid(user.getId())
                .updated_username(user.getName())
                .updated_image_url(user.getImage_url())
                .build();
    }
}
