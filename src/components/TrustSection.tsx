import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Coffee } from "lucide-react";

export const TrustSection = () => {
  return (
    <section className="py-20 bg-gradient-coffee">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-warm">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-8">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-coffee-accent/20 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-coffee-accent" />
                  </div>
                  <div className="w-12 h-12 bg-coffee-accent/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-coffee-accent" />
                  </div>
                  <div className="w-12 h-12 bg-coffee-accent/20 rounded-full flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-coffee-accent" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Your Privacy, Our Promise
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                We only ask for your email to send the coffee code. We never sell or share your email. 
                One coffee per person – so everyone gets a chance to enjoy. 
                Your honest opinions help local businesses improve while you enjoy great coffee.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-coffee-accent mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Privacy Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-coffee-accent mb-2">1</div>
                  <div className="text-sm text-muted-foreground">Coffee Per Person</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-coffee-accent mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Partner Cafes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};