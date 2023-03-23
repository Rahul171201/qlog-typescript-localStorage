import QuestionType from '@/types/QuestionType';
import UserType from '@/types/UserType';

/**
 * Increases or decreases the rating of a question
 * on user interaction
 * @param user current logged in user
 * @param users map of users
 * @param question current question
 * @returns void
 */
const handleRating = (
  user: UserType,
  users: Map<number, UserType>,
  question: QuestionType
) => {
  const currentUser: UserType | undefined = users.get(user.userId);

  if (!currentUser) throw new Error(`No user found with id : ${user.userId}`);

  if (currentUser.hasRated.includes(question.id)) {
    question.rating--;
    const index = currentUser.hasRated.indexOf(question.id);
    if (index > -1) currentUser.hasRated.splice(index, 1);
  } else {
    currentUser.hasRated.push(question.id);
    question.rating++;
  }
};

export default handleRating;
