import Navbar from "@/components/Navbar/Navbar";
import styles from "./Question.module.css";
import Image from "next/image";
import AnswerCard from "@/components/AnswerCard/AnswerCard";
import lato from "@/data/latoFont";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { SearchContext } from "@/contexts/SearchContext";
import Router from "next/router";
import sortAnswerArray from "@/helper/sortAnswerArray";
import useLocalStorage from "@/hooks/useLocalStorage";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import handleRating from "@/helper/handleRating";
import AnswerType from "@/types/AnswerType";
import QuestionType from "@/types/QuestionType";

const Question = ({ qId }: { qId: number }) => {
	// user context
	const { user } = useContext(UserContext);
	// search context
	const { setSearchText } = useContext(SearchContext);

	const [questions, setQuestions] = useLocalStorage("questions", new Map());
	const [users, setUsers] = useLocalStorage("users", new Map());
	const [answers, setAnswers] = useLocalStorage("answers", new Map());

	// current question
	const question = questions.get(+qId) as QuestionType;

	const answerArray: AnswerType[] = [];
	question.answers.forEach((id: number) => {
		answerArray.push(answers.get(id));
	});
	const ans : AnswerType[] = sortAnswerArray(answerArray);

	const [answerGiven, setAnswerGiven] = useState<boolean>(false);
	const [questionAsked, setQuestionAsked] = useState<boolean>(false);

	// state for className for rating icon component
	const [className, setClassName] = useState<string>("starIcon");

	useEffect(() => {
		if (user) {
			user.answered.forEach((aId: number) => {
				if (question.answers.includes(aId)) {
					setAnswerGiven(true);
				}
			});
			if (question.ownerId === user.userId) {
				setQuestionAsked(true);
			}
		}
	}, [question.answers, question.ownerId, user]);

	const handleTagSubmit = (e: SyntheticEvent) => {
		const textContent = e.currentTarget.textContent;
		if (textContent) {
			const tagData = textContent.substr(1, textContent.length);
			if (setSearchText) {
				setSearchText(tagData);
				Router.push("/feed");
			} else {
				throw new Error(
					"Invocation failed: setSearchText is either null | undefined"
				);
			}
		} else {
			throw new Error("Undefined text content in TagDivElement");
		}
	};

	return (
		<main className={styles.main}>
			<Navbar></Navbar>
			<div className={`${styles.contentWrapper} ${lato.className}`}>
				<div className={styles.questionBox}>
					<div className={styles.questionWrapper}>
						<div className={styles.questionTitle}>{question.title}</div>
						<div id="description" className={styles.questionDescription}>
							{question.description}
							{question.attachments.map((attachment: string, index: number) => {
								return (
									<ImageComponent src={attachment} key={index}></ImageComponent>
								);
							})}
						</div>
						<div className={styles.tagBox}>
							{question.tags.map((tag: string, idx: number) => {
								return (
									<div
										onClick={handleTagSubmit}
										className={styles.tag}
										key={idx}
									>
										#{tag}
									</div>
								);
							})}
						</div>
						<div className={styles.bottomBar}>
							{answerGiven || questionAsked ? (
								<></>
							) : (
								<div className={styles.answerButtonWrapper}>
									<Link
										href={"/ans/" + question.id + "/add_answer"}
										className={styles.answerButton}
									>
										Add Answer
									</Link>
								</div>
							)}
						</div>
					</div>

					<div className={styles.questionSideBox}>
						<div
							className={styles.ratingWrapper}
							onClick={() => {
								if (user) {
									if (className === "starIcon") setClassName("rotateStarIcon");
									else setClassName("starIcon");
									handleRating(user, users, question);
									setQuestions(new Map(Array.from(questions.entries())));
									setUsers(new Map(Array.from(users.entries())));
								} else {
									throw new Error("Unauthorized access : User is not defined");
								}
							}}
						>
							<div className={styles.iconWrapper}>
								<Image
									src="/images/star.png"
									alt="rating-icon"
									width={50}
									height={50}
									className={className}
									id="icon"
								></Image>
							</div>
							<div className={styles.tempWrapper}>
								<span className={styles.rating}>{question.rating}</span>
							</div>
						</div>
						<div className={styles.infoWrapper}>
							<span>{question.ownerName}</span>
							<span>1 day ago</span>
						</div>
					</div>
				</div>

				<div className={styles.answersBox}>
					{ans.map((a, idx) => {
						return <AnswerCard key={idx} answer={a} id={a.id} users={users} answers={answers} setUsers={setUsers} setAnswers={setAnswers}></AnswerCard>;
					})}
				</div>
			</div>
		</main>
	);
};

export async function getServerSideProps({ params }: { params: any }) {
	return {
		props: {
			qId: params.id,
		},
	};
}

export default Question;
