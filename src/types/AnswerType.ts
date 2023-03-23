type AnswerType = {
  id: number;
  ownerId: number;
  ownerName: string;
  content: string;
  qid: number;
  date: Date;
  upvotes: number;
  downvotes: number;
  attachments: string[];
};

export default AnswerType;
