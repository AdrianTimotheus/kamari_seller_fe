import { FormEvent } from 'react';
import RadioButton from '../Basic/RadioButton';

type props = {
  label: string,
  fieldName: string,
  handleChange: Function,
  validationMsg: string,
  options: Array<{content:string, value:string}>,
}

export default function RadioButtonGroup({
  label,
  fieldName,
  handleChange,
  validationMsg,
  options,
}:props) {
  const dangerClass = validationMsg !== '' ? 'border border-danger' : '';
  return (
    <>
      <label htmlFor={fieldName} className="form-label">
        {label}
      </label>
      <div className={`d-flex ${dangerClass}`}>
        {options.map((item, index) => (
          <div key={`${fieldName}-${item.value}`} className="col">
            <RadioButton
              fieldId={index}
              fieldName={fieldName}
              content={item.content}
              value={item.value}
              handleChange={(e: FormEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
        ))}
      </div>
      <span className="text-danger">{validationMsg}</span>
    </>
  );
}
