type QuestionProps = {
  question: string;
  options: string[];
  key: string;
};

export const questions: QuestionProps[] = [
  {
    question:
      "What are your health goals: weight loss, muscle gain, improved overall health, managing a specific condition, or weight maintenance?",
    options: [
      "Lose weight",
      "Gain muscle",
      "Improve overall health",
      "Manage a specific condition",
      "Maintain current weight",
    ],
    key: "health_goals",
  },
  {
    question:
      "What is my current health status? Assess your current health condition, any existing medical conditions, allergies, or dietary restrictions that may influence your dietary choices.",
    options: [
      "Excellent",
      "Good",
      "Fair",
      "Poor",
      "Specific medical condition",
      "Allergies",
      "Dietary restrictions",
    ],
    key: "health_status",
  },
  {
    question:
      "What is my activity level? Consider how active you are on a daily basis. Your activity level will determine the number of calories you need to consume and the distribution of macronutrients (carbohydrates, proteins, and fats) in your diet.",
    options: [
      "Sedentary (little to no exercise)",
      "Lightly active (light exercise/sports 1-3 days/week)",
      "Moderately active (moderate exercise/sports 3-5 days/week)",
      "Very active (hard exercise/sports 6-7 days/week)",
      "Extra active (very hard exercise/sports & physical job or 2x training)",
    ],
    key: "activity_level",
  },
  {
    question:
      "What are my nutritional needs? Identify the essential nutrients your body requires, including vitamins, minerals, fiber, and omega-3 fatty acids. Consider your age, gender, and specific nutritional needs.",
    options: [
      "Balanced diet with adequate vitamins, minerals, fiber, and omega-3 fatty acids",
      "Specific dietary requirements",
      "Vegetarian or vegan",
      "Other",
    ],
    key: "nutritional_needs",
  },
  {
    question:
      "What are my food preferences? Take into account your likes and dislikes, dietary restrictions, cultural or religious considerations, and any ethical choices (such as vegetarianism or veganism).",
    options: [
      "No specific preferences or restrictions",
      "Vegetarian",
      "Vegan",
      "Gluten-free",
      "Other",
    ],
    key: "food_preferences",
  },
  {
    question:
      "What is my budget? Determine how much you can afford to spend on groceries and food preparation. This will help you make cost-effective choices while maintaining a balanced diet.",
    options: ["Low", "Moderate", "High"],
    key: "budget",
  },
  {
    question:
      "How many meals and snacks do I prefer? Decide on the number of meals and snacks you would like to consume each day, considering your schedule, personal preferences, and any intermittent fasting or time-restricted eating plans you may follow.",
    options: [
      "3 meals and 2 snacks",
      "3 meals and 1 snack",
      "3 meals only",
      "Other",
    ],
    key: "meal_preference",
  },
  {
    question:
      "How can I make my diet sustainable? Aim for a long-term approach that focuses on balanced, nutrient-dense foods rather than strict and unsustainable fad diets. Consider whether you can maintain your chosen diet plan over time.",
    options: [
      "Focus on balanced, nutrient-dense foods",
      "Avoid fad diets",
      "Consider long-term sustainability",
      "Other",
    ],
    key: "sustainability",
  },
  {
    question:
      "Do I need professional guidance? If you have specific health concerns, dietary restrictions, or complex goals, it may be beneficial to consult a registered dietitian or nutritionist for personalized advice.",
    options: ["Yes", "No"],
    key: "professional_guidance",
  },
];
