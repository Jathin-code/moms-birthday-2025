
"use client";

import OpeningScene from '@/components/sections/opening-scene';
import GardenOfGratitude from '@/components/sections/garden-of-gratitude';
import HeartTrailMilestones from '@/components/sections/heart-trail-milestones';
import CrownOfQueens from '@/components/sections/crown-of-queens';
import StarrySkyOfWishes from '@/components/sections/starry-sky-of-wishes';
import ScrollOfForeverLove from '@/components/sections/scroll-of-forever-love';
import InfinityLoop from '@/components/sections/infinity-loop';
import GiftBoxReveal from '@/components/sections/gift-box-reveal';
import { HeartTrailCanvas } from '@/components/heart-trail-canvas';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-[#FFF7F0] overflow-x-hidden">
      <HeartTrailCanvas />
      <OpeningScene />
      <GardenOfGratitude />
      <HeartTrailMilestones />
      <CrownOfQueens />
      <StarrySkyOfWishes />
      <ScrollOfForeverLove />
      <InfinityLoop />
      <GiftBoxReveal />
    </main>
  );
}
