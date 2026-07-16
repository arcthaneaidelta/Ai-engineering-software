import React, { useState } from "react";
import { Server, Brain, Database, CloudLightning, RefreshCw, Layers, ShieldCheck, Terminal as CliIcon, HelpCircle } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  category: string;
  tech: string;
  latency: string;
  cost: string;
  description: string;
  details: {
    purpose: string;
    bestPractices: string;
    metrics: string;
  };
  icon: React.ComponentType<{ className?: string; size?: number }>;
  colorClass: string;
  x: number;
  y: number;
}

export const InteractiveArchitecture: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: NodeData[] = [
    {
      id: "user",
      name: "Client Gateway",
      category: "Endpoint",
      tech: "Next.js / HTTPS",
      latency: "15ms",
      cost: "Free",
      description: "Secure ingress entrypoint utilizing WebSockets & server-sent events for low-latency token streaming.",
      details: {
        purpose: "Handles client connection, auth token verification, and streams the chunked response back to the client interface in real time.",
        bestPractices: "Use HTTP/2 or gRPC for multiplexed connection streaming. Implement token bucket rate limiting at the API gateway layer.",
        metrics: "Concurrency limit: 10,000 active streams. Average network overhead: <5ms.",
      },
      icon: CliIcon,
      colorClass: "text-sky-500 stroke-sky-500 fill-sky-500",
      x: 60,
      y: 160,
    },
    {
      id: "cloudrun",
      name: "Orchestration Layer",
      category: "Compute",
      tech: "GCP Cloud Run (FastAPI)",
      latency: "8ms",
      cost: "$0.000016 / req",
      description: "Serverless container executing core agentic orchestration logic, input cleaning, and prompt assembly.",
      details: {
        purpose: "Runs microservices to validate incoming payloads, fetch user session state, coordinate parallel RAG lookups, and format models' inputs.",
        bestPractices: "Set min-instances to 1 to eliminate cold-start latency. Use streaming response protocols to forward tokens immediately without buffering.",
        metrics: "Average CPU utilization: 42%. Memory baseline: 256MB. Scale-out speed: <2s.",
      },
      icon: Server,
      colorClass: "text-blue-500 stroke-blue-500 fill-blue-500",
      x: 180,
      y: 160,
    },
    {
      id: "gemini",
      name: "Gemini Pro 1.5",
      category: "LLM Model",
      tech: "Vertex AI API",
      latency: "240ms",
      cost: "$0.00125 / 1k tok",
      description: "Enterprise foundation model executing reasoning, validation, and final answer synthesis.",
      details: {
        purpose: "Executes cognitive tasks: parses grounding context, validates user queries against safety guardrails, and reasons on unstructured enterprise data.",
        bestPractices: "Define system instructions clearly to enforce JSON schemas. Cache system prompts to reduce input token billing.",
        metrics: "Input context window: 1M tokens. Output latency: 20ms per token. Core temperature: 0.2.",
      },
      icon: Brain,
      colorClass: "text-purple-500 stroke-purple-500 fill-purple-500",
      x: 300,
      y: 80,
    },
    {
      id: "vector",
      name: "Vector Search",
      category: "Database",
      tech: "Vertex Vector Search",
      latency: "18ms",
      cost: "$0.00008 / query",
      description: "Sub-millisecond approximate nearest neighbor index retrieving high-dimensional chunk embeddings.",
      details: {
        purpose: "Performs vector dot-product similarity matching to find relevant document chunks matching the query embedding generated from Text-Gecko.",
        bestPractices: "Scale index dimension sizes to match embedding model dimensions (e.g. 768 or 1536). Tune recall targets to match precision requirements.",
        metrics: "Index recall accuracy: 98.4%. Index size: 4.2M vector embeddings. Latency P99: 25ms.",
      },
      icon: Database,
      colorClass: "text-emerald-500 stroke-emerald-500 fill-emerald-500",
      x: 300,
      y: 240,
    },
    {
      id: "gcs",
      name: "Grounding Storage",
      category: "Storage",
      tech: "GCS (Cloud Storage)",
      latency: "12ms",
      cost: "$0.02 / GB month",
      description: "Highly durable enterprise data lake storing raw document sources, PDF manuals, and system tables.",
      details: {
        purpose: "Acts as the source-of-truth object storage. Provides raw document segments when similar chunks are matched in Vector Search.",
        bestPractices: "Implement Uniform Bucket-Level Access (UBLA) and object versioning. Cache metadata lookups in MemoryStore Redis.",
        metrics: "Object availability: 99.999999999% SLA. Write time: 30ms. Read throughput: 10Gbps.",
      },
      icon: Layers,
      colorClass: "text-amber-500 stroke-amber-500 fill-amber-500",
      x: 420,
      y: 160,
    },
  ];

  const activeNode = nodes.find((n) => n.id === (hoveredNode || selectedNode || "cloudrun"));

  return (
    <div className={`w-full flex flex-col ${compact ? "" : "lg:flex-row"} gap-8`}>
      
      {/* Interactive Diagram Panel */}
      <div className={`flex-1 rounded-2xl border border-border-primary/50 bg-bg-card/45 p-6 relative overflow-hidden flex flex-col justify-between ${compact ? "h-[360px]" : "h-[450px]"}`}>
        
        {/* Dynamic header metrics */}
        <div className="flex items-center justify-between text-xs font-mono text-text-muted border-b border-border-primary/30 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-text-secondary font-semibold">PIPELINE: ACTIVE</span>
          </div>
          <div className="flex gap-4">
            <span>LATENCY: <strong className="text-text-primary">41ms</strong></span>
            <span>ERR: <strong className="text-accent-success">0.00%</strong></span>
          </div>
        </div>

        {/* SVG Diagram Canvas */}
        <div className="flex-1 w-full h-full relative min-h-[220px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 320" preserveAspectRatio="xMidYMid meet">
            
            {/* SVG Connections & Packets */}
            <g stroke="#3B82F6" strokeWidth="1.5" opacity="0.3">
              {/* Client -> Orchestrator */}
              <line x1="60" y1="160" x2="180" y2="160" />
              {/* Orchestrator -> LLM */}
              <line x1="180" y1="160" x2="300" y2="80" stroke="#8B5CF6" />
              {/* Orchestrator -> Vector Search */}
              <line x1="180" y1="160" x2="300" y2="240" stroke="#10B981" />
              {/* Vector Search -> GCS Storage */}
              <line x1="300" y1="240" x2="420" y2="160" stroke="#F59E0B" />
              {/* LLM -> GCS Storage */}
              <line x1="300" y1="80" x2="420" y2="160" stroke="#8B5CF6" />
            </g>

            {/* Glowing active path connections (animated highlight on hover/select) */}
            {activeNode && (
              <g stroke="#3B82F6" strokeWidth="2.5" opacity="0.8">
                {activeNode.id === "user" && <line x1="60" y1="160" x2="180" y2="160" className="animate-pulse" />}
                {activeNode.id === "cloudrun" && (
                  <>
                    <line x1="60" y1="160" x2="180" y2="160" />
                    <line x1="180" y1="160" x2="300" y2="80" stroke="#8B5CF6" />
                    <line x1="180" y1="160" x2="300" y2="240" stroke="#10B981" />
                  </>
                )}
                {activeNode.id === "gemini" && (
                  <>
                    <line x1="180" y1="160" x2="300" y2="80" stroke="#8B5CF6" />
                    <line x1="300" y1="80" x2="420" y2="160" stroke="#8B5CF6" />
                  </>
                )}
                {activeNode.id === "vector" && (
                  <>
                    <line x1="180" y1="160" x2="300" y2="240" stroke="#10B981" />
                    <line x1="300" y1="240" x2="420" y2="160" stroke="#F59E0B" />
                  </>
                )}
                {activeNode.id === "gcs" && (
                  <>
                    <line x1="300" y1="240" x2="420" y2="160" stroke="#F59E0B" />
                    <line x1="300" y1="80" x2="420" y2="160" stroke="#8B5CF6" />
                  </>
                )}
              </g>
            )}

            {/* Simulated Data Packets flowing */}
            <circle r="3" fill="#3B82F6" opacity="0.9">
              <animateMotion
                path="M 60 160 L 180 160 L 300 80 L 420 160 Z"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3" fill="#10B981" opacity="0.9">
              <animateMotion
                path="M 180 160 L 300 240 L 420 160"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Nodes group */}
            {nodes.map((node) => {
              const IconComp = node.icon;
              const isSelected = selectedNode === node.id;
              const isHovered = hoveredNode === node.id;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group select-none"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                >
                  {/* Outer glow ring for selection or hover */}
                  <circle
                    r={isSelected || isHovered ? "28" : "20"}
                    fill="transparent"
                    stroke={isSelected ? "#2563EB" : isHovered ? "#60A5FA" : "rgba(128,128,128,0.2)"}
                    strokeWidth="1.5"
                    className="transition-all duration-300 ease-out"
                  />
                  {/* Outer animated breathe circle */}
                  {isSelected && (
                    <circle
                      r="32"
                      fill="transparent"
                      stroke="#2563EB"
                      strokeWidth="1"
                      className="opacity-40 animate-ping"
                      style={{ animationDuration: "3s" }}
                    />
                  )}
                  {/* Node solid body */}
                  <circle
                    r="18"
                    fill="var(--card-bg)"
                    stroke="var(--border-primary)"
                    strokeWidth="2"
                    className="shadow-level-1 group-hover:scale-105 transition-all duration-200"
                  />
                  {/* SVG Node Icon overlay */}
                  <g transform="translate(-10, -10)" className={node.colorClass}>
                    <IconComp size={20} />
                  </g>
                  {/* Simple text label below node */}
                  <text
                    y="32"
                    textAnchor="middle"
                    className="text-[9px] font-mono font-semibold tracking-tight text-text-secondary uppercase select-none opacity-80"
                    fill="currentColor"
                  >
                    {node.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Action guidelines */}
        <p className="text-[10px] text-text-muted text-center italic border-t border-border-primary/20 pt-2.5">
          * Click on any architectural node to view enterprise blueprints and production metrics.
        </p>
      </div>

      {/* Info Description Panel */}
      {activeNode && (
        <div className={`rounded-2xl border border-border-primary/50 bg-bg-card p-6 flex flex-col justify-between ${compact ? "w-full" : "w-full lg:w-[380px]"}`}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase bg-accent-blue/10 text-accent-blue">
                {activeNode.category}
              </span>
              <span className="text-xs text-text-muted font-mono">{activeNode.tech}</span>
            </div>

            <div>
              <h3 className="font-manrope font-bold text-lg text-text-primary mb-1">
                {activeNode.name}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {activeNode.description}
              </p>
            </div>

            <div className="h-[1px] bg-border-primary/50 my-1" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] font-mono tracking-wider text-text-muted uppercase">P95 Latency</span>
                <span className="font-mono text-sm font-semibold text-text-primary">{activeNode.latency}</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-wider text-text-muted uppercase">Usage Cost</span>
                <span className="font-mono text-sm font-semibold text-text-primary">{activeNode.cost}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-1">
              <div>
                <h4 className="text-xs font-bold text-text-primary font-manrope mb-1">Enterprise Purpose</h4>
                <p className="text-xs text-text-secondary leading-normal">{activeNode.details.purpose}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary font-manrope mb-1 text-accent-teal">Best Practices</h4>
                <p className="text-xs text-text-secondary leading-normal">{activeNode.details.bestPractices}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue my-auto animate-pulse" />
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{activeNode.details.metrics}</span>
          </div>
        </div>
      )}
    </div>
  );
};
