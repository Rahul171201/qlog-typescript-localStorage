type UserType = {
  userId: number;
  userName: string;
  email: string;
  password: string;
  profileImage: string;
  asked: number[];
  answered: number[];
  hasRated: number[];
  hasUpvoted: number[];
  hasDownvoted: number[];
};

export default UserType;
