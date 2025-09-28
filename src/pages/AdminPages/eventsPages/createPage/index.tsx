import React from 'react';
import './style.css';
import CreateEvent from '../../../../components/createEvent';
import SidebarAdmin from '../../../../components/atomsUi/sideBarAdmin';

const CreateEventPage: React.FC = () => {
  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="main-content">
        <CreateEvent />
      </main>
    </div>
  );
};

export default CreateEventPage;
