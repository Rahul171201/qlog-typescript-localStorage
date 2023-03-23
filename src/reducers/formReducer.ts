import ActionStateType from '@/types/ActionStateType';
import FormStateType from '@/types/FormStateType';

const formReducer = <T>(state: T, action: ActionStateType): FormStateType => {
  switch (action.type) {
    case 'start-login': {
      return {
        ...state,
        status: 'login-pending'
      };
    }
    case 'login': {
      if (action.action) {
        const finalUser = action.action(action.payload, action.fields);
        return {
          ...state,
          user: finalUser,
          status: finalUser ? 'successful-login' : 'login-failed'
        };
      } else {
        throw new Error('Login action not defined : Expected a login handler');
      }
    }
    case 'start-registration': {
      return {
        ...state,
        status: 'registration-pending'
      };
    }
    case 'register': {
      if (action.action) {
        const finalUsers = action.action(action.payload, action.fields);
        return {
          ...state,
          user: null,
          users: finalUsers,
          status: finalUsers ? 'successful-registration' : 'registration-failed'
        };
      } else {
        throw new Error('Login action not defined : Expected a login handler');
      }
    }
  }

  return {} as FormStateType;
};

export default formReducer;
