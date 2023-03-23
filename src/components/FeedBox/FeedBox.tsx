import styles from "./FeedBox.module.css";
import QuestionCard from "./QuestionCard/QuestionCard";
import questionFilter from "@/helper/questionFilter";
import sortQuestionArray from "@/helper/sortQuestionArray";
import lato from "@/data/latoFont";
import { SearchContext } from "@/contexts/SearchContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState, useContext, useMemo, Dispatch, SetStateAction } from "react";
import SkeletonCard from "@/components/FeedBox/SkeletonCard/SkeletonCard";
import QuestionType from "@/types/QuestionType";

const FeedBox = () => {
  const [displayFeed, setDisplayFeed] = useState(false);

  const skeletonLoader = [
    <SkeletonCard key={1}></SkeletonCard>,
    <SkeletonCard key={2}></SkeletonCard>,
  ];

  // search context
  const { searchText } = useContext(SearchContext);

  console.log(searchText);

  const search_words =
    searchText === null ? null : searchText.split(" ");

  const [questions, setQuestions] : [Map<number, QuestionType>, Dispatch<SetStateAction<Map<number, QuestionType>>>] = useLocalStorage("questions", new Map());

  const feedQuestions = useMemo(
    () => sortQuestionArray(questionFilter(questions, search_words)),
    [questions, search_words]
  );

  useEffect(() => {
    // latency introduction in displaying feed data
    setTimeout(() => {
      setDisplayFeed(true);
    }, 3000);
  }, []);

  return (
    <div className={styles.feedBox}>
      {feedQuestions ? (
        feedQuestions.length !== 0 ? (
          displayFeed ? (
            feedQuestions.map((question) => {
              return (
                <QuestionCard
                  key={question.id}
                  q={question}
                ></QuestionCard>
              );
            })
          ) : (
            skeletonLoader.map((item) => item)
          )
        ) : (
          <div className={styles.blankPageWrapper}>
            <span className={`${styles.noresultText} ${lato.className}`}>
              Sorry no results found!
            </span>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default FeedBox;
