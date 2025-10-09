// sidebar/CategoryButtons.tsx
import React from "react";
import { motion } from "framer-motion";
import { getIconComponent } from "./constants";
import type { AgeCategory, ActivityCategory, LanguageCategory, BundlingCategory } from "./types";

// ========================================
// AGE CATEGORY BUTTON
// ========================================

interface AgeCategoryButtonProps {
  category: AgeCategory;
  isSelected: boolean;
  onClick: (categoryId: string) => void;
  disabled?: boolean;
}

export const AgeCategoryButton: React.FC<AgeCategoryButtonProps> = React.memo(
  ({ category, isSelected, onClick, disabled = false }) => {
    return (
      <motion.button
        onClick={() => onClick(category.id)}
        className={`filter-option ${isSelected ? "active" : ""}`}
        whileHover={{ scale: disabled ? 1 : 1.015 }}
        whileTap={{ scale: disabled ? 1 : 0.985 }}
        aria-pressed={isSelected}
        type="button"
        disabled={disabled}
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <span className="emoji" aria-hidden="true">
          {category.emoji}
        </span>
        <span className="name">{category.name}</span>
      </motion.button>
    );
  }
);

AgeCategoryButton.displayName = "AgeCategoryButton";

// ========================================
// ACTIVITY CATEGORY BUTTON
// ========================================

interface ActivityCategoryButtonProps {
  category: ActivityCategory;
  isSelected: boolean;
  onClick: (categoryId: string) => void;
  disabled?: boolean;
}

export const ActivityCategoryButton: React.FC<ActivityCategoryButtonProps> = React.memo(
  ({ category, isSelected, onClick, disabled = false }) => {
    const IconComponent = getIconComponent(category.icon);

    return (
      <motion.button
        onClick={() => onClick(category.id)}
        className={`filter-option ${isSelected ? "active" : ""}`}
        whileHover={{ scale: disabled ? 1 : 1.015 }}
        whileTap={{ scale: disabled ? 1 : 0.985 }}
        title={category.description}
        aria-pressed={isSelected}
        aria-label={`${category.name} - ${category.description}`}
        type="button"
        disabled={disabled}
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <IconComponent className="icon" aria-hidden="true" />
        <span className="name">{category.name}</span>
      </motion.button>
    );
  }
);

ActivityCategoryButton.displayName = "ActivityCategoryButton";

// ========================================
// LANGUAGE CATEGORY BUTTON
// ========================================

interface LanguageCategoryButtonProps {
  category: LanguageCategory;
  isSelected: boolean;
  onClick: (categoryId: string) => void;
}

export const LanguageCategoryButton: React.FC<LanguageCategoryButtonProps> = React.memo(
  ({ category, isSelected, onClick }) => {
    const IconComponent = getIconComponent(category.icon);

    return (
      <motion.button
        onClick={() => onClick(category.id)}
        className={`filter-option ${isSelected ? "active" : ""}`}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        title={category.description}
        aria-pressed={isSelected}
        aria-label={`${category.name} - ${category.description}`}
        type="button"
      >
        <IconComponent className="icon" aria-hidden="true" />
        <span className="name">{category.name}</span>
      </motion.button>
    );
  }
);

LanguageCategoryButton.displayName = "LanguageCategoryButton";

// ========================================
// BUNDLING CATEGORY BUTTON
// ========================================

interface BundlingCategoryButtonProps {
  category: BundlingCategory;
  isSelected: boolean;
  onClick: (categoryId: string) => void;
}

export const BundlingCategoryButton: React.FC<BundlingCategoryButtonProps> = React.memo(
  ({ category, isSelected, onClick }) => {
    const IconComponent = getIconComponent(category.icon);

    return (
      <motion.button
        onClick={() => onClick(category.id)}
        className={`filter-option ${isSelected ? "active" : ""}`}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        title={category.description}
        aria-pressed={isSelected}
        aria-label={`${category.name} - ${category.description}`}
        type="button"
      >
        <IconComponent className="icon" aria-hidden="true" />
        <span className="name">{category.name}</span>
      </motion.button>
    );
  }
);

BundlingCategoryButton.displayName = "BundlingCategoryButton";
