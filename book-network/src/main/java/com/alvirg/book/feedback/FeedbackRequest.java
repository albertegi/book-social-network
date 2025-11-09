package com.alvirg.book.feedback;

import jakarta.validation.constraints.*;
import org.springframework.lang.NonNull;

public record FeedbackRequest(

        @Positive(message = "200")
        @Min(value = 0, message = "201")
        @Max(value = 5, message = "202")
        Double note, // 1 - 5 stars

        @NotNull(message = "203")
        @NotEmpty(message = "203")
        @NotBlank(message = "203")
        String comment,

        @NotNull(message = "204")
        Integer bookId
) {
}
