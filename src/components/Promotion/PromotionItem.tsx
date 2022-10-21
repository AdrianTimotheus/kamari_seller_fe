import { Link } from 'react-router-dom';
import promotionData from '../../models/promotionData';
import {
  isEnded,
  isOnGoing,
  isWillCome,
  parseDate,
} from '../../utils/Date';
import HasEndedBadge from '../Badge/Status/HasEndedBadge';
import OnGoingBadge from '../Badge/Status/OnGoingBadge';
import WillComeBadge from '../Badge/Status/WillComeBadge';

type props = {
  promotion: promotionData,
}
export default function PromotionItem({ promotion }:props) {
  let status = '';
  if (isEnded(promotion.end_date)) status = 'hasEnded';
  else if (isWillCome(promotion.start_date)) status = 'willCome';
  else if (isOnGoing(promotion.start_date, promotion.end_date)) status = 'onGoing';
  return (
    <tr className="promotion">
      <td>
        {promotion.title}
      </td>
      <td>
        <div className="promo-list__product">
          {promotion.product_promo_items.map((item) => (
            <div key={`promo-list-product-${item.id}`}>
              <img src={item.product.thumbnail_url} alt="" />
            </div>
          ))}
        </div>
      </td>
      <td>
        <div className="d-flex flex-column gap-2">
          <div>
            {status === 'hasEnded' && <HasEndedBadge />}
            {status === 'willCome' && <WillComeBadge />}
            {status === 'onGoing' && <OnGoingBadge />}
          </div>
          <div>
            {parseDate(promotion.start_date)}
            {' - '}
            {parseDate(promotion.end_date)}
          </div>
        </div>
      </td>
      <td>
        <div>
          <Link
            to={`/promotion/${promotion.id}`}
            title="Detail"
            className="icon-mini icon-mini-blue"
          >
            <i className="bi bi-eye" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
