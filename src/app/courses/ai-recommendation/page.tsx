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
      if (!session) {
        throw new Error("Please login first");
      }

      const { data, error } = await authClient.token();
      if (error || !data?.token) {
        throw new Error("Authentication failed");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ai/recommendation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to generate recommendation");
      }
      return result;
    },
    onSuccess: (data: RecommendationResponse) => {
      toast.success("Roadmap generated successfully!");
      setRecommendation(data.recommendation);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login first");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-5">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">AI Roadmap Generator</h1>
          <p className="text-gray-600">Get a personalized learning path tailored to your career goals.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Current Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData((prev) => ({ ...prev, level: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-600 outline-none"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Interest</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData((prev) => ({ ...prev, interest: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-600 outline-none"
                >
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
              <label className="block text-sm font-bold text-gray-700 mb-2">Career Goal</label>
              <input
                required
                value={formData.goal}
                placeholder="Become an AI Engineer"
                onChange={(e) => setFormData((prev) => ({ ...prev, goal: e.target.value }))}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Study Duration</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-600 outline-none"
              >
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
            >
              {mutation.isPending ? "Generating..." : "Generate Roadmap"}
              {!mutation.isPending && <HiSparkles size={20} />}
            </button>
          </form>
        </div>

        {recommendation && (
          <div className="bg-white rounded-3xl shadow-xl border border-cyan-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-cyan-100 p-3 rounded-xl text-cyan-600">
                <FaGraduationCap size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Your Personalized AI Learning Roadmap</h2>
                <p className="text-sm text-gray-500">AI generated roadmap based on your goals.</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-700 mb-2">Improve Your Roadmap</label>
              <input
                value={refinement}
                onChange={(e) => setRefinement(e.target.value)}
                placeholder="Example: Focus more on Machine Learning projects"
                className="w-full p-3 rounded-xl border border-gray-200 outline-none"
              />
              <button
                type="button"
                disabled={mutation.isPending || !refinement}
                onClick={() => mutation.mutate({ ...formData, refinement })}
                className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl disabled:opacity-50"
              >
                {mutation.isPending ? "Updating..." : "Refine Roadmap"}
              </button>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl whitespace-pre-wrap text-gray-700 leading-relaxed">
              {recommendation}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}