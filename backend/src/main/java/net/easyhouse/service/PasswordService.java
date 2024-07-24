package net.easyhouse.service;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    private Argon2 argon2;

    public PasswordService() {
        this.argon2 = Argon2Factory.create();
    }

    public String hashPassword(String plainPassword) {
        return argon2.hash(4, 1024 * 1024, 8, plainPassword);
    }

    public boolean checkPassword(String plainPassword, String hashedPassword) {
        return argon2.verify(hashedPassword, plainPassword);
    }
}