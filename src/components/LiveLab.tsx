import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Play, RefreshCw, FileCode, CheckCircle, AlertTriangle, Cpu } from "lucide-react";

export const LiveLab: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<"idle" | "building" | "pushing" | "deploying" | "success" | "failed">("idle");
  const [progress, setProgress] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const codeFiles = {
    "main.py": `from fastapi import FastAPI, Depends
from google.cloud import logging
import vertexai
from vertexai.generative_models import GenerativeModel

app = FastAPI(title="Grounded-Agent-Service")
client = logging.Client()
client.setup_logging()

@app.post("/v1/chat")
async def chat_handler(payload: ChatPayload):
    # Initialize Vertex and load the model parameters
    vertexai.init(project="enterprise-ai-academy-2026")
    model = GenerativeModel("gemini-1.5-pro")
    
    # Grounding retrieval search
    context = await retrieve_grounding_docs(payload.query)
    
    # Generate structured responses
    response = model.generate_content(
        contents=[payload.query, context],
        generation_config={"response_mime_type": "application/json"}
    )
    return {"response": response.text, "cached": True}`,
    "Dockerfile": `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]`,
  };

  const [activeFile, setActiveFile] = useState<"main.py" | "Dockerfile">("main.py");

  const buildLogs = [
    "[SYSTEM] Initiating deployment sequence via Google Cloud Build...",
    "Sending build context to Docker daemon  24.58kB",
    "Step 1/7 : FROM python:3.11-slim",
    " ---> 31b51e06fa70",
    "Step 2/7 : WORKDIR /app",
    " ---> Using cache",
    " ---> a17fcf3843a2",
    "Step 3/7 : COPY requirements.txt .",
    " ---> Using cache",
    " ---> cd9292a831f2",
    "Step 4/7 : RUN pip install --no-cache-dir -r requirements.txt",
    "Downloading fastapi-0.109.0-py3-none-any.whl (92kB)",
    "Downloading google_cloud_logging-3.8.0-py2.py3-none-any.whl (190kB)",
    "Downloading vertexai-1.39.0-py3-none-any.whl (245kB)",
    "Installing collected packages: fastapi, google-cloud-logging, vertexai",
    "Successfully installed fastapi-0.109.0 google-cloud-logging-3.8.0 vertexai-1.39.0",
    " ---> Running in cb600a94bd12",
    "Removing intermediate container cb600a94bd12",
    " ---> aa64bf87ad18",
    "Step 5/7 : COPY . .",
    " ---> 67fa7e26bfbc",
    "Step 6/7 : ENV PORT=8080",
    " ---> Running in fd2109ba4e32",
    "Removing intermediate container fd2109ba4e32",
    " ---> cc835a64dd12",
    "Step 7/7 : CMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8080\"]",
    " ---> Running in bd3a11f26a11",
    "Removing intermediate container bd3a11f26a11",
    " ---> ee7381ffdd3a",
    "Successfully built ee7381ffdd3a",
    "Successfully tagged gcr.io/enterprise-ai-academy/agent-service:latest",
    "[SYSTEM] Pushing docker image to Artifact Registry...",
    "The push refers to repository [gcr.io/enterprise-ai-academy/agent-service]",
    "ee7381ffdd3a: Pushed",
    "67fa7e26bfbc: Pushed",
    "aa64bf87ad18: Layer cached",
    "digest: sha256:7f4c8e192c01824a736a8d839210bf2281a8b9415d86ef8a421b920bf824c... PUSHED SUCCESS",
    "[SYSTEM] Deploying service to GCP Cloud Run (Region: us-central1)...",
    "Deploying container to Cloud Run service [agent-service] in project [enterprise-ai-academy-2026] region [us-central1]",
    "✓ Deploying new revision...",
    "✓ Routing traffic...",
    "✓ Setting IAM Invoker policy...",
    "Service [agent-service] has been successfully deployed.",
    "Revision: agent-service-00002-zef",
    "URL: https://agent-service-4x8w.us-central1.run.app",
    "[SYSTEM] End-to-end container health checks: SUCCESS.",
  ];

  const handleDeploy = () => {
    if (isRunning) return;
    setIsRunning(true);
    setStatus("building");
    setLogs([]);
    setProgress(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    let currentLogIndex = 0;
    const intervalTime = 160; // speed of typing simulation

    const interval = setInterval(() => {
      if (currentLogIndex < buildLogs.length) {
        const nextLog = buildLogs[currentLogIndex];
        setLogs((prev) => [...prev, nextLog]);
        
        // Update states based on log lines to change loading bars
        if (nextLog.includes("Pushing docker image")) {
          setStatus("pushing");
        } else if (nextLog.includes("Deploying service to GCP")) {
          setStatus("deploying");
        }

        setProgress(Math.round(((currentLogIndex + 1) / buildLogs.length) * 100));
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setStatus("success");
        setIsRunning(false);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Scroll terminal automatically
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* IDE Code Panel (5 Columns) */}
      <div className="lg:col-span-5 rounded-2xl border border-border-primary bg-bg-card flex flex-col overflow-hidden h-[420px] shadow-level-1">
        {/* IDE Header */}
        <div className="bg-bg-secondary/70 border-b border-border-primary px-4 py-3 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-text-muted">WORKPACE/AGENT-SERVICE</span>
          <Cpu size={14} className="text-text-muted" />
        </div>

        {/* File Tabs */}
        <div className="bg-bg-secondary/40 border-b border-border-primary flex text-xs">
          <button
            onClick={() => setActiveFile("main.py")}
            className={`px-4 py-2.5 border-r border-border-primary font-mono flex items-center gap-2 cursor-pointer transition-colors ${
              activeFile === "main.py"
                ? "bg-bg-card text-accent-blue border-b-2 border-b-accent-blue font-semibold"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50"
            }`}
          >
            <FileCode size={14} />
            main.py
          </button>
          <button
            onClick={() => setActiveFile("Dockerfile")}
            className={`px-4 py-2.5 border-r border-border-primary font-mono flex items-center gap-2 cursor-pointer transition-colors ${
              activeFile === "Dockerfile"
                ? "bg-bg-card text-accent-blue border-b-2 border-b-accent-blue font-semibold"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50"
            }`}
          >
            <FileCode size={14} />
            Dockerfile
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-5 overflow-auto bg-bg-card font-mono text-[11px] leading-relaxed text-text-secondary select-text">
          <pre className="text-left">
            <code className="text-text-secondary whitespace-pre">
              {codeFiles[activeFile]}
            </code>
          </pre>
        </div>
      </div>

      {/* Cloud Console Terminal (7 Columns) */}
      <div className="lg:col-span-7 rounded-2xl border border-border-primary bg-bg-card flex flex-col overflow-hidden h-[420px] shadow-level-1">
        {/* Terminal Header */}
        <div className="bg-[#0F1115] border-b border-[#243041] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-300">
            <TerminalIcon size={14} className="text-accent-teal" />
            <span className="text-xs font-mono font-semibold">gcloud-build-shell</span>
          </div>

          <button
            onClick={handleDeploy}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold font-manrope transition-all ${
              isRunning
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-accent-blue text-white hover:bg-accent-blue/90 cursor-pointer hover:-translate-y-0.5 active:scale-95 shadow-level-1"
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw size={12} className="animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <Play size={12} fill="white" />
                Deploy to Cloud Run
              </>
            )}
          </button>
        </div>

        {/* Shell output */}
        <div className="flex-1 bg-[#0F1115] p-5 overflow-auto font-mono text-[10.5px] leading-relaxed text-gray-300 select-text flex flex-col">
          {logs.length === 0 ? (
            <div className="text-gray-500 text-center my-auto flex flex-col items-center gap-2 font-manrope">
              <TerminalIcon size={32} className="opacity-40 animate-pulse text-accent-blue" />
              <span>Click "Deploy to Cloud Run" to simulate container orchestration build logs.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {logs.map((log, index) => {
                let colorClass = "text-gray-300";
                if (log.startsWith("[SYSTEM]")) {
                  colorClass = "text-accent-teal font-semibold";
                } else if (log.includes("Successfully built") || log.includes("SUCCESS")) {
                  colorClass = "text-accent-success font-semibold";
                } else if (log.startsWith("✓")) {
                  colorClass = "text-accent-success";
                } else if (log.includes("URL:")) {
                  colorClass = "text-accent-blue font-semibold underline";
                }
                return (
                  <div key={index} className={`${colorClass} whitespace-pre-wrap`}>
                    {log}
                  </div>
                );
              })}
              {isRunning && (
                <div className="flex items-center gap-1 text-accent-blue mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />
                  <span className="animate-pulse">_</span>
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>
          )}
        </div>

        {/* Progress Bar Footer */}
        {logs.length > 0 && (
          <div className="bg-[#0F1115] border-t border-[#243041] px-4 py-3 flex items-center justify-between gap-6">
            <div className="flex-1 h-[3px] bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-blue via-accent-teal to-accent-success transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold whitespace-nowrap text-gray-400">
              {status === "success" && (
                <span className="text-accent-success flex items-center gap-1">
                  <CheckCircle size={14} /> DEPLOYED
                </span>
              )}
              {status !== "success" && (
                <span>
                  {progress}% ({status.toUpperCase()})
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
