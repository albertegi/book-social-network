import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {BookService} from "../../../../services/services/book.service";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrls: ['./borrowed-book-list.component.scss']
})
export class BorrowedBookListComponent implements OnInit{

  borrowedBooks: PageResponseBorrowedBookResponse = {};
  feedbackRequest: FeedbackRequest = { note: 0, comment: '', bookId: 0 };
  page: number = 0;
  size: number = 2;
  selectedBook: BorrowedBookResponse | undefined = undefined;
  feedbackErrorMsg: Array<string> = [];

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ) {
  }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }


  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size

    }).subscribe({
      next: (resp) => {
        this.borrowedBooks = resp;
      }
    });
  }

  goToFirstPage() {
    this.page--;
    this.findAllBorrowedBooks();

  }

  goToPreviousPage() {
    this.page = 0;
    this.findAllBorrowedBooks();

  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();

  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();

  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number -1;
    this.findAllBorrowedBooks();

  }

  get isLastPage():boolean {
    return this.page == this.borrowedBooks.totalPages as number - 1;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: () => {
       if (withFeedback){
         this.giveFeedback();
       }
       this.selectedBook = undefined;
       this.findAllBorrowedBooks();
      }
    });

  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    })
  }
}
