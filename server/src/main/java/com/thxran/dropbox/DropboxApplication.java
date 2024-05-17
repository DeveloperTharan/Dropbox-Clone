package com.thxran.dropbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DropboxApplication {

    public static void main(String[] args) {
        SpringApplication.run(DropboxApplication.class, args);
    }

}
