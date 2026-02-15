export interface TransportService {
  id: string;
  providerName: string;
  region: string;
  state: string;
  vehicleType: string;
  capacity: string;
  contactPhone: string;
  contactEmail: string;
  serviceArea: string;
  priceRange: string;
  rating: number;
  available: boolean;
}

export const transportServices: TransportService[] = [
  { id: "1", providerName: "Kisan Transport Co.", region: "North India", state: "Punjab", vehicleType: "Truck (10T)", capacity: "10 tonnes", contactPhone: "+91 98765 43210", contactEmail: "kisan.transport@email.com", serviceArea: "Punjab, Haryana, Delhi NCR", priceRange: "₹15–25/km", rating: 4.5, available: true },
  { id: "2", providerName: "Agri Movers", region: "North India", state: "Uttar Pradesh", vehicleType: "Mini Truck (3T)", capacity: "3 tonnes", contactPhone: "+91 98765 43211", contactEmail: "agrimovers@email.com", serviceArea: "UP, Bihar, Jharkhand", priceRange: "₹12–18/km", rating: 4.2, available: true },
  { id: "3", providerName: "Maharashtra Farm Logistics", region: "West India", state: "Maharashtra", vehicleType: "Truck (15T)", capacity: "15 tonnes", contactPhone: "+91 98765 43212", contactEmail: "mfl.logistics@email.com", serviceArea: "Maharashtra, Goa, Karnataka", priceRange: "₹18–30/km", rating: 4.7, available: true },
  { id: "4", providerName: "Deccan Cargo", region: "South India", state: "Karnataka", vehicleType: "Pickup (1.5T)", capacity: "1.5 tonnes", contactPhone: "+91 98765 43213", contactEmail: "deccan.cargo@email.com", serviceArea: "Karnataka, Tamil Nadu, Kerala", priceRange: "₹10–15/km", rating: 4.0, available: false },
  { id: "5", providerName: "Green Valley Transport", region: "South India", state: "Tamil Nadu", vehicleType: "Refrigerated Van", capacity: "5 tonnes", contactPhone: "+91 98765 43214", contactEmail: "greenvalley@email.com", serviceArea: "Tamil Nadu, Andhra Pradesh", priceRange: "₹25–40/km", rating: 4.8, available: true },
  { id: "6", providerName: "Gujarat Agri Freight", region: "West India", state: "Gujarat", vehicleType: "Truck (10T)", capacity: "10 tonnes", contactPhone: "+91 98765 43215", contactEmail: "gaf.transport@email.com", serviceArea: "Gujarat, Rajasthan, MP", priceRange: "₹14–22/km", rating: 4.3, available: true },
  { id: "7", providerName: "Eastern Express", region: "East India", state: "West Bengal", vehicleType: "Mini Truck (3T)", capacity: "3 tonnes", contactPhone: "+91 98765 43216", contactEmail: "eastern.exp@email.com", serviceArea: "West Bengal, Odisha, Assam", priceRange: "₹11–17/km", rating: 4.1, available: true },
  { id: "8", providerName: "MP Kisan Carriers", region: "Central India", state: "Madhya Pradesh", vehicleType: "Tractor Trolley", capacity: "4 tonnes", contactPhone: "+91 98765 43217", contactEmail: "mp.carriers@email.com", serviceArea: "MP, Chhattisgarh, Rajasthan", priceRange: "₹8–12/km", rating: 3.9, available: true },
];

export const transportRegions = [...new Set(transportServices.map((t) => t.region))];
export const transportVehicleTypes = [...new Set(transportServices.map((t) => t.vehicleType))];
