package com.pharmacy.inventory.service;

import com.pharmacy.inventory.model.Medicine;
import com.pharmacy.inventory.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    // Get all medicines
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    // Get medicine by ID (returns Optional)
    public Optional<Medicine> getMedicineById(Long id) {
        return medicineRepository.findById(id);
    }

    // Add new medicine
    @Transactional
    public Medicine addMedicine(Medicine medicine) {
        medicine.setCreatedAt(LocalDateTime.now());
        return medicineRepository.save(medicine);
    }

    // Update medicine
    @Transactional
    public Medicine updateMedicine(Long id, Medicine updatedMedicine) {
        return medicineRepository.findById(id)
                .map(medicine -> {
                    medicine.setName(updatedMedicine.getName());
                    medicine.setCategory(updatedMedicine.getCategory());
                    medicine.setStock(updatedMedicine.getStock());
                    medicine.setPrice(updatedMedicine.getPrice());
                    medicine.setManufacturer(updatedMedicine.getManufacturer());
                    return medicineRepository.save(medicine);
                })
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
    }

    // Delete medicine
    @Transactional
    public void deleteMedicine(Long id) {
        if (!medicineRepository.existsById(id)) {
            throw new RuntimeException("Medicine not found with id: " + id);
        }
        medicineRepository.deleteById(id);
    }

    // Dispense medicine (reduce stock)
    @Transactional
    public Medicine dispenseMedicine(Long id, int quantity) {
        return medicineRepository.findById(id)
                .map(medicine -> {
                    if (medicine.getStock() < quantity) {
                        throw new RuntimeException("Insufficient stock! Available: " + medicine.getStock() + ", Requested: " + quantity);
                    }
                    medicine.setStock(medicine.getStock() - quantity);
                    return medicineRepository.save(medicine);
                })
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
    }

    // Get low stock medicines
    public List<Medicine> getLowStockMedicines(int threshold) {
        return medicineRepository.findByStockLessThan(threshold);
    }

    // Search medicines by name
    public List<Medicine> searchMedicines(String name) {
        return medicineRepository.findByNameContainingIgnoreCase(name);
    }

    // Get medicines by category
    public List<Medicine> getMedicinesByCategory(String category) {
        return medicineRepository.findByCategory(category);
    }

    // Get medicines by manufacturer
    public List<Medicine> getMedicinesByManufacturer(String manufacturer) {
        return medicineRepository.findByManufacturer(manufacturer);
    }
}