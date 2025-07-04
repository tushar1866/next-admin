"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* 🖼️ Doodle Art or Illustration */}
        <motion.img
          src="/maintenance.svg" // <-- Replace with your doodle path
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
            We’ll be back soon!
          </motion.h1>

          {/* ℹ️ Message */}
          <p className="text-muted-foreground text-sm ">
            Our site is currently undergoing scheduled maintenance. We’ll be
            back shortly. Thanks for your patience!
          </p>
        </div>

        {/* 🔁 Go Back Button */}
        <Link href="/dashboard" passHref>
          <Button variant="secondary" size="lg" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
