import UserType from '@/types/UserType';

/**
 * Adds a new user to the database if registration successful
 * @param registeredUsers map of registered users
 * @param fields // input fields in register form
 * @returns final list of registered users
 */
const handleRegister = (
  registeredUsers: Map<number, UserType>,
  fields: HTMLCollectionOf<HTMLElement>
) => {
  const email = fields[0].getAttribute('value') as string;
  const userName = fields[1].getAttribute('value') as string;
  const password = fields[2].getAttribute('value') as string;
  const confirmPassword = fields[3].getAttribute('value') as string;
  const total_users = registeredUsers.size;

  // check if same email already exists
  for (let obj of registeredUsers) {
    const user = registeredUsers.get(obj[0]);
    if (user && user.email === email) {
      return registeredUsers;
    }
  }

  if (password === confirmPassword) {
    const finalRegisteredUsers = registeredUsers;
    finalRegisteredUsers.set((total_users + 1) * (total_users + 1), {
      userId: (total_users + 1) * (total_users + 1),
      userName,
      email,
      password,
      asked: [],
      answered: [],
      hasRated: [],
      hasUpvoted: [],
      hasDownvoted: [],
      profileImage: '/profiles/unknown-user.png'
    });
    return finalRegisteredUsers;
  } else {
    alert('Confirm password must match password field');
    return null;
  }
};

export default handleRegister;
