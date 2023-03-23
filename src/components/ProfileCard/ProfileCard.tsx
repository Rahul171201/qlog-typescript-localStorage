import styles from './ProfileCard.module.css';
import Image from 'next/image';
import { UserContext } from '@/contexts/UserContext';
import lato from '@/data/latoFont';
import Router from 'next/router';
import ToolTip from './ToolTip/ToolTip';
import { useContext, useEffect } from 'react';
import UserType from '@/types/UserType';

// Profile Card Component
const ProfileCard = () => {
  // user context
  const { user, setUser } = useContext(UserContext);

  const handleRedirect = () => {
    Router.push('/profile/edit');
  };

  useEffect(() => {
    if (!user) Router.push('/login');
  }, [user]);

  return (
    <div className={`${styles.profileCard} ${lato.className}`}>
      <div className={styles.editProfile} onClick={handleRedirect}>
        <ToolTip/>
      </div>
      <div className={styles.profileImageContainer}>
        <Image
          src={user ? user.profileImage : ''}
          alt="profile-image"
          width={150}
          height={150}
          className={styles.profileImage}
          id="final-profile-image"
        ></Image>
        <div className={styles.uploadProfile}>
          <label htmlFor="profile-image" className={styles.labelProfileImage}>
            <Image
              src="/images/camera.png"
              alt="camera icon"
              width={40}
              height={40}
            ></Image>
          </label>

          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            id="profile-image"
            onChange={(e) => {
              const profileImage = e.target;
              const reader = new FileReader();
              if (profileImage.files) {
                reader.readAsDataURL(profileImage.files[0]);
                if (setUser) {
                  reader.onload = () => {
                    const newUser = {
                      ...user,
                      profileImage: reader.result
                    } as UserType;
                    setUser(newUser);
                  };
                  e.target.value = '';
                }
              }
            }}
          ></input>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.name}>{user ? user.userName : ''}</span>
        <span className={styles.email}>{user ? user.email : ''}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
