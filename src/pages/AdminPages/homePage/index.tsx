import React, { useEffect, useState } from 'react';
import './style.css';
import SidebarAdmin from '../../../components/atomsUi/sideBarAdmin';
import HeaderProfile from '../../../components/headerProfile';
import StatsGrid from '../../../components/statsGrid';
import Loader from '../../../components/loader';

const AdminHomePage: React.FC = () => {
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
        <HeaderProfile />
        <StatsGrid />
      </main>
    </div>
  );
};

export default AdminHomePage;
