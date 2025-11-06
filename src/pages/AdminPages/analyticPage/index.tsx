import React, { useEffect, useState } from 'react';
import Loader from '../../../components/loader';
import SidebarAdmin from '../../../components/atomsUi/sideBarAdmin';
import StatsGrid from '../../../components/statsGrid';

const AdminAnalyticsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <StatsGrid />
      </main>
    </div>
  );
};

export default AdminAnalyticsPage;
