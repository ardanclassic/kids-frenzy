// sidebar/constants.ts
import {
  Sparkles,
  BookMarked,
  BookOpen,
  Target,
  Shuffle,
  Palette,
  Brain,
  Scissors,
  PenTool,
  Users,
  MoreHorizontal,
  Globe,
  Languages,
  Package,
  Box,
} from "lucide-react";

// ========================================
// ICON MAPPING
// ========================================

export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  BookMarked,
  BookOpen,
  Target,
  Shuffle,
  Palette,
  Brain,
  Scissors,
  PenTool,
  Users,
  MoreHorizontal,
  Globe,
  Languages,
  Package,
  Box,
};

// ========================================
// HELPER: GET ICON COMPONENT
// ========================================

export const getIconComponent = (iconName: string) => {
  return ICON_MAP[iconName] || Sparkles;
};
