import AnswerType from '@/types/AnswerType';
import UserType from '@/types/UserType';

const handleUpvote = (
  user: UserType,
  answer: AnswerType,
  users: Map<number, UserType>
) => {
  const currentUser: UserType | undefined = users.get(user.userId);

  if (!currentUser) {
    return;
  }

  if (currentUser.hasDownvoted.includes(answer.id)) {
    answer.downvotes--;
    answer.upvotes++;
    const index = currentUser.hasDownvoted.indexOf(answer.id);
    if (index > -1) currentUser.hasDownvoted.splice(index, 1);
    currentUser.hasUpvoted.push(answer.id);
  } else if (currentUser.hasUpvoted.includes(answer.id)) {
    answer.upvotes--;
    const index = currentUser.hasUpvoted.indexOf(answer.id);
    if (index > -1) currentUser.hasUpvoted.splice(index, 1);
  } else {
    answer.upvotes++;
    currentUser.hasUpvoted.push(answer.id);
  }
};

export default handleUpvote;
