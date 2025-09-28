import React from 'react';
import './createPage.css';
import CreateProduct from '../../../../components/createProduct';
import SidebarAdmin from '../../../../components/atomsUi/sideBarAdmin';

const CreateProductPage: React.FC = () => {
  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="main-content">
        <CreateProduct />
      </main>
    </div>
  );
};

export default CreateProductPage;
