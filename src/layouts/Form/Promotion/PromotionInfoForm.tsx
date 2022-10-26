import HasEndedBadge from '../../../components/Badge/Status/HasEndedBadge';
import OnGoingBadge from '../../../components/Badge/Status/OnGoingBadge';
import WillComeBadge from '../../../components/Badge/Status/WillComeBadge';
import DateInput from '../../../components/Form/Basic/DateInput';
import TextInputWithCounter from '../../../components/Form/Custom/TextInputWithCounter';
import {
  isEnded, isOnGoing, isWillCome, parseDate,
} from '../../../utils/Date';

type props = {
  mode: string,
  formPromotionInfo: any,
  validationMsg: any,
  handleChange: Function,
}

export default function PromotionInfoForm({
  mode,
  formPromotionInfo,
  validationMsg,
  handleChange,
}:props) {
  let status = '';
  if (mode === 'edit') {
    if (isEnded(formPromotionInfo.end_date)) status = 'hasEnded';
    else if (isWillCome(formPromotionInfo.start_date)) status = 'willCome';
    else if (isOnGoing(formPromotionInfo.start_date, formPromotionInfo.end_date)) status = 'onGoing';
  }
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
          {mode === 'edit' && (
          <tr>
            <td>
              <span className="text-grey2">Status</span>
            </td>
            <td>
              {status === 'hasEnded' && <HasEndedBadge />}
              {status === 'willCome' && <WillComeBadge />}
              {status === 'onGoing' && <OnGoingBadge />}
            </td>
          </tr>
          )}
          <tr>
            <td>
              <label className="text-grey2" htmlFor="start_date">
                Masa Berlaku
              </label>
            </td>
            <td>
              {mode === 'new' ? (
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
              ) : (
                <span>
                  {parseDate(formPromotionInfo.start_date)}
                  {' - '}
                  {parseDate(formPromotionInfo.end_date)}
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
