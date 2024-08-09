interface ProfileContentProps {
  values: Profile;
  props: ProfilePropType[];
}

function ProfileContent({ values, props }: ProfileContentProps) {
  return (
    <div className="profile-content ">
      {props.map((propItem) => (
        <div className="flex justify-start h-16 pt-8 items-center text-xl" key={propItem.id}>
          <span className="font-bold w-20 text-left">{propItem.label}</span>
          <span className="pl-6 text-gray-600 w-full text-right">{values[propItem.id]}</span>
        </div>
      ))}
    </div>
  );
}

export type Profile = {
  id?: number;
  email: string;
  name?: string;
  phone?: string;
  [key: string]: any;
};

export type ProfilePropType = {
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  pattern?: string;
  required?: boolean;
  defaultValue?: string;
  maxLength?: number;
};

export default ProfileContent;
