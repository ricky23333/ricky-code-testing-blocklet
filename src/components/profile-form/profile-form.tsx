import { useCallback } from 'react';
import { Profile, ProfilePropType } from '../profile-content/profile-content';
import Form from '../form/form';
import TextInput from '../form/text-input';
import api from '../../libs/api';

interface ProfileContentProps {
  values: Profile;
  props: ProfilePropType[];
  id?: string;
  updateProfile?: (data: Profile) => void;
  updateLoading?: (loading: boolean) => void;
}

function ProfileForm({ values, props, id, updateProfile, updateLoading }: ProfileContentProps) {
  // async function handleSubmit(updateValue: FormData) {}

  const handleSubmit = useCallback(
    async (updateValue: FormData) => {
      const resetLoading = () => {
        setTimeout(() => {
          if (!updateLoading) return;
          updateLoading(false);
        }, 1500);
      };

      if (updateLoading) {
        updateLoading(true);
      }

      try {
        const res = await api.put('/api/profile/1', Object.fromEntries(updateValue.entries()));
        const { data } = res;
        if (data && updateProfile) {
          updateProfile(data as any as Profile);
        }
        resetLoading();
      } catch (error) {
        alert(`Error:${JSON.stringify(error?.response?.data)}`);
        resetLoading();
      }
    },
    [updateLoading, updateProfile],
  );

  return (
    <div className="profile-form">
      <Form onSubmit={handleSubmit} id={id}>
        {props.map((propItem) => (
          <TextInput
            key={propItem.id}
            {...propItem}
            defaultValue={values[propItem.id]}
            boxClassName="flex justify-start h-16 pt-8 items-center text-xl"
            labelClassName="font-bold w-20 text-left"
            errorClassName="mt-2 ml-24 text-red-500 text-sm text-left"
            inputClassName="ml-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xl shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        ))}
      </Form>
    </div>
  );
}

ProfileForm.defaultProps = {
  id: '',
  updateProfile: undefined,
  updateLoading: undefined,
};

export default ProfileForm;
