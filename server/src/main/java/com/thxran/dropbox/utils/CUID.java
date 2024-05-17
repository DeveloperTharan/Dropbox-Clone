package com.thxran.dropbox.utils;

import java.security.SecureRandom;
import java.time.Instant;

public class CUID {
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    public static String generateCUID() {
        StringBuilder sb = new StringBuilder();

        sb.append(Long.toString(Instant.now().toEpochMilli(), 36));

        for (int i = 0; i < 4; i++) {
            sb.append(Integer.toString(SECURE_RANDOM.nextInt(36), 36));
        }

        sb.append(Long.toString(System.nanoTime(), 36));

        return sb.toString();
    }
}
