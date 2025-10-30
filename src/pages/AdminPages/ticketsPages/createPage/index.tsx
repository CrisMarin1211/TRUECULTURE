import React from 'react';
import './createPage.css';
import SidebarAdmin from '../../../../components/atomsUi/sideBarAdmin';
import CreateTicket from '../../../../components/adminTicketCard';

const CreateTicketPage: React.FC = () => {
  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <CreateTicket />
      </main>
    </div>
  );
};

export default CreateTicketPage;
