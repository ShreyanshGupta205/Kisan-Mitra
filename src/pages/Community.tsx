import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MessageCircle, ThumbsUp, Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import type { Session } from "@supabase/supabase-js";

const CATEGORIES = ["Pest Control", "Soil Health", "Irrigation", "Seeds & Varieties", "Market Advice", "Equipment", "General"];

interface Question {
  id: string;
  title: string;
  body: string;
  category: string;
  created_at: string;
  user_id: string;
  author_name: string;
  answers_count: number;
  upvotes: number;
}

const Community = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // New question form
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setQuestions(data as Question[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast({ title: "Please log in", description: "You need to be logged in to ask questions.", variant: "destructive" });
      return;
    }

    const profile = await supabase.from("profiles").select("full_name").eq("id", session.user.id).maybeSingle();
    const authorName = profile.data?.full_name || session.user.email || "Anonymous";

    const { error } = await supabase.from("questions").insert({
      title: newTitle,
      body: newBody,
      category: newCategory,
      user_id: session.user.id,
      author_name: authorName,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Question posted!" });
      setNewTitle("");
      setNewBody("");
      setDialogOpen(false);
      fetchQuestions();
    }
  };

  const handleUpvote = async (questionId: string) => {
    if (!session) {
      toast({ title: "Please log in to upvote", variant: "destructive" });
      return;
    }
    await supabase.rpc("upvote_question", { question_id: questionId });
    fetchQuestions();
  };

  const filtered = questions.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || q.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-serif font-bold">Community Q&A</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Ask Question</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-serif">Ask a Question</DialogTitle>
              </DialogHeader>
              {!session ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">You need to be logged in to ask questions.</p>
                  <Button asChild><Link to="/auth">Log In / Sign Up</Link></Button>
                </div>
              ) : (
                <form onSubmit={handleAskQuestion} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's your question?" />
                  </div>
                  <div className="space-y-2">
                    <Label>Details</Label>
                    <Textarea required value={newBody} onChange={(e) => setNewBody(e.target.value)} placeholder="Describe your question in detail..." rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newCategory} onValueChange={setNewCategory}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">Post Question</Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground mb-8">Ask questions, share knowledge, help fellow farmers</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search questions..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Loading questions...</div>
        ) : (
          <div className="space-y-4">
            {filtered.map((q) => (
              <Link key={q.id} to={`/community/${q.id}`}>
                <Card className="hover:shadow-md transition-shadow hover:border-primary/20 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground min-w-[48px]">
                        <button
                          onClick={(e) => { e.preventDefault(); handleUpvote(q.id); }}
                          className="hover:text-primary transition-colors"
                        >
                          <ThumbsUp className="h-5 w-5" />
                        </button>
                        <span>{q.upvotes || 0}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg font-semibold mb-1">{q.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{q.body}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary">{q.category}</Badge>
                          <span className="flex items-center gap-1"><User className="h-3 w-3" />{q.author_name}</span>
                          <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{q.answers_count || 0} answers</span>
                          <span>{new Date(q.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                {questions.length === 0 ? "No questions yet. Be the first to ask!" : "No questions match your search."}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
