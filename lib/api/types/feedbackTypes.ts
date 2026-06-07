export interface Feedback {
  _id: string;
  rate: number;
  description: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackResponse {
  page: number;
  perPage: number;
  totalFeedbacks: number;
  totalPages: number;
  hasMore: boolean;
  data: Feedback[];
}

export interface FeedbackQuery {
  page?: number;
  perPage?: number;
}
