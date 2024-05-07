package com.thxran.dropbox.config;

import com.thxran.dropbox.utils.CUID;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public CUID cuid() {
        return new CUID();
    }
}
