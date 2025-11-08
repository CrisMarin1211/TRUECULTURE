import React, { useEffect, useState } from 'react';
import StatCard from '../statCard';
import './style.css';
import { getTotalEvents, getUpcomingEvents } from '../../services/events';
import { getTotalProducts } from '../../services/products';
import { getEventOrdersCount, getProductsOrdersCount, getTotalSales } from '../../services/orders';
import ReviewCard from '../reviewCard';
import { getReviewsSummary } from '../../services/comments';
import { getEventActivity } from '../../services/orderItems';
import ConsumerActivityCard from '../consumerActivityCard';
import UpcomingEventsCard, { type UpcomingEvent } from '../upcomingEventsCard';
import type { EventActivity } from '../../types/orderItemsType';

const StatsGrid: React.FC = () => {
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalOrderEvents, setTotalOrderEvents] = useState<number>(0);
  const [totalOrderProducts, setTotalOrderProducts] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<string>('$0');
  const [loading, setLoading] = useState<boolean>(true);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [reviewsCountByRating, setReviewsCountByRating] = useState<
    { rating: number; count: number }[]
  >([]);
  const [eventActivity, setEventActivity] = useState<EventActivity[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          eventsCount,
          productsCount,
          total,
          orderEventsCount,
          reviewsSummary,
          activity,
          upcoming,
          orderProductsCount,
        ] = await Promise.all([
          getTotalEvents(),
          getTotalProducts(),
          getTotalSales(),
          getEventOrdersCount(),
          getReviewsSummary(),
          getEventActivity(),
          getUpcomingEvents(),
          getProductsOrdersCount(),
        ]);

        setUpcomingEvents(upcoming);
        setTotalEvents(eventsCount);
        setTotalProducts(productsCount);
        setTotalSales(total);
        setTotalOrderEvents(orderEventsCount);
        setAverageRating(reviewsSummary.averageRating);
        setReviewsCountByRating(reviewsSummary.reviewsCountByRating);
        setEventActivity(activity);
        setTotalOrderProducts(orderProductsCount);
      } catch (err) {
        console.error('Error cargando estadísticas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="stats-grid">
        <p className="loading-text">Cargando estadísticas...</p>
      </div>
    );
  }

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <StatCard
          title="Eventos Totales"
          value={totalEvents}
          percentage={5.3}
          color="#1177F1"
          chartType="area"
        />
      </div>
      <div className="stat-card">
        <StatCard
          title="Ventas Totales"
          value={totalSales}
          percentage={12.8}
          color="#FF0099"
          chartType="line"
        />
      </div>
      <div className="stat-card">
        <StatCard
          title="Entradas Vendidas"
          value={totalOrderEvents}
          percentage={-3.1}
          color="#1177F1"
          chartType="bar"
        />
      </div>

      <div className="stat-card">
        <StatCard
          title="Productos Totales"
          value={totalProducts}
          percentage={8.4}
          color="#FF0099"
          chartType="area"
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

      <div className="upcoming-card">
        <UpcomingEventsCard events={upcomingEvents} />
      </div>

      <div className="review-card">
        <ReviewCard averageRating={averageRating} reviewsCountByRating={reviewsCountByRating} />
      </div>
    </div>
  );
};

export default StatsGrid;