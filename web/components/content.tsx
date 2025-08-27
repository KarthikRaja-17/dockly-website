import React from "react";
import { motion } from "framer-motion";
import { Card, Row, Col } from "antd";
import {
    LinkOutlined,
    HomeOutlined,
    HeartOutlined,
    DollarOutlined,
    TeamOutlined,
    CalendarOutlined,
} from "@ant-design/icons";
import { Activity, Calendar, DollarSign, Heart, Home, Link, TrendingUp, Users } from "lucide-react";
import EditableText from "./admin/editableText";
import { useAdmin } from "./admin/context";

// const features = [
//     {
//         icon: <LinkOutlined style={{ fontSize: "1.5rem", color: "#3b82f6" }} />,
//         title: "Connect & Manage",
//         desc: "Bring everything together into one smart hub.",
//         color: "linear-gradient(135deg, #e0f2fe, #dbeafe)",
//     },
//     {
//         icon: <TeamOutlined style={{ fontSize: "1.5rem", color: "#8b5cf6" }} />,
//         title: "Family & Legacy",
//         desc: "Keep key family info secure & shareable.",
//         color: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
//     },
//     {
//         icon: <HomeOutlined style={{ fontSize: "1.5rem", color: "#10b981" }} />,
//         title: "Home & Property",
//         desc: "Track maintenance, providers & warranties.",
//         color: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
//     },
//     {
//         icon: <HeartOutlined style={{ fontSize: "1.5rem", color: "#ef4444" }} />,
//         title: "Health & Wellness",
//         desc: "Manage health info, insurance & wellness plans.",
//         color: "linear-gradient(135deg, #fee2e2, #fecaca)",
//     },
//     {
//         icon: <DollarOutlined style={{ fontSize: "1.5rem", color: "#f59e0b" }} />,
//         title: "Finances",
//         desc: "Get clarity on accounts, bills & documents.",
//         color: "linear-gradient(135deg, #fef3c7, #fde68a)",
//     },
//     {
//         icon: <CalendarOutlined style={{ fontSize: "1.5rem", color: "#2563eb" }} />,
//         title: "Planner",
//         desc: "Manage your digital life with tasks & schedules.",
//         color: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
//     },
// ];
interface Feature {
    color: string;
    icon: string;
    title: string;
    desc: string;
}

const iconMap = {
    Link: Link,
    Users: Users,
    Home: Home,
    Heart: Heart,
    DollarSign: DollarSign,
    Calendar: Calendar,
    Activity: Activity,
    TrendingUp: TrendingUp,
} as const;

// Color mapping for icons based on feature type
const iconColorMap = {
    Link: "#3b82f6",
    Users: "#8b5cf6",
    Home: "#10b981",
    Heart: "#ef4444",
    DollarSign: "#f59e0b",
    Calendar: "#2563eb",
    Activity: "#ef4444",
    TrendingUp: "#3b82f6",
} as const;

const LifePlatformCompact = ({ features }: { features: Feature[] }) => {
    const { saveConfigToServer } = useAdmin();

    return (
        <div className="w-full h-full overflow-y-auto p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((item, index) => {
                    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                    const iconColor = iconColorMap[item.icon as keyof typeof iconColorMap];

                    return (
                        <div
                            key={index}
                            className="group cursor-pointer transition-transform duration-200 hover:scale-105"
                        >
                            <div
                                className="rounded-lg border-none shadow-lg min-h-[90px] flex items-center p-3 transition-shadow duration-200 hover:shadow-xl"
                                style={{
                                    background: item.color,
                                }}
                            >
                                <div className="mr-3 flex-shrink-0">
                                    {IconComponent && (
                                        <IconComponent
                                            size={24}
                                            style={{ color: iconColor }}
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-base font-semibold text-gray-800 mb-1 leading-tight">
                                        <EditableText
                                            value={item.title}
                                            onSave={() => {
                                                saveConfigToServer();
                                            }}
                                            configPath={`pricing.features.${index}.title`}
                                        >
                                            {item.title}
                                        </EditableText>
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        <EditableText
                                            value={item.desc}
                                            onSave={() => {
                                                saveConfigToServer();
                                            }}
                                            configPath={`pricing.features.${index}.desc`}
                                            multiline
                                        >
                                            {item.desc}
                                        </EditableText>
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LifePlatformCompact;
