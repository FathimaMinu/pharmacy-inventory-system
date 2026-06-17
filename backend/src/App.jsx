import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import MediCareHeader from "./components/MediCareHeader";
import Header from "./components/Header";
import NotificationsCard from "./components/NotificationsCard";
import StatsCards from "./components/StatsCards";
import QuickSale from "./components/QuickSale";
import MedicineTable from "./components/MedicineTable";
import AddMedicineModal from "./components/AddMedicineModal";
import UpdateModal from "./components/UpdateModal";
import LowStockPage from "./components/LowStockPage";
import SalesHistory from "./components/SalesHistory";
import Settings from "./components/Settings";
import AIExpiryAlert from "./components/AIExpiryAlert";
import AIStockPredictor from "./components/AIStockPredictor";
import Login from "./components/Login";
import { getMedicines, updateMedicine, deleteMedicine } from "./services/medicineService";
import "./App.css";

function App() {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [recentMedicines, setRecentMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expiryAlerts, setExpiryAlerts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on load
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setApiError(false);
      const data = await getMedicines();
      console.log("Fetched medicines:", data);
      
      if (Array.isArray(data) && data.length > 0) {
        const fixedData = data.map(med => ({
          ...med,
          stock: med.stock < 0 ? 0 : med.stock
        }));
        
        setMedicines(fixedData);
        updateRecentMedicines(fixedData);
        setFilteredMedicines(fixedData);
        generateExpiryAlerts(fixedData);
      } else {
        console.log("No medicines found in database");
        setMedicines([]);
        setRecentMedicines([]);
        setFilteredMedicines([]);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateExpiryAlerts = (meds) => {
    const alerts = [];
    const today = new Date();
    
    meds.forEach((med, index) => {
      const daysToAdd = [45, 15, 25, 60, 10, 90, 5, 8, 12, 3, 20, 35][index % 12];
      const expiryDate = new Date();
      expiryDate.setDate(today.getDate() + daysToAdd);
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 30) {
        alerts.push({
          id: med.id,
          name: med.name,
          expiryDate: expiryDate.toLocaleDateString('en-GB'),
          daysLeft: daysUntilExpiry,
          status: daysUntilExpiry <= 7 ? 'critical' : 'warning'
        });
      }
    });
    setExpiryAlerts(alerts);
  };

  const updateRecentMedicines = (allMedicines) => {
    if (!allMedicines || allMedicines.length === 0) {
      setRecentMedicines([]);
      return;
    }
    
    const sorted = [...allMedicines].sort((a, b) => b.id - a.id);
    const recent = sorted.slice(0, 5);
    console.log("Recent medicines:", recent);
    setRecentMedicines(recent);
  };

  const refreshData = async () => {
    const data = await getMedicines();
    if (Array.isArray(data) && data.length > 0) {
      const fixedData = data.map(med => ({
        ...med,
        stock: med.stock < 0 ? 0 : med.stock
      }));
      
      setMedicines(fixedData);
      updateRecentMedicines(fixedData);
      setFilteredMedicines(fixedData);
      generateExpiryAlerts(fixedData);
    }
  };

  const handleDeleteMedicine = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await deleteMedicine(id);
        await refreshData();
        alert('✅ Medicine deleted successfully!');
      } catch (error) {
        console.error('Error deleting medicine:', error);
        alert('❌ Failed to delete medicine');
      }
    }
  };

  const handleDispenseSale = async (updatedMedicine) => {
    try {
      await updateMedicine(updatedMedicine.id, updatedMedicine);
      await refreshData();
      console.log('✅ Sale completed and stock updated');
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('❌ Failed to process sale');
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMedicines(medicines);
    } else {
      const filtered = medicines.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (med.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (med.manufacturer?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
      setFilteredMedicines(filtered);
    }
  }, [searchTerm, medicines]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  const totalMedicines = medicines.length;
  const lowStockCount = medicines.filter(m => m.stock < 5).length;
  const criticalStockCount = medicines.filter(m => m.stock < 5 && m.stock > 0).length;
  const expiringCount = expiryAlerts.length;
  const criticalExpiringCount = expiryAlerts.filter(a => a.status === 'critical').length;
  const totalValue = Math.abs(medicines.reduce((sum, m) => sum + (m.price * m.stock), 0));

  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine);
    setShowUpdateModal(true);
  };

  const handleEditComplete = async () => {
    await refreshData();
    setShowUpdateModal(false);
    setSelectedMedicine(null);
  };

  const handleAddComplete = async () => {
    await refreshData();
    setShowAddModal(false);
  };

  const handleLowStockClick = () => {
    setCurrentPage("lowstock");
  };

  const handleExpiringClick = () => {
    alert(`⚠️ ${expiringCount} medicines expiring within 30 days\n${criticalExpiringCount} of them expire within 7 days!`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading MediCare Pharmacy System...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      
      <div className={`main-content ${sidebarOpen ? '' : 'expanded'}`}>
        <MediCareHeader />
        
        <Header 
          userName="Pharmacist Minu" 
          onAddClick={() => setShowAddModal(true)}
          lowStockCount={lowStockCount}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {currentPage === "dashboard" && (
          <div className="dashboard-content">
            <div className="content-grid">
              <div className="left-column">
                <NotificationsCard 
                  medicines={medicines} 
                  expiryAlerts={expiryAlerts} 
                />
              </div>
              
              <div className="right-column">
                <StatsCards 
                  totalMedicines={totalMedicines}
                  lowStockCount={lowStockCount}
                  expiringCount={expiringCount}
                  totalValue={totalValue}
                  onLowStockClick={handleLowStockClick}
                  onExpiringClick={handleExpiringClick}
                  criticalStockCount={criticalStockCount}
                  criticalExpiringCount={criticalExpiringCount}
                />
              </div>
            </div>

            <QuickSale 
              medicines={medicines}
              onSaleComplete={handleDispenseSale}
            />

            {apiError ? (
              <div className="api-error-message">
                <p>⚠️ Cannot connect to backend. Please make sure backend server is running.</p>
                <button onClick={fetchMedicines} className="retry-btn">Retry Connection</button>
              </div>
            ) : (
              <MedicineTable 
                medicines={recentMedicines} 
                onEdit={handleEdit}
                onDelete={handleDeleteMedicine}
              />
            )}
          </div>
        )}

        {currentPage === "medicinelist" && (
          <MedicineTable 
            medicines={filteredMedicines} 
            onEdit={handleEdit}
            onDelete={handleDeleteMedicine}
          />
        )}

        {currentPage === "lowstock" && (
          <LowStockPage 
            medicines={filteredMedicines.filter(m => m.stock < 5)} 
            onEdit={handleEdit}
            onBack={() => setCurrentPage("dashboard")}
          />
        )}

        {currentPage === "expiring" && (
          <AIExpiryAlert medicines={medicines} />
        )}

        {currentPage === "ai-predictor" && (
          <AIStockPredictor medicines={medicines} />
        )}

        {currentPage === "sales" && (
          <SalesHistory medicines={medicines} />
        )}

        {currentPage === "settings" && (
          <Settings medicines={medicines} />
        )}
      </div>

      {showAddModal && (
        <AddMedicineModal 
          onClose={handleAddComplete}
          refresh={refreshData}
        />
      )}

      {showUpdateModal && selectedMedicine && (
        <UpdateModal
          medicine={selectedMedicine}
          onClose={handleEditComplete}
          refresh={refreshData}
        />
      )}
    </div>
  );
}

export default App;