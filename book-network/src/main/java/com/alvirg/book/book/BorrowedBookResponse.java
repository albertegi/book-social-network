package com.alvirg.book.book;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BorrowedBookResponse {

    private Integer id;
    private String title;
    private String authorName;
    private String isbn;
    private double rate; // average of all the feedbacks that were given to a specific book multiplied by the number of feedbacks. if we have 5 feedbacks and all of them are five stars --> 5*5/5
    private boolean returned;
    private boolean returnedApproved;
}
