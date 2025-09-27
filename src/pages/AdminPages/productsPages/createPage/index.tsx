import React from 'react';
import './style.css';
import CreateProduct from '../../../../components/createProduct';

const CreateProductPage: React.FC = () => {
  return (
    <div className="page-container">
      <aside className="sidebar"></aside>

      <main className="main-content">
        <CreateProduct />
      </main>
    </div>
  );
};

export default CreateProductPage;
