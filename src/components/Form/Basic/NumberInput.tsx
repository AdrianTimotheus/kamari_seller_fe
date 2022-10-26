/* eslint-disable react/jsx-props-no-spreading */
type props = {
  placeholder: string,
  fieldName: string,
  value: any,
  min: number,
  max?: number,
  handleChange: Function,
  validationMsg?: string,
  isRequired?: boolean,
}

const defaultProps = {
  validationMsg: '',
  isRequired: false,
  max: 0,
};

export default function NumberInput({
  placeholder,
  fieldName,
  value,
  min,
  max,
  handleChange,
  validationMsg,
  isRequired,
}:props) {
  const dangerClass = validationMsg !== '' ? 'border-danger' : '';
  let inputProps = {};
  if (isRequired) inputProps = { ...inputProps, required: true };
  if (max !== 0) inputProps = { ...inputProps, max };
  return (
    <>
      <input
        type="number"
        name={fieldName}
        className={`w-auto form-control ${dangerClass}`}
        id={fieldName}
        placeholder={placeholder}
        min={min}
        onChange={(e) => handleChange(e)}
        value={value}
        {...inputProps}
      />
      <span className="text-danger">{validationMsg}</span>
    </>

  );
}

NumberInput.defaultProps = defaultProps;
