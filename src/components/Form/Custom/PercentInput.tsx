/* eslint-disable react/jsx-props-no-spreading */
type props = {
  placeholder: string,
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

export default function PercentInput({
  placeholder,
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
      <div className="input-group w-100">
        <input
          type="number"
          name={fieldName}
          className={`form-control ${dangerClass}`}
          id={fieldName}
          placeholder={placeholder}
          min={1}
          max={100}
          step={1}
          onChange={(e) => handleChange(e)}
          value={value}
          {...inputProps}
        />
        <span className="input-group-text fw-bold text-grey2">%</span>
      </div>
      <span className="text-danger">{validationMsg}</span>
    </>
  );
}

PercentInput.defaultProps = defaultProps;
