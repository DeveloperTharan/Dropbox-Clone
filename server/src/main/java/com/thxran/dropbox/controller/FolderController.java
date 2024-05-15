package com.thxran.dropbox.controller;

import com.thxran.dropbox.entity.Folder;
import com.thxran.dropbox.request_response.FolderRequest;
import com.thxran.dropbox.request_response.FolderResponse;
import com.thxran.dropbox.service.FolderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/folder")
@RequiredArgsConstructor
public class FolderController {
    private final FolderService service;

    @PostMapping("/create")
    public ResponseEntity<FolderResponse> createFolder(@RequestBody FolderRequest request) {
        return ResponseEntity.accepted().body(service.createFolder(request));
    }

    @GetMapping("/get")
    public ResponseEntity<List<Folder>> getFolders(@RequestParam("userId") String userId) {
        return ResponseEntity.ok().body(service.getFolderByUser(userId));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Folder> getFolder(@PathVariable("id") String id) {
        return ResponseEntity.ok().body(service.getFolderById(id));
    }

    @PatchMapping("/update")
    public ResponseEntity<FolderResponse> updateFolder(
            @RequestParam("folderId") String folderId,
            @RequestBody String newName
    ){
        return ResponseEntity.ok().body(service.updateFolder(folderId, newName));
    }

    @PatchMapping("/archive")
    public ResponseEntity<String> archiveFolder(@RequestParam("folderId") String folderId){
        return ResponseEntity.ok().body(service.archiveFolder(folderId));
    }

    @GetMapping("/archive_folders")
    public ResponseEntity<List<Folder>> getArchiveFolders(@RequestParam("userId") String userId){
        return ResponseEntity.ok().body(service.getArchiveFolder(userId));
    }

    @PatchMapping("/un_archive")
    public ResponseEntity<String> un_archiveFolder(@RequestParam("folderId") String folderId){
        return ResponseEntity.ok().body(service.un_archiveFolder(folderId));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFolder(@RequestParam("folderId") String folderId){
        return ResponseEntity.ok().body(service.deleteFolder(folderId));
    }
}
