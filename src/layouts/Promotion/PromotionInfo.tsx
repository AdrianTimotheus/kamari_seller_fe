import HasEndedBadge from '../../components/Badge/Status/HasEndedBadge';
import OnGoingBadge from '../../components/Badge/Status/OnGoingBadge';
import WillComeBadge from '../../components/Badge/Status/WillComeBadge';
import FormSkeleton from '../../components/Loading/FormSkeleton';
import SectionTitle from '../../components/Text/SectionTitle';
import {
  isEnded,
  isOnGoing,
  isWillCome,
  parseDate,
} from '../../utils/Date';

type props = {
  isLoading: boolean,
  promotion: any,
}

export default function PromotionInfo({
  isLoading,
  promotion,
}:props) {
  let status = '';
  if (isEnded(promotion.end_date)) status = 'hasEnded';
  else if (isWillCome(promotion.start_date)) status = 'willCome';
  else if (isOnGoing(promotion.start_date, promotion.end_date)) status = 'onGoing';
  return (
    <div className="page-content">
      <SectionTitle text="Informasi Dasar" />
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <table className="table table-borderless m-0 w-100">
          <tbody>
            <tr>
              <td>
                <span className="text-grey2">Nama Promosi</span>
              </td>
              <td>
                {promotion.title}
              </td>
            </tr>
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
            <tr>
              <td>
                <span className="text-grey2">Masa Berlaku</span>
              </td>
              <td>
                {parseDate(promotion.start_date)}
                {' - '}
                {parseDate(promotion.end_date)}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
