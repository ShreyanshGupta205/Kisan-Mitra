import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, Search } from "lucide-react";
import { mandiRates, mandiStates, mandiCommodities } from "@/data/mandiRates";
import Navbar from "@/components/Navbar";

const MandiRates = () => {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [cropFilter, setCropFilter] = useState("all");

  const filtered = mandiRates.filter((r) => {
    const matchesSearch = r.commodity.toLowerCase().includes(search.toLowerCase()) || r.mandi.toLowerCase().includes(search.toLowerCase());
    const matchesState = stateFilter === "all" || r.state === stateFilter;
    const matchesCrop = cropFilter === "all" || r.commodity === cropFilter;
    return matchesSearch && matchesState && matchesCrop;
  });

  const TrendIcon = ({ current, previous }: { current: number; previous: number }) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-primary inline" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-destructive inline" />;
    return <Minus className="h-4 w-4 text-muted-foreground inline" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Mandi Rates</h1>
        <p className="text-muted-foreground mb-8">Today's commodity prices across Indian mandis</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search commodity or mandi..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={cropFilter} onValueChange={setCropFilter}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Commodity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Commodities</SelectItem>
              {mandiCommodities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="State" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {mandiStates.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commodity</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Mandi</TableHead>
                  <TableHead className="text-right">Min (₹)</TableHead>
                  <TableHead className="text-right">Max (₹)</TableHead>
                  <TableHead className="text-right">Modal (₹)</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.commodity}</TableCell>
                    <TableCell>{r.state}</TableCell>
                    <TableCell>{r.mandi}</TableCell>
                    <TableCell className="text-right">₹{r.minPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{r.maxPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-semibold">₹{r.modalPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <TrendIcon current={r.modalPrice} previous={r.previousModalPrice} />
                      <span className="ml-1 text-xs text-muted-foreground">
                        {r.modalPrice !== r.previousModalPrice && `${r.modalPrice > r.previousModalPrice ? "+" : ""}${r.modalPrice - r.previousModalPrice}`}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filtered.map((r) => (
            <Card key={r.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  {r.commodity}
                  <TrendIcon current={r.modalPrice} previous={r.previousModalPrice} />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p className="text-muted-foreground">{r.mandi}, {r.state}</p>
                <div className="flex justify-between">
                  <span>Min: ₹{r.minPrice.toLocaleString()}</span>
                  <span>Max: ₹{r.maxPrice.toLocaleString()}</span>
                </div>
                <p className="font-semibold text-primary">Modal: ₹{r.modalPrice.toLocaleString()}/{r.unit}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No rates found matching your filters.</div>
        )}
      </div>
    </div>
  );
};

export default MandiRates;
