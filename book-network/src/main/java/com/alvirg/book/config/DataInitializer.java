package com.alvirg.book.config;

import com.alvirg.book.role.Role;
import com.alvirg.book.role.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create USER role if it doesn't exist
        if (roleRepository.findByName("USER").isEmpty()) {
            Role userRole = Role.builder()
                    .name("USER")
                    .build();
            roleRepository.save(userRole);
            System.out.println("USER role created successfully");
        }

        // Create ADMIN role if it doesn't exist
        if (roleRepository.findByName("ADMIN").isEmpty()) {
            Role adminRole = Role.builder()
                    .name("ADMIN")
                    .build();
            roleRepository.save(adminRole);
            System.out.println("ADMIN role created successfully");
        }
    }
}
