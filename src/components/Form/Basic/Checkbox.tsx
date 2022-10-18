/* eslint-disable react/jsx-props-no-spreading */
type props = {
  value: string;
  content: any;
  handleChange: Function,
  currentState?: boolean,
};

const defaultProps = {
  currentState: false,
};

export default function Checkbox({
  value,
  content,
  handleChange,
  currentState,
}: props) {
  const inputProps = currentState ? {
    checked: true,
  } : {};
  return (
    <div className="form-check">
      <input
        id={value}
        className="form-check-input checkbox-primary"
        type="checkbox"
        onChange={(e) => handleChange(e)}
        value={value}
        {...inputProps}
      />
      <label className="form-check-label" htmlFor={value}>
        {content}
      </label>
    </div>
  );
}

Checkbox.defaultProps = defaultProps;
