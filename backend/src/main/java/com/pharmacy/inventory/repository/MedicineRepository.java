package com.pharmacy.inventory.repository;

import com.pharmacy.inventory.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    // Custom query methods
    List<Medicine> findByStockLessThan(int threshold);
    List<Medicine> findByCategory(String category);
    List<Medicine> findByManufacturer(String manufacturer);
    List<Medicine> findByNameContainingIgnoreCase(String name);
}