import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ThumbsUp, User, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import type { Session } from "@supabase/supabase-js";

interface Answer {
  id: string;
  body: string;
  created_at: string;
  user_id: string;
  author_name: string;
  upvotes: number;
}

interface Question {
  id: string;
  title: string;
  body: string;
  category: string;
  created_at: string;
  user_id: string;
  author_name: string;
  upvotes: number;
  answers_count: number;
}

const QuestionDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [qRes, aRes] = await Promise.all([
      supabase.from("questions").select("*").eq("id", id).maybeSingle(),
      supabase.from("answers").select("*").eq("question_id", id).order("upvotes", { ascending: false }),
    ]);
    if (qRes.data) setQuestion(qRes.data as Question);
    if (aRes.data) setAnswers(aRes.data as Answer[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [id]);

  const handlePostAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast({ title: "Please log in to answer", variant: "destructive" });
      return;
    }
    const profile = await supabase.from("profiles").select("full_name").eq("id", session.user.id).maybeSingle();
    const authorName = profile.data?.full_name || session.user.email || "Anonymous";

    const { error } = await supabase.from("answers").insert({
      question_id: id,
      body: newAnswer,
      user_id: session.user.id,
      author_name: authorName,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setNewAnswer("");
      // Update answers count
      await supabase.from("questions").update({ answers_count: (question?.answers_count || 0) + 1 } as any).eq("id", id);
      fetchData();
    }
  };

  const handleUpvoteAnswer = async (answerId: string) => {
    if (!session) { toast({ title: "Please log in to upvote", variant: "destructive" }); return; }
    await supabase.rpc("upvote_answer", { answer_id: answerId });
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 text-center">
          <h2 className="text-xl font-serif font-bold mb-4">Question not found</h2>
          <Button asChild><Link to="/community">Back to Community</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-3xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/community"><ArrowLeft className="h-4 w-4 mr-2" />Back to Community</Link>
        </Button>

        {/* Question */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <Badge variant="secondary" className="mb-3">{question.category}</Badge>
            <h1 className="text-2xl font-serif font-bold mb-3">{question.title}</h1>
            <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{question.body}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{question.author_name}</span>
              <span>{new Date(question.created_at).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" />{question.upvotes || 0}</span>
            </div>
          </CardContent>
        </Card>

        {/* Answers */}
        <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" /> {answers.length} Answers
        </h2>

        <div className="space-y-4 mb-8">
          {answers.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-5">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <button onClick={() => handleUpvoteAnswer(a.id)} className="text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-muted-foreground">{a.upvotes || 0}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap mb-2">{a.body}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{a.author_name}</span>
                      <span>{new Date(a.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Post Answer */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-serif font-semibold mb-3">Your Answer</h3>
            {!session ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-3">Log in to post an answer</p>
                <Button asChild><Link to="/auth">Log In / Sign Up</Link></Button>
              </div>
            ) : (
              <form onSubmit={handlePostAnswer} className="space-y-4">
                <Textarea required value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Write your answer..." rows={4} />
                <Button type="submit">Post Answer</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionDetail;
