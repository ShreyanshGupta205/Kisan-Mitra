import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Truck, Phone, Mail, MapPin, Star } from "lucide-react";
import { transportServices, transportRegions, transportVehicleTypes } from "@/data/transport";
import Navbar from "@/components/Navbar";

const Transport = () => {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [vehicleFilter, setVehicleFilter] = useState("all");

  const filtered = transportServices.filter((t) => {
    const matchesSearch = t.providerName.toLowerCase().includes(search.toLowerCase()) || t.serviceArea.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = regionFilter === "all" || t.region === regionFilter;
    const matchesVehicle = vehicleFilter === "all" || t.vehicleType === vehicleFilter;
    return matchesSearch && matchesRegion && matchesVehicle;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Transport Support</h1>
        <p className="text-muted-foreground mb-8">Find reliable transport services for your agricultural produce</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search provider or area..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Region" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {transportRegions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Vehicle Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vehicles</SelectItem>
              {transportVehicleTypes.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <Card key={t.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base font-serif">{t.providerName}</CardTitle>
                  <Badge variant={t.available ? "default" : "secondary"}>
                    {t.available ? "Available" : "Busy"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 text-harvest fill-harvest" />
                  {t.rating}
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary shrink-0" />
                  <span>{t.vehicleType} · {t.capacity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>{t.serviceArea}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{t.contactPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-xs">{t.contactEmail}</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="font-semibold text-primary">{t.priceRange}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No transport services found matching your filters.</div>
        )}
      </div>
    </div>
  );
};

export default Transport;
