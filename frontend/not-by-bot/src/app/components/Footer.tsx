"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/prismicio";
import WordMark from "./WordMark";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default function Footer() {
  type NavigationItem = {
    label: string | null;
    link: any;
  };

  const [settings, setSettings] = useState<NavigationItem[] | undefined>();

  useEffect(() => {
    const client = createClient();
    const fetchData = async () => {
      const settingsData = await client.getSingle("settings");
      setSettings(settingsData.data.navigation);
    };
    fetchData();
  }, []);

  if (!settings) {
    return null;
  }

  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-slate-600 px-8 py-7 md:flex-row">
      <Link href="/">
        <WordMark />
      </Link>
      <nav aria-label="Footer">
        <ul className="flex gap-6">
          {settings.map((item) => (
            <li key={item.label} className="text-white">
              <PrismicNextLink field={item.link} className="inline-flex min-h-11 items-center">{item.label}</PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
