import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { crops, cropCategories } from "@/data/crops";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";

const CropLibrary = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = crops.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.hindiName.includes(search);
    const matchesCategory = category === "all" || c.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Crop Library</h1>
        <p className="text-muted-foreground mb-8">Explore detailed guides for major Indian crops</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search crops..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {cropCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((crop) => (
            <Link key={crop.id} to={`/crops/${crop.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow group hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{crop.image}</div>
                  <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">
                    {crop.name} <span className="text-muted-foreground text-sm font-sans">({crop.hindiName})</span>
                  </h3>
                  <Badge variant="secondary" className="mt-2 mb-3">{crop.category}</Badge>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>🌱 {crop.season}</p>
                    <p>🌍 {crop.soilType}</p>
                    <p>💧 {crop.waterNeeds}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No crops found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default CropLibrary;
