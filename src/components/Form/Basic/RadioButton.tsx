/* eslint-disable react/jsx-props-no-spreading */
type props = {
  fieldId: number,
  fieldName: string,
  currentValue?: string | number,
  content: any,
  value: string | number
  handleChange: Function,
};

const defaultProps = {
  currentValue: '',
};

export default function RadioButton({
  fieldId,
  fieldName,
  currentValue,
  content,
  value,
  handleChange,
}: props) {
  const inputProps = currentValue === value ? {
    checked: true,
  } : {};
  return (
    <div className="form-check">
      <input
        id={`${fieldName}-${fieldId}`}
        className="form-check-input radio-primary"
        type="radio"
        name={fieldName}
        value={value}
        onChange={(e) => handleChange(e)}
        {...inputProps}
      />
      <label className="form-check-label" htmlFor={`${fieldName}-${fieldId}`}>
        {content}
      </label>
    </div>
  );
}

RadioButton.defaultProps = defaultProps;
