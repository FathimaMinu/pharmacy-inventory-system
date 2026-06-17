import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const mockMedicines = [
  { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", stock: 3, price: 45.00, manufacturer: "ABC Pharma", expiryDate: "2025-12-31" },
  { id: 2, name: "Amoxicillin 250mg", category: "Antibiotic", stock: 8, price: 120.00, manufacturer: "HealthCare Ltd", expiryDate: "2025-10-15" },
  { id: 3, name: "Vitamin C 500mg", category: "Supplements", stock: 15, price: 60.00, manufacturer: "NutriLife", expiryDate: "2026-01-20" },
  { id: 4, name: "Cetirizine 10mg", category: "Antihistamine", stock: 0, price: 35.00, manufacturer: "AllerMed", expiryDate: "2025-11-30" },
  { id: 5, name: "Lomophen", category: "Loose motion", stock: 0, price: 200.00, manufacturer: "ABC Pharma", expiryDate: "2025-09-15" },
  { id: 6, name: "Amoxicillin", category: "Loose motion", stock: 9, price: 200.00, manufacturer: "ABC Pharma", expiryDate: "2025-12-01" },
];

export const getMedicines = async () => {
  try {
    const response = await axios.get(`${API_URL}/medicines`);
    return response.data;
  } catch {
    console.log("Backend not available, using mock data");
    return mockMedicines;
  }
};

export const addMedicine = async (medicine) => {
  try {
    const response = await axios.post(`${API_URL}/medicines`, medicine);
    return response.data;
  } catch {
    const nextId = mockMedicines.length ? Math.max(...mockMedicines.map(m => m.id)) + 1 : 1;
    const newMedicine = { ...medicine, id: nextId };
    mockMedicines.push(newMedicine);
    return newMedicine;
  }
};

export const updateMedicine = async (id, medicine) => {
  try {
    const response = await axios.put(`${API_URL}/medicines/${id}`, medicine);
    return response.data;
  } catch {
    const nid = Number(id);
    const index = mockMedicines.findIndex(m => m.id === nid);
    if (index !== -1) {
      mockMedicines[index] = { ...medicine, id: nid };
      return mockMedicines[index];
    }
    return { ...medicine, id: nid };
  }
};

export const deleteMedicine = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/medicines/${id}`);
    return response.data;
  } catch {
    console.log("Deleting from mock data");
    const nid = Number(id);
    const index = mockMedicines.findIndex(m => m.id === nid);
    if (index !== -1) {
      mockMedicines.splice(index, 1);
      return { success: true };
    }
    return { success: false, message: 'Medicine not found' };
  }
};