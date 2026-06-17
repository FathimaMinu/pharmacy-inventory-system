import React from 'react';

const MedicineTable = ({ medicines, onEdit, onDelete }) => {
  
  const getStockClass = (stock) => {
    if (stock === 0) return 'out-of-stock';
    if (stock < 5) return 'low-stock';
    return 'in-stock';
  };

  const handleDelete = (medicine) => {
    if (window.confirm(`Delete ${medicine.name}?`)) {
      if (onDelete) {
        onDelete(medicine.id);
      }
    }
  };

  return (
    <div className="medicine-table-container">
      <table className="medicine-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Category</th>
            <th>Manufacturer</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines?.length > 0 ? (
            medicines.map(medicine => (
              <tr key={medicine.id}>
                <td>#{medicine.id}</td>
                <td><strong>{medicine.name}</strong></td>
                <td>{medicine.category || 'N/A'}</td>
                <td>{medicine.manufacturer || 'N/A'}</td>
                <td className={getStockClass(medicine.stock)}>
                  {medicine.stock} units
                </td>
                <td>LKR {medicine.price?.toFixed(2) || 0}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(medicine)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(medicine)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>
                No medicines found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;