"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { FaGraduationCap } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

interface RecommendationFormData {
  level: string;
  interest: string;
  goal: string;
  duration: string;
  refinement?: string;
}

interface RecommendationResponse {
  recommendation: string;
}

export default function AIRecommendationPage() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState<RecommendationFormData>({
    level: "Beginner",
    interest: "Artificial Intelligence",
    goal: "",
    duration: "3 Months",
    refinement: "",
  });

  const [recommendation, setRecommendation] = useState<string>("");
  const [refinement, setRefinement] = useState("");

  const mutation = useMutation<RecommendationResponse, Error, RecommendationFormData>({
    mutationFn: async (payload: RecommendationFormData) => {
      if (!session) throw new Error("Please login first");
      const { data, error } = await authClient.token();
      if (error || !data?.token) throw new Error("Authentication failed");

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ai/recommendation`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.token}` },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to generate recommendation");
      return result;
    },
    onSuccess: (data) => {
      toast.success("Roadmap generated!");
      setRecommendation(data.recommendation);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return toast.error("Please login first");
    mutation.mutate(formData);
  };

  return (
    <section className="min-h-screen bg-[#050505] py-20 px-5 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">AI Roadmap Engine</h1>
          <p className="mt-2 text-gray-500 font-mono text-sm"> Generate personalized engineering pathways</p>
        </div>

        <div className="border border-gray-900 bg-[#0a0a0a] p-10 mb-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Current Level</label>
                <select value={formData.level} onChange={(e) => setFormData((prev) => ({ ...prev, level: e.target.value }))} className="w-full p-4 bg-[#050505] border border-gray-900 outline-none focus:border-cyan-500 transition-all">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Domain Interest</label>
                <select value={formData.interest} onChange={(e) => setFormData((prev) => ({ ...prev, interest: e.target.value }))} className="w-full p-4 bg-[#050505] border border-gray-900 outline-none focus:border-cyan-500 transition-all">
                  <option>Artificial Intelligence</option>
                  <option>Machine Learning</option>
                  <option>Deep Learning</option>
                  <option>Data Science</option>
                  <option>Web Development</option>
                  <option>Cyber Security</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Career Objective</label>
              <input required value={formData.goal} placeholder="e.g. Senior AI Architect" onChange={(e) => setFormData((prev) => ({ ...prev, goal: e.target.value }))} className="w-full p-4 bg-[#050505] border border-gray-900 outline-none focus:border-cyan-500 transition-all" />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Execution Duration</label>
              <select value={formData.duration} onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))} className="w-full p-4 bg-[#050505] border border-gray-900 outline-none focus:border-cyan-500 transition-all">
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>

            <button type="submit" disabled={mutation.isPending} className="w-full bg-cyan-500 py-5 font-black uppercase tracking-[0.2em] text-[#050505] hover:bg-white transition-all disabled:opacity-50">
              {mutation.isPending ? "GENERATING..." : "GENERATE ARCHITECTURE"}
            </button>
          </form>
        </div>

        {recommendation && (
          <div className="border border-gray-900 bg-[#0a0a0a] p-10">
            <div className="flex items-center gap-4 mb-10 border-b border-gray-900 pb-8">
              <div className="bg-gray-900 p-4 text-cyan-500"><FaGraduationCap size={24} /></div>
              <div>
                <h2 className="font-black text-white uppercase tracking-widest">Strategic Roadmap</h2>
                <p className="text-xs text-gray-500 font-mono">Personalized AI-optimized path</p>
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Refine Parameters</label>
              <input value={refinement} onChange={(e) => setRefinement(e.target.value)} placeholder="e.g. Focus more on neural network architecture..." className="w-full p-4 bg-[#050505] border border-gray-900 mb-4" />
              <button onClick={() => mutation.mutate({ ...formData, refinement })} disabled={mutation.isPending || !refinement} className="w-full bg-gray-900 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 border border-gray-800 disabled:opacity-50">
                {mutation.isPending ? "UPDATING..." : "RE-GENERATE PATHWAY"}
              </button>
            </div>

            <div className="p-8 bg-[#050505] border border-gray-900 whitespace-pre-wrap text-gray-300 font-mono text-sm leading-relaxed">
              {recommendation}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}