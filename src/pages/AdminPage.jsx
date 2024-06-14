import React, { useState } from 'react';
import "../sass/AdminPage/AdminPage.css";
import AddProduct from '../components/AddProduct';
import UpdateProduct from '../components/UpdateProduct';
import DeleteProduct from '../components/DeleteProduct';

const AdminPage = () => {
    const [activeComponent, setActiveComponent] = useState('Add');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Add':
                return <AddProduct />;
            case 'Update':
                return <UpdateProduct />;
            case 'Delete':
                return <DeleteProduct />;
            default:
                return <AddProduct />;
        }
    };

    return (
        <div className="container">
            <div className="admin_page">
                <div className="admin_page_wrapper">
                    <div className="admin_page_btns">
                        <button className={`admin_page_btn ${activeComponent==='Add' ? 'active' : ''}`} onClick={() => setActiveComponent('Add')}>Add</button>
                        <button className={`admin_page_btn ${activeComponent==='Update' ? 'active' : ''}`} onClick={() => setActiveComponent('Update')}>Update</button>
                        <button className={`admin_page_btn ${activeComponent==='Delete' ? 'active' : ''}`} onClick={() => setActiveComponent('Delete')}>Delete</button>
                    </div>
                    <div className="admin_page_body">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
