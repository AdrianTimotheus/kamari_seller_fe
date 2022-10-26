/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent } from 'react';
import TextInputWithCounter from '../../../components/Form/Custom/TextInputWithCounter';

type props = {
  form: any,
  validationMsg: any,
  handleChange: Function,
  handleSubmit: Function,
}

export default function CategoryFormInfo({
  form,
  validationMsg,
  handleChange,
  handleSubmit,
}:props) {
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <table className="table table-borderless m-0 w-100">
        <tbody>
          <tr>
            <td>
              <label className="text-grey2" htmlFor="title">
                Nama Kategori
              </label>
            </td>
            <td>
              <div>
                <TextInputWithCounter
                  placeholder="Nama Kategori"
                  fieldName="title"
                  value={form.title}
                  handleChange={handleChange}
                  validationMsg={validationMsg.title}
                  maxLength={50}
                  isRequired
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
