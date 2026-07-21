import React from "react";
import {
  ShieldCheck,
  Users,
  HeartHandshake,
  Lock,
  Eye,
  Activity,
  FolderHeart,
  PiggyBank,
  UserCheck,
  Sprout,
  TrendingUp,
  MessagesSquare,
  Calendar,
  Briefcase,
  Smile,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Info,
  Award,
  BookOpen,
  Droplet,
  FileText,
  AlertTriangle,
  Sparkles
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  ShieldCheck,
  Users,
  HeartHandshake,
  Lock,
  Eye,
  Activity,
  FolderHeart,
  PiggyBank,
  UserCheck,
  Sprout,
  TrendingUp,
  MessagesSquare,
  Calendar,
  Briefcase,
  Smile,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Info,
  Award,
  BookOpen,
  Droplet,
  FileText,
  AlertTriangle,
  Sparkles
};

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export function IconRenderer({ name, className = "", size = 24 }: IconRendererProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    // Fallback to a default generic icon (like Info)
    return <Info className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
}
