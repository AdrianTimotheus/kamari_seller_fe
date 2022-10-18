/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
import { FormEvent, useState } from 'react';

type props = {
  prefix: string,
  placeholder: string,
  fieldName: string,
  value: any,
  handleChange: Function,
  validationMsg?: string,
  maxLength: number,
  isRequired?: boolean,
}

const defaultProps = {
  validationMsg: '',
  isRequired: false,
};

export default function VoucherCodeInput({
  prefix,
  placeholder,
  fieldName,
  value,
  handleChange,
  validationMsg,
  maxLength,
  isRequired,
}:props) {
  const [inputLength, setInputLength] = useState<number>(0);
  const dangerClass = validationMsg !== '' ? 'border-danger' : '';
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const newLength = e.currentTarget.value.length;
    if (newLength <= maxLength) {
      setInputLength(newLength);
      handleChange(e);
    }
  };
  const inputProps = isRequired ? {
    required: true,
  } : {};
  return (
    <>
      <div className="input-group w-100">
        <span className="input-group-text text-grey2">
          {prefix}
        </span>
        <input
          id={fieldName}
          type="text"
          className={`w-auto form-control ${dangerClass}`}
          placeholder={placeholder}
          name={fieldName}
          value={value}
          onChange={(e) => {
            handleInputChange(e);
          }}
          {...inputProps}
        />
        <span className="input-group-text text-grey2 bg-white">
          {`${inputLength}/${maxLength}`}
        </span>
      </div>
      <span className="text-danger">{validationMsg}</span>
    </>
  );
}

VoucherCodeInput.defaultProps = defaultProps;
