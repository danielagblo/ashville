"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface DynamicImageProps extends Omit<ImageProps, "src"> {
  sectionId: string;
  defaultSrc: string;
}

let globalImageMap: Record<string, { imageUrl: string, images: string[] }> | null = null;
let isFetching = false;
const listeners: Array<(map: Record<string, { imageUrl: string, images: string[] }>) => void> = [];

export const getGlobalImageMap = async (): Promise<Record<string, { imageUrl: string, images: string[] }>> => {
  if (globalImageMap) return globalImageMap;
  if (isFetching) {
    return new Promise((resolve) => {
      listeners.push(resolve);
    });
  }

  isFetching = true;
  try {
    const response = await fetch("/api/media");
    const result = await response.json();
    if (result.success) {
      globalImageMap = result.data;
      listeners.forEach((l) => l(globalImageMap!));
      return globalImageMap!;
    }
  } catch (error) {
    console.error("Failed to fetch dynamic images:", error);
  } finally {
    isFetching = false;
  }
  return {};
};

export default function DynamicImage({ sectionId, defaultSrc, ...props }: DynamicImageProps) {
  const [src, setSrc] = useState<string>(defaultSrc);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const map = await getGlobalImageMap();
      setSrc(map[sectionId]?.imageUrl || defaultSrc);
      setLoading(false);
    };
    init();
  }, [sectionId, defaultSrc]);

  return (
    <Image
      {...props}
      src={src}
      className={`${props.className || ""} ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
    />
  );
}
