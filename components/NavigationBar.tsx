import {
  LayoutDashboard,
  Plus,
  MessageSquare,
  Tags,
  Settings,
  CheckSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface NavigationProps {
  activeTab: string;
  // onTabChange: (tab: string) => void;
}

const NavigationBar = ({ activeTab,}: NavigationProps) => {
  const router = useRouter();
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "create", label: "Create Task", icon: Plus },
    { id: "context", label: "Context", icon: MessageSquare },
    { id: "categories", label: "Categories", icon: Tags },
    { id: "preferences", label: "Preferences", icon: Settings },
  ];

  return (
    <nav className="bg-white border-r border-gray-300 border-border min-h-screen w-74 p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <CheckSquare className="h-8 w-8 text-[#602BEF]" />
          <h1 className="text-[#602BEF] text-2xl font-bold">TodoAI</h1>
        </div>
        <p className="text-sm text-[#602BEF]">Smart productivity with AI</p>
      </div>

      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                // onTabChange(item.id);
                if (item.id === "dashboard") {
                  router.push("/");
                } else if (item.id === "create") {
                  router.push("/task");
                } else if (item.id === "context") {
                  router.push("/context");
                } else if (item.id === "categories") {
                  router.push("/categories");
                } else if (item.id === "preferences") {
                  router.push("/preferences");
                }
              }}
              className={`w-full justify-start gap-3 text-left transition-all duration-200 flex flex-row items-center px-2 py-2 cursor-pointer hover:bg-[#602BEF] hover:text-white rounded-md ${
                activeTab === item.id
                  ? "bg-[#602BEF] text-white"
                  : "text-gray-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationBar;
