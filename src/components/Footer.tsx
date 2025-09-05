export const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="container px-4">
        <div className="text-center">
          <p className="text-xl text-foreground mb-4">
            Made with ☕ in Riga by CoffeeData
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            CoffeeData is an experimental project started in Riga. Questions? → ruslan@email.com
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