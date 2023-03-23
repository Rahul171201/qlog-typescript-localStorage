import { Dispatch, SetStateAction, useEffect } from 'react';
import Router from 'next/router';
import FormStateType from '@/types/FormStateType';
import UserType from '@/types/UserType';

const useFormStatus = (
  formState: FormStateType,
  setUser: Dispatch<SetStateAction<UserType | null>>,
  setUsers: Dispatch<SetStateAction<Map<number, UserType>>>
) => {
  useEffect(() => {
    if (formState.status === 'idle') {
      // console.log("idle state : form is idle");
    } else if (
      formState.status === 'login-pending' ||
      formState.status === 'registration-pending'
    ) {
      // console.log("pending state : authentication is pending");
    } else if (formState.status === 'successful-login') {
      if (formState.user) setUser(formState.user);
      Router.push('/feed');
    } else if (formState.status === 'login-failed') {
      alert('Wrong username or password');
    } else if (formState.status === 'successful-registration') {
      const users = formState.users;
      if (users) setUsers(() => new Map(Array.from(users.entries())));
      Router.push('/login');
    } else if (formState.status === 'registration-failed') {
      alert('Confirm password must match password field');
    } else {
      if (formState.status)
        throw new Error(
          `Unrecognized status in form-state : ${formState.status}`
        );
      else throw new Error(`'status' not defined in form-state`);
    }
  }, [formState.status, formState.user, formState.users, setUser, setUsers]);
};

export default useFormStatus;
