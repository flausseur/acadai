"use client";

import { LampDesk } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: { name: string; href: string }[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function MobileNav({ items, setIsOpen }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 p-6">
      <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
        <LampDesk className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl bg-gradient-to-r from-primary to-chart-5 bg-clip-text text-transparent">
          AcadAI
        </span>
      </Link>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-muted",
              pathname === item.href
                ? "bg-muted text-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}