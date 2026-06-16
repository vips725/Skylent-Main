import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bell, CheckCircle, BookOpen, Award, Clock, FileText, ChevronRight } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    text: "Assignment due tomorrow",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: BookOpen,
    iconColor: "text-violet-500",
    text: "New course material added",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: Award,
    iconColor: "text-amber-500",
    text: "You earned a certificate!",
    time: "1 day ago",
  },
  {
    id: 4,
    icon: Clock,
    iconColor: "text-rose-500",
    text: "Course completed",
    time: "2 days ago",
  },
  {
    id: 5,
    icon: FileText,
    iconColor: "text-blue-500",
    text: "Weekly report available",
    time: "3 days ago",
  },
];

const NotificationDropdown = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative p-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500">
        <Bell className="w-5 h-5 text-stone-600 dark:text-stone-300" />
        {/* Unread indicator */}
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-stone-800" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 focus:outline-none z-50">
          <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-700">
            <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-100">
              Notifications
            </h3>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notif) => (
              <Menu.Item key={notif.id}>
                {() => (
                  <div className="flex items-start gap-3 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors cursor-default border-b border-stone-100 dark:border-stone-700 last:border-b-0">
                    <div className={`mt-0.5 p-1.5 rounded-lg bg-stone-100 dark:bg-stone-700`}>
                      <notif.icon className={`w-4 h-4 ${notif.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-700 dark:text-stone-200 font-medium">
                        {notif.text}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">{notif.time}</p>
                    </div>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-stone-100 dark:border-stone-700">
            <button className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationDropdown;