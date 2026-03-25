import CalculusCalculatorClient from "@/components/CalculusCalculatorClient";
import ArticleIntegralCalculatorES from "@/components/articles/ArticleIntegralCalculatorES";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Integrales Online",
  description: "Calculadora de integrales indefinidas gratis y rápida. Resuelve tus problemas de matemáticas ahora mismo.",
};

export default function SpanishIntegralCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20 mt-16">
        <CalculusCalculatorClient operation="integral" language="es" />
        <ArticleIntegralCalculatorES />
      </main>
    </div>
  );
}
