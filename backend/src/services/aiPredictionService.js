// AI Prediction Service for Pharmacy Inventory
// Using statistical methods for predictions (simplified approach)

class StockAIPrediction {
  constructor() {
    this.modelReady = true;
  }

  // Generate low stock alerts based on current inventory
  async generateLowStockAlerts(medicines, salesHistory = []) {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const predictions = [];

    medicines.forEach(medicine => {
      // Calculate average daily consumption
      let avgDailyConsumption = this.calculateAverageConsumption(medicine, salesHistory);
      
      // If no sales history, use default rate based on stock and price
      if (avgDailyConsumption === 0) {
        avgDailyConsumption = Math.max(0.5, Math.min(5, 100 / (medicine.price || 10)));
      }

      // Predict days until stock reaches zero
      const predictedDaysToZero = Math.floor(medicine.stock / avgDailyConsumption);
      
      // Determine risk level
      let risk = 'safe';
      let recommendation = '';
      let suggestedOrderQuantity = 0;

      if (predictedDaysToZero <= 3 && medicine.stock > 0) {
        risk = 'critical';
        suggestedOrderQuantity = Math.ceil(avgDailyConsumption * 14) - medicine.stock;
        recommendation = `URGENT: Order ${suggestedOrderQuantity} units immediately. Current stock will last only ${predictedDaysToZero} days.`;
      } else if (predictedDaysToZero <= 7 && medicine.stock > 0) {
        risk = 'warning';
        suggestedOrderQuantity = Math.ceil(avgDailyConsumption * 14) - medicine.stock;
        recommendation = `Plan to order ${suggestedOrderQuantity} units within ${predictedDaysToZero} days.`;
      } else if (medicine.stock === 0) {
        risk = 'critical';
        suggestedOrderQuantity = Math.ceil(avgDailyConsumption * 14);
        recommendation = `OUT OF STOCK! Order ${suggestedOrderQuantity} units immediately.`;
      }

      // Only include medicines that need attention
      if (risk !== 'safe') {
        predictions.push({
          medicineName: medicine.name,
          currentStock: medicine.stock,
          avgDailyConsumption: Math.round(avgDailyConsumption * 10) / 10,
          predictedDaysToZero: Math.max(0, predictedDaysToZero),
          risk: risk,
          recommendation: recommendation,
          suggestedOrderQuantity: Math.max(5, suggestedOrderQuantity),
          confidence: 0.75 + (Math.random() * 0.2), // 75-95% confidence
          category: medicine.category || 'General'
        });
      }
    });

    // Sort by risk (critical first) then by days to zero
    predictions.sort((a, b) => {
      if (a.risk === 'critical' && b.risk !== 'critical') return -1;
      if (a.risk !== 'critical' && b.risk === 'critical') return 1;
      return a.predictedDaysToZero - b.predictedDaysToZero;
    });

    return predictions;
  }

  calculateAverageConsumption(medicine, salesHistory) {
    // In a real app, this would analyze historical sales data
    // For demo purposes, calculate based on stock level and typical patterns
    
    if (!salesHistory || salesHistory.length === 0) {
      // Default calculation based on stock value
      if (medicine.stock > 100) return 5;
      if (medicine.stock > 50) return 3;
      if (medicine.stock > 20) return 2;
      if (medicine.stock > 5) return 1;
      return 0.5;
    }

    // Analyze sales history for this medicine
    const medicineSales = salesHistory.filter(sale => sale.medicineId === medicine.id);
    if (medicineSales.length === 0) return 1;
    
    const totalSold = medicineSales.reduce((sum, sale) => sum + sale.quantity, 0);
    const daysOfData = Math.max(1, medicineSales.length);
    return totalSold / daysOfData;
  }

  // Predict optimal reorder quantity
  async predictReorderQuantity(medicine, salesHistory = []) {
    const avgDailyConsumption = this.calculateAverageConsumption(medicine, salesHistory);
    const leadTime = 3; // days for delivery
    const safetyStock = avgDailyConsumption * 2;
    const reorderPoint = avgDailyConsumption * leadTime + safetyStock;
    
    let reorderQuantity = 0;
    if (medicine.stock <= reorderPoint) {
      reorderQuantity = Math.ceil(avgDailyConsumption * 14); // 2 weeks supply
    }
    
    return {
      medicineName: medicine.name,
      currentStock: medicine.stock,
      reorderPoint: Math.ceil(reorderPoint),
      suggestedOrderQuantity: reorderQuantity,
      avgDailyConsumption: Math.round(avgDailyConsumption * 10) / 10,
      confidence: 0.85
    };
  }
}

const stockAI = new StockAIPrediction();
export default stockAI;