package com.thxran.dropbox.controller;

import com.thxran.dropbox.entity.File;
import com.thxran.dropbox.enum_types.FileUpdateType;
import com.thxran.dropbox.request_response.FileRequest;
import com.thxran.dropbox.request_response.FileResponse;
import com.thxran.dropbox.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FileController {
    private final FileService service;

    @PostMapping("/upload")
    public ResponseEntity<FileResponse> uploadFile(@RequestBody FileRequest request){
        return ResponseEntity.accepted().body(service.uploadFile(request));
    }

    @GetMapping("get_all_files")
    public ResponseEntity<List<File>> getAllFiles(@RequestParam("userId") String userId){
        return ResponseEntity.ok().body(service.getAllFiles(userId));
    }

    @GetMapping("/get")
    public ResponseEntity<List<File>> getFilesByFolderId(@RequestParam("folderId") String folderId){
        return ResponseEntity.ok().body(service.getFilesByFolder(folderId));
    }

    @PatchMapping("/update")
    public ResponseEntity<FileResponse> updateFile(
            @RequestParam("fileId") String fileId,
            @RequestParam("type") FileUpdateType type,
            @RequestBody(required = false) String newname
            ){
        return ResponseEntity.ok().body(service.updateFile(fileId, type, newname));
    }

    @GetMapping("/favorite_files")
    public ResponseEntity<List<File>> getFavoriteFiles(@RequestParam("userId") String userId){
        return ResponseEntity.ok().body(service.getFavoriteFiles(userId));
    }

    @PatchMapping("/archive")
    public ResponseEntity<String> archiveFile(@RequestParam("fileId") String fileId){
        return ResponseEntity.ok().body(service.archiveFile(fileId));
    }

    @GetMapping("/archive_files")
    public ResponseEntity<List<File>>  getArchiveFiles(@RequestParam("userId") String userId){
        return ResponseEntity.ok().body(service.getArchiveFolders(userId));
    }

    @PatchMapping("/un_archive")
    public ResponseEntity<String> un_archiveFile(@RequestParam("fileId") String fileId){
        return ResponseEntity.ok().body(service.un_archiveFile(fileId));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFile(@RequestParam("fileId") String fileId){
        return ResponseEntity.ok().body(service.deleteFile(fileId));
    }
}
