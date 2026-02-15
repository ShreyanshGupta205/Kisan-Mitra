import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, BarChart3, MessageCircle, Truck, Users, BookOpen, TrendingUp, Wheat } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const features = [
  { icon: BookOpen, title: "Crop Library", desc: "Detailed guides on 500+ crops with best practices", to: "/crops", color: "text-primary" },
  { icon: BarChart3, title: "Mandi Rates", desc: "Live commodity prices from mandis across India", to: "/mandi-rates", color: "text-accent" },
  { icon: MessageCircle, title: "Community Q&A", desc: "Ask questions, share knowledge with fellow farmers", to: "/community", color: "text-leaf" },
  { icon: Truck, title: "Transport Support", desc: "Find reliable transport for your produce", to: "/transport", color: "text-earth" },
];

const stats = [
  { icon: Wheat, value: "500+", label: "Crops Covered" },
  { icon: Users, value: "10K+", label: "Farmers" },
  { icon: TrendingUp, value: "50+", label: "Mandis Tracked" },
  { icon: MessageCircle, value: "2K+", label: "Questions Answered" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-leaf/5" />
        <div className="container relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sprout className="h-4 w-4" />
              India's Farmer Intelligence Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Grow Smarter,{" "}
              <span className="text-primary">Harvest Better</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Your complete farming companion — crop intelligence, real-time mandi rates, expert community support, and transport services, all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/crops">Explore Crops</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/community">Join Community</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container py-16">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link to={f.to}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group border-transparent hover:border-primary/20">
                  <CardContent className="p-6">
                    <f.icon className={`h-10 w-10 ${f.color} mb-4 group-hover:scale-110 transition-transform`} />
                    <h3 className="font-serif text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary/5 py-16">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-serif font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            <span className="font-serif font-semibold text-foreground">KisanMitra</span>
          </div>
          <p>© 2026 KisanMitra. Empowering Indian farmers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
