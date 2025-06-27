// app/not-found.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function CatchAllNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-muted">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <h1 className="text-6xl font-bold tracking-tight text-destructive">
          404
        </h1>
        <p className="text-xl text-muted-foreground">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link href="/dashboard" passHref>
          <Button variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go back home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
