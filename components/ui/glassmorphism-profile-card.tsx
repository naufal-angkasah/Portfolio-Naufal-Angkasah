"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, Plus, Copy, Zap, Check } from "lucide-react";

interface ComponentProps {
  name?: string;
  role?: string;
  email?: string;
  avatarSrc?: string;
  statusText?: string;
  statusColor?: string;
  glowText?: string;
  className?: string;
  onHireClick?: () => void;
}

export default function GlassmorphismProfileCard({
  name = "Naufal Angkasah",
  role = "Web Developer & Network Security",
  email = "naufalangkasah@gmail.com",
  avatarSrc = "/uploads/naufal-profile.jpg",
  statusText = "Available for work",
  statusColor = "bg-emerald-400",
  glowText = "Currently High on Creativity & Tech",
  className,
  onHireClick,
}: ComponentProps) {
  const [copied, setCopied] = useState(false);
  const [timeText, setTimeText] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const hour12 = ((h + 11) % 12) + 1;
      const ampm = h >= 12 ? "PM" : "AM";
      setTimeText(`${hour12}:${m} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback if clipboard API unavailable
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("relative w-full max-w-md mx-auto", className)}
    >
      {/* Background Neon Glow matched to Ocean Cyan/Emerald theme */}
      <div className="pointer-events-none absolute inset-x-4 -bottom-8 top-[85%] rounded-[28px] bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 opacity-90 blur-xl shadow-[0_30px_70px_-10px_rgba(6,182,212,0.7)] z-0" />

      {/* Bottom Glow Banner */}
      <div className="absolute inset-x-0 -bottom-8 mx-auto w-full z-0 pointer-events-none">
        <div className="flex items-center justify-center gap-2 bg-transparent py-2.5 text-center text-xs sm:text-sm font-bold text-slate-950">
          <Zap className="h-4 w-4 fill-slate-950 text-slate-950" /> {glowText}
        </div>
      </div>

      {/* Glassmorphic Card */}
      <Card
        className={cn(
          "relative z-10 mx-auto w-full overflow-visible rounded-[28px]",
          "bg-slate-950/40 backdrop-blur-2xl",
          "border border-cyan-200/25 border-b-cyan-200/10",
          "shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_rgba(6,182,212,0.2)] text-white transition-all duration-300"
        )}
      >
        <CardContent className="p-6 sm:p-7">
          {/* Header Status & Time */}
          <div className="mb-5 flex items-center justify-between text-xs sm:text-sm text-cyan-100/75">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block h-2.5 w-2.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]",
                  statusColor
                )}
              />
              <span className="select-none font-medium">{statusText}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-85 text-sky-200">
              <Clock className="h-3.5 w-3.5" />
              <span suppressHydrationWarning className="tabular-nums font-medium">
                {timeText || "12:00 PM"}
              </span>
            </div>
          </div>

          {/* Avatar & Profile Information */}
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="relative h-48 w-48 sm:h-52 sm:w-52 shrink-0 overflow-hidden rounded-[22px] ring-2 ring-cyan-300/30 shadow-[0_10px_30px_rgba(0,0,0,0.35)] bg-slate-900/60">
              <Image
                src={avatarSrc}
                alt={`${name} avatar`}
                fill
                priority
                sizes="(max-width: 640px) 192px, 208px"
                className="object-cover object-center"
              />
            </div>
            <div className="min-w-0 text-center px-2">
              <h3 className="truncate text-xl font-black tracking-tight text-white sm:text-2xl">
                {name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-cyan-200/80">
                {role}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              onClick={onHireClick}
              className="h-11 justify-center gap-2 rounded-xl bg-white/10 hover:bg-cyan-500/20 text-cyan-50 border-cyan-200/25 transition backdrop-blur-md cursor-pointer font-bold text-xs sm:text-sm"
            >
              <Plus className="h-4 w-4 text-cyan-300" /> Hire Me
            </Button>

            <Button
              variant="outline"
              onClick={handleCopy}
              className="h-11 justify-center gap-2 rounded-xl bg-white/10 hover:bg-emerald-500/20 text-cyan-50 border-cyan-200/25 transition backdrop-blur-md cursor-pointer font-bold text-xs sm:text-sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-cyan-300" /> Copy Email
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
