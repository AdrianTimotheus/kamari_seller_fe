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

export default function PriceInput({
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
      <div className="input-group w-100">
        <span className="input-group-text fw-bold text-grey2">Rp</span>
        <input
          type="number"
          name={fieldName}
          className={`form-control ${dangerClass}`}
          id={fieldName}
          placeholder={placeholder}
          min={min}
          onChange={(e) => handleChange(e)}
          value={value}
          {...inputProps}
        />
      </div>
      <span className="text-danger">{validationMsg}</span>
    </>
  );
}

PriceInput.defaultProps = defaultProps;
