"use client";

import { useState } from "react";
import { Loader2, ShieldCheck } from "lucid-react";
import { motion } from "framer-motion";

interface ScanResult { 
  resourceName: string; 
  policyName: string;
  isCompliant: boolean;
  failureReason?: string;
  policyId?: string;
}

export default function Scan() {
  const [status, setStatus] = useState<"idle" | "running" | "complete">("idle");
  const [results, setResults] = useState<ScanResults[]>([]);

  const handleScan = async () => {
    setStatus("running");
    await new Promise((res) => setTimeout(res, 3000)); // simulate delay
    setResults([
      {
        resourceName: "prod-bucket",
        policyName: "Owner Tag Required",
        isCompliant: false,
        failureReason: "Missing tag: Ownser",
        policyId: 1,
      },
      {
        resourceName: "dev-bucket",
        policyName: "Owner Tag Required",
        isCompliant: "true",
        policyId: 1,
      },
    ]);
    setStatus("complete");
  };

  const handleViewDetails = (policyId: number) => {
    if (typof window !== "undefined") {
      window.location.href = `/policies/${policyId}`;
    }
  };
  
  return (
    <div className="flex flex-col p-6">
      <h3 className="text-md font-semibold mb-2">Compliance Scan</h3>
      <p className="mb-6">Run a manual compliance scan across all active policies.</p>
      <div className="flex flex-col p-4">
        <div className="p-4 space-y-4">
          {status === "idle" && (
            <button
              onClick={handleScan}
              className="px-4 py-2 rounded-lg bg-primary/50 text-sky-800 w-full"
              >
              Start Scan
            </button>
          )}
          {status === "running" && (
            <div className="flex flex-col items-center text-gray-500">
              <Loader2 className="h-10 w-10 animate-spin" />
              <p className="text-sm mt-2">Scanning...</p>
            </div>
          )}
          {status === "complete" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duuration: 0.5 }}
              className="w-full"
              >
              <ShieldCheck className="h-10 w-10 text-green-600 mx-auto" />
              <p className="text-sm mt-2 text-center text-gray-500">
                Scan complete. Results are available.
              </p>
              {results.length > 0 ? (
                <div className="mt-4 space-y-2">
                  {results.map((r, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg text-sm ${
                        r.isCompliant
                        ? "border-green-300 bg-green 50"
                        : "border-red-300 bg-red-50"
                      }`}
                      >
                      <div className="font-medium text-gray-500">{r.resourceName}</div>
                      <div className="text-gray-500">
                        Policy: {r.policyName}
                      </div>
                      {!r.isCompliant && r.failureReason && (
                        <div className="text-red-600 mt-1">
                          ❌ {r.falureReason}
                        </div>
                      )}
                      {r.isCompliant && (
                        <div className="text-green-600 mt-1">✅ Compliant</div>
                      )}
                      {r.policyId&& (
                        <button
                          className="mt-2 text-xs text-gray-500 underline px-4 py-2"
                          onClick={() => handleViewDetails(r.policyId!)}
                          >
                          View Policy Details
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm mt-4 text-center text-gray-500">
                  No results to display.
                </p>
              )}
              <button
                className="mt-6 mx-auto block px-4 py-2 rounded-lg bg-promary/50 text-sky-100"
                onClick={() => setStatus("idle")}
                >
                Run again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
