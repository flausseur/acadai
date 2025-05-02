import { LampDesk } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Smart deadline management for students
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Never miss a deadline{" "}
                  <span className="text-primary">again</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  AI-powered academic task management to help you stay on top of your assignments, 
                  exams, and projects with smart scheduling and reminders.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="px-8">
                    Get Started
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything you need to succeed
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  AcadAI combines smart technology with practical tools to help you manage your academic workload effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <LampDesk className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Deadline Tracker</h3>
                <p className="text-center text-muted-foreground">
                  Track assignments, projects, exams, and more with color-coded categories and visual indicators.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <LampDesk className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Study Planner</h3>
                <p className="text-center text-muted-foreground">
                  Get personalized weekly study schedules based on your deadlines, workload, and available time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <LampDesk className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Reminders</h3>
                <p className="text-center text-muted-foreground">
                  Get timely notifications and motivational nudges to keep you on track with your academic goals.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <LampDesk className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Academic Resources</h3>
                <p className="text-center text-muted-foreground">
                  Access templates, sample papers, citation guides, and study materials relevant to your courses.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <LampDesk className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Progress Dashboard</h3>
                <p className="text-center text-muted-foreground">
                  Visualize your progress with intuitive charts and analytics to stay motivated and prevent burnout.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <LampDesk className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Thesis & Internship Manager</h3>
                <p className="text-center text-muted-foreground">
                  Manage long-term projects with specialized tools for tracking progress and meetings with advisors.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to transform your academic life?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of students who are already using AcadAI to stay organized and excel in their studies.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <div className="flex justify-center">
                  <Link href="/dashboard">
                    <Button size="lg" className="px-8">
                      Get Started Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
          <div className="flex items-center gap-2">
            <LampDesk className="h-6 w-6 text-primary" />
            <p className="text-sm text-muted-foreground">
              © 2025 AcadAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}