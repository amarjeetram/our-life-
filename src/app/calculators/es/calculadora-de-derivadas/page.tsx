import CalculusCalculatorClient from "@/components/CalculusCalculatorClient";
import ArticleDerivativeCalculatorES from "@/components/articles/ArticleDerivativeCalculatorES";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Derivadas Online | Paso a paso",
  description: "Calculadora de derivadas gratis y en español. Encuentra la derivada de cualquier función al instante usando esta herramienta.",
};

export default function SpanishDerivativeCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20 mt-16">
        <CalculusCalculatorClient operation="derivative" language="es" />
        <ArticleDerivativeCalculatorES />
      </main>
    </div>
  );
}
