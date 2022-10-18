/* eslint-disable react/jsx-props-no-spreading */
type props = {
  placeholder: string,
  fieldName: string,
  value: any,
  min: number,
  max: number,
  handleChange: Function,
  validationMsg?: string,
  isRequired?: boolean,
}

const defaultProps = {
  validationMsg: '',
  isRequired: false,
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
  const inputProps = isRequired ? {
    required: true,
  } : {};
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
          max={max}
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
