import { UserContext } from "@/contexts/UserContext";
import { Dispatch, memo, SetStateAction, useContext } from "react";
import ImageComponent from "../ImageComponent/ImageComponent";
import styles from "./AnswerCard.module.css";
import handleUpvote from "@/helper/handleUpvote";
import handleDownvote from "@/helper/handleDownVote";
import AnswerType from "@/types/AnswerType";
import UserType from "@/types/UserType";

// Answer Card component
const AnswerCard = ({
	answer,
	id,
	users,
	answers,
	setUsers,
	setAnswers,
}: {
	answer: AnswerType;
	id: number;
	users: Map<number, UserType>;
	answers: Map<number, AnswerType>;
	setUsers: Dispatch<SetStateAction<Map<number, UserType>>>;
	setAnswers: Dispatch<SetStateAction<Map<number, AnswerType>>>;
}) => {
	//user context
	const { user, setUser } = useContext(UserContext);

	return (
		<div className={styles.answerWrapper}>
			<div className={styles.leftBox}>
				<div
					className={styles.upVote}
					onClick={() => {
						if (user) {
							handleUpvote(user, answer, users);
							setUsers(new Map(Array.from(users.entries())));
							setAnswers(new Map(Array.from(answers.entries())));
						}
					}}
				>
					<span className={styles.upvoteCount}>{answer.upvotes}</span>
				</div>
				<div
					className={styles.downVote}
					onClick={() => {
						if (user) {
							handleDownvote(user, answer, users);
							setUsers(new Map(Array.from(users.entries())));
							setAnswers(new Map(Array.from(answers.entries())));
						}
					}}
				>
					<span className={styles.downvoteCount}>{answer.downvotes}</span>
				</div>
			</div>
			<div className={styles.rightBox}>
				<div className={styles.header}>
					<span>{answer.ownerName}</span>
					<span>2 days ago</span>
				</div>
				<hr className={styles.horizontalRule}></hr>
				<div className={styles.content} id={"content" + id}>
					{answer.content}
					{answer.attachments.map((attachment, index) => {
						return (
							<ImageComponent src={attachment} key={index}></ImageComponent>
						);
					})}
				</div>
			</div>
			<div className={styles.bookmarkDesign}></div>
		</div>
	);
};

export default memo(AnswerCard);
