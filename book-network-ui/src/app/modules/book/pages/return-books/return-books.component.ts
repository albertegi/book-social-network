import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {BookService} from "../../../../services/services/book.service";

@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.scss']
})
export class ReturnBooksComponent implements OnInit{
  returnedBooks: PageResponseBorrowedBookResponse = {};
  page: number = 0;
  size: number = 2;
  message: string = '';
  level: string = 'success';

  constructor(
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedBooks = resp;
      }
    });
  }

  goToFirstPage() {
    this.page--;
    this.findAllReturnedBooks();

  }

  goToPreviousPage() {
    this.page = 0;
    this.findAllReturnedBooks();

  }

  goToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();

  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();

  }

  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number -1;
    this.findAllReturnedBooks();

  }

  get isLastPage():boolean {
    return this.page == this.returnedBooks.totalPages as number - 1;
  }


  approveBookReturn(book: BorrowedBookResponse) {
    if (!book.returned){
      this.level = 'error';
      this.message = 'The book is not yet returned';
      return;
    }
    this.bookService.approveReturnBorrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book return approved';
        this.findAllReturnedBooks();
      },
      error: (err) => {
        this.level = 'error';
        this.message = err.error?.businessErrorDescription
          ?? err.error?.error
          ?? (typeof err.error === 'string' ? err.error : 'Could not approve return');
      }
    });

  }
}
