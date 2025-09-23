import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Premium_nightlife_hero_background_99112bdb.png";

interface HeroSectionProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export default function HeroSection({ onSignIn, onSignUp }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-2xl">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">SPICE</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Start your dating
          <br />
          <span className="text-primary">journey today</span>
        </h2>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
          Join thousands of adventurous singles and couples exploring connections 
          in a safe, premium environment.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={onSignIn}
            variant="outline"
            size="lg"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6"
            data-testid="button-hero-signin"
          >
            Sign In
          </Button>
          <Button
            onClick={onSignUp}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            data-testid="button-hero-signup"
          >
            Sign Up
          </Button>
        </div>
        
        {/* Age Verification Notice */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <p className="text-lg font-semibold mb-2">
            🔞 <strong>Adults Only Platform</strong>
          </p>
          <p className="text-sm text-white/80">
            Premium lifestyle community for 18+ verified members only.
            <br />
            Your privacy and discretion are our top priorities.
          </p>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-8 flex justify-center items-center gap-6 text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Verified Members</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Secure Platform</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm">Premium Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
}