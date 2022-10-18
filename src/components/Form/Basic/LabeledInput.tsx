/* eslint-disable react/jsx-props-no-spreading */
type props = {
  type: string,
  label: string,
  fieldName: string,
  value: any,
  handleChange: Function,
  validationMsg: string,
  isRequired?: boolean,
}

const defaultProps = {
  isRequired: false,
};

export default function LabeledInput({
  type,
  label,
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
      <label htmlFor={fieldName} className="form-label">
        {label}
      </label>
      <input
        id={fieldName}
        type={type}
        className={`form-control ${dangerClass}`}
        placeholder={label}
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

LabeledInput.defaultProps = defaultProps;
