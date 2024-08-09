import React, { FormEvent, useState } from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name: string;
  boxClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  label?: string;
  errorText?: string;
}

function TextInput({
  boxClassName,
  labelClassName,
  inputClassName,
  errorClassName,
  label,
  errorText,
  id,
  ...rest
}: Props) {
  const [validationMessage, setValidationMessage] = useState<string>('');

  const onInvalid = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setValidationMessage(target.validationMessage);
  };

  const onBlur = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    if (validationMessage) {
      setValidationMessage(target.validationMessage);
    }
  };

  return (
    <>
      <div className={boxClassName}>
        {label && (
          <div className={labelClassName}>
            <label htmlFor={id}>{label}</label>
          </div>
        )}
        <input className={inputClassName} id={id} onInvalid={onInvalid} onBlur={onBlur} {...rest} />
      </div>
      {!!validationMessage && <div className={errorClassName}>{errorText || validationMessage}</div>}
    </>
  );
}

TextInput.displayName = 'TextInput';
TextInput.defaultProps = {
  boxClassName: '',
  labelClassName: '',
  inputClassName: '',
  errorClassName: '',
  label: '',
  errorText: '',
};

export default TextInput;
export type { Props };
