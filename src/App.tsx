import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { HomePage } from "@/components/home/HomePage";
import { RecipeGrid } from "@/components/recipes/RecipeGrid";
import { MealPlanner } from "@/components/planner/MealPlanner";
import { ShoppingList } from "@/components/shopping/ShoppingList";
import { InfluencerProfile } from "@/components/influencer/InfluencerProfile";
import { InfluencerGrid } from "@/components/influencer/InfluencerGrid";
import { RecipePage } from "@/components/recipe/RecipePage";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { RecipeManager } from "@/components/admin/RecipeManager";
import { InfluencerManager } from "@/components/admin/InfluencerManager";
import { Login } from "@/components/auth/Login";
import { useAuth } from "@/contexts/AuthContext";
import { PublicRecipeGrid } from "@/components/recipes/PublicRecipeGrid";
import { LandingPage } from "@/components/landing/LandingPage";
import { Footer } from "@/components/layout/Footer";
import { Home, BookOpen, Calendar, ShoppingBag, Users, Settings } from "lucide-react";
import { supabase } from "@/lib/supabase";

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Handle OAuth callback
    if (location.pathname === '/auth/callback') {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          window.location.href = '/';
        }
      });
    }
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const sidebarItems = user ? [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Recipes", path: "/recipes" },
    { icon: Calendar, label: "Meal Planner", path: "/planner" },
    { icon: ShoppingBag, label: "Shopping List", path: "/shopping-list" },
    { icon: Users, label: "Influencers", path: "/influencers" }
  ] : [
    { icon: Home, label: "Home", path: "/" }
  ];

  // Add admin routes if user is admin
  if (user?.email === 'admin@creatorinspired.com') {
    sidebarItems.push({ icon: Settings, label: "Admin", path: "/admin" });
  }

  return (
    <div className="flex min-h-screen bg-background page-background">
      <Sidebar items={sidebarItems} currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col content-wrapper">
        {/* Only show header on authenticated routes */}
        {user && <Header />}
        <main className="flex-1 container mx-auto px-4 lg:px-8 max-w-7xl">
          <Routes>
            {user ? (
              // Authenticated routes
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes" element={<RecipeGrid />} />
                <Route path="/recipe/:id" element={<RecipePage />} />
                <Route path="/planner" element={<MealPlanner />} />
                <Route path="/shopping-list" element={<ShoppingList />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="recipes" element={<RecipeManager />} />
                  <Route path="influencers" element={<InfluencerManager />} />
                </Route>
              </>
            ) : (
              // Public routes
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/recipes" element={<PublicRecipeGrid />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<div>Completing sign in...</div>} />
              </>
            )}
            {/* Always public routes */}
            <Route path="/influencers" element={<InfluencerGrid />} />
            <Route path="/influencer/:id" element={<InfluencerProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {/* Only show footer on authenticated routes */}
        {user && <Footer />}
      </div>
    </div>
  );
}

export default App;