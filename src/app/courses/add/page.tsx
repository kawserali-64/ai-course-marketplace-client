"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { HiCloudArrowUp, HiSparkles } from "react-icons/hi2";
import { authClient, useSession } from "@/lib/auth-client";

interface CourseForm {
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  level: string;
  price: string;
  instructor: string;
}

export default function AddCoursePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState("Medium");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState<CourseForm>({
    title: "",
    shortDescription: "",
    description: "",
    category: "",
    level: "Beginner",
    price: "",
    instructor: "",
  });

  const inputClass =
    "w-full bg-[#0a0a0a] border border-gray-900 px-4 py-3 text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const generateDescription = async () => {
    if (!form.title || !form.category || !form.level) {
      return toast.error("Please enter title, category and level first");
    }
    try {
      setAiLoading(true);
      const { data } = await authClient.token();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ai/generate-description`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data?.token}`,
          },
          body: JSON.stringify({
            title: form.title,
            category: form.category,
            level: form.level,
            length: descriptionLength,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "AI generation failed");
      }
      setForm((prev) => ({ ...prev, description: result.description }));
      toast.success("AI description generated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "AI failed");
    } finally {
      setAiLoading(false);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) throw new Error("Please select course image");
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );
    const data = await response.json();
    if (!data.success) throw new Error("Image upload failed");
    return data.data.url;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session?.user) return toast.error("Please login first");
    if (!imageFile) return toast.error("Please upload course image");

    try {
      setLoading(true);
      const image = await uploadImage();
      const payload = {
        ...form,
        price: Number(form.price),
        image,
        rating: 0,
        students: 0,
        ownerId: session.user.id,
        ownerName: session.user.name,
        ownerEmail: session.user.email,
        createdAt: new Date(),
      };

      const { data } = await authClient.token();
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Course creation failed");
      }

      toast.success("Course added successfully");
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      queryClient.invalidateQueries({ queryKey: ["featured-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      router.push("/courses/my-courses");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#050505] py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="border border-gray-900 bg-[#0a0a0a] p-10">
          <div className="mb-10">
            <h1 className="flex items-center gap-3 text-3xl font-black text-white uppercase tracking-tighter">
              <HiSparkles className="text-cyan-500" />
              Add New Module
            </h1>
            <p className="mt-2 text-gray-500">Configure course architecture</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <input required name="title" placeholder="Course Title" className={inputClass} value={form.title} onChange={handleChange} />
              <input required name="instructor" placeholder="Instructor Name" className={inputClass} value={form.instructor} onChange={handleChange} />
            </div>
            <input required name="shortDescription" placeholder="Short description" className={inputClass} value={form.shortDescription} onChange={handleChange} />
            
            <div className="bg-[#050505] border border-gray-900 p-6">
              <label className="mb-4 block font-bold text-white uppercase tracking-widest text-xs">AI Description Engine</label>
              <select value={descriptionLength} onChange={(e) => setDescriptionLength(e.target.value)} className={`${inputClass} mb-4`}>
                <option value="Short">Short (50-70 words)</option>
                <option value="Medium">Medium (120-150 words)</option>
                <option value="Long">Long (200-300 words)</option>
              </select>
              <button type="button" onClick={generateDescription} disabled={aiLoading} className="flex w-full items-center justify-center gap-2 bg-gray-900 py-3 font-bold text-white uppercase tracking-widest hover:bg-cyan-500/20 transition-all border border-gray-800 hover:border-cyan-500/50 disabled:opacity-50">
                <HiSparkles className="text-cyan-500" />
                {aiLoading ? "Generating..." : "Generate AI Description"}
              </button>
            </div>

            <textarea required name="description" placeholder="Full course description" rows={6} className={inputClass} value={form.description} onChange={handleChange} />
            
            <div className="grid gap-5 md:grid-cols-3">
              <select required name="category" className={inputClass} value={form.category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="AI">AI</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Programming">Programming</option>
              </select>
              <select name="level" className={inputClass} value={form.level} onChange={handleChange}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <input required type="number" name="price" placeholder="Price ($)" className={inputClass} value={form.price} onChange={handleChange} />
            </div>

            <div className="border border-dashed border-gray-900 p-8 text-center bg-[#0a0a0a]">
              <input id="image" type="file" className="hidden" onChange={handleImage} />
              <label htmlFor="image" className="flex cursor-pointer flex-col items-center gap-3">
                {preview ? <Image src={preview} width={120} height={120} alt="preview" className="border border-cyan-500" /> : <HiCloudArrowUp size={45} className="text-gray-500" />}
                <span className="text-gray-400 font-mono text-sm"> UPLOAD COVER ASSET</span>
              </label>
            </div>

            <button disabled={loading} className="w-full bg-cyan-500 py-5 font-black uppercase tracking-[0.2em] text-[#050505] hover:bg-white transition-all disabled:opacity-50">
              {loading ? "PROCESSING..." : "PUBLISH MODULE"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}