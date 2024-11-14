import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

type CategoriesSidebarProps = {
  categories: Array<string>;
  className?: string;
};

export function CategoriesSidebar({
  categories,
  className,
}: CategoriesSidebarProps) {
  return (
    <nav
      className={cn(
        "w-[256px] p-2 h-full border-r border-neutral-200 flex flex-col",
        className
      )}
    >
      {categories.map((category) => (
        <Link
          to={`/list/${category}`}
          className="p-2 hover:bg-neutral-100 rounded-sm"
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
