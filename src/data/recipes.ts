import { type Recipe } from "@/types/recipe";

// Featured recipes shown on the home page
export const featuredRecipes: Recipe[] = [
  {
    id: "1",
    title: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=2340&q=80",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    calories: 450,
    influencer: {
      name: "Sarah Green",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=987&q=80",
    },
    tags: ["Vegetarian", "High Protein", "Mediterranean"],
    description: "A vibrant and nutritious quinoa bowl packed with fresh vegetables, feta cheese, and a zesty lemon dressing.",
    ingredients: [
      { name: "Quinoa", amount: "1", unit: "cup" },
      { name: "Cherry Tomatoes", amount: "2", unit: "cups" },
      { name: "Cucumber", amount: "1", unit: "medium" },
      { name: "Feta Cheese", amount: "200", unit: "g" },
      { name: "Kalamata Olives", amount: "1/2", unit: "cup" },
      { name: "Extra Virgin Olive Oil", amount: "3", unit: "tbsp" },
      { name: "Lemon Juice", amount: "2", unit: "tbsp" },
      { name: "Fresh Mint", amount: "1/4", unit: "cup" }
    ],
    instructions: [
      "Rinse quinoa thoroughly and cook according to package instructions.",
      "While quinoa is cooking, chop all vegetables into bite-sized pieces.",
      "Whisk together olive oil, lemon juice, salt, and pepper to make the dressing.",
      "Once quinoa is cooked and cooled slightly, combine with chopped vegetables.",
      "Add crumbled feta cheese and olives.",
      "Drizzle with dressing and toss gently to combine.",
      "Garnish with fresh mint leaves before serving."
    ],
    nutritionalInfo: {
      protein: 15,
      carbs: 45,
      fat: 22,
      fiber: 6,
      sugar: 4,
      sodium: 580
    }
  },
  {
    id: "2",
    title: "Asian Fusion Salmon Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2340&q=80",
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    calories: 520,
    influencer: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=2340&q=80",
    },
    tags: ["Seafood", "Asian Fusion", "High Protein"],
    description: "A delicious bowl featuring perfectly seared salmon with Asian-inspired flavors and fresh vegetables.",
    ingredients: [
      { name: "Salmon Fillet", amount: "2", unit: "pieces" },
      { name: "Sushi Rice", amount: "1", unit: "cup" },
      { name: "Edamame", amount: "1", unit: "cup" },
      { name: "Avocado", amount: "1", unit: "medium" },
      { name: "Soy Sauce", amount: "3", unit: "tbsp" },
      { name: "Sesame Oil", amount: "2", unit: "tsp" },
      { name: "Nori Sheets", amount: "1", unit: "sheet" },
      { name: "Pickled Ginger", amount: "2", unit: "tbsp" }
    ],
    instructions: [
      "Cook sushi rice according to package instructions",
      "Season salmon with salt and pepper",
      "Sear salmon in a hot pan for 4-5 minutes per side",
      "Steam edamame and slice avocado",
      "Assemble bowls with rice, salmon, and toppings",
      "Drizzle with soy sauce and sesame oil"
    ],
    nutritionalInfo: {
      protein: 32,
      carbs: 48,
      fat: 24,
      fiber: 8,
      sugar: 2,
      sodium: 720
    }
  },
  {
    id: "3",
    title: "Rainbow Buddha Bowl",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=2340&q=80",
    prepTime: 25,
    cookTime: 20,
    servings: 2,
    calories: 480,
    influencer: {
      name: "Emma Lee",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=2340&q=80",
    },
    tags: ["Vegan", "Gluten-Free", "Buddha Bowl"],
    description: "A colorful and nutrient-packed vegan buddha bowl with roasted vegetables and tahini dressing.",
    ingredients: [
      { name: "Sweet Potato", amount: "1", unit: "large" },
      { name: "Chickpeas", amount: "1", unit: "can" },
      { name: "Kale", amount: "2", unit: "cups" },
      { name: "Quinoa", amount: "1", unit: "cup" },
      { name: "Tahini", amount: "3", unit: "tbsp" },
      { name: "Lemon", amount: "1", unit: "whole" },
      { name: "Red Cabbage", amount: "1", unit: "cup" },
      { name: "Carrots", amount: "2", unit: "medium" }
    ],
    instructions: [
      "Roast sweet potato cubes and chickpeas",
      "Cook quinoa according to package instructions",
      "Massage kale with olive oil and lemon juice",
      "Make tahini dressing by combining tahini, lemon juice, and water",
      "Arrange all ingredients in bowls",
      "Drizzle with tahini dressing and serve"
    ],
    nutritionalInfo: {
      protein: 18,
      carbs: 62,
      fat: 16,
      fiber: 12,
      sugar: 8,
      sodium: 420
    }
  },
  {
    id: "4",
    title: "Keto Steak Bowl",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2340&q=80",
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    calories: 650,
    influencer: {
      name: "Tom Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=2340&q=80",
    },
    tags: ["Keto", "High Protein", "Low Carb"],
    description: "A satisfying keto-friendly bowl featuring perfectly cooked steak and low-carb vegetables.",
    ingredients: [
      { name: "Ribeye Steak", amount: "400", unit: "g" },
      { name: "Cauliflower Rice", amount: "2", unit: "cups" },
      { name: "Asparagus", amount: "1", unit: "bunch" },
      { name: "Butter", amount: "2", unit: "tbsp" },
      { name: "Garlic", amount: "3", unit: "cloves" },
      { name: "Avocado", amount: "1", unit: "medium" },
      { name: "Heavy Cream", amount: "1/4", unit: "cup" }
    ],
    instructions: [
      "Season steak with salt and pepper",
      "Cook steak to desired doneness",
      "Sauté cauliflower rice with garlic and butter",
      "Grill or roast asparagus",
      "Make cream sauce with remaining butter and cream",
      "Slice steak and assemble bowls"
    ],
    nutritionalInfo: {
      protein: 45,
      carbs: 12,
      fat: 48,
      fiber: 8,
      sugar: 3,
      sodium: 680
    }
  },
  {
    id: "5",
    title: "Spicy Szechuan Noodles",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=2340&q=80",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    calories: 480,
    influencer: {
      name: "Lisa Chang",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=2340&q=80",
    },
    tags: ["Asian", "Spicy", "Vegetarian"],
    description: "Authentic Szechuan-style noodles with a spicy chili oil sauce and fresh vegetables.",
    ingredients: [
      { name: "Chinese Noodles", amount: "400", unit: "g" },
      { name: "Szechuan Peppercorns", amount: "2", unit: "tbsp" },
      { name: "Chili Oil", amount: "1/4", unit: "cup" },
      { name: "Bok Choy", amount: "2", unit: "bunches" },
      { name: "Green Onions", amount: "4", unit: "stalks" },
      { name: "Garlic", amount: "4", unit: "cloves" },
      { name: "Soy Sauce", amount: "3", unit: "tbsp" }
    ],
    instructions: [
      "Cook noodles according to package instructions",
      "Toast Szechuan peppercorns and grind",
      "Make sauce by combining chili oil, ground peppercorns, and soy sauce",
      "Stir-fry bok choy and garlic",
      "Toss noodles with sauce and vegetables",
      "Garnish with green onions"
    ],
    nutritionalInfo: {
      protein: 14,
      carbs: 68,
      fat: 18,
      fiber: 4,
      sugar: 2,
      sodium: 890
    }
  },
  {
    id: "6",
    title: "Tropical Acai Bowl",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=2340&q=80",
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    calories: 380,
    influencer: {
      name: "Maya Peters",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2340&q=80",
    },
    tags: ["Breakfast", "Smoothie Bowl", "Vegan"],
    description: "A refreshing and nutritious acai bowl topped with fresh tropical fruits and granola.",
    ingredients: [
      { name: "Acai Packets", amount: "2", unit: "packets" },
      { name: "Banana", amount: "1", unit: "medium" },
      { name: "Mango", amount: "1", unit: "cup" },
      { name: "Coconut Milk", amount: "1/2", unit: "cup" },
      { name: "Granola", amount: "1/2", unit: "cup" },
      { name: "Honey", amount: "2", unit: "tbsp" },
      { name: "Chia Seeds", amount: "2", unit: "tbsp" }
    ],
    instructions: [
      "Blend frozen acai packets with banana and coconut milk",
      "Pour into bowls",
      "Top with sliced mango and other fresh fruits",
      "Sprinkle with granola and chia seeds",
      "Drizzle with honey",
      "Serve immediately"
    ],
    nutritionalInfo: {
      protein: 8,
      carbs: 64,
      fat: 12,
      fiber: 10,
      sugar: 28,
      sodium: 45
    }
  }
];

// Extended recipe collection
const additionalRecipes: Recipe[] = [];

// Combine featured and additional recipes for the complete collection
export const allRecipes = [...featuredRecipes, ...additionalRecipes];