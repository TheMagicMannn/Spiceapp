import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSignup: () => void;
  onForgotPassword: () => void;
  isLoading?: boolean;
}

export default function LoginForm({
  onLogin,
  onSignup,
  onForgotPassword,
  isLoading = false,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Login attempt with email: ${email}`);
    onLogin(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-2xl border border-card-border">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">SPICE</h1>
        <h2 className="text-xl font-semibold mb-2">Welcome Back</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to continue your journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="pl-10"
              required
              data-testid="input-email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="pl-10 pr-10"
              required
              data-testid="input-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setShowPassword(!showPassword)}
              data-testid="button-toggle-password"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              data-testid="checkbox-remember"
            />
            <Label htmlFor="remember" className="text-sm text-muted-foreground">
              Remember me
            </Label>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="p-0 h-auto text-sm text-primary hover:text-primary/80"
            onClick={onForgotPassword}
            data-testid="button-forgot-password"
          >
            Forgot Password?
          </Button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isLoading || !email || !password}
          data-testid="button-sign-in"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-4 text-muted-foreground">Or</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-sm text-muted-foreground">New to SPICE? </span>
          <Button
            type="button"
            variant="ghost"
            className="p-0 h-auto text-sm text-primary hover:text-primary/80"
            onClick={onSignup}
            data-testid="button-create-account"
          >
            Create Account
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground mb-2">
          🔞 <strong>Adults Only Platform</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Premium lifestyle community for 18+ verified members only.
          Your privacy and discretion are our top priorities.
        </p>
      </div>
    </div>
  );
}