package com.thxran.dropbox.service;

import com.thxran.dropbox.entity.File;
import com.thxran.dropbox.entity.Folder;
import com.thxran.dropbox.entity.User;
import com.thxran.dropbox.enum_types.FileHandler;
import com.thxran.dropbox.enum_types.FileUpdateType;
import com.thxran.dropbox.repository.FileRepository;
import com.thxran.dropbox.repository.FolderRepository;
import com.thxran.dropbox.repository.UserRepository;
import com.thxran.dropbox.request_response.FileRequest;
import com.thxran.dropbox.request_response.FileResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

import static com.thxran.dropbox.enum_types.FileHandler.*;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FolderRepository folderRepository;
    private final FileRepository fileRepository;
    private final UserRepository userRepository;

    public FileResponse uploadFile(FileRequest request) {
        var file = File.builder()
                .fileName(request.getFileName())
                .fileType(request.getFileType())
                .fileSize(request.getFileSize())
                .fileStoragePath(request.getFileStoragePath())
                .fileURL(request.getFileURL())
                .folderId(request.getFolderId())
                .userId(request.getUserId())
                .build();
        var savedFile = fileRepository.save(file);

        return FileResponse.builder()
                .id(savedFile.getId())
                .fileName(savedFile.getFileName())
                .fileSize(savedFile.getFileSize())
                .fileType(savedFile.getFileType())
                .fileStoragePath(savedFile.getFileStoragePath())
                .fileURL(savedFile.getFileURL())
                .folder(savedFile.getFolderId())
                .user(savedFile.getUserId())
                .isArchived(savedFile.isArchived())
                .isFavorite(savedFile.isFavorite())
                .createdAt(savedFile.getCreatedAt())
                .build();
    }

    public List<File> getAllFiles(String userId) {
        var user = getUserById(userId);
        return fileRepository.findByUserId(user.getId()).orElse(Collections.emptyList());
    }

    public List<File> getFilesByFolder(String folderId) {
        var folder = getFolderById(folderId);
        return fileRepository.findByFolderIdAndIsArchivedFalse(folder.getId()).orElse(Collections.emptyList());
    }

    @SneakyThrows
    public FileResponse updateFile(String fileId, FileUpdateType type, String newname) {
        var file = getFileById(fileId);
        switch (type) {
            case NAME:
                file.setFileName(newname);
                break;
            case ISFAVORITE:
                file.setFavorite(!file.isFavorite());
                break;
            default:
                throw new Exception("Unknown type" + " " + type);
        }
        var savedFile = fileRepository.save(file);
        return FileResponse.builder()
                .id(savedFile.getId())
                .fileName(savedFile.getFileName())
                .isFavorite(savedFile.isFavorite())
                .updatedAt(savedFile.getUpdatedAt())
                .build();
    }

    public List<File> getFavoriteFiles(String userId) {
        var user = getUserById(userId);
        return fileRepository.findByUserIdAndIsFavoriteTrue(user.getId()).orElse(Collections.emptyList());
    }

    public String archiveFile(String fileId) {
        var file = getFileById(fileId);
        handleFilePresents(file, ARCHIVE);
        return file.getFileName() + " " + "archive successfully";
    }

    public List<File> getArchiveFolders(String userId) {
        var user = getUserById(userId);
        return fileRepository.findByUserIdAndIsArchivedTrue(user.getId()).orElse(Collections.emptyList());
    }

    public String un_archiveFile(String fileId) {
        var file = getFileById(fileId);
        handleFilePresents(file, UN_ARCHIVE);
        return file.getFileName() + " " + "un_archive successfull";
    }

    public String deleteFile(String fileId) {
        var file = getFileById(fileId);
        handleFilePresents(file, DELETE);
        return file.getFileName() + " " + "deleted successfully";
    }

    private Folder getFolderById(String folderId){
        return folderRepository.findById(folderId)
                .orElseThrow(() -> new RuntimeException("no such folder found!"));
    }

    private File getFileById(String fileId) {
        return fileRepository.findById(fileId).orElseThrow(
                () -> new RuntimeException("no such file found!")
        );
    }

    private User getUserById(String userId) {
        return userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("no such user found!")
        );
    }

    private void handleFilePresents(File file, FileHandler handle){
        switch (handle){
            case ARCHIVE:
                file.setArchived(true);
                fileRepository.save(file);
                break;
            case UN_ARCHIVE:
                file.setArchived(false);
                fileRepository.save(file);
                break;
            case DELETE:
                fileRepository.delete(file);
                break;
            default:
                throw new RuntimeException("Unknown handle" + handle);
        }
    }
}
