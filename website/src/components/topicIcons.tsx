import {
  Archive,
  ArrowsLeftRight,
  BookOpen,
  Circuitry,
  Cloud,
  Code,
  Cube,
  Database,
  FileCpp,
  Globe,
  Graph,
  Infinity as InfinityIcon,
  Layout as LayoutIcon,
  Lightbulb,
  Lightning,
  Robot,
  ShareNetwork,
  ShieldCheck,
  Stack,
  Terminal,
  type Icon,
} from '@phosphor-icons/react';

const MAP: Record<string, Icon> = {
  'AI': Robot,
  'Algorithm': Graph,
  'Asynchronous Programming': Lightning,
  'Back End': Cloud,
  'C++': FileCpp,
  'Concept': Lightbulb,
  'Cyber Security': ShieldCheck,
  'DevOps': InfinityIcon,
  'Distributed Systems': ShareNetwork,
  'IPC': ArrowsLeftRight,
  'MongoDB': Database,
  'Network': Globe,
  'Nvidia': Circuitry,
  'QML': LayoutIcon,
  'Software Architecture': Stack,
  'System Programming': Terminal,
  'Uncategorized': Archive,
  'Virtualization': Cube,
  'Tổng quan': BookOpen,
};

export function TopicIcon({ topic, size = 24 }: { topic: string; size?: number }) {
  const Cmp: Icon = MAP[topic] ?? Code;
  return <Cmp size={size} weight="regular" aria-hidden="true" />;
}
