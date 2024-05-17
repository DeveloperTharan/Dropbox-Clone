package com.thxran.dropbox.service;

import com.thxran.dropbox.entity.Folder;
import com.thxran.dropbox.entity.User;
import com.thxran.dropbox.repository.FileRepository;
import com.thxran.dropbox.repository.FolderRepository;
import com.thxran.dropbox.repository.UserRepository;
import com.thxran.dropbox.request_response.FolderRequest;
import com.thxran.dropbox.request_response.FolderResponse;
import com.thxran.dropbox.enum_types.FolderTreeHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

import static com.thxran.dropbox.enum_types.FolderTreeHandler.*;

@Service
@RequiredArgsConstructor
public class FolderService {
    private final UserRepository userRepository;
    private final FolderRepository folderRepository;
    private final FileRepository fileRepository;

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
        return folderRepository.findByUserIdAndIsArchivedFalse(user.getId()).orElseThrow(
                () -> new RuntimeException("Folders not found")
        );
    }

    public Folder getFolderById(String folderId){
        return folderRepository.findById(folderId)
                .orElseThrow(() -> new RuntimeException("no such folder found!"));
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

    public String archiveFolder(String folderId) {
        var folder = getFolderById(folderId);
        handleFolderTree(folder, ARCHIVE);
        folder.setArchived(true);
        folderRepository.save(folder);
        return folder.getName() + " " + "archived successfully";
    }

    public List<Folder> getArchiveFolder(String userId) {
        var user = getUserById(userId);
        return folderRepository.findByUserIdAndIsArchivedTrue(user.getId()).orElseThrow(
                () -> new RuntimeException("Folders not found")
        );
    }

    public String un_archiveFolder(String folderId) {
        var folder = getFolderById(folderId);
        handleFolderTree(folder, UN_ARCHIVE);
        folder.setArchived(false);
        folderRepository.save(folder);
        return folder.getName() + " " + "archived successfully";
    }

    public String deleteFolder(String folderId) {
        var folder = getFolderById(folderId);

        handleFolderTree(folder, DELETE);

        var file = fileRepository.findByFolderId(folderId).orElse(Collections.emptyList());
        fileRepository.deleteAll(file);

        folderRepository.delete(folder);
        return folder.getName() + " " + "deleted successfully";
    }

    private User getUserById(String userId){
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private void handleFolderTree(Folder folder, FolderTreeHandler handler){
        List<Folder> subfolders = folderRepository.findByParentFolderId(folder.getId()).orElseThrow(
                () -> new RuntimeException("No subfolder found")
        );

        for(var subfolder: subfolders){
            switch (handler){
                case ARCHIVE:
                    handleFolderTree(subfolder, handler);
                    subfolder.setArchived(true);
                    folderRepository.save(subfolder);
                    break;

                case UN_ARCHIVE:
                    handleFolderTree(subfolder, handler);
                    subfolder.setArchived(false);
                    folderRepository.save(subfolder);
                    break;

                case DELETE:
                    var file = fileRepository.findByFolderId(subfolder.getId()).orElse(Collections.emptyList());
                    fileRepository.deleteAll(file);
                    handleFolderTree(subfolder, handler);
                    folderRepository.delete(subfolder);
                    break;

                default:
                    throw new RuntimeException("Unknown handler " + handler);
            }
        }
    }
}
