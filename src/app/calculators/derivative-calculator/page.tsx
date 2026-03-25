import CalculusCalculatorClient from "@/components/CalculusCalculatorClient";
import ArticleDerivativeCalculator from "@/components/articles/ArticleDerivativeCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Derivative Calculator | Free Symbolic Differentiation",
  description: "Free online derivative calculator. Find the derivative of any mathematical function instantly.",
};

export default function DerivativeCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20 mt-16">
        <CalculusCalculatorClient operation="derivative" language="en" />
        <ArticleDerivativeCalculator />
      </main>
    </div>
  );
}
