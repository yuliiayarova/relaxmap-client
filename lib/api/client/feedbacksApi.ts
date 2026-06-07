import { forwardBackend } from '../api';
import { FeedbackQuery, FeedbackResponse } from '../types/feedbackTypes';

export async function getFeedbacks(
  query: FeedbackQuery,
): Promise<FeedbackResponse> {
  const cleanedQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([, value]) => value !== undefined && value !== null && value !== '', // Перевіряю щоб не записувало пусті параметри
    ),
  );

  const res = await forwardBackend.get<FeedbackResponse>('/feedbacks', {
    params: cleanedQuery,
  });
  return res.data;
}
