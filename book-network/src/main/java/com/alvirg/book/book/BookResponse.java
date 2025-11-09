package com.alvirg.book.book;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {
    private Integer id;
    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String owner;
    private byte[] cover;
    private double rate; // average of all the feedbacks that were given to a specific book multiplied by the number of feedbacks. if we have 5 feedbacks and all of them are five stars --> 5*5/5
    private boolean archived;
    private boolean shareable;
}
