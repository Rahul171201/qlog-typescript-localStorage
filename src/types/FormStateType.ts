import { SyntheticEvent } from 'react';
import AnswerType from './AnswerType';
import QuestionType from './QuestionType';
import UserType from './UserType';

type FormStateType = {
  user?: UserType | null;
  users?: Map<number, UserType> | null;
  status?: string;
  type?: string;
  action?: Function;
  event?: SyntheticEvent;
  payload?:
    | Map<number, UserType>
    | Map<number, QuestionType>
    | Map<number, AnswerType>;
};

export default FormStateType;
