package com.alvirg.book.history;

import com.alvirg.book.book.Book;
import com.alvirg.book.common.BaseEntity;
import com.alvirg.book.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.security.PrivateKey;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BookTransactionHistory extends BaseEntity {

    // user relationship
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // book relationship
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;


    private boolean returned;
    private boolean returnApproved;


}
