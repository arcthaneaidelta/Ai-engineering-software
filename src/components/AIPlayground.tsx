import React, { useState, useEffect } from "react";
import { Send, Cpu, Sparkles, AlertCircle, RefreshCw, BarChart2 } from "lucide-react";

interface PresetQuery {
  question: string;
  response: string;
  tokens: number;
}

export const AIPlayground: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Real-time counters
  const [tokenCount, setTokenCount] = useState(0);
  const [latency, setLatency] = useState(0);
  const [cost, setCost] = useState(0);

  const presets: PresetQuery[] = [
    {
      question: "Summarize the fire damage claim for Policy #FL-90218.",
      response: `{
  "claim_analysis": {
    "status": "APPROVED_PROVISIONALLY",
    "event": "Residential structural fire caused by electrical subpanel surge",
    "loss_date": "2026-06-12",
    "reconstruction_cost_estimate": "$284,500.00",
    "deductible_applied": "$2,500.00"
  },
  "grounded_sources": [
    {
      "source_doc": "gcs://claims_archive/claims_FL90218_incident.pdf",
      "similarity_score": 0.962
    },
    {
      "source_doc": "gcs://policies/residential_fire_clauses.pdf",
      "similarity_score": 0.891
    }
  ]
}`,
      tokens: 412,
    },
    {
      question: "Validate database schema compatibility for agentic function maps.",
      response: `{
  "schema_validation": {
    "compatible": true,
    "required_parameters": ["customer_id", "auth_token", "amount"],
    "injected_functions": [
      {
        "name": "verify_identity_dlp",
        "description": "Redacts PII data prior to passing context to models"
      }
    ],
    "inferred_safety_risk": "NEGLIGIBLE"
  }
}`,
      tokens: 310,
    },
  ];

  const handleRunPreset = (preset: PresetQuery) => {
    if (isTyping) return;
    setInputText(preset.question);
    triggerTypingAnimation(preset.response, preset.tokens);
  };

  const triggerTypingAnimation = (response: string, targetTokens: number) => {
    setIsTyping(true);
    setDisplayText("");
    setTokenCount(0);
    setLatency(0);
    setCost(0);

    let charIndex = 0;
    const responseLen = response.length;
    const intervalTime = Math.max(5, Math.round(300 / (responseLen / 10))); // speed scaled to length

    // Simulated latency timer counting up
    const latencyInterval = setInterval(() => {
      setLatency((prev) => {
        if (prev >= 240) {
          clearInterval(latencyInterval);
          return 240;
        }
        return prev + 12;
      });
    }, 50);

    const typingInterval = setInterval(() => {
      if (charIndex < responseLen) {
        setDisplayText((prev) => prev + response[charIndex]);
        
        // Dynamic increments
        setTokenCount(Math.round((charIndex / responseLen) * targetTokens));
        setCost((prev) => prev + (targetTokens / responseLen) * 0.0000015);
        
        charIndex++;
      } else {
        clearInterval(typingInterval);
        clearInterval(latencyInterval);
        setTokenCount(targetTokens);
        setLatency(240);
        // Core pricing: $0.00125 per 1K tokens
        setCost((targetTokens / 1000) * 0.00125);
        setIsTyping(false);
      }
    }, intervalTime);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    
    // Generate mock answers depending on words
    const customResponse = `{
  "custom_query_summary": {
    "status": "PROCESSED",
    "received_input": "${inputText.replace(/"/g, '\\"')}",
    "recommendation": "Use grounded data sources to supplement reasoning context."
  },
  "metrics": {
    "safety_check": "PASSED",
    "grounding_status": "COMPLETED"
  }
}`;
    triggerTypingAnimation(customResponse, 280);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Configuration & Inputs (5 Columns) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Preset selections */}
        <div className="p-6 rounded-2xl border border-border-primary/50 bg-bg-card flex flex-col gap-4 shadow-level-1">
          <h3 className="font-manrope font-bold text-base text-text-primary flex items-center gap-2">
            <Sparkles size={18} className="text-accent-teal" />
            Preset AI Queries
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Select an enterprise scenario to observe live grounded token outputs, model routing, and API metrics.
          </p>

          <div className="flex flex-col gap-3 mt-1">
            {presets.map((preset, i) => (
              <button
                key={i}
                onClick={() => handleRunPreset(preset)}
                disabled={isTyping}
                className="w-full text-left p-3.5 rounded-xl border border-border-primary/60 hover:border-accent-blue bg-bg-secondary/40 hover:bg-bg-card transition-all cursor-pointer text-xs font-medium text-text-secondary hover:text-text-primary flex items-center justify-between gap-4 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-99"
              >
                <span className="truncate">{preset.question}</span>
                <span className="text-[10px] font-mono text-accent-blue uppercase tracking-wider shrink-0 font-semibold group-hover:underline">
                  Run Demo &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input Form */}
        <div className="p-6 rounded-2xl border border-border-primary/50 bg-bg-card flex flex-col gap-4 shadow-level-1">
          <h3 className="font-manrope font-bold text-base text-text-primary">
            Custom Grounding Query
          </h3>
          <form onSubmit={handleCustomSubmit} className="flex flex-col gap-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask the agent system anything (e.g., Verify compliance standards)..."
              disabled={isTyping}
              className="w-full h-24 p-3.5 rounded-xl bg-bg-secondary/40 border border-border-primary/60 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all resize-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping || !inputText.trim()}
              className="w-full h-11 rounded-full bg-accent-blue text-white text-xs font-semibold hover:bg-accent-blue/90 shadow-level-1 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed active:scale-98"
            >
              {isTyping ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Orchestrating...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Submit Grounded Query
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Live Output & Math Dashboard (7 Columns) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Real-time Metrics Dashboard */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border-primary/50 bg-bg-card shadow-level-1 text-center flex flex-col justify-center">
            <span className="block text-[9px] font-mono font-semibold tracking-wider text-text-muted uppercase mb-1">
              Vertex Latency
            </span>
            <span className="font-mono text-base md:text-lg font-bold text-text-primary">
              {latency}ms
            </span>
          </div>

          <div className="p-4 rounded-xl border border-border-primary/50 bg-bg-card shadow-level-1 text-center flex flex-col justify-center">
            <span className="block text-[9px] font-mono font-semibold tracking-wider text-text-muted uppercase mb-1">
              Token Ingestion
            </span>
            <span className="font-mono text-base md:text-lg font-bold text-accent-blue">
              {tokenCount}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-border-primary/50 bg-bg-card shadow-level-1 text-center flex flex-col justify-center">
            <span className="block text-[9px] font-mono font-semibold tracking-wider text-text-muted uppercase mb-1">
              Estimated Cost
            </span>
            <span className="font-mono text-base md:text-lg font-bold text-accent-success">
              ${cost.toFixed(6)}
            </span>
          </div>
        </div>

        {/* Live Terminal Output Screen */}
        <div className="flex-1 rounded-2xl border border-border-primary bg-bg-card flex flex-col overflow-hidden h-[280px] shadow-level-1 relative">
          <div className="bg-[#0F1115] border-b border-[#243041] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-300">
              <Cpu size={14} className="text-accent-teal" />
              <span className="text-xs font-mono font-semibold">gemini-model-stream</span>
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Grounded JSON Output
            </span>
          </div>

          <div className="flex-1 bg-[#0F1115] p-5 overflow-auto font-mono text-[11px] leading-relaxed text-gray-300 select-text relative">
            {displayText === "" ? (
              <div className="text-gray-600 text-center my-auto absolute inset-0 flex flex-col items-center justify-center gap-1.5 font-manrope">
                <Sparkles size={28} className="opacity-30 text-accent-teal animate-pulse" />
                <span>Select a preset query to trigger pipeline inference output.</span>
              </div>
            ) : (
              <pre className="text-left whitespace-pre-wrap">
                <code>{displayText}</code>
                {isTyping && <span className="w-1.5 h-3.5 bg-accent-blue inline-block ml-0.5 animate-pulse" />}
              </pre>
            )}
          </div>

          {/* Active Flow Status Overlay */}
          {isTyping && (
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-bg-primary/90 border border-border-primary/50 text-[10px] font-mono text-accent-blue font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-level-1 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />
              Retrieving context & routing nodes...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
