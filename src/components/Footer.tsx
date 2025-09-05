export const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="container px-4">
        <div className="text-center">
          <p className="text-xl text-foreground mb-6">
            Made with ☕ in Riga by CoffeeData
          </p>
          <div className="flex justify-center space-x-8">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors text-lg"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors text-lg"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};