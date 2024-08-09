import { useEffect, useState } from 'react';
import './home.css';
import api from '../libs/api';
import EditIcon from '../assets/icons/edit.svg';
import ProfileContent, { Profile, ProfilePropType } from '../components/profile-content/profile-content';
import ProfileForm from '../components/profile-form/profile-form';

const profileProps: ProfilePropType[] = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    id: 'email',
    placeholder: 'Enter your email',
    maxLength: 50,
    required: true,
  },
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    id: 'name',
    maxLength: 10,
    placeholder: 'Enter your name',
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    id: 'phone',
    placeholder: 'Enter your phone',
    pattern: '^1[3-9]\\d{9}$',
  },
];

function Home() {
  const [profile, setProfile] = useState({} as Profile);
  const [editModeFlag, setEditModeFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getApiData() {
    const { data } = await api.get('/api/profile/1');
    setProfile(data);
  }

  useEffect(() => {
    getApiData();
  }, []);

  const handleOpenEditModel = () => {
    setEditModeFlag(true);
    setTimeout(() => {
      document.getElementById('email')?.focus();
    }, 0);
  };

  const handleUpdateProfile = (newValue: Profile) => {
    setEditModeFlag(false);
    setProfile(newValue);
  };

  const handleUpdateLoading = (newValue: boolean) => {
    setLoading(newValue);
  };

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center max-w-screen-xl">
        <div className="w-full h-2/4 p-2 xxs:p-4 md:p-8 lg:p-0 md:w-3/4 lg:w-2/4">
          <div className="w-full h-20 flex justify-between items-end align-bottom border-b borer-gray-300 pb-8">
            <div className="text-3xl font-bold">Profile</div>
            {editModeFlag ? (
              <div>
                <button type="button" className="custom-button button-cancel" onClick={() => setEditModeFlag(false)}>
                  Cancel
                </button>
                <button type="submit" form="profileForm" className="custom-button button-primary ml-2">
                  Save changes
                </button>{' '}
              </div>
            ) : (
              <button type="button" className="button-style-none h-10" onClick={handleOpenEditModel}>
                <img
                  className="transition-all duration-150 ease-in-out w-8 h-8 cursor-pointer hover:scale-105"
                  src={EditIcon}
                  alt="editIcon"
                />
              </button>
            )}
          </div>

          {editModeFlag ? (
            <ProfileForm
              id="profileForm"
              values={profile}
              props={profileProps}
              updateProfile={handleUpdateProfile}
              updateLoading={handleUpdateLoading}
            />
          ) : (
            <ProfileContent values={profile} props={profileProps} />
          )}
        </div>
      </div>
      {loading && (
        <div className="absolute left-0 top-0 w-full h-full items-center justify-center min-h-screen bg-gray-100 opacity-85">
          <div className="absolute top-1/2 left-1/2 w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin" />
        </div>
      )}
    </>
  );
}

export default Home;
