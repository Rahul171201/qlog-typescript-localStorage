import styles from './EditProfile.module.css';
import Navbar from '@/components/Navbar/Navbar';
import lato from '@/data/latoFont';
import { SyntheticEvent, useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import Router from 'next/router';

const EditProfile = () => {
  // user context
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const fields = e.currentTarget.getElementsByTagName('input');
    const name = fields[0].value;
    const email = fields[1].value;

    if (user && name && email && setUser) {
      setUser({
        ...user,
        userName: name,
        email: email
      });
      Router.push('/profile/' + user.userId);
    }
    else{
      throw new Error('Error: Cannot edit profile');
    }
  };

  return (
    <div className={styles.editProfileWrapper}>
      <Navbar></Navbar>
      <div className={`${styles.formWrapper} ${lato.className}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            type="text"
            placeholder="Enter full name"
            className={styles.inputField}
            required
          ></input>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className={styles.inputField}
            required
          ></input>
          <button type="submit" className={styles.submitButton}>
            EDIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
