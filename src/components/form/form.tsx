interface Props {
  action?: string;
  children: React.ReactNode;
  id?: string;
  onSubmit: (data: FormData) => void;
}

function Form({ action, children, id, onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const isValid = formElement.checkValidity();

    // focusing the first invalid field
    const firstInvalidField = formElement.querySelector(':invalid') as HTMLInputElement;

    firstInvalidField?.focus();

    // submit the dataObject if isValid===true
    if (isValid) {
      const dataObject = new FormData(formElement);
      onSubmit(dataObject);
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit} noValidate id={id}>
      <div>{children}</div>
    </form>
  );
}

Form.defaultProps = {
  action: '',
  id: '',
};

export default Form;
