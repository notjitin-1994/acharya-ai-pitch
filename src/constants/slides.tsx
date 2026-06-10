import React from 'react';
import { 
  Building2, GraduationCap, Users, Lightbulb, Zap, Target, Layers, Rocket, CheckCircle2, X,
  ArrowRight, Brain, Globe, TrendingUp, Shield, Award, Briefcase, Sparkles, Binary,
  Compass, PieChart, MessageSquare, Cpu, Search, Database, BarChart3, Presentation,
  ShieldAlert, LibraryBig, RefreshCw, Gauge, Clock, Palette, Repeat, Wrench, Fingerprint,
  BookOpen, FlaskConical, EyeOff, Activity, Network, ChevronRight
} from 'lucide-react';
import { m } from 'framer-motion';
import { theme } from '../theme/branding';
import { FlipCard } from '../components/FlipCard';

export interface Slide {
  id: number;
  tag: string;
  title: string;
  content: React.ReactNode;
  notes: string;
  bgImage?: string;
  overlayColor?: string;
  tagColor?: string;
  titleColor?: string;
  hideTitle?: boolean;
  fullBleed?: boolean;
}

export const slidesData: Slide[] = [
  {
    id: 1,
    tag: "The Vision",
    title: "Project: Institutional Intelligence",
    bgImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
    overlayColor: "rgba(2, 12, 27, 0.2)",
    content: (
      <div className="relative h-full flex flex-col justify-center">
        <div className="relative z-20 space-y-12 max-w-5xl text-left">
          <m.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center gap-6"
          >
            <img src="/ait-logo.png" alt="AIT" className="h-24 w-auto" />
            <div className="h-16 w-px bg-white" />
            <div className="flex flex-col">
              <span className="text-xl tracking-[0.4em] font-display uppercase font-bold text-[#A7DADB]">Strategic</span>
              <span className="text-xl tracking-[0.4em] font-display uppercase font-bold text-white">Partnership</span>
            </div>
          </m.div>
          <div className="space-y-4">
            <m.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="text-[140px] font-display font-bold text-white leading-[0.9] tracking-tighter text-left"
            >
              The AI <br /><span className="italic font-serif text-[#A7DADB]">Transformation</span>
            </m.h1>
          </div>
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1.0 }}
            className="text-4xl text-[#b0c5c6] font-light max-w-none leading-relaxed text-left whitespace-nowrap"
          >
            Deploying a world-class cognitive ecosystem at Acharya Institute of Technology.
          </m.p>
        </div>
      </div>
    ),
    notes: "Thank you for having me. Today, we aren't just talking about software. We are talking about the future of Acharya Institute of Technology."
  }
];
