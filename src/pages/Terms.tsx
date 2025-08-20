import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Users, AlertTriangle } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Terms and Conditions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using PromptCrafter.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-secondary border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>1. Acceptance of Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                By accessing and using PromptCrafter ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
              <p>
                We reserve the right to update these terms at any time without prior notice. Your continued use of the service after any changes indicates your acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>2. Use of Service</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                PromptCrafter is designed to help users generate AI prompts based on topics or keywords. The service is provided "as is" and we make no warranties about the accuracy, reliability, or suitability of the generated prompts.
              </p>
              <p>
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for lawful purposes only</li>
                <li>Not attempt to damage, disable, or impair the service</li>
                <li>Not use the service to generate harmful, illegal, or inappropriate content</li>
                <li>Respect intellectual property rights</li>
                <li>Not reverse engineer or attempt to extract source code</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>3. Privacy and Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We respect your privacy and are committed to protecting your personal information. When you use PromptCrafter:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We may collect usage data to improve our service</li>
                <li>We do not store or share your generated prompts unless explicitly stated</li>
                <li>We use cookies and similar technologies for functionality and analytics</li>
                <li>We do not sell your personal information to third parties</li>
                <li>You can contact us to request deletion of your data</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <span>4. Disclaimers and Limitations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong>Accuracy:</strong> While we strive to provide high-quality prompt suggestions with accuracy ratings, these are estimates and should not be considered guarantees. The effectiveness of prompts may vary based on usage context.
              </p>
              <p>
                <strong>Availability:</strong> We make no guarantee that the service will be available at all times. The service may be temporarily unavailable due to maintenance, updates, or technical issues.
              </p>
              <p>
                <strong>Liability:</strong> In no event shall PromptCrafter be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>5. Intellectual Property</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                The PromptCrafter service, including its design, functionality, and underlying technology, is owned by us and is protected by copyright and other intellectual property laws.
              </p>
              <p>
                Generated prompts: You retain rights to the prompts you generate using our service. However, we may use anonymized and aggregated data to improve our algorithms and service quality.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>6. Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                <a 
                  href="mailto:devangkhatri011@gmail.com"
                  className="text-primary hover:text-primary-glow font-medium transition-colors"
                >
                  devangkhatri011@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
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

export default Terms;