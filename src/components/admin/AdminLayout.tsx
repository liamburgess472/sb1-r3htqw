import { useNavigate, Outlet } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        Recipe Management
      </h2>
      
      <Card className="p-6">
        <Tabs defaultValue="recipes" className="mb-8">
          <TabsList>
            <TabsTrigger value="recipes" onClick={() => navigate('/admin/recipes')}>
              Recipes
            </TabsTrigger>
            <TabsTrigger value="influencers" onClick={() => navigate('/admin/influencers')}>
              Influencers
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Outlet />
      </Card>
    </div>
  );
}