import { useState } from "react";
import Navigation from "@/components/Navigation";
import PromptCard from "@/components/PromptCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Zap, Brain, Target, Key } from "lucide-react";

interface GeneratedPrompt {
  id: string;
  prompt: string;
  accuracy: number;
  type: "detailed" | "brief";
}

const Index = () => {
  const [input, setInput] = useState("");
  const [isDetailed, setIsDetailed] = useState(true);
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompt[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini-api-key') || "");
  const { toast } = useToast();

  const generatePrompts = async () => {
    if (!input.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Enter a topic or keyword to generate prompts",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to generate prompts",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Save API key to localStorage
      localStorage.setItem('gemini-api-key', apiKey);

      const systemPrompt = isDetailed 
        ? `You are a prompt engineering expert. Generate 3 different detailed, comprehensive prompts for the topic "${input}". Each prompt should be thorough, analytical, and suitable for getting in-depth responses. Make them different approaches but all detailed. Return only a JSON array with objects containing: id (string), prompt (string), accuracy (number 85-95), type ("detailed").`
        : `You are a prompt engineering expert. Generate 3 different brief, concise prompts for the topic "${input}". Each prompt should be short, direct, and suitable for getting quick responses. Make them different approaches but all brief. Return only a JSON array with objects containing: id (string), prompt (string), accuracy (number 80-90), type ("brief").`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        throw new Error('No response generated');
      }

      // Try to parse the JSON response
      let parsedPrompts;
      try {
        // Clean the response - remove any markdown formatting
        const cleanedText = generatedText.replace(/```json\n?|\n?```/g, '').trim();
        parsedPrompts = JSON.parse(cleanedText);
      } catch (parseError) {
        // Fallback: create prompts from the raw text
        const fallbackPrompts = isDetailed
          ? [
              {
                id: "1",
                prompt: `Create a comprehensive analysis of "${input}" that explores its multifaceted dimensions, historical context, current applications, and future implications. Include specific examples, statistical data where relevant, and consider both positive and negative aspects.`,
                accuracy: 92,
                type: "detailed" as const
              },
              {
                id: "2", 
                prompt: `Develop an in-depth exploration of "${input}" by examining its core principles, evolution over time, and impact across different industries or contexts. Provide detailed case studies and comparative analysis.`,
                accuracy: 89,
                type: "detailed" as const
              },
              {
                id: "3",
                prompt: `Analyze "${input}" from multiple perspectives including technical, social, economic, and ethical considerations. Break down complex concepts and discuss both immediate and long-term implications.`,
                accuracy: 91,
                type: "detailed" as const
              }
            ]
          : [
              {
                id: "1",
                prompt: `Explain "${input}" in simple terms with key benefits and main applications.`,
                accuracy: 85,
                type: "brief" as const
              },
              {
                id: "2",
                prompt: `What is "${input}" and why is it important? Provide 3-5 main points.`,
                accuracy: 82,
                type: "brief" as const
              },
              {
                id: "3",
                prompt: `Give me a quick overview of "${input}" with practical examples.`,
                accuracy: 87,
                type: "brief" as const
              }
            ];
        parsedPrompts = fallbackPrompts;
      }

      // Validate the response format
      if (!Array.isArray(parsedPrompts) || parsedPrompts.length === 0) {
        throw new Error('Invalid response format');
      }

      setGeneratedPrompts(parsedPrompts);
      toast({
        title: "Prompts Generated!",
        description: `Generated ${parsedPrompts.length} ${isDetailed ? 'detailed' : 'brief'} prompts successfully.`,
      });

    } catch (error) {
      console.error('Error generating prompts:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate prompts. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-glow">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Prompt Generation</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Craft Perfect Prompts
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform any topic into powerful, accurate prompts. Choose between detailed comprehensive prompts or brief focused ones.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 rounded-lg bg-gradient-primary shadow-glow">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Intelligent Generation</h3>
              <p className="text-sm text-muted-foreground text-center">
                AI-powered prompts with accuracy ratings
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 rounded-lg bg-gradient-primary shadow-glow">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Precision Control</h3>
              <p className="text-sm text-muted-foreground text-center">
                Choose between detailed or brief formats
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 rounded-lg bg-gradient-primary shadow-glow">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Instant Results</h3>
              <p className="text-sm text-muted-foreground text-center">
                Generate multiple variations instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-secondary border-border/50 shadow-card">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Generate Your Prompts</h2>
                  <p className="text-muted-foreground">
                    Enter a topic or keyword to generate tailored prompts
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="topic" className="text-base font-medium">
                      Topic or Keyword
                    </Label>
                    <Input
                      id="topic"
                      placeholder="e.g., artificial intelligence, cooking, photography..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="mt-2 bg-background/50 border-border/50 focus:border-primary"
                      onKeyPress={(e) => e.key === 'Enter' && generatePrompts()}
                    />
                  </div>

                  <div>
                    <Label htmlFor="apikey" className="text-base font-medium flex items-center space-x-2">
                      <Key className="h-4 w-4" />
                      <span>Gemini API Key</span>
                    </Label>
                    <Input
                      id="apikey"
                      type="password"
                      placeholder="Enter your Gemini API key..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="mt-2 bg-background/50 border-border/50 focus:border-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Get your free API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google AI Studio</a>
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Switch
                      id="mode"
                      checked={isDetailed}
                      onCheckedChange={setIsDetailed}
                    />
                    <Label htmlFor="mode" className="text-sm">
                      {isDetailed ? (
                        <span className="flex items-center space-x-2">
                          <Brain className="h-4 w-4 text-primary" />
                          <span>Deep Detailed Prompts (Comprehensive analysis)</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-success" />
                          <span>Light Brief Prompts (Quick & concise)</span>
                        </span>
                      )}
                    </Label>
                  </div>

                  <Button
                    onClick={generatePrompts}
                    disabled={!input.trim() || !apiKey.trim() || isGenerating}
                    variant="gradient"
                    className="w-full font-medium py-3"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                        Generating Prompts...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Prompts
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {generatedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Generated Prompts</h3>
                <p className="text-muted-foreground">
                  {isDetailed ? 'Detailed' : 'Brief'} prompts for "{input}" with accuracy ratings
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {generatedPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt.prompt}
                    accuracy={prompt.accuracy}
                    type={prompt.type}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="mt-16 border-t border-border/50 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-muted-foreground text-sm">
            © 2025 PromptCrafter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;