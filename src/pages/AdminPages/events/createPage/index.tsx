import React from 'react';
import './style.css';
import CreateEvent from '../../../../components/createEvent';

const CreateEventPage: React.FC = () => {
  return (
    <div className="page-container">
      <aside className="sidebar"></aside>

      <main className="main-content">
        <CreateEvent />
      </main>
    </div>
  );
};

export default CreateEventPage;
