import { SyntheticEvent } from 'react';
import AnswerType from './AnswerType';
import QuestionType from './QuestionType';
import UserType from './UserType';

type ActionStateType = {
  type?: string;
  action?: Function;
  event?: SyntheticEvent;
  fields?: HTMLCollectionOf<HTMLElement> | HTMLElement[] | JSX.Element[];
  payload?:
    | Map<number, UserType>
    | Map<number, QuestionType>
    | Map<number, AnswerType>;
};

export default ActionStateType;
