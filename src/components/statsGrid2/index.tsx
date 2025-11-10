import React, { useEffect, useState } from 'react';
import StatCard from '../statCard';
import './style.css';
import { getTotalEvents, getTotalEventViews } from '../../services/events';
import {
  getEventOrdersCount,
  getOrdersSummary,
  getProductsOrdersCount,
  getTotalSalesByOrganization,
} from '../../services/orderItems';
import { getTopProductTags, getTotalProducts, getTotalProductViews } from '../../services/products';
import ReviewCard from '../reviewCard';
import { getReviewsSummary } from '../../services/comments';
import { getEventActivity } from '../../services/orderItems';
import ConsumerActivityCard from '../consumerActivityCard';
import type { EventActivity } from '../../types/OrderItemsType';
import { fetchOrganization } from '../../services/organization';
import Loader from '../loader';
import type { ProductTagStats } from '../../types/ProductType';
import ProductTagsChart from '../productTagsChart';
import OrderSummaryCard from '../orderSummaryCard';

const StatsGrid2: React.FC = () => {
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalOrderEvents, setTotalOrderEvents] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<string>('$0');
  const [totalViews, setTotalViews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [eventActivity, setEventActivity] = useState<EventActivity[]>([]);
  const [productTagStats, setProductTagStats] = useState<ProductTagStats[]>([]);
  const [totalOrderProducts, setTotalOrderProducts] = useState<number>(0);

  const [reviewsCountByRating, setReviewsCountByRating] = useState<
    { rating: number; count: number }[]
  >([]);
  const [ordersSummary, setOrdersSummary] = useState({
    pending: 0,
    delivered: 0,
    shipped: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const organization = await fetchOrganization();
      if (!organization) {
        console.error('No se pudo obtener la organización');
        setLoading(false);
        return;
      }

      try {
        const [
          eventsCount,
          productsCount,
          totalSalesOrg,
          orderEventsCount,
          reviewsSummary,
          activity,
          totalEventViews,
          totalProductViews,
          topTags,
          orderProductsCount,
          ordersSummaryData,
        ] = await Promise.all([
          getTotalEvents(organization),
          getTotalProducts(organization),
          getTotalSalesByOrganization(),
          getEventOrdersCount(),
          getReviewsSummary(),
          getEventActivity(),
          getTotalEventViews(),
          getTotalProductViews(),
          getTopProductTags(),
          getProductsOrdersCount(),
          getOrdersSummary(),
        ]);

        setTotalEvents(eventsCount);
        setTotalProducts(productsCount);
        setTotalSales(totalSalesOrg);
        setTotalOrderEvents(orderEventsCount);
        setAverageRating(reviewsSummary.averageRating);
        setReviewsCountByRating(reviewsSummary.reviewsCountByRating);
        setEventActivity(activity);
        setProductTagStats(topTags);
        setTotalViews(totalEventViews + totalProductViews);
        setTotalOrderProducts(orderProductsCount);

        const pending = ordersSummaryData.find((o) => o.status === 'Pending')?.count || 0;
        const delivered = ordersSummaryData.find((o) => o.status === 'Delivered')?.count || 0;
        const shipped = ordersSummaryData.find((o) => o.status === 'In Transit')?.count || 0;
        const total = ordersSummaryData[0]?.total || 0;

        setOrdersSummary({ pending, delivered, shipped, total });
      } catch (err) {
        console.error('Error cargando estadísticas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h3 className="title-component">Gestión de Analíticas y Reportes</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <StatCard
            title="Total de Eventos"
            value={totalEvents}
            percentage={5.3}
            color="#1177F1"
            chartType="line"
          />
        </div>

        <div className="stat-card">
          <StatCard
            title="Total de Productos"
            value={totalProducts}
            percentage={8.4}
            color="#FF0099"
            chartType="line"
          />
        </div>

        <div className="stat-card">
          <StatCard
            title="Total de Ventas"
            value={totalSales}
            percentage={12.8}
            color="#FF0099"
            chartType="line"
          />
        </div>

        <div className="stat-card">
          <StatCard
            title="Total de Entradas Vendidas"
            value={totalOrderEvents}
            percentage={-3.1}
            color="#1177F1"
            chartType="line"
          />
        </div>

        <div className="stat-card">
          <StatCard
            title="Total de Visitas"
            value={totalViews}
            percentage={-1.1}
            color="#1177F1"
            chartType="line"
          />
        </div>

        <div className="stat-card">
          <StatCard
            title="Productos Vendidos"
            value={totalOrderProducts}
            percentage={-1.1}
            color="#1177F1"
            chartType="line"
          />
        </div>

        <div className="consumer-activity-card">
          <ConsumerActivityCard data={eventActivity} />
        </div>

        <div className="review-card">
          <ReviewCard averageRating={averageRating} reviewsCountByRating={reviewsCountByRating} />
        </div>

        <div className="stat-card">
          <ProductTagsChart data={productTagStats} />
        </div>

        <div className="stat-card">
          <OrderSummaryCard orders={ordersSummary} />
        </div>
      </div>
    </div>
  );
};

export default StatsGrid2;