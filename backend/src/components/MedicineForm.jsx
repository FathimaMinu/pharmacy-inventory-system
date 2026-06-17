import { useState } from "react";
import { addMedicine } from "../services/medicineService";

export default function MedicineForm({ refresh }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMedicine({ name, quantity: +quantity, price: +price, manufacturer });
    setName(""); setQuantity(""); setPrice(""); setManufacturer("");
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Add Medicine</h2>
      <input className="border p-1 m-1" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-1 m-1" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} type="number"/>
      <input className="border p-1 m-1" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} type="number"/>
      <input className="border p-1 m-1" placeholder="Manufacturer" value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded m-1">Add</button>
    </form>
  )
}