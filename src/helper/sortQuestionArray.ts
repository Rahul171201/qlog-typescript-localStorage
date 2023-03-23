import QuestionType from '@/types/QuestionType';

/**
 * Sorts array of questions according to rating
 * @param arr array of questions
 * @returns sorted array of questions according to rating
 */
const sortQuestionArray = (arr: QuestionType[]) => {
  if (!arr) return null;
  let res = arr.sort((a, b) => {
    return b.rating - a.rating;
  });
  return res;
};

export default sortQuestionArray;
