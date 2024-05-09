package com.thxran.dropbox.service;

import com.thxran.dropbox.entity.File;
import com.thxran.dropbox.entity.Folder;
import com.thxran.dropbox.enum_types.FileHandler;
import com.thxran.dropbox.enum_types.FileUpdateType;
import com.thxran.dropbox.repository.FileRepository;
import com.thxran.dropbox.repository.FolderRepository;
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

    public FileResponse uplodeFile(FileRequest request) {
        var file = File.builder()
                .fileName(request.getFileName())
                .fileType(request.getFileType())
                .fileSize(request.getFileSize())
                .fileURL(request.getFileURL())
                .folderId(request.getFolderId())
                .build();
        var savedFile = fileRepository.save(file);

        return FileResponse.builder()
                .id(savedFile.getId())
                .fileName(savedFile.getFileName())
                .fileSize(savedFile.getFileSize())
                .fileType(savedFile.getFileType())
                .fileURL(savedFile.getFileURL())
                .folder(savedFile.getFolderId())
                .isArchived(savedFile.isArchived())
                .isFavorite(savedFile.isFavorite())
                .createdAt(savedFile.getCreatedAt())
                .build();
    }

    public List<File> getFilesByFolder(String folderId) {
        var folder = getFolderById(folderId);
        return fileRepository.findByFolderId(folder.getId()).orElse(Collections.emptyList());
    }

    @SneakyThrows
    public FileResponse updateFile(String fileId, FileUpdateType type, String newname) {
        var file = getFileById(fileId);
        switch (type) {
            case NAME:
                file.setFileName(newname);
                break;
            case ISFAVORITE:
                file.setFavorite(true);
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

    public String archiveFile(String fileId) {
        var file = getFileById(fileId);
        handleFilePresents(file, ARCHIVE);
        return file.getFileName() + " " + "archive successfully";
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

    private void handleFilePresents(File file, FileHandler handle){
        switch (handle){
            case ARCHIVE:
                file.setArchived(true);
                break;
            case UN_ARCHIVE:
                file.setArchived(false);
                break;
            case DELETE:
                fileRepository.delete(file);
                break;
            default:
                throw new RuntimeException("Unknown handle" + handle);
        }
        fileRepository.save(file);
    }
}
