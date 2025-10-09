// sidebar/index.tsx
import React, { useMemo } from "react";
import { Filter } from "lucide-react";
import { FilterContentConnector } from "./FilterContentConnector";
import { MobileSidebarWrapper } from "./MobileSidebarWrapper";
import "./sidebar.scss";

// ========================================
// MAIN COMPONENT: SidebarFilter
// ========================================

const SidebarFilter: React.FC = () => {
  // Memoize Desktop Sidebar
  const DesktopSidebar = useMemo(
    () => (
      <aside className="sidebar-filter desktop-sidebar" aria-label="Product filters">
        <div className="sidebar-header">
          <Filter className="header-icon" aria-hidden="true" />
          <h2 className="sidebar-title">Filter</h2>
        </div>
        <div className="sidebar-content">
          <FilterContentConnector />
        </div>
      </aside>
    ),
    []
  );

  return (
    <>
      {DesktopSidebar}
      <MobileSidebarWrapper />
    </>
  );
};

SidebarFilter.displayName = "SidebarFilter";

export default SidebarFilter;
