/* tslint:disable */
/* eslint-disable */
/**
 * Matches backend {@code FeedbackRequest}: note (0–5), comment, bookId.
 */
export interface FeedbackRequest {
  note: number;
  comment: string;
  bookId: number;
}
