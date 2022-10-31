/* eslint-disable react-hooks/exhaustive-deps */
import TextInputWithCounter from '../../../components/Form/Custom/TextInputWithCounter';

type props = {
  form: any,
  validationMsg: any,
  handleChange: Function,
}

export default function SellerCategoriesInfoForm({
  form,
  validationMsg,
  handleChange,
}:props) {
  return (
    <div>
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
    </div>
  );
}
