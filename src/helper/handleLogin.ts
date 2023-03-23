import UserType from '@/types/UserType';

/**
 * Authenticates the current user in the system,
 * if user provides correct userId and password
 * @param e FORM SUBMIT EVENT
 * @param users map of users
 * @returns final logged in user if authentication is successful else null
 */
const handleLogin = (
  users: Map<number, UserType>,
  fields: HTMLCollectionOf<HTMLElement>
) => {
  const userId = Number(fields[0].getAttribute('value'));
  const password = fields[1].getAttribute('value');
  const user = users.get(userId);

  if (user === undefined) {
    return null;
  }

  if (user.password === password) {
    const finalUser = user;
    return finalUser;
  }
  return null;
};

export default handleLogin;
