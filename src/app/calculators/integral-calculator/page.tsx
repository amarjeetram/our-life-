import CalculusCalculatorClient from "@/components/CalculusCalculatorClient";
import ArticleIntegralCalculator from "@/components/articles/ArticleIntegralCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integral Calculator | Free Symbolic Integration",
  description: "Free online indefinite integral calculator. Compute integrals instantly without signing up.",
};

export default function IntegralCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20 mt-16">
        <CalculusCalculatorClient operation="integral" language="en" />
        <ArticleIntegralCalculator />
      </main>
    </div>
  );
}
