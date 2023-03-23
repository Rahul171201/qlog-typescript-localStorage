type QuestionType = {
  id: number;
  title: string;
  description: string;
  ownerName: string;
  ownerId: number;
  tags: string[];
  date: Date;
  rating: number;
  answers: number[];
  attachments: string[];
};

export default QuestionType;
