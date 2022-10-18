/* eslint-disable react/jsx-props-no-spreading */
type props = {
  fieldName: string,
  value: any,
  handleChange: Function,
  validationMsg?: string,
  isRequired?: boolean,
}

const defaultProps = {
  validationMsg: '',
  isRequired: false,
};

export default function DateInput({
  fieldName,
  value,
  handleChange,
  validationMsg,
  isRequired,
}:props) {
  const dangerClass = validationMsg !== '' ? 'border-danger' : '';
  const inputProps = isRequired ? {
    required: true,
  } : {};
  return (
    <>
      <input
        id={fieldName}
        type="date"
        className={`w-auto form-control ${dangerClass}`}
        name={fieldName}
        value={value}
        onChange={(e) => {
          handleChange(e);
        }}
        {...inputProps}
      />
      <span className="text-danger">{validationMsg}</span>
    </>

  );
}

DateInput.defaultProps = defaultProps;
