// components/animated-404.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Animated404() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.img
        src="/404-poster.svg"
        alt="Maintenance Illustration"
        className="mx-auto max-w-xs"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      />

      <div className="max-w-md mx-auto">
        <motion.h1
          className="text-4xl font-bold text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          404
        </motion.h1>

        <p className="text-muted-foreground text-sm">
          Oops! The page you’re looking for doesn’t exist.
        </p>
      </div>

      <Link href="/dashboard" passHref>
        <Button variant="secondary" size="lg" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>
    </motion.div>
  );
}
