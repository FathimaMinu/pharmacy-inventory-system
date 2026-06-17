package com.pharmacy.inventory.controller;

import com.pharmacy.inventory.model.Medicine;
import com.pharmacy.inventory.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:5173")  // Your frontend URL
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    // GET all medicines
    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    // GET medicine by ID
    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        return medicineService.getMedicineById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
    }

    // POST new medicine
    @PostMapping
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        Medicine savedMedicine = medicineService.addMedicine(medicine);
        return new ResponseEntity<>(savedMedicine, HttpStatus.CREATED);
    }

    // PUT update medicine
    @PutMapping("/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id, @RequestBody Medicine medicine) {
        return ResponseEntity.ok(medicineService.updateMedicine(id, medicine));
    }

    // DELETE medicine
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
        return ResponseEntity.ok().build();
    }

    // POST dispense medicine
    @PostMapping("/dispense")
    public ResponseEntity<Medicine> dispenseMedicine(@RequestParam Long id, @RequestParam int quantity) {
        return ResponseEntity.ok(medicineService.dispenseMedicine(id, quantity));
    }

    // GET low stock medicines (threshold < 10)
    @GetMapping("/low-stock")
    public ResponseEntity<List<Medicine>> getLowStockMedicines() {
        return ResponseEntity.ok(medicineService.getLowStockMedicines(10));
    }

    // GET low stock medicines with custom threshold
    @GetMapping("/low-stock/{threshold}")
    public ResponseEntity<List<Medicine>> getLowStockMedicines(@PathVariable int threshold) {
        return ResponseEntity.ok(medicineService.getLowStockMedicines(threshold));
    }

    // GET search medicines by name
    @GetMapping("/search")
    public ResponseEntity<List<Medicine>> searchMedicines(@RequestParam String name) {
        return ResponseEntity.ok(medicineService.searchMedicines(name));
    }

    // GET medicines by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Medicine>> getMedicinesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(medicineService.getMedicinesByCategory(category));
    }

    // GET medicines by manufacturer
    @GetMapping("/manufacturer/{manufacturer}")
    public ResponseEntity<List<Medicine>> getMedicinesByManufacturer(@PathVariable String manufacturer) {
        return ResponseEntity.ok(medicineService.getMedicinesByManufacturer(manufacturer));
    }
}