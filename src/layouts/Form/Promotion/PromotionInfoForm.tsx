import DateInput from '../../../components/Form/Basic/DateInput';
import TextInputWithCounter from '../../../components/Form/Custom/TextInputWithCounter';

/* eslint-disable */
type props = {
  formPromotionInfo: any,
  validationMsg: any,
  handleChange: Function,
  promotion?: any,
}

const defaultProps = {
  promotion: {},
};

export default function PromotionInfoForm({
  formPromotionInfo,
  validationMsg,
  handleChange,
  promotion,
}:props) {
  return (
    <div>
      <table className="table table-borderless m-0 w-100">
        <tbody>
          <tr>
            <td>
              <label className="text-grey2" htmlFor="title">
                Nama Promosi
              </label>
            </td>
            <td>
              <div>
                <TextInputWithCounter
                  placeholder="Nama Promosi"
                  fieldName="title"
                  value={formPromotionInfo.title}
                  handleChange={handleChange}
                  validationMsg={validationMsg.title}
                  maxLength={50}
                  isRequired
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label className="text-grey2" htmlFor="start_date">
                Masa Berlaku
              </label>
            </td>
            <td>
              <div className={`d-flex flex-column ${validationMsg.start_end_date !== '' && 'border border-danger'}`}>
                <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
                  <DateInput
                    fieldName="start_date"
                    value={formPromotionInfo.start_date}
                    handleChange={handleChange}
                    validationMsg=""
                    isRequired
                  />
                  <span>-</span>
                  <DateInput
                    fieldName="end_date"
                    value={formPromotionInfo.end_date}
                    handleChange={handleChange}
                    validationMsg=""
                    isRequired
                  />
                </div>
                <span className="text-danger">{validationMsg.start_end_date}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
PromotionInfoForm.defaultProps = defaultProps;
