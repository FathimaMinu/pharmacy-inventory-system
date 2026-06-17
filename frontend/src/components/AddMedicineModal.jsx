import React, { useState } from "react";
import { addMedicine } from "../services/medicineService";

export default function AddMedicineModal({ onClose, refresh }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    manufacturer: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const medicineData = {
        name: formData.name,
        category: formData.category || "General",
        stock: parseInt(formData.stock) || 0,
        price: parseFloat(formData.price) || 0,
        manufacturer: formData.manufacturer || "Unknown"
      };
      
      await addMedicine(medicineData);
      refresh();
      onClose();
      alert("Medicine added successfully!");
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("Failed to add medicine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Add New Medicine</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Medicine Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter medicine name"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
          </div>

          <div className="form-group">
            <label>Manufacturer *</label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              required
              placeholder="Enter manufacturer"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="Quantity"
              />
            </div>

            <div className="form-group">
              <label>Price (LKR) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="Price"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Adding..." : "Add Medicine"}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}