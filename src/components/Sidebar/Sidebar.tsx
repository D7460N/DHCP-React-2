import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState, Fragment } from "react";
import { LucideIcon } from "lucide-react";
import { NavItem } from "../../types/navigation";

type Props = {
  items: NavItem[];
  title?: string;
  storageKey?: string;
  basePath?: string; // e.g. "/dns"
  collapseDefault?: boolean;
  expandOnActive?: boolean; // auto-open parents if a child is active
};

export default function Sidebar ({
  items,
  title = "Menu",
  storageKey = "shared.sidebarCollapsed",
  basePath,
  collapseDefault = false,
  expandOnActive = true,
}: Props) {
  const [collapsed, setCollapsed] = useState(collapseDefault);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const { pathname } = useLocation();

  // load/persist collapsed
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw != null) setCollapsed(raw === "1");
  }, [storageKey]);
  useEffect(() => {
    localStorage.setItem(storageKey, collapsed ? "1" : "0");
  }, [storageKey, collapsed]);

  // local storage for open groups
  useEffect(() => {
    const raw = localStorage.getItem(storageKey + ".open");
    if (raw) setOpen(JSON.parse(raw));
  }, [storageKey]);
  useEffect(() => {
    localStorage.setItem(storageKey + ".open", JSON.stringify(open));
  }, [storageKey, open]);

  const widthClass = useMemo(() => (collapsed ? "w-6" : "w-60"), [collapsed]);

  const resolveTo = (to?: string) => {
    if (to === undefined) return undefined;

    if (!basePath) return to;

    if (basePath) {
      const base = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
      if (to === "" || to === ".") return base;

      const rel = to.startsWith("/") ? to.slice(1) : to;
      return `${base}/${rel}`
    }
    return to;
  }

  // helper: does any descendant match current route?
  const pathStartsWith = (to?: string) =>
    !!to && pathname.startsWith(resolveTo(to) || "");

  const hasActiveDescendant = (node: NavItem): boolean => {
    if (pathStartsWith(node.to)) return true;
    return (node.children || []).some(hasActiveDescendant);
  };

  // auto-open groups when a child is active
  useEffect(() => {
    if (!expandOnActive) return;
    const next: Record<string, boolean> = { ...open };
    const visit = (nodes: NavItem[]) => {
      for (const n of nodes) {
        const key = n.id || n.label;
        if (n.children?.length) {
          if (hasActiveDescendant(n)) next[key] = true;
          visit(n.children);
        }
      }
    };
    visit(items);
    setOpen(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // re-evaluate when route changes
  
  const toggleGroup = (key: string) => {
    setOpen((s) => ({ ...s, [key]: !s[key] }));

  const Item = ({ node, depth  = 0 }: { node: NavItem; depth?: number }) => {
    const key = node.id || node.label;
    const isGroup = !!node.children?.length;
    const padding = collapsed ? "px-2" : `pl-${Math.min(2 + depth * 2, 10)} pr-2`;
    const Icon = node.icon;

    if (isGroup) {
      const expanded = !!open[key];
      return (
        <div>
          <button
            type="button"
            onClick={() => toggleGroup(key)}
            className={`w-fill ${padding} py-2 rounded-lg hover:bg-gray-100 flex items-center justify-between text-sm`}
            aria-expanded={expanded}
            title={collapsed ? node.label : undefined}
          >
            <span className="flex items-center gap-2 truncate">
              {Icon ? <Icon className="w-4 h-4 shrink-0" /> : null}
              <span className={collapsed ? "sr-only md:not-sr-only md:hidden" : ""}>
                {node.label}
              </span>
            </span>
          </button>
              
          {expanded && (  
            <div className={`mt-1 space-y-1 ${collapsed ? "hidden" : ""}`}>
              {node.children!.map((c) => (
                <Item key={(c.id || c.label) + depth} node={c} depth={depth +1} />
              ))}
            </div>
          )}
        </div>
      };
    }

    // leaf item (link)
    return (
      <NavLink
        to={resolveTo(node.to)!}
        end={node.end ?? (node.to === "" || node.to === ".")}
        className={({ isActive }) =>
          `${padding} py-2 flex items-center gap-2 rounded-lg text-sm hover:bg-primary/50 ${isActive ? "bg-primary/50 text-sky-800" : ""}`
        }
        title={collapsed ? node.label : undefined}
      >
        {node.icon ? <node.icon className="w-4 h-4" /> : null}
        <span className={`${collapsed ? "sr-only md:not-sr-only md:hidden" : ""} truncate`}>
          {node.label}
        </span>
      </NavLink>
    );
  };

  return (
    <aside className={`${widthClass} shrink-0 border-r h-[calc(100vh-56px)] md:h-screen p-2 md:p-3 sticky top-0 bg-white dark:bg-zinc-900 border-zinc-200 dark: border-zinc-800`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`text-xs uppercase text-gray-500 dark:text-zinc-400 trackingg-wide ${collapsed ? "opacity-0 pointer-events-none" : ""}`}>
          {title}
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="rounded-md border px-2 py-1 text-xs hover:bg-primary/50 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? ">>" : "<<"}
        </button>
      </div>

      <nav className="space-y-1">
        {items.map((n) => (
          <Fragment key={n.id || n.label}>
            <Item node={n} />
          </Fragment>
        ))}
      </nav>
    </aside>          
  );
}
