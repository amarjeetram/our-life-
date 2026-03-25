"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, RefreshCcw } from "lucide-react";
// Import nerdamer and plugins
import nerdamer from "nerdamer";
import "nerdamer/Calculus";
import "nerdamer/Algebra";

interface CalculusCalculatorProps {
  operation: "derivative" | "integral";
  language: "en" | "es";
}

const localization = {
  en: {
    derivativeTitle: "Derivative Calculator",
    derivativeDescription: "Find the symbolic derivative of any mathematical expression instantly.",
    integralTitle: "Integral Calculator",
    integralDescription: "Compute indefinite integrals for various mathematical functions.",
    expressionLabel: "Enter Function",
    expressionPlaceholder: "e.g., x^2 + 2*x + sin(x)",
    variableLabel: "Variable",
    variablePlaceholder: "e.g., x",
    calculate: "Calculate",
    result: "Result",
    error: "Could not compute. Please check your expression.",
    example: "Try example:",
  },
  es: {
    derivativeTitle: "Calculadora de Derivadas",
    derivativeDescription: "Encuentra la derivada simbólica de cualquier expresión matemática al instante.",
    integralTitle: "Calculadora de Integrales",
    integralDescription: "Calcula integrales indefinidas para diversas funciones matemáticas.",
    expressionLabel: "Introduce la Función",
    expressionPlaceholder: "ej., x^2 + 2*x + sin(x)",
    variableLabel: "Variable",
    variablePlaceholder: "ej., x",
    calculate: "Calcular",
    result: "Resultado",
    error: "No se pudo calcular. Por favor verifica tu expresión.",
    example: "Probar ejemplo:",
  },
};

export default function CalculusCalculatorClient({ operation, language }: CalculusCalculatorProps) {
  const [expression, setExpression] = useState("");
  const [variable, setVariable] = useState("x");
  const [result, setResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const t = localization[language];
  const title = operation === "derivative" ? t.derivativeTitle : t.integralTitle;
  const description = operation === "derivative" ? t.derivativeDescription : t.integralDescription;

  const handleCalculate = () => {
    if (!expression.trim()) return;
    setIsCalculating(true);
    setResult(null);
    setErrorMsg("");

    try {
      let calcResult = "";
      if (operation === "derivative") {
        // nerdamer('diff(expression, variable)')
        calcResult = nerdamer(`diff(${expression}, ${variable || 'x'})`).text();
      } else {
        // nerdamer('integrate(expression, variable)')
        calcResult = nerdamer(`integrate(${expression}, ${variable || 'x'})`).text();
      }
      setResult(calcResult);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(t.error);
    } finally {
      setIsCalculating(false);
    }
  };

  const setExample = () => {
    if (operation === "derivative") {
      setExpression("x^3 + cos(x)");
    } else {
      setExpression("2*x + 1/x");
    }
    setVariable("x");
    setResult(null);
    setErrorMsg("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center md:mb-12 mb-8 mt-4 relative w-full">
        {/* Language Toggle */}
        <div className="absolute right-0 top-0 flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <Link 
            href={operation === "derivative" ? "/calculators/derivative-calculator" : "/calculators/integral-calculator"} 
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${language === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            EN
          </Link>
          <Link 
            href={operation === "derivative" ? "/calculators/es/calculadora-de-derivadas" : "/calculators/es/calculadora-de-integrales"} 
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${language === 'es' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            ES
          </Link>
        </div>

        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 mb-6 shadow-sm border border-indigo-200 mt-8 md:mt-0">
          <Calculator size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-200/60 overflow-hidden mb-12">
        <div className="p-6 md:p-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-3">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.expressionLabel}
              </label>
              <input
                suppressHydrationWarning
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder={t.expressionPlaceholder}
                className="w-full text-lg px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono"
              />
              <button 
                suppressHydrationWarning
                onClick={setExample}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
              >
                <RefreshCcw size={14} /> {t.example} {operation === "derivative" ? "x^3 + cos(x)" : "2*x + 1/x"}
              </button>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.variableLabel}
              </label>
              <input
                suppressHydrationWarning
                type="text"
                value={variable}
                onChange={(e) => setVariable(e.target.value)}
                placeholder={t.variablePlaceholder}
                className="w-full text-lg px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono text-center"
              />
            </div>
          </div>

          <button
            suppressHydrationWarning
            onClick={handleCalculate}
            disabled={!expression.trim() || isCalculating}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
          >
            {isCalculating ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Calculator size={24} />
                {t.calculate}
                <ArrowRight size={20} className="ml-1" />
              </>
            )}
          </button>

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 font-medium text-center">
              {errorMsg}
            </div>
          )}

          {/* Result Box */}
          {result && !errorMsg && (
            <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
                {t.result}
              </h3>
              <div className="w-full bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-inner relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-violet-500"></div>
                <div className="overflow-x-auto">
                    <p className="text-2xl md:text-3xl text-indigo-50 font-mono font-medium whitespace-nowrap">
                    {result}
                    </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
