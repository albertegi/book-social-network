package com.alvirg.book.config;

import com.alvirg.book.book.Book;
import com.alvirg.book.book.BookRepository;
import com.alvirg.book.role.Role;
import com.alvirg.book.role.RoleRepository;
import com.alvirg.book.user.User;
import com.alvirg.book.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

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

        // Seed a sample book for the first user when no books exist
        if (bookRepository.count() == 0) {
            userRepository.findAll(PageRequest.of(0, 1))
                    .stream()
                    .findFirst()
                    .ifPresent(this::seedBook);
        }
    }

    private void seedBook(User owner) {
        Book book = Book.builder()
                .title("The Great Gatsby")
                .authorName("F. Scott Fitzgerald")
                .isbn("978-0-7432-7356-5")
                .synopsis("A story of decadence and excess in the Jazz Age.")
                .bookCover(null)
                .archived(false)
                .shareable(true)
                .owner(owner)
                .createdDate(LocalDateTime.now())
                .createdBy(owner.getId())
                .build();
        bookRepository.save(book);
        System.out.println("Sample book seeded successfully for user: " + owner.getEmail());
    }
}
