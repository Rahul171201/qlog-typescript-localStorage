import styles from './Form.module.css';
import Input from './Input/Input';
import lato from '@/data/latoFont';
import { UserContext } from '@/contexts/UserContext';
import { Dispatch, SetStateAction, useContext, useReducer } from 'react';
import Link from 'next/link';
import useLocalStorage from '@/hooks/useLocalStorage';
import ForgotPassword from '@/components/ForgotPassword/ForgotPassword';
import Image from 'next/image';
import useFormStatus from '@/hooks/useFormStatus';
import formReducer from '@/reducers/formReducer';
import useFormSubmit from '@/hooks/useFormSubmit';
import FormStateType from '@/types/FormStateType';
import ActionStateType from '@/types/ActionStateType';
import UserType from '@/types/UserType';
import {
	gql,
	useQuery,
	NetworkStatus,
	useLazyQuery,
	useMutation,
} from "@apollo/client";

const Form = (props: any) => {
  const [users, setUsers] = useLocalStorage('users', new Map());
  const { setUser } = useContext(UserContext);
  const [formState, dispatchForm]: [FormStateType, Dispatch<ActionStateType>] =
    useReducer(formReducer, {
      user: null,
      users: null,
      status: 'idle'
    });

  // form status check,
  useFormStatus(
    formState,
    setUser as Dispatch<SetStateAction<UserType | null>>,
    setUsers
  );

  // submit handler
  const handleSubmit = useFormSubmit(props.type, dispatchForm, users);

  return (
    <div className={`${styles.formWrapper} ${lato.className}`}>
      <div className={styles.header}>{props.name}</div>
      <form
        aria-label="form"
        className={styles.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {props.data.map(
          (
            item: {
              name: string;
              type: string;
              placeholder: string;
              label: string;
              image: string;
            },
            idx: number
          ) => {
            return (
              <Input
                name={item.name}
                label={item.label}
                type={item.type}
                placeholder={item.placeholder}
                key={idx}
                image={item.image}
              ></Input>
            );
          }
        )}
        {props.type === 'login' ? <ForgotPassword></ForgotPassword> : <></>}
        <div className={styles.buttonWrapper}>
          <button
            aria-label="submit"
            type="submit"
            className={styles.submitButton}
          >
            {props.mainButton}
          </button>
        </div>
        <Link
          href={props.type === 'login' ? '/register' : '/login'}
          className={styles.alternateLinkWrapper}
        >
          <span className={styles.alternateLink}>{props.alternateButton}</span>
        </Link>
      </form>

      {formState.status === 'login-pending' ||
      formState.status === 'registration-pending' ? (
        <div aria-label="loading" className={styles.loadingModal}>
          <Image
            src="/images/loading1.png"
            alt="loading-icon"
            width={200}
            height={200}
            className={styles.loadingIcon}
          ></Image>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Form;
