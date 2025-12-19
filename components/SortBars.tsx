"use client"

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type BarState = "normal" | "compare" | "sorted";

const BAR_COLORS: Record<BarState, string> = {
  normal: "#5BCEFFFF",
  compare: "#f97316",
  sorted: "#94a3b8",
};

export default function SortBars({
  data,
  states,
}: {
  data: number[];
  states: BarState[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgWidth, setSvgWidth] = useState(600);
  const height = 200;
  const barWidth = svgWidth / data.length;

  const max = Math.max(...data);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const updateWidth = () => {
      const rect = svg.getBoundingClientRect();
      setSvgWidth(rect.width);
    };

    // 初回の幅を取得
    updateWidth();

    // ResizeObserverでリサイズを監視
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(svg);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      height={height}
      className="w-full bg-white py-4"
    >
      {data.map((v, i) => {
        const barHeight = (v / max) * (height - 10);
        // barWidthが小さい場合でも負の値にならないように、比率ベースで計算
        const gap = Math.min(4, barWidth * 0.1); // gapは最大4px、またはbarWidthの10%の小さい方
        const actualBarWidth = Math.max(barWidth - gap, 0);
        return (
          <motion.rect
            key={i}
            x={i * barWidth}
            y={height - barHeight}
            width={actualBarWidth}
            height={barHeight}
            fill={BAR_COLORS[states[i] ?? "normal"]}
            transition={{ duration: 0.2 }}
          />
        );
      })}
    </svg>
  );
}