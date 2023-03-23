import { Dispatch, SetStateAction, SyntheticEvent, useCallback } from 'react';
import handleLogin from '@/helper/handleLogin';
import handleRegister from '@/helper/handleRegister';
import UserType from '@/types/UserType';
import ActionStateType from '@/types/ActionStateType';

const useFormSubmit = (
  formType: string,
  dispatchForm: Dispatch<ActionStateType>,
  users: Map<number, UserType>
) => {
  return useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      const inputFields = e.currentTarget.getElementsByTagName('input');
      if (formType === 'login') {
        dispatchForm({ type: 'start-login' });
        setTimeout(() => {
          dispatchForm({
            type: 'login',
            action: handleLogin,
            fields: inputFields,
            payload: users
          });
        }, 3000);
      } else if (formType === 'register') {
        dispatchForm({ type: 'start-registration' });
        setTimeout(() => {
          dispatchForm({
            type: 'register',
            action: handleRegister,
            fields: inputFields,
            payload: users
          });
        }, 3000);
      } else {
        throw new Error(
          `Invalid form type: Unrecognized form type ${formType}`
        );
      }
    },
    [dispatchForm, formType, users]
  );
};

export default useFormSubmit;
