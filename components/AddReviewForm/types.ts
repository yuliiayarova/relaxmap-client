export interface AddReviewFormProps {
  locationId: string;
  onClose: () => void;
}

export interface AddReviewValues {
  rate: number;
  description: string;
}
