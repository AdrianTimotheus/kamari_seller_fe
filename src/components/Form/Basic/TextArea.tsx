/* eslint-disable react/jsx-props-no-spreading */
type props = {
  placeholder: string,
  fieldName: string,
  value: any,
  handleChange: Function,
  validationMsg?: string,
  isRequired?: boolean,
  rows: number,
}

const defaultProps = {
  validationMsg: '',
  isRequired: false,
};

export default function TextArea({
  placeholder,
  fieldName,
  value,
  handleChange,
  validationMsg,
  isRequired,
  rows,
}:props) {
  const dangerClass = validationMsg !== '' ? 'border-danger' : '';
  const inputProps = isRequired ? {
    required: true,
  } : {};
  return (
    <>
      <textarea
        id={fieldName}
        className={`w-100 form-control ${dangerClass}`}
        placeholder={placeholder}
        name={fieldName}
        value={value}
        rows={rows}
        onChange={(e) => {
          handleChange(e);
        }}
        {...inputProps}
      />
      <span className="text-danger">{validationMsg}</span>
    </>

  );
}

TextArea.defaultProps = defaultProps;
