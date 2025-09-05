import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Coffee } from "lucide-react";
export const TrustSection = () => {
  return <section className="py-24 bg-gradient-subtle">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="flex space-x-6">
                <div className="w-16 h-16 bg-notion-light-gray rounded-2xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-notion-gray" />
                </div>
                <div className="w-16 h-16 bg-notion-light-gray rounded-2xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-notion-gray" />
                </div>
                <div className="w-16 h-16 bg-notion-light-gray rounded-2xl flex items-center justify-center">
                  <Coffee className="h-8 w-8 text-notion-gray" />
                </div>
              </div>
            </div>
            
            <h2 className="text-5xl font-bold text-foreground mb-8">
              Your Privacy, Our Promise
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We only ask for your email to send the coffee code. We never sell or share your email. 
              One coffee per person – so everyone gets a chance to enjoy. 
              Your honest opinions help local businesses improve while you enjoy great coffee.
            </p>
          </div>
          
          
        </div>
      </div>
    </section>;
};