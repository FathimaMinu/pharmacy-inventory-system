import React, { useState } from "react";
import { updateMedicine } from "../services/medicineService";

export default function UpdateModal({ medicine, onClose, refresh }) {
  const [formData, setFormData] = useState({
    name: medicine.name || "",
    category: medicine.category || "",
    stock: medicine.stock || 0,
    price: medicine.price || 0,
    manufacturer: medicine.manufacturer || ""
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
      const updatedData = {
        name: formData.name,
        category: formData.category,
        stock: parseInt(formData.stock),
        price: parseFloat(formData.price),
        manufacturer: formData.manufacturer
      };
      
      await updateMedicine(medicine.id, updatedData);
      await refresh(); // Refresh data immediately
      alert("Medicine updated successfully!");
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update medicine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Edit Medicine</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Medicine Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
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
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Updating..." : "Update Medicine"}
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