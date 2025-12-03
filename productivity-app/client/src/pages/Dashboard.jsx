import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
    IconArrowLeft,
    IconChecklist,
    IconNote,
    IconTargetArrow,
    IconActivity
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "../context/AuthContext";
import TaskList from "../components/TaskList";
import NoteList from "../components/NoteList";
import GoalList from "../components/GoalList";
import ThemeToggle from "../components/ThemeToggle";
import Hyperspeed, { hyperspeedPresets } from "../components/Hyperspeed";

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tasks");
    const { logout, user } = useAuth();

    const links = [
        {
            label: "Tasks",
            href: "#",
            icon: (
                <IconChecklist className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
            id: "tasks"
        },
        {
            label: "Notes",
            href: "#",
            icon: (
                <IconNote className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
            id: "notes"
        },
        {
            label: "Goals",
            href: "#",
            icon: (
                <IconTargetArrow className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
            id: "goals"
        },
        {
            label: "Focus Mode",
            href: "#",
            icon: (
                <IconActivity className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
            id: "focus"
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
            onClick: logout
        },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'tasks':
                return <TaskList />;
            case 'notes':
                return <NoteList />;
            case 'goals':
                return <GoalList />;
            case 'focus':
                return (
                    <div className="w-full h-full relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0 z-0">
                            <Hyperspeed effectOptions={hyperspeedPresets.two} />
                        </div>
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white pointer-events-none">
                            <h1 className="text-6xl font-bold mb-4 tracking-tighter">FOCUS</h1>
                            <p className="text-xl opacity-80">Enter the flow state</p>
                        </div>
                    </div>
                );
            default:
                return <TaskList />;
        }
    };

    return (
        <div
            className={cn(
                "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    onClick={(e) => {
                                        if (link.onClick) {
                                            e.preventDefault();
                                            link.onClick();
                                        } else if (link.id) {
                                            e.preventDefault();
                                            setActiveTab(link.id);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: user?.name || "User",
                                href: "#",
                                icon: (
                                    <div className="h-7 w-7 shrink-0 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                        {user?.name?.charAt(0) || "U"}
                                    </div>
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1 overflow-y-auto bg-white dark:bg-neutral-900">
                <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full relative">
                    <div className="absolute top-4 right-4 z-50">
                        <ThemeToggle />
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export const Logo = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                ProdApp
            </motion.span>
        </a>
    );
};

export const LogoIcon = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        </a>
    );
};
