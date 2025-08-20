import { useState } from "react";
import { Copy, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PromptCardProps {
  prompt: string;
  accuracy: number;
  type: "detailed" | "brief";
}

const PromptCard = ({ prompt, accuracy, type }: PromptCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const getAccuracyColor = (acc: number) => {
    if (acc >= 90) return "text-success";
    if (acc >= 75) return "text-primary";
    if (acc >= 60) return "text-yellow-500";
    return "text-destructive";
  };

  const renderStars = (rating: number) => {
    const stars = Math.round(rating / 20); // Convert to 5-star scale
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < stars ? "text-primary fill-primary" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Card className="bg-gradient-secondary border-border/50 shadow-card hover:shadow-glow transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${type === 'detailed' ? 'text-primary' : 'text-success'}`}>
              {type === 'detailed' ? 'Detailed' : 'Brief'} Prompt
            </span>
            <div className="flex items-center space-x-1">
              {renderStars(accuracy)}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-bold ${getAccuracyColor(accuracy)}`}>
              {accuracy}%
            </span>
            <span className="text-xs text-muted-foreground">accuracy</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/90 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
          {prompt}
        </p>
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="w-full bg-background/50 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Prompt
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PromptCard;