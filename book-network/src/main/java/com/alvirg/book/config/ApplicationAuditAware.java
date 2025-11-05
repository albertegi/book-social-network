package com.alvirg.book.config;

import com.alvirg.book.user.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;

import java.util.Optional;

public class ApplicationAuditAware implements AuditorAware<Integer> {
    @Override
    public Optional<Integer> getCurrentAuditor() {
        // get the currentAuditor
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // check if the user is not authenticated || or we don't know the user yet
        if (authentication == null
        || !authentication.isAuthenticated()
        || authentication instanceof AnonymousAuthenticationToken){
            return Optional.empty();
        }

        // get the user from the principal and cast it to user
        User userPrincipal = (User) authentication.getPrincipal();
        return Optional.ofNullable(userPrincipal.getId());
    }
}
