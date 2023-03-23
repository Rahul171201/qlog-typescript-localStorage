import AnswerType from '@/types/AnswerType';
import UserType from '@/types/UserType';

/**
 * Handles downvote on an answer
 * @param user current logged in user
 * @param answer current answer
 * @param users map of users
 * @param answers map of answers
 * @returns void
 */
const handleDownvote = (
  user: UserType,
  answer: AnswerType,
  users: Map<number, UserType>
) => {
  const currentUser: UserType | undefined = users.get(user.userId);

  // if user or answer is not defined return
  if (!currentUser) return;

  // if current user has already upvoted
  if (currentUser.hasUpvoted.includes(answer.id)) {
    answer.downvotes++;
    answer.upvotes--;
    const index = currentUser.hasUpvoted.indexOf(answer.id);
    if (index > -1) currentUser.hasUpvoted.splice(index, 1);
    currentUser.hasDownvoted.push(answer.id);
  }

  // if current user has already downvoted
  else if (currentUser.hasDownvoted.includes(answer.id)) {
    answer.downvotes--;
    const index = currentUser.hasDownvoted.indexOf(answer.id);
    if (index > -1) currentUser.hasDownvoted.splice(index, 1);
  }

  // if current user has neither upvoted nor downvoted
  else {
    answer.downvotes++;
    currentUser.hasDownvoted.push(answer.id);
  }
};

export default handleDownvote;
