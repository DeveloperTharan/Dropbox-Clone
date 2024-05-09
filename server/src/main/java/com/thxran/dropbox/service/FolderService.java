package com.thxran.dropbox.service;

import com.thxran.dropbox.entity.Folder;
import com.thxran.dropbox.entity.User;
import com.thxran.dropbox.repository.FolderRepository;
import com.thxran.dropbox.repository.UserRepository;
import com.thxran.dropbox.request_response.FolderRequest;
import com.thxran.dropbox.request_response.FolderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FolderService {
    private final UserRepository userRepository;
    private final FolderRepository folderRepository;

    public FolderResponse createFolder(FolderRequest request) {
        var folder = Folder.builder()
                .name(request.getFolder_name())
                .parentFolderId(request.getParentfolder_id())
                .userId(request.getUser_id())
                .build();

        var savedFolder = folderRepository.save(folder);

        return FolderResponse.builder()
                .user_id(savedFolder.getUserId())
                .folder_id(savedFolder.getId())
                .folder_name(savedFolder.getName())
                .parent_id(savedFolder.getParentFolderId())
                .created_at(savedFolder.getCreatedAt())
                .build();
    }

    public List<Folder> getFolderByUser(String userId) {
        User user = getUserById(userId);
        return folderRepository.findByUserId(user.getId()).orElse(Collections.emptyList());
    }

    public FolderResponse updateFolder(String folderId, String newName) {
        var folder = getFolderById(folderId);
        folder.setName(newName);
        var savedFolder = folderRepository.save(folder);
        return FolderResponse.builder()
                .user_id(savedFolder.getUserId())
                .folder_id(savedFolder.getId())
                .folder_name(savedFolder.getName())
                .parent_id(savedFolder.getParentFolderId())
                .created_at(savedFolder.getCreatedAt())
                .build();
    }

    public String deleteFolder(String folderId) {
        var folder = getFolderById(folderId);
        deleteFolderTree(folder);
        folderRepository.delete(folder);
        return folder.getName() + " " + "Deleted successfully";
    }

    public Folder getFolderById(String folderId){
        return folderRepository.findById(folderId)
                .orElseThrow(() -> new RuntimeException("Parent folder not found"));
    }

    private User getUserById(String userId){
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private void deleteFolderTree(Folder folder) {
        List<Folder> subfolders = folderRepository.findByParentFolderId(folder.getId()).orElseThrow(
                () -> new RuntimeException("No subfolder found")
        );

        for(var subfolder: subfolders){
            deleteFolderTree(subfolder);
            folderRepository.delete(subfolder);
        }
    }
}
