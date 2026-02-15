import { useParams, Link } from "react-router-dom";
import { crops } from "@/data/crops";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Droplets, Sun, Sprout, Clock, BarChart3, Bug } from "lucide-react";

const CropDetail = () => {
  const { id } = useParams();
  const crop = crops.find((c) => c.id === id);

  if (!crop) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Crop not found</h1>
          <Button asChild><Link to="/crops">Back to Crop Library</Link></Button>
        </div>
      </div>
    );
  }

  const infoCards = [
    { icon: Sun, label: "Season", value: crop.season },
    { icon: Sprout, label: "Soil Type", value: crop.soilType },
    { icon: Droplets, label: "Water Needs", value: crop.waterNeeds },
    { icon: Clock, label: "Growing Period", value: crop.growingPeriod },
    { icon: BarChart3, label: "Expected Yield", value: crop.expectedYield },
    { icon: Sun, label: "Climate", value: crop.climate },
  ];

  const practices = [
    { title: "Sowing", content: crop.bestPractices.sowing },
    { title: "Irrigation", content: crop.bestPractices.irrigation },
    { title: "Pest Control", content: crop.bestPractices.pestControl },
    { title: "Harvesting", content: crop.bestPractices.harvesting },
    { title: "Fertilizer Schedule", content: crop.bestPractices.fertilizer },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/crops"><ArrowLeft className="h-4 w-4 mr-2" />Back to Crop Library</Link>
        </Button>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{crop.image}</span>
          <div>
            <h1 className="text-3xl font-serif font-bold">{crop.name} <span className="text-muted-foreground text-xl font-sans">({crop.hindiName})</span></h1>
            <Badge variant="secondary" className="mt-1">{crop.category}</Badge>
          </div>
        </div>

        <p className="text-muted-foreground mb-8 max-w-3xl">{crop.overview}</p>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {infoCards.map((info) => (
            <Card key={info.label}>
              <CardContent className="p-4 flex items-start gap-3">
                <info.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className="text-sm font-medium">{info.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Best Practices */}
        <h2 className="text-2xl font-serif font-bold mb-4">Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {practices.map((p) => (
            <Card key={p.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{p.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Diseases */}
        <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2">
          <Bug className="h-5 w-5 text-destructive" /> Common Diseases
        </h2>
        <div className="flex flex-wrap gap-2">
          {crop.diseases.map((d) => (
            <Badge key={d} variant="outline" className="text-sm">{d}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropDetail;
