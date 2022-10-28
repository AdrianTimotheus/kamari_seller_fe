/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import PromotionDetailList from '../../layouts/Promotion/PromotionDetailList';
import PromotionInfo from '../../layouts/Promotion/PromotionInfo';
import { axiosPrivate } from '../../utils/API';
import { isEnded } from '../../utils/Date';
import { routePromotionList } from '../../utils/RouteList';
import { setDocumentTitle } from '../../utils/Utils';

export default function PromotionDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [promotion, setPromotion] = useState<any>({});
  const [promoItems, setPromoItems] = useState<any[]>([]);

  useEffect(() => {
    if (params.promotionId) {
      axiosPrivate.get(`/sellers/promos/${params.promotionId}`)
        .then((res) => {
          if (isEnded(res.data.end_date) || res.data.has_ended) {
            setDocumentTitle(`Detail promosi ${res.data.title}`);
            setPromotion(res.data);
            setPromoItems(res.data.product_promo_items);
          } else {
            navigate(routePromotionList);
          }
        })
        .catch(() => {
          navigate(routePromotionList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate(routePromotionList);
    }
  }, []);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Detail Promosi" />
        <PageBreadcrumb main="Voucher dan Promosi" sub="Promosi" />
      </div>
      <div>
        <PromotionInfo
          isLoading={isLoading}
          promotion={promotion}
        />
        <PromotionDetailList
          isLoading={isLoading}
          promoItems={promoItems}
        />
      </div>
    </div>
  );
}
