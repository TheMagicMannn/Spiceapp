import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components
import HeroSection from "@/components/HeroSection";
import LoginForm from "@/components/LoginForm";
import SwipeInterface from "@/components/SwipeInterface";
import ChatInterface from "@/components/ChatInterface";
import BottomNavigation from "@/components/BottomNavigation";
import MatchModal from "@/components/MatchModal";
import PremiumModal from "@/components/PremiumModal";
import SignupForm from "@/components/SignupForm"; // Assuming SignupForm is created and imported

// Mock data - TODO: remove mock functionality
import femaleProfile from "@assets/generated_images/Female_profile_photo_sample_cb9ac9a5.png";
import maleProfile from "@assets/generated_images/Male_profile_photo_sample_254e53d5.png";
import coupleProfile from "@assets/generated_images/Couple_profile_photo_sample_c7dce5fc.png";

function Router() {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "signup">("landing");
  const [activeTab, setActiveTab] = useState<"discover" | "matches" | "messages" | "profile" | "premium">("discover");
  const [showMatch, setShowMatch] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  // TODO: remove mock functionality
  const mockProfiles = [
    {
      id: "1",
      name: "Alexandra",
      age: 28,
      location: "Manhattan, NY",
      photos: [femaleProfile],
      bio: "Wine enthusiast, yoga instructor, and adventure seeker. Looking for genuine connections with like-minded individuals who appreciate the finer things in life.",
      interests: ["Wine Tasting", "Yoga", "Travel", "Fine Dining", "Art", "Dancing", "Hiking", "Photography"],
      isVerified: true,
      isPremium: true,
      profileType: "single" as const
    },
    {
      id: "2",
      name: "Marcus & Sarah",
      age: 32,
      location: "Brooklyn, NY",
      photos: [coupleProfile],
      bio: "Adventurous couple seeking new experiences and meaningful connections. We love exploring the city's nightlife and cultural scene together.",
      interests: ["Dancing", "Travel", "Fine Dining", "Music", "Art Galleries", "Wine"],
      isVerified: true,
      isPremium: false,
      profileType: "couple" as const
    },
    {
      id: "3",
      name: "James",
      age: 35,
      location: "Chelsea, NY",
      photos: [maleProfile],
      bio: "Entrepreneur with a passion for life and meaningful connections. Looking for someone who shares my love for adventure and sophisticated experiences.",
      interests: ["Business", "Fitness", "Wine", "Travel", "Fine Arts", "Jazz"],
      isVerified: false,
      isPremium: true,
      profileType: "single" as const
    }
  ];

  const mockMessages = [
    {
      id: "1",
      text: "Hey! Thanks for the match. I love your profile 😊",
      timestamp: new Date(Date.now() - 300000),
      senderId: "1",
      senderName: "Alexandra",
      type: "text" as const
    },
    {
      id: "2",
      text: "Hi Alexandra! Thank you, yours is amazing too. That wine tasting photo looks incredible!",
      timestamp: new Date(Date.now() - 240000),
      senderId: "current-user",
      senderName: "You",
      type: "text" as const
    }
  ];

  const handleSignIn = () => {
    setCurrentView("login");
  };

  const handleSignUp = () => {
    console.log("Sign up clicked");
    setCurrentView("signup");
  };

  const handleLogin = (email: string, password: string) => {
    console.log(`Login with email: ${email}, password: [REDACTED]`);
    // Handle login logic here
    setCurrentView("app");
  };

  const handleSignupSubmit = (userData: {
    email: string;
    password: string;
    name: string;
    age: string;
  }) => {
    console.log(`Signup with data:`, userData);
    // Handle signup logic here
    setCurrentView("login"); // Redirect to login after signup
  };

  const handleBackToLogin = () => {
    setCurrentView("login");
  };

  const handleBackToSignup = () => {
    setCurrentView("signup");
  };

  const handleMatch = (profileId: string) => {
    const matchedProfile = mockProfiles.find(p => p.id === profileId);
    if (matchedProfile) {
      setSelectedMatch(matchedProfile);
      setShowMatch(true);
    }
  };

  const handleStartChat = (userId: string) => {
    setSelectedMatch(mockProfiles.find(p => p.id === userId));
    setShowChat(true);
    setShowMatch(false);
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (tab === "premium") {
      setShowPremium(true);
    } else if (tab === "messages" && mockMessages.length > 0) {
      setSelectedMatch(mockProfiles[0]);
      setShowChat(true);
    }
  };

  // Landing Page
  if (currentView === "landing") {
    return (
      <div className="min-h-screen bg-background">
        <HeroSection onSignIn={handleSignIn} onSignUp={handleSignUp} />
      </div>
    );
  }

  // Login Page
  if (currentView === "login") {
    return (
      <div className="min-h-screen bg-background">
        <LoginForm
          onLogin={handleLogin}
          onSignup={handleSignUp}
          onForgotPassword={() => console.log("Navigate to forgot password")}
        />
      </div>
    );
  }

  // Signup Page
  if (currentView === "signup") {
    return (
      <div className="min-h-screen bg-background">
        <SignupForm
          onSignup={handleSignupSubmit}
          onLogin={() => setCurrentView("login")}
          isLoading={false}
        />
      </div>
    );
  }


  // Main App
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image - Same as Hero Section */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/attached_assets/Pink_silhouettes_dark_background_fd06a0c6_1758731816680.png)',
          filter: 'blur(2px)',
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="fixed inset-0 bg-black/80" />

      <div className="relative z-10 h-screen flex flex-col">
        {/* Chat Interface */}
        {showChat && selectedMatch ? (
          <ChatInterface
            matchId={selectedMatch.id}
            matchName={selectedMatch.name}
            matchPhoto={selectedMatch.photos[0]}
            messages={mockMessages}
            currentUserId="current-user"
            onSendMessage={(text) => console.log(`Sending: ${text}`)}
            onBack={() => setShowChat(false)}
          />
        ) : (
          <>
            {/* Main Content */}
            <div className="flex-1 pb-16">
              {activeTab === "discover" && (
                <SwipeInterface
                  profiles={mockProfiles}
                  onMatch={handleMatch}
                  onFilterClick={() => console.log("Opening filters")}
                  onSettingsClick={() => console.log("Opening settings")}
                />
              )}
              {activeTab === "matches" && (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  {/* SPICE Logo */}
                  <div className="mb-8 text-center">
                    <h1 
                      className="text-4xl font-bold mb-2"
                      style={{ 
                        background: 'linear-gradient(135deg, #ff1493, #ff69b4, #ff91a4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 20px rgba(255, 20, 147, 0.5)',
                      }}
                    >
                      SPICE
                    </h1>
                    <div 
                      className="w-16 h-1 mx-auto rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #ff1493, #ff69b4)',
                        boxShadow: '0 0 10px rgba(255, 20, 147, 0.8)'
                      }}
                    />
                  </div>
                  <div className="bg-black/70 rounded-2xl border-2 border-pink-500/60 p-6 shadow-lg shadow-pink-500/20">
                    <h2 className="text-2xl font-bold mb-4 text-white">Your Matches</h2>
                    <p className="text-white/80">
                      Matches will appear here when you connect with someone special.
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "profile" && (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  {/* SPICE Logo */}
                  <div className="mb-8 text-center">
                    <h1 
                      className="text-4xl font-bold mb-2"
                      style={{ 
                        background: 'linear-gradient(135deg, #ff1493, #ff69b4, #ff91a4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 20px rgba(255, 20, 147, 0.5)',
                      }}
                    >
                      SPICE
                    </h1>
                    <div 
                      className="w-16 h-1 mx-auto rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #ff1493, #ff69b4)',
                        boxShadow: '0 0 10px rgba(255, 20, 147, 0.8)'
                      }}
                    />
                  </div>
                  <div className="bg-black/70 rounded-2xl border-2 border-pink-500/60 p-6 shadow-lg shadow-pink-500/20">
                    <h2 className="text-2xl font-bold mb-4 text-white">Your Profile</h2>
                    <p className="text-white/80">
                      Profile management coming soon.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
              matchCount={3}
              messageCount={1}
            />
          </>
        )}
      </div>
    </div>

      {/* Modals */}
      {showMatch && selectedMatch && (
        <MatchModal
          isOpen={showMatch}
          onClose={() => setShowMatch(false)}
          matchedUser={{
            id: selectedMatch.id,
            name: selectedMatch.name,
            photo: selectedMatch.photos[0],
            age: selectedMatch.age
          }}
          currentUser={{
            name: "You",
            photo: "/api/placeholder/200/200"
          }}
          onStartChat={handleStartChat}
          onKeepSwiping={() => setShowMatch(false)}
        />
      )}

      {showPremium && (
        <PremiumModal
          isOpen={showPremium}
          onClose={() => setShowPremium(false)}
          onSubscribe={(plan) => {
            console.log(`Subscribing to ${plan}`);
            setShowPremium(false);
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;