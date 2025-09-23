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

// Mock data - TODO: remove mock functionality
import femaleProfile from "@assets/generated_images/Female_profile_photo_sample_cb9ac9a5.png";
import maleProfile from "@assets/generated_images/Male_profile_photo_sample_254e53d5.png";
import coupleProfile from "@assets/generated_images/Couple_profile_photo_sample_c7dce5fc.png";

function Router() {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "app">("landing");
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
    setCurrentView("login");
  };

  const handleLogin = (email: string, password: string) => {
    console.log(`Logging in with ${email}`);
    // Simulate login
    setTimeout(() => {
      setCurrentView("app");
    }, 1000);
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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <LoginForm
          onLogin={handleLogin}
          onSignup={() => console.log("Navigate to signup")}
          onForgotPassword={() => console.log("Navigate to forgot password")}
        />
      </div>
    );
  }

  // Main App
  return (
    <div className="h-screen bg-background flex flex-col">
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
              <div className="flex items-center justify-center h-full p-8 text-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Your Matches</h2>
                  <p className="text-muted-foreground">
                    Matches will appear here when you connect with someone special.
                  </p>
                </div>
              </div>
            )}
            {activeTab === "profile" && (
              <div className="flex items-center justify-center h-full p-8 text-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
                  <p className="text-muted-foreground">
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