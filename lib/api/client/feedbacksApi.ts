import { forwardBackend, nextServer } from '../api';
import {
  CreateFeedbackBody,
  CreateFeedbackResponse,
  FeedbackResponse,
  FeedbacksForLocationResponse,
  PageQuery,
} from '../types/feedbackTypes';

export async function getFeedbacks(
  query: PageQuery,
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

export async function getFeedbacksByLocationId(
  locationId: string,
  query: PageQuery,
): Promise<FeedbacksForLocationResponse> {
  const cleanedQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  );

  const res = await forwardBackend.get<FeedbacksForLocationResponse>(
    `/feedbacks/${locationId}`,
    {
      params: cleanedQuery,
    },
  );
  return res.data;
}

export async function createFeedback(
  locationId: string,
  feedback: CreateFeedbackBody,
): Promise<CreateFeedbackResponse> {
  const res = await nextServer.post<CreateFeedbackResponse>(
    `/feedbacks/${locationId}`,
    feedback,
  );
  return res.data;
}
