import nonKeyWords from '@/data/nonKeyWords';
import QuestionType from '@/types/QuestionType';

/**
 * Filters the questions into an array of questions containing the
 * search text result matches
 * @param questions map of questions
 * @param search_words array of search strings
 * @returns filtered out questions based on search text
 */
const questionFilter = (
  questions: Map<number, QuestionType>,
  search_words: string[] | null
): QuestionType[] => {
  if (!questions) return [];

  if (search_words === null) return Array.from(questions.values());

  // final array of questions
  const result: QuestionType[] = [];

  for (let key of questions.keys()) {
    let pushed = false; // to track if the question is already filtered out

    const Q = questions.get(key);

    if (!Q) break;

    const titleArray = Q.title.split(' ');
    const descriptionArray = Q.description.split(' ');
    const tagsArray = Q.tags;

    titleArray.forEach((item) => {
      if (search_words.includes(item) && !nonKeyWords.includes(item)) {
        result.push(Q);
        pushed = true;
      }
    });

    if (!pushed) {
      descriptionArray.forEach((item) => {
        if (search_words.includes(item) && !nonKeyWords.includes(item)) {
          result.push(Q);
          pushed = true;
        }
      });
    }

    if (!pushed) {
      tagsArray.forEach((item) => {
        if (search_words.includes(item) && !nonKeyWords.includes(item)) {
          result.push(Q);
          pushed = true;
        }
      });
    }
  }
  return result;
};

export default questionFilter;
