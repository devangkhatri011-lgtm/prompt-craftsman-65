import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Globe } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about PromptCrafter? We'd love to hear from you.
            Get in touch and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-secondary border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Email Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                For support, feedback, or general inquiries, please reach out to us at:
              </p>
              <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                <a 
                  href="mailto:devangkhatri011@gmail.com"
                  className="text-primary hover:text-primary-glow font-medium transition-colors"
                >
                  devangkhatri011@gmail.com
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24-48 hours during business days.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>What We Can Help With</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1.5 text-xs">●</span>
                  <span>Technical support and bug reports</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1.5 text-xs">●</span>
                  <span>Feature requests and suggestions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1.5 text-xs">●</span>
                  <span>Questions about prompt generation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1.5 text-xs">●</span>
                  <span>Business inquiries and partnerships</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1.5 text-xs">●</span>
                  <span>General feedback about the platform</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-glow border-border/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2 text-center">
              <Globe className="h-5 w-5 text-primary" />
              <p className="text-muted-foreground">
                Visit our website regularly for updates and new features. We're constantly improving PromptCrafter to serve you better.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

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

export default Contact;