export interface Feedback {
  _id: string;
  rate: number;
  description: string;
  userName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeedbackResponse {
  page: number;
  perPage: number;
  totalFeedbacks: number;
  totalPages: number;
  hasMore: boolean;
  data: Feedback[];
}

export interface PageQuery {
  page?: number;
  perPage?: number;
}

export type FeedbacksForLocationResponse = Omit<FeedbackResponse, 'hasMore'>;

export interface CreateFeedbackBody {
  rate: number;
  description: string;
}

export interface CreateFeedbackResponse {
  status: number;
  message: string;
  data: Feedback;
}
