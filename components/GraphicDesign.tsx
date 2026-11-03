"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
    ArrowDown,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Eye,
    Layers,
    Mail,
    Maximize2,
    Sparkles,
    X,
    BookOpen,
    Grid,
    Play,
    RotateCcw,
    PenTool,
    MousePointer,
    Type,
    Square,
    Pipette,
    Ruler,
    Crosshair,
} from "lucide-react";
import { FiDownload } from "react-icons/fi";
import { playTechTick, playTechPop, playTechDataPacketSwipe, playTechChirp } from "@/lib/techSound";

// ==========================================
// DATA DEFINITIONS & ASSET REGISTRY
// ==========================================

export interface DesignItem {
    id: string;
    title: string;
    category: string;
    section: string;
    path: string;
    tag?: string;
    description?: string;
}

// 01. Story Books (No individual descriptions, curated age groups & editorial spreads)
const storyBooksList: DesignItem[] = [
    {
        id: "sb-1",
        title: "Do You Know Me?",
        category: "Story Books",
        section: "01. Story Books",
        path: "/assets/graphic-design-images/1-story-books/Do You Know Me.png",
        tag: "Ages 7+",
    },
    {
        id: "sb-2",
        title: "Grandma in the Garden",
        category: "Story Books",
        section: "01. Story Books",
        path: "/assets/graphic-design-images/1-story-books/Grandma in the Garden.png",
        tag: "Ages 4+",
    },
    {
        id: "sb-3",
        title: "Happy New Year",
        category: "Story Books",
        section: "01. Story Books",
        path: "/assets/graphic-design-images/1-story-books/Happy New Year.png",
        tag: "Ages 6+",
    },
    {
        id: "sb-4",
        title: "Milly is Ill",
        category: "Story Books",
        section: "01. Story Books",
        path: "/assets/graphic-design-images/1-story-books/Milly is Ill.png",
        tag: "Ages 3+",
    },
    {
        id: "sb-5",
        title: "Missing Marbles",
        category: "Story Books",
        section: "01. Story Books",
        path: "/assets/graphic-design-images/1-story-books/Missing Marbles.png",
        tag: "Ages 8+",
    },
    {
        id: "sb-6",
        title: "Storybook Back Cover Spread",
        category: "Story Books",
        section: "01. Story Books",
        path: "/assets/graphic-design-images/1-story-books/Back Cover.png",
        tag: "Back Cover",
    },
    {
        id: "sb-7",
        title: "Copyright & Publication Imprint",
        category: "Story Books",
        section: "01. Story Books",
        path: "/assets/graphic-design-images/1-story-books/Copyright Page.png",
        tag: "Copyright Page",
    },
];

// 02. Annual Report
const annualReportHighlights = [
    {
        id: "ar-1",
        title: "Annual Report Cover & Binding",
        path: "/assets/graphic-design-images/2-annual-report/book-cover.png",
        tab: "01. Book Cover",
        aspect: "Cover Art & Identity",
        summary: "Minimalist corporate cover design with geometric gold foil styling and balanced negative space.",
    },
    {
        id: "ar-2",
        title: "Internal Editorial Grid & Typographic Spread",
        path: "/assets/graphic-design-images/2-annual-report/2020-ar-page.png",
        tab: "02. Editorial Spread",
        aspect: "Magazine & Publication Grid",
        summary: "Structured multi-column editorial layout establishing typographic hierarchy, photo integration, and narrative flow.",
    },
    {
        id: "ar-3",
        title: "Nepal Regional Outreach Map Infographic",
        path: "/assets/graphic-design-images/2-annual-report/nepal-map-2020AR.png",
        tab: "03. Regional Map",
        aspect: "Vector Cartography & Infographics",
        summary: "Bespoke vector infographic map illustrating district-level program impact, outreach stats, and teacher training centers across Nepal.",
    },
];

const annualReportList: DesignItem[] = annualReportHighlights.map((ar) => ({
    id: ar.id,
    title: ar.title,
    category: "Annual Reports",
    section: "02. Annual Report",
    path: ar.path,
    description: ar.summary,
    tag: ar.aspect,
}));

// 03. Tri-Fold Brochures
const brochuresList: DesignItem[] = [
    {
        id: "br-1",
        title: "ECEC Brochure — Exterior Tri-Fold",
        category: "Tri-Fold Brochures",
        section: "03. Tri-Fold Brochures",
        path: "/assets/graphic-design-images/3-tri-fold-brochures/ecec/ecec-brochure-front.png",
        description: "Outer panels and cover design for ECEC Innovation in Education teacher training programs.",
        tag: "ECEC Tri-Fold",
    },
    {
        id: "br-2",
        title: "ECEC Brochure — Inside Spread",
        category: "Tri-Fold Brochures",
        section: "03. Tri-Fold Brochures",
        path: "/assets/graphic-design-images/3-tri-fold-brochures/ecec/ecec-brochure-back.png",
        description: "Three-panel interior layout showcasing curriculum structure, faculty, and enrollment details.",
        tag: "ECEC Tri-Fold",
    },
    {
        id: "br-3",
        title: "Nepal Open University — Outer Panels",
        category: "Tri-Fold Brochures",
        section: "03. Tri-Fold Brochures",
        path: "/assets/graphic-design-images/3-tri-fold-brochures/nou/nou-brochure-front.png",
        description: "Official promotional brochure for Nepal Open University distance learning curricula.",
        tag: "NOU Tri-Fold",
    },
    {
        id: "br-4",
        title: "Nepal Open University — Interior Spread",
        category: "Tri-Fold Brochures",
        section: "03. Tri-Fold Brochures",
        path: "/assets/graphic-design-images/3-tri-fold-brochures/nou/nou-brochure-back.png",
        description: "Interior educational pathways, accreditation, and student support service overview.",
        tag: "NOU Tri-Fold",
    },
];

// 04. Social Media (16 campaigns)
const socialMediaList: DesignItem[] = [
    { id: "sm-1", title: "Educational Milestone & Celebration", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/1.jpeg", tag: "Campaign #01" },
    { id: "sm-2", title: "Interactive Workshop Promotion", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/2.jpeg", tag: "Workshop" },
    { id: "sm-3", title: "Cultural Festival Announcement", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/3.jpeg", tag: "Festival" },
    { id: "sm-4", title: "Teacher Professional Development", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/4.jpeg", tag: "Training" },
    { id: "sm-5", title: "Parenting & Learning Tips Series", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/5.jpeg", tag: "Parenting" },
    { id: "sm-7", title: "Course Admissions Open Banner", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/7.jpeg", tag: "Admissions" },
    { id: "sm-8", title: "Inspiring Educator Spotlight", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/8.jpeg", tag: "Spotlight" },
    { id: "sm-9", title: "Digital Classroom Innovation", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/9.jpeg", tag: "Innovation" },
    { id: "sm-11", title: "Community Education Outreach", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/11.jpeg", tag: "Outreach" },
    { id: "sm-16", title: "Early Childhood Development Insights", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/16.jpeg", tag: "Child Dev" },
    { id: "sm-17", title: "Interactive Learning Campaign", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/17.jpeg", tag: "Campaign #17" },
    { id: "sm-19", title: "Staff Development & Leadership", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/19.jpeg", tag: "Leadership" },
    { id: "sm-20", title: "National Education Day Poster", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/20.jpeg", tag: "National Day" },
    { id: "sm-22", title: "Holiday Season Greetings Banner", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/22.jpeg", tag: "Greeting" },
    { id: "sm-23", title: "Inspirational Educational Quote", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/23.jpeg", tag: "Inspiration" },
    { id: "sm-24", title: "New Academic Session Announcement", category: "Social Media", section: "04. Social Media", path: "/assets/graphic-design-images/4-social-media/24.jpeg", tag: "Admissions" },
];

// 05. Logo & Branding
const brandingList: DesignItem[] = [
    {
        id: "lb-1",
        title: "Saxam — Brand Identity & Packaging Mockup",
        category: "Logo & Branding",
        section: "05. Logo & Branding",
        path: "/assets/graphic-design-images/5-logo-branding/saxam-mocup.png",
        description: "Comprehensive merchandise, stationery, and packaging identity system for Saxam.",
        tag: "Brand Mockup",
    },
    {
        id: "lb-2",
        title: "In The Fight — Apparel & Merch Branding",
        category: "Logo & Branding",
        section: "05. Logo & Branding",
        path: "/assets/graphic-design-images/5-logo-branding/in-the-fight-mockup.png",
        description: "Apparel line graphics, fabric print mockups, and bold athletic wordmark.",
        tag: "Apparel Branding",
    },
    {
        id: "lb-3",
        title: "Collaborate — Minimalist Brandmark",
        category: "Logo & Branding",
        section: "05. Logo & Branding",
        path: "/assets/graphic-design-images/5-logo-branding/collaborate.png",
        description: "Modern geometric symbol representing connection, partnership, and teamwork.",
        tag: "Logo Mark",
    },
    {
        id: "lb-4",
        title: "Ferro Tecnic — Industrial Brand Identity",
        category: "Logo & Branding",
        section: "05. Logo & Branding",
        path: "/assets/graphic-design-images/5-logo-branding/ferro-tecnic.png",
        description: "Precision-engineered corporate logotype and industrial identity emblem.",
        tag: "Corporate Identity",
    },
    {
        id: "lb-5",
        title: "Zweintraum — Conceptual Emblem",
        category: "Logo & Branding",
        section: "05. Logo & Branding",
        path: "/assets/graphic-design-images/5-logo-branding/zweintraum.png",
        description: "Editorial luxury emblem combining bespoke typography with minimal symmetry.",
        tag: "Brand Emblem",
    },
];

// 06. Flex Design (Portrait Pull-Up Standee)
const flexItem: DesignItem = {
    id: "fx-1",
    title: "ECEC Grand Annual Gathering — Roll-Up Stage Standee",
    category: "Flex Design",
    section: "06. Flex Design",
    path: "/assets/graphic-design-images/6-flex-design/flex.png",
    description: "8-foot vertical pull-up exhibition standee and stage banner engineered for high-visibility CMYK color fidelity.",
    tag: "Roll-Up Standee",
};

// 07. Digital Art & Painting
const digitalArtList: DesignItem[] = [
    {
        id: "da-1",
        title: "Cosmic Solitude — Surreal Photo Manipulation",
        category: "Digital Art",
        section: "07. Digital Art & Painting",
        path: "/assets/graphic-design-images/7-digital-art-and-painting/manipulation-1.png",
        description: "Complex multi-layer photo composition blending celestial imagery with dreamlike atmospheric lighting.",
        tag: "Photo Manipulation",
    },
    {
        id: "da-2",
        title: "Surreal Odyssey — Visual Concept Manipulation",
        category: "Digital Art",
        section: "07. Digital Art & Painting",
        path: "/assets/graphic-design-images/7-digital-art-and-painting/manu=ipulation-2.png",
        description: "Conceptual fantasy visual storytelling through intricate color grading and digital matte painting.",
        tag: "Concept Art",
    },
    {
        id: "da-3",
        title: "Portraiture Study — Digital Painting",
        category: "Digital Art",
        section: "07. Digital Art & Painting",
        path: "/assets/graphic-design-images/7-digital-art-and-painting/potrait.png",
        description: "Digital brushwork study focusing on realistic facial features, specular highlights, and skin tones.",
        tag: "Digital Painting",
    },
    {
        id: "da-4",
        title: "Still Life Light & Texture — Apple Study",
        category: "Digital Art",
        section: "07. Digital Art & Painting",
        path: "/assets/graphic-design-images/7-digital-art-and-painting/apple.png",
        description: "Precision digital painting exploring subsurface scattering, ambient occlusion, and lighting contrast.",
        tag: "Still Life Study",
    },
];

// 08. Sketching (12 drawings)
const sketchingList: DesignItem[] = [
    { id: "sk-1", title: "Hand Sketch Study #01", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/1.png", tag: "Graphite" },
    { id: "sk-2", title: "Hand Sketch Study #02", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/2.png", tag: "Line Art" },
    { id: "sk-3", title: "Hand Sketch Study #03", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/3.png", tag: "Shading" },
    { id: "sk-4", title: "Hand Sketch Study #04", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/4.png", tag: "Anatomy" },
    { id: "sk-5", title: "Hand Sketch Study #05", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/5.png", tag: "Gesture" },
    { id: "sk-6", title: "Hand Sketch Study #06", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/6.png", tag: "Character" },
    { id: "sk-7", title: "Hand Sketch Study #07", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/7.png", tag: "Illustration" },
    { id: "sk-8", title: "Hand Sketch Study #08", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/8.png", tag: "Observation" },
    { id: "sk-9", title: "Hand Sketch Study #09", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/9.png", tag: "Contours" },
    { id: "sk-10", title: "Hand Sketch Study #10", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/10.png", tag: "Portrait" },
    { id: "sk-11", title: "Hand Sketch Study #11", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/11.png", tag: "Fine Detail" },
    { id: "sk-12", title: "Hand Sketch Study #12", category: "Sketching", section: "08. Sketching", path: "/assets/graphic-design-images/8-sketching/12.png", tag: "Composition" },
];

// All items combined for Lightbox search & traversal
const allGalleryItems: DesignItem[] = [
    ...storyBooksList,
    ...annualReportList,
    ...brochuresList,
    ...socialMediaList,
    ...brandingList,
    flexItem,
    ...digitalArtList,
    ...sketchingList,
];

// Navigation sections
const navSections = [
    { id: "about", label: "About Me", number: "00" },
    { id: "story-books", label: "Story Books", number: "01" },
    { id: "annual-report", label: "Annual Report", number: "02" },
    { id: "brochures", label: "Brochures", number: "03" },
    { id: "social-media", label: "Social Media", number: "04" },
    { id: "branding", label: "Logo & Branding", number: "05" },
    { id: "flex-design", label: "Flex Standee", number: "06" },
    { id: "digital-art", label: "Digital Art", number: "07" },
    { id: "sketching", label: "Sketching", number: "08" },
];

// ==========================================
// CREATIVE ADOBE SUITE INSPIRED DESIGNER UI
// ==========================================

interface ArtboardFrameProps {
    children: React.ReactNode;
    artboardNumber: string;
    title: string;
    dimensions?: string;
    colorProfile?: string;
    className?: string;
    guidesEnabled?: boolean;
}

const ArtboardFrame: React.FC<ArtboardFrameProps> = ({
    children,
    artboardNumber,
    title,
    dimensions = "1920 × 1080 px",
    colorProfile = "300 DPI // CMYK",
    className = "",
    guidesEnabled = false,
}) => {
    return (
        <div className={`relative group/artboard rounded-3xl transition-all duration-300 ${className}`}>
            {/* Top Artboard Metadata Bar (Adobe Illustrator artboard tag) */}
            <div className="absolute -top-3.5 left-4 sm:left-8 z-30 flex items-center gap-2 pointer-events-none select-none">
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#161615] border border-white/20 text-[10px] font-mono text-[#fac70f] shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#fac70f]" />
                    <span className="font-bold">[{artboardNumber}]</span>
                    <span className="text-white/80 uppercase font-sans tracking-wide">{title}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-2 py-0.5 rounded-md bg-black/70 border border-white/10 text-[9px] font-mono text-white/50 backdrop-blur-md">
                    <span>{dimensions}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-emerald-400/90">{colorProfile}</span>
                </div>
            </div>

            {/* Transform Corner Handles (The 8 Adobe selection handles) */}
            <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white border border-black shadow-sm z-30 transition-all duration-300 group-hover/artboard:bg-[#fac70f] group-hover/artboard:scale-125" />
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-black shadow-sm z-30 transition-all duration-300 group-hover/artboard:bg-[#fac70f] group-hover/artboard:scale-125" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border border-black shadow-sm z-30 transition-all duration-300 group-hover/artboard:bg-[#fac70f] group-hover/artboard:scale-125" />

            <span className="absolute top-1/2 -translate-y-1/2 -left-1 w-2.5 h-2.5 bg-white border border-black shadow-sm z-30 transition-all duration-300 group-hover/artboard:bg-[#fac70f] group-hover/artboard:scale-125" />
            <span className="absolute top-1/2 -translate-y-1/2 -right-1 w-2.5 h-2.5 bg-white border border-black shadow-sm z-30 transition-all duration-300 group-hover/artboard:bg-[#fac70f] group-hover/artboard:scale-125" />

            <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white border border-black shadow-sm z-30 transition-all duration-300 group-hover/artboard:bg-[#fac70f] group-hover/artboard:scale-125" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-black shadow-sm z-30 transition-all duration-300 group-hover/artboard:bg-[#fac70f] group-hover/artboard:scale-125" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white border border-black shadow-sm z-30 transition-all duration-300 group-hover/artboard:bg-[#fac70f] group-hover/artboard:scale-125" />

            {/* Corner Bleed / Crop marks (L-shaped trim marks in corners) */}
            <span className="absolute -top-2.5 -left-2.5 w-4 h-4 border-t border-l border-white/20 pointer-events-none group-hover/artboard:border-[#fac70f]/60 transition-colors" />
            <span className="absolute -top-2.5 -right-2.5 w-4 h-4 border-t border-r border-white/20 pointer-events-none group-hover/artboard:border-[#fac70f]/60 transition-colors" />
            <span className="absolute -bottom-2.5 -left-2.5 w-4 h-4 border-b border-l border-white/20 pointer-events-none group-hover/artboard:border-[#fac70f]/60 transition-colors" />
            <span className="absolute -bottom-2.5 -right-2.5 w-4 h-4 border-b border-r border-white/20 pointer-events-none group-hover/artboard:border-[#fac70f]/60 transition-colors" />

            {/* Optional Cyan / Magenta Alignment Grid Guides when Designer Mode is toggled */}
            {guidesEnabled && (
                <div className="absolute inset-0 border border-cyan-400/30 pointer-events-none z-20">
                    <div className="absolute left-1/3 top-0 bottom-0 w-px border-r border-dashed border-cyan-400/20" />
                    <div className="absolute right-1/3 top-0 bottom-0 w-px border-r border-dashed border-cyan-400/20" />
                    <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-pink-400/20" />
                    <div className="absolute top-2 right-2 text-[8px] font-mono text-cyan-400/80 bg-black/70 px-1.5 py-0.5 rounded border border-cyan-400/30">
                        ALIGN: SNAP 8PT
                    </div>
                </div>
            )}

            {/* Bottom-right coordinates indicator */}
            <div className="absolute -bottom-3 right-4 sm:right-8 z-30 px-2 py-0.5 rounded bg-[#161615] border border-white/10 text-[9px] font-mono text-white/40 pointer-events-none select-none hidden sm:block">
                W: 100% • H: AUTO • (X: 0, Y: SNAP)
            </div>

            {children}
        </div>
    );
};

// ==========================================
// VECTOR TEXT BOX (8 Handles + Triangular Pointer Tag)
// Directly inspired by Adobe Illustrator / InDesign vector typography & user reference art
// ==========================================

interface VectorTextBoxProps {
    children: React.ReactNode;
    pointerLabel?: string;
    pointerColor?: string;
    tagPosition?: "right" | "bottom-right" | "top-right";
    className?: string;
    showCursor?: boolean;
    alwaysActive?: boolean;
    onClick?: () => void;
}

const VectorTextBox: React.FC<VectorTextBoxProps> = ({
    children,
    pointerLabel = "Type [T]",
    pointerColor = "#FF5A5F",
    tagPosition = "right",
    className = "",
    showCursor = false,
    alwaysActive = false,
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={() => {
                if (onClick) onClick();
                playTechTick();
            }}
            onMouseEnter={() => {
                setIsHovered(true);
                playTechTick();
            }}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative inline-block group/textbox transition-all duration-300 p-1 sm:p-1.5 cursor-text select-text ${className}`}
        >
            {/* Fine Vector Text Bounding Box */}
            <div
                className={`absolute inset-0 border rounded-sm pointer-events-none transition-all duration-300 ${
                    alwaysActive || isHovered
                        ? "border-[#fac70f] shadow-[0_0_15px_rgba(250,199,15,0.25)]"
                        : "border-white/25 group-hover/textbox:border-[#fac70f]/90"
                }`}
            />

            {/* 8 Transform Anchor Square Handles (■) */}
            {/* Top row */}
            <span
                className={`absolute -top-1 -left-1 w-2 h-2 bg-white border border-black shadow-sm z-30 transition-all duration-200 pointer-events-none ${
                    alwaysActive || isHovered ? "bg-[#fac70f] scale-125" : "group-hover/textbox:bg-[#fac70f] group-hover/textbox:scale-125"
                }`}
            />
            <span
                className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-black shadow-sm z-30 transition-all duration-200 pointer-events-none ${
                    alwaysActive || isHovered ? "bg-[#fac70f] scale-125" : "group-hover/textbox:bg-[#fac70f] group-hover/textbox:scale-125"
                }`}
            />
            <span
                className={`absolute -top-1 -right-1 w-2 h-2 bg-white border border-black shadow-sm z-30 transition-all duration-200 pointer-events-none ${
                    alwaysActive || isHovered ? "bg-[#fac70f] scale-125" : "group-hover/textbox:bg-[#fac70f] group-hover/textbox:scale-125"
                }`}
            />

            {/* Middle row */}
            <span
                className={`absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-white border border-black shadow-sm z-30 transition-all duration-200 pointer-events-none ${
                    alwaysActive || isHovered ? "bg-[#fac70f] scale-125" : "group-hover/textbox:bg-[#fac70f] group-hover/textbox:scale-125"
                }`}
            />
            <span
                className={`absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-white border border-black shadow-sm z-30 transition-all duration-200 pointer-events-none ${
                    alwaysActive || isHovered ? "bg-[#fac70f] scale-125" : "group-hover/textbox:bg-[#fac70f] group-hover/textbox:scale-125"
                }`}
            />

            {/* Bottom row */}
            <span
                className={`absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-black shadow-sm z-30 transition-all duration-200 pointer-events-none ${
                    alwaysActive || isHovered ? "bg-[#fac70f] scale-125" : "group-hover/textbox:bg-[#fac70f] group-hover/textbox:scale-125"
                }`}
            />
            <span
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-black shadow-sm z-30 transition-all duration-200 pointer-events-none ${
                    alwaysActive || isHovered ? "bg-[#fac70f] scale-125" : "group-hover/textbox:bg-[#fac70f] group-hover/textbox:scale-125"
                }`}
            />
            <span
                className={`absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-black shadow-sm z-30 transition-all duration-200 pointer-events-none ${
                    alwaysActive || isHovered ? "bg-[#fac70f] scale-125" : "group-hover/textbox:bg-[#fac70f] group-hover/textbox:scale-125"
                }`}
            />

            {/* Iconic Animated Triangular Pointer Tag from reference art */}
            {tagPosition === "right" && (
                <motion.div
                    animate={{
                        x: isHovered ? [0, 4, 0] : [0, 2, 0],
                        y: isHovered ? [-1, 1, -1] : 0,
                    }}
                    transition={{
                        duration: isHovered ? 1.2 : 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 -translate-y-1/2 -right-5 sm:-right-7 flex items-center pointer-events-none z-30 select-none"
                >
                    {/* Triangular pointer directed straight at the right handle */}
                    <div
                        className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[9px] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                        style={{ borderRightColor: pointerColor }}
                    />
                    {pointerLabel && (
                        <span
                            className="hidden sm:inline-block px-1.5 py-0.5 rounded-sm text-[8px] font-mono tracking-wider font-bold text-white uppercase shadow-md -ml-0.5"
                            style={{ backgroundColor: pointerColor }}
                        >
                            {pointerLabel}
                        </span>
                    )}
                </motion.div>
            )}

            {tagPosition === "bottom-right" && (
                <motion.div
                    animate={{
                        y: [0, 3, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-5 right-0 flex items-center gap-1 pointer-events-none z-30 select-none"
                >
                    <div
                        className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[7px]"
                        style={{ borderTopColor: pointerColor }}
                    />
                    <span
                        className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold text-white uppercase"
                        style={{ backgroundColor: pointerColor }}
                    >
                        {pointerLabel}
                    </span>
                </motion.div>
            )}

            {/* Inner Content + Optional Blinking Insertion Beam Cursor */}
            <div className="relative inline-flex items-center flex-wrap">
                {children}
                {showCursor && (
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-0.5 h-[1.1em] bg-[#fac70f] ml-1 align-middle"
                    />
                )}
            </div>
        </div>
    );
};

// ==========================================
// SHAPE SELECTION BOX (8 Handles + Rotation Stem + Designer Pointer)
// For UI Shapes, Cards, and Artboard Stage Containers
// ==========================================

interface ShapeSelectionBoxProps {
    children: React.ReactNode;
    label?: string;
    accentColor?: string;
    className?: string;
    showRotationStem?: boolean;
    showPointer?: boolean;
    pointerName?: string;
    onClick?: () => void;
}

const ShapeSelectionBox: React.FC<ShapeSelectionBoxProps> = ({
    children,
    label = "SHAPE_BOUNDS",
    accentColor = "#fac70f",
    className = "",
    showRotationStem = true,
    showPointer = true,
    pointerName = "Mark [V]",
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={() => {
                if (onClick) onClick();
                playTechTick();
            }}
            onMouseEnter={() => {
                setIsHovered(true);
                playTechTick();
            }}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative group/shapeselect transition-all duration-300 ${className}`}
        >
            {/* Active Selection Stroke Bounding Box */}
            <div
                className={`absolute inset-0 rounded-2xl pointer-events-none border transition-all duration-300 z-20 ${
                    isHovered
                        ? "border-[#fac70f] shadow-[0_0_20px_rgba(250,199,15,0.2)]"
                        : "border-white/10 group-hover/shapeselect:border-white/30"
                }`}
            />

            {/* Top Rotation Stem: Vertical line + circular pivot handle (Adobe / Figma rotation tool) */}
            {showRotationStem && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30 select-none">
                    <motion.div
                        animate={{
                            rotate: isHovered ? [0, 15, -15, 0] : 0,
                            scale: isHovered ? 1.25 : 1,
                        }}
                        transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
                        className="w-3 h-3 rounded-full bg-white border border-black shadow-md flex items-center justify-center group-hover/shapeselect:bg-[#fac70f]"
                    >
                        <span className="w-1 h-1 rounded-full bg-black" />
                    </motion.div>
                    <div className="w-px h-3 bg-white/40 group-hover/shapeselect:bg-[#fac70f]" />
                </div>
            )}

            {/* 8 Vector Anchor Square Handles (■) */}
            <span
                className={`absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-black shadow-md z-30 pointer-events-none transition-all duration-200 ${
                    isHovered ? "bg-[#fac70f] scale-125" : "group-hover/shapeselect:bg-[#fac70f]"
                }`}
            />
            <span
                className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border border-black shadow-md z-30 pointer-events-none transition-all duration-200 ${
                    isHovered ? "bg-[#fac70f] scale-125" : "group-hover/shapeselect:bg-[#fac70f]"
                }`}
            />
            <span
                className={`absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-black shadow-md z-30 pointer-events-none transition-all duration-200 ${
                    isHovered ? "bg-[#fac70f] scale-125" : "group-hover/shapeselect:bg-[#fac70f]"
                }`}
            />

            <span
                className={`absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-white border border-black shadow-md z-30 pointer-events-none transition-all duration-200 ${
                    isHovered ? "bg-[#fac70f] scale-125" : "group-hover/shapeselect:bg-[#fac70f]"
                }`}
            />
            <span
                className={`absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white border border-black shadow-md z-30 pointer-events-none transition-all duration-200 ${
                    isHovered ? "bg-[#fac70f] scale-125" : "group-hover/shapeselect:bg-[#fac70f]"
                }`}
            />

            <span
                className={`absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-black shadow-md z-30 pointer-events-none transition-all duration-200 ${
                    isHovered ? "bg-[#fac70f] scale-125" : "group-hover/shapeselect:bg-[#fac70f]"
                }`}
            />
            <span
                className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border border-black shadow-md z-30 pointer-events-none transition-all duration-200 ${
                    isHovered ? "bg-[#fac70f] scale-125" : "group-hover/shapeselect:bg-[#fac70f]"
                }`}
            />
            <span
                className={`absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-black shadow-md z-30 pointer-events-none transition-all duration-200 ${
                    isHovered ? "bg-[#fac70f] scale-125" : "group-hover/shapeselect:bg-[#fac70f]"
                }`}
            />

            {/* Designer Pointer Cursor & Tag (Multiplayer / Selection Vector Pointer) */}
            {showPointer && (
                <motion.div
                    animate={{
                        x: isHovered ? [0, 8, 3, 0] : [0, 3, 0],
                        y: isHovered ? [0, -6, -2, 0] : [0, -3, 0],
                    }}
                    transition={{
                        duration: isHovered ? 2 : 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-4 -right-2 sm:-right-4 z-40 pointer-events-none select-none flex items-center gap-1.5"
                >
                    {/* SVG Vector Cursor Arrow */}
                    <svg
                        className="w-4 h-4 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M0 0L6 15L8.5 9L15 7L0 0Z"
                            fill={accentColor}
                            stroke="#000"
                            strokeWidth="1"
                        />
                    </svg>

                    {/* Designer Badge */}
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#161615] border border-white/20 text-[9px] font-mono text-white shadow-xl backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#fac70f] animate-pulse" />
                        <span className="font-semibold">{pointerName}</span>
                        <span className="text-white/40 hidden sm:inline">• {label}</span>
                    </div>
                </motion.div>
            )}

            {children}
        </div>
    );
};

interface ScrollPenSpineProps {
    activeSection: string;
    onSectionClick: (id: string) => void;
}

const ScrollPenSpine: React.FC<ScrollPenSpineProps> = ({ activeSection, onSectionClick }) => {
    const { scrollYProgress } = useScroll();
    const springProgress = useSpring(scrollYProgress, { stiffness: 220, damping: 28 });
    const [penY, setPenY] = useState(0);

    useEffect(() => {
        return springProgress.on("change", (latest) => {
            setPenY(latest);
        });
    }, [springProgress]);

    const spineNodes = [
        { id: "about", label: "00. Bio", short: "00" },
        { id: "story-books", label: "01. Books", short: "01" },
        { id: "annual-report", label: "02. Report", short: "02" },
        { id: "brochures", label: "03. Print", short: "03" },
        { id: "social-media", label: "04. Social", short: "04" },
        { id: "branding", label: "05. Brand", short: "05" },
        { id: "flex-design", label: "06. Large", short: "06" },
        { id: "digital-art", label: "07. Art", short: "07" },
        { id: "sketching", label: "08. Sketch", short: "08" },
    ];

    return (
        <aside
            aria-label="Vector Pen Navigation Spine"
            className="fixed left-3 2xl:left-6 top-32 bottom-24 z-30 pointer-events-none hidden xl:flex flex-col items-center justify-between w-10 select-none"
        >
            {/* Top Anchor Tag */}
            <div className="text-[9px] font-mono text-[#B5892D] uppercase tracking-widest writing-mode-vertical rotate-180 mb-2 opacity-70">
                PEN TOOL // SPINE
            </div>

            {/* Vertical Vector Track */}
            <div className="relative flex-1 w-full flex items-center justify-center">
                {/* Background Dotted Line */}
                <div className="absolute top-0 bottom-0 w-px border-r border-dashed border-white/15" />

                {/* Golden Animated Drawn Path */}
                <div
                    style={{ height: `${penY * 100}%` }}
                    className="absolute top-0 w-[2px] bg-gradient-to-b from-[#B5892D]/40 via-[#fac70f] to-[#fac70f] shadow-[0_0_8px_#fac70f]"
                />

                {/* Moving Vector Pen Tool Nib riding along the drawn path */}
                <div
                    style={{ top: `${penY * 100}%` }}
                    className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center"
                >
                    <div className="relative group/pen">
                        {/* Glow halo */}
                        <div className="absolute -inset-1.5 rounded-full bg-[#fac70f]/30 blur-sm animate-pulse" />

                        {/* Vector Nib Badge */}
                        <div className="relative w-7 h-7 rounded-lg bg-[#161615] border border-[#fac70f] flex items-center justify-center shadow-2xl text-[#fac70f]">
                            <PenTool className="w-3.5 h-3.5 rotate-45" />
                        </div>

                        {/* Tangent Handle Arms (Illustrator bezier handles) */}
                        <div className="absolute top-1/2 -left-3 w-3 h-px bg-[#fac70f]/70 -translate-y-1/2 flex items-center justify-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#fac70f] -ml-0.5" />
                        </div>
                        <div className="absolute top-1/2 -right-3 w-3 h-px bg-[#fac70f]/70 -translate-y-1/2 flex items-center justify-end">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#fac70f] -mr-0.5" />
                        </div>
                    </div>
                </div>

                {/* Section Anchor Point Nodes (Interactive) */}
                <div className="absolute inset-y-0 w-full flex flex-col justify-between py-2 pointer-events-auto">
                    {spineNodes.map((node) => {
                        const isActive = activeSection === node.id;
                        return (
                            <button
                                key={node.id}
                                type="button"
                                onClick={() => {
                                    onSectionClick(node.id);
                                    playTechTick();
                                }}
                                className="group/node relative flex items-center justify-center w-6 h-6 mx-auto cursor-pointer focus:outline-none"
                                title={`Jump to ${node.label}`}
                                aria-label={`Jump to ${node.label}`}
                            >
                                {/* Anchor square */}
                                <span
                                    className={`w-2 h-2 rounded-[1px] border transition-all duration-300 ${
                                        isActive
                                            ? "bg-[#fac70f] border-black scale-125 shadow-[0_0_8px_#fac70f]"
                                            : "bg-[#161615] border-white/40 group-hover/node:border-[#fac70f] group-hover/node:bg-white"
                                    }`}
                                />

                                {/* Tooltip label popping to the right on hover */}
                                <span className="absolute left-7 px-2 py-0.5 rounded bg-[#161615]/95 border border-white/20 text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl z-30">
                                    <span className="text-[#fac70f] font-semibold">{node.short}</span> // {node.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Coordinate Indicator */}
            <div className="text-[9px] font-mono text-white/40 tracking-wider text-center mt-2">
                P({Math.round(penY * 100)}%)
            </div>
        </aside>
    );
};

interface DesignerToolsDockProps {
    activeTool: string;
    setActiveTool: (tool: string) => void;
    guidesEnabled: boolean;
    setGuidesEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesignerToolsDock: React.FC<DesignerToolsDockProps> = ({
    activeTool,
    setActiveTool,
    guidesEnabled,
    setGuidesEnabled,
}) => {
    const [tooltipText, setTooltipText] = useState<string | null>(null);

    const tools = [
        { id: "select", key: "V", label: "Selection Tool (V)", icon: MousePointer },
        { id: "pen", key: "P", label: "Pen Tool (P)", icon: PenTool },
        { id: "type", key: "T", label: "Type Box Tool (T)", icon: Type },
        { id: "shape", key: "M", label: "Artboard / Marquee (M)", icon: Square },
        { id: "eyedropper", key: "I", label: "Eyedropper Palette (I)", icon: Pipette },
    ];

    const handleToolClick = (toolId: string, label: string) => {
        setActiveTool(toolId);
        playTechTick();
        setTooltipText(label);
        setTimeout(() => setTooltipText(null), 1800);
    };

    const handleGuidesToggle = () => {
        setGuidesEnabled((prev) => {
            const next = !prev;
            if (next) playTechPop();
            else playTechChirp();
            setTooltipText(next ? "DESIGNER GUIDES: ACTIVE (⌘;)" : "DESIGNER GUIDES: OFF");
            setTimeout(() => setTooltipText(null), 1800);
            return next;
        });
    };

    return (
        <aside
            aria-label="Adobe Creative Suite Tools Palette"
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 select-none flex flex-col items-center"
        >
            {/* Floating Toast Notification */}
            <AnimatePresence>
                {tooltipText && (
                    <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.95 }}
                        className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#161615] border border-[#fac70f]/50 text-[#fac70f] text-xs font-mono shadow-2xl backdrop-blur-xl pointer-events-none"
                    >
                        {tooltipText}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Adobe Floating Dock */}
            <div className="bg-[#121211]/90 border border-white/15 backdrop-blur-xl rounded-2xl shadow-2xl p-1.5 sm:p-2 flex flex-col items-center gap-1 sm:gap-1.5">
                {/* Dock Header: Mac/Adobe window pill */}
                <div className="flex gap-1 py-1 mb-0.5 border-b border-white/10 w-full justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                </div>

                {/* Tool buttons */}
                {tools.map((t) => {
                    const Icon = t.icon;
                    const isSelected = activeTool === t.id;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => handleToolClick(t.id, t.label)}
                            title={t.label}
                            aria-label={t.label}
                            className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all duration-200 group/tool ${
                                isSelected
                                    ? "bg-[#fac70f] text-black shadow-[0_0_12px_rgba(250,199,15,0.4)] scale-105"
                                    : "text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {/* Hotkey badge */}
                            <span
                                className={`absolute -bottom-0.5 -right-0.5 text-[8px] font-mono leading-none px-0.5 rounded ${
                                    isSelected
                                        ? "bg-black text-[#fac70f] font-bold"
                                        : "text-white/40 group-hover/tool:text-white"
                                }`}
                            >
                                {t.key}
                            </span>
                        </button>
                    );
                })}

                {/* Divider */}
                <div className="w-5 h-px bg-white/10 my-0.5" />

                {/* Eyedropper Color Preview Dot (Gold Pantone #B5892D) */}
                <div
                    className="w-5 h-5 rounded-md border border-white/20 shadow-inner flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                    style={{ backgroundColor: "#B5892D" }}
                    title="Active Palette: Pantone 1245 C Gold (#B5892D)"
                    onClick={() => {
                        playTechTick();
                        setTooltipText("ACTIVE SWATCH: #B5892D (GOLD)");
                        setTimeout(() => setTooltipText(null), 1800);
                    }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                </div>

                {/* Guides / Blueprint Toggle (⌘;) */}
                <button
                    type="button"
                    onClick={handleGuidesToggle}
                    title="Toggle Designer Alignment Guides (⌘;)"
                    aria-label="Toggle Designer Alignment Guides"
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        guidesEnabled
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                            : "text-white/50 hover:text-white hover:bg-white/10"
                    }`}
                >
                    <Grid className="w-4 h-4" />
                    {guidesEnabled && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    )}
                </button>
            </div>
        </aside>
    );
};

const LiveBezierHero: React.FC = () => {
    const [curveOffset, setCurveOffset] = useState({ x: 0, y: 0 });
    const [curvePreset, setCurvePreset] = useState<"arch" | "wave" | "inflection">("arch");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        setCurveOffset({ x: normX * 60, y: normY * 45 });
    };

    const handleMouseLeave = () => {
        setCurveOffset({ x: 0, y: 0 });
    };

    // Calculate Bézier curve points based on preset and interactive mouse flex
    const p0 = { x: 50, y: 145 };
    const p1 = { x: 490, y: 145 };

    // Primary arch anchor at top crest
    const anchorY = curvePreset === "arch" ? 75 + curveOffset.y : curvePreset === "wave" ? 60 + curveOffset.y : 90 + curveOffset.y;
    const anchorX = 270 + curveOffset.x * 0.5;

    // Tangent control handles
    const tangentLength = 95;
    const tangentAngleRad = (curveOffset.x * 0.35 * Math.PI) / 180;
    const tangentAngleDeg = Math.round((tangentAngleRad * 180) / Math.PI);

    const leftHandle = {
        x: anchorX - Math.cos(tangentAngleRad) * tangentLength,
        y: anchorY - Math.sin(tangentAngleRad) * tangentLength + (curvePreset === "wave" ? 30 : 0),
    };
    const rightHandle = {
        x: anchorX + Math.cos(tangentAngleRad) * tangentLength,
        y: anchorY + Math.sin(tangentAngleRad) * tangentLength - (curvePreset === "wave" ? 30 : 0),
    };

    // Cubic Bézier path segment through the crest
    const curvePath =
        curvePreset === "arch"
            ? `M ${p0.x} ${p0.y} C ${leftHandle.x - 20} ${leftHandle.y + 40}, ${leftHandle.x} ${leftHandle.y}, ${anchorX} ${anchorY} C ${rightHandle.x} ${rightHandle.y}, ${rightHandle.x + 20} ${rightHandle.y + 40}, ${p1.x} ${p1.y}`
            : curvePreset === "wave"
            ? `M ${p0.x} ${p0.y} C ${leftHandle.x} ${leftHandle.y - 40}, ${leftHandle.x} ${leftHandle.y}, ${anchorX} ${anchorY} C ${rightHandle.x} ${rightHandle.y}, ${p1.x - 60} ${p1.y + 50}, ${p1.x} ${p1.y}`
            : `M ${p0.x} ${p0.y} Q ${anchorX} ${anchorY}, ${p1.x} ${p1.y}`;

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full rounded-2xl bg-gradient-to-b from-[#141424]/90 via-[#0f0f18]/95 to-[#0b0b12] border border-white/15 p-4 sm:p-7 overflow-hidden my-6 group/bezier cursor-crosshair backdrop-blur-xl shadow-2xl"
        >
            {/* Top Engineering & Creative Specs Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 text-[10px] font-mono text-white/50">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#fac70f] animate-pulse" />
                    <span className="text-[#fac70f] font-semibold tracking-wider">VECTOR_STUDIO // BÉZIER ARCH</span>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <span className="text-white/40 hidden md:inline">HOVER & DRAG TANGENT POINTER</span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Geometry Preset Toggles */}
                    <div className="flex items-center bg-black/60 rounded-lg p-0.5 border border-white/10">
                        {(["arch", "wave", "inflection"] as const).map((mode) => (
                            <button
                                key={mode}
                                type="button"
                                onClick={() => {
                                    setCurvePreset(mode);
                                    playTechTick();
                                }}
                                className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono transition-all ${
                                    curvePreset === mode
                                        ? "bg-[#fac70f] text-black font-bold shadow-sm"
                                        : "text-white/40 hover:text-white"
                                }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                    <span className="text-[#fac70f] hidden sm:inline">∠ {tangentAngleDeg}°</span>
                </div>
            </div>

            {/* ARTBOARD STAGE (Mirrors the uploaded reference art) */}
            <div className="relative w-full py-4 sm:py-6 flex flex-col items-center justify-center">
                {/* 1. TOP CENTER "Vector Editor" TEXT BOX (with 8 handles & coral triangular pointer tag) */}
                <div className="mb-4 sm:mb-6 z-20">
                    <VectorTextBox
                        pointerLabel="Vector Editor"
                        pointerColor="#FF5A5F"
                        tagPosition="right"
                        alwaysActive
                        className="bg-black/40 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded shadow-xl"
                    >
                        <span className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                            Vector Editor
                        </span>
                    </VectorTextBox>
                </div>

                {/* 2. THE MAIN SVG VECTOR CANVAS: Arch Curve, Anchor Node, Tangent Line, & Tangent Arrow Pointer */}
                <div className="relative w-full h-36 sm:h-44 md:h-48 flex items-center justify-center overflow-visible">
                    <svg
                        viewBox="0 0 540 210"
                        className="w-full h-full max-w-2xl overflow-visible select-none pointer-events-none"
                    >
                        <defs>
                            {/* Gold-to-Coral Tangent Arm Gradient */}
                            <linearGradient id="tangentArmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#fac70f" />
                                <stop offset="50%" stopColor="#ff8c42" />
                                <stop offset="100%" stopColor="#FF5A5F" />
                            </linearGradient>

                            {/* White Curve Glow */}
                            <filter id="curveGlow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2.5" result="glow" />
                                <feMerge>
                                    <feMergeNode in="glow" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Dashed Guideline Baseline */}
                        <line
                            x1={p0.x}
                            y1={p0.y}
                            x2={p1.x}
                            y2={p1.y}
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />

                        {/* Tangent Control Bar passing through Center Anchor */}
                        <line
                            x1={leftHandle.x}
                            y1={leftHandle.y}
                            x2={rightHandle.x}
                            y2={rightHandle.y}
                            stroke="url(#tangentArmGrad)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />

                        {/* The Crisp White Bézier Curve Arch */}
                        <path
                            d={curvePath}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="4"
                            strokeLinecap="round"
                            filter="url(#curveGlow)"
                        />

                        {/* Left Tangent Handle: Yellow Square Node (■) */}
                        <rect
                            x={leftHandle.x - 5}
                            y={leftHandle.y - 5}
                            width="10"
                            height="10"
                            fill="#fac70f"
                            stroke="#000"
                            strokeWidth="1.5"
                            className="transition-transform duration-100"
                        />

                        {/* Center Crest Anchor Node: Solid White Circle (●) with black border */}
                        <circle
                            cx={anchorX}
                            cy={anchorY}
                            r="6.5"
                            fill="#ffffff"
                            stroke="#000"
                            strokeWidth="2"
                            className="transition-all duration-100"
                        />

                        {/* Right Tangent Handle: Coral Square Node (■) */}
                        <rect
                            x={rightHandle.x - 5}
                            y={rightHandle.y - 5}
                            width="10"
                            height="10"
                            fill="#FF5A5F"
                            stroke="#000"
                            strokeWidth="1.5"
                        />

                        {/* Right Tangent Directional Arrow Head (►) being manipulated */}
                        <polygon
                            points={`${rightHandle.x + 9},${rightHandle.y - 7} ${rightHandle.x + 20},${rightHandle.y} ${rightHandle.x + 9},${rightHandle.y + 7}`}
                            fill="#FF5A5F"
                            stroke="#000"
                            strokeWidth="1"
                        />

                        {/* Endpoint Anchor Squares at Baseline */}
                        <rect
                            x={p0.x - 4}
                            y={p0.y - 4}
                            width="8"
                            height="8"
                            fill="#ffffff"
                            stroke="#000"
                            strokeWidth="1.5"
                        />
                        <rect
                            x={p1.x - 4}
                            y={p1.y - 4}
                            width="8"
                            height="8"
                            fill="#ffffff"
                            stroke="#000"
                            strokeWidth="1.5"
                        />

                        {/* Designer Pointer Hand & Selection Arrow pulling the right tangent handle */}
                        <g transform={`translate(${rightHandle.x + 22}, ${rightHandle.y - 12})`}>
                            {/* Vector Cursor Arrow */}
                            <path
                                d="M0 0L8 18L11 11L18 8L0 0Z"
                                fill="#FF5A5F"
                                stroke="#ffffff"
                                strokeWidth="1.2"
                            />
                        </g>

                        {/* Floating Pencil with Sparks (Reference art bottom-left motif) */}
                        <g transform="translate(60, 160) rotate(-35)">
                            <rect x="0" y="-4" width="28" height="8" rx="2" fill="#fac70f" stroke="#000" strokeWidth="1" />
                            <polygon points="28,-4 36,0 28,4" fill="#d97706" />
                            <polygon points="34,-1 36,0 34,1" fill="#111" />
                            {/* Spark lines */}
                            <line x1="39" y1="-5" x2="43" y2="-8" stroke="#FF5A5F" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="41" y1="0" x2="46" y2="0" stroke="#fac70f" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="39" y1="5" x2="43" y2="8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                        </g>
                    </svg>

                    {/* Left Companion Card: Miniature Geometric Artboard (Reference art top-left) */}
                    <div className="absolute left-2 sm:left-4 top-2 sm:top-4 hidden sm:block pointer-events-none select-none">
                        <motion.div
                            animate={{ y: [0, -4, 0], rotate: [-6, -4, -6] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-20 sm:w-24 bg-white/95 rounded-lg p-1.5 shadow-2xl border border-black/20"
                        >
                            {/* Mini 8-handle corners */}
                            <div className="relative border border-black/30 rounded p-1 space-y-1">
                                <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-black" />
                                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-black" />
                                <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-black" />
                                <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-black" />

                                {/* Upper: Overlapping circles */}
                                <div className="h-7 bg-blue-50/80 rounded flex items-center justify-center relative overflow-hidden">
                                    <div className="w-5 h-5 rounded-full bg-blue-700 absolute -left-1" />
                                    <div className="w-5 h-5 rounded-full bg-[#FF5A5F]/90 absolute right-1" />
                                </div>
                                {/* Lower: Mountains + Yellow Sun */}
                                <div className="h-7 bg-slate-100 rounded relative overflow-hidden flex items-end">
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#fac70f] absolute top-1 left-3" />
                                    <div className="w-0 h-0 border-x-[10px] border-x-transparent border-b-[16px] border-b-blue-600 ml-1" />
                                    <div className="w-0 h-0 border-x-[8px] border-x-transparent border-b-[14px] border-b-[#FF5A5F] -ml-2" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Companion Card: Miniature Color Swatch Card (Reference art top-right) */}
                    <div className="absolute right-2 sm:right-4 top-2 sm:top-4 hidden sm:block pointer-events-none select-none">
                        <motion.div
                            animate={{ y: [0, 4, 0], rotate: [6, 4, 6] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-16 sm:w-20 bg-white/95 rounded-lg p-1.5 shadow-2xl border border-black/20"
                        >
                            <div className="relative border border-black/30 rounded overflow-hidden">
                                {/* Top Yellow Swatch */}
                                <div className="h-7 bg-[#fac70f] flex items-end justify-start p-1">
                                    <span className="text-[6px] font-mono font-bold text-black/80">#fac70f</span>
                                </div>
                                <div className="h-1 bg-white border-y border-black/20" />
                                {/* Bottom Coral Swatch */}
                                <div className="h-7 bg-[#FF5A5F] flex items-end justify-start p-1">
                                    <span className="text-[6px] font-mono font-bold text-white">#FF5A5F</span>
                                </div>
                            </div>
                            <div className="text-[7px] font-mono text-black/60 text-center pt-1 font-bold">
                                PANTONE C
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Real-time Coordinate Readout */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[9px] font-mono text-white/40 pt-2 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <span>ANCHOR: ({Math.round(anchorX)}, {Math.round(anchorY)})</span>
                    <span className="text-white/20">•</span>
                    <span className="text-[#FF5A5F]">TANGENT_HEAD: ({Math.round(rightHandle.x)}, {Math.round(rightHandle.y)})</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[#fac70f]">CURVE_TANGENT: ∠ {tangentAngleDeg}°</span>
                    <span className="text-white/20">•</span>
                    <button
                        type="button"
                        onClick={() => {
                            setCurveOffset({ x: 0, y: 0 });
                            setCurvePreset("arch");
                            playTechChirp();
                        }}
                        className="text-white/60 hover:text-white underline"
                    >
                        Reset Tangent
                    </button>
                </div>
            </div>
        </div>
    );
};

const CMYKCalibrationBar: React.FC = () => {
    return (
        <div className="flex items-center gap-2 select-none pointer-events-none">
            {/* Color density patches */}
            <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#00FFFF]" title="Cyan" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FF00FF]" title="Magenta" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FFFF00]" title="Yellow" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#000000] border border-white/20" title="Key (Black)" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#B5892D]" title="Pantone Gold #B5892D" />
            </div>

            {/* Registration Crosshair */}
            <div className="relative w-3.5 h-3.5 flex items-center justify-center opacity-70">
                <span className="absolute inset-0 rounded-full border border-white/50" />
                <span className="absolute w-full h-px bg-white/50" />
                <span className="absolute h-full w-px bg-white/50" />
            </div>

            <span className="text-[9px] font-mono text-white/40 hidden md:inline uppercase">
                ISO 12647-2 • 300 DPI
            </span>
        </div>
    );
};

const AlignmentGuidesOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden">
            {/* Top Metric Ruler */}
            <div className="absolute top-0 left-0 right-0 h-5 bg-[#121211]/80 border-b border-cyan-400/20 backdrop-blur-sm flex items-center justify-between px-4 text-[8px] font-mono text-cyan-400/60">
                <span>0 px</span>
                <span>200</span>
                <span>400</span>
                <span>600</span>
                <span>800</span>
                <span>1000</span>
                <span>1200</span>
                <span>1400</span>
                <span>1600</span>
                <span>1920 px</span>
            </div>

            {/* Vertical Blueprint Columns (12-column grid guide lines) */}
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-8 opacity-10">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-full border-x border-cyan-400/40 bg-cyan-400/5" />
                ))}
            </div>

            {/* Cyan Center Alignment Crosshair */}
            <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-cyan-400/20" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px border-r border-dashed border-cyan-400/20" />
        </div>
    );
};

export default function GraphicDesign() {
    const [activeSection, setActiveSection] = useState("about");
    const [activeTool, setActiveTool] = useState<string>("select");
    const [guidesEnabled, setGuidesEnabled] = useState<boolean>(false);
    const [lightboxItem, setLightboxItem] = useState<DesignItem | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Annual Report active tab state
    const [activeReportTab, setActiveReportTab] = useState(0);

    // Social Media view toggle (Marquee Loop vs Grid)
    const [socialViewMode, setSocialViewMode] = useState<"loop" | "grid">("loop");
    const [socialPaused, setSocialPaused] = useState(false);

    // Sketching view toggle
    const [sketchViewMode, setSketchViewMode] = useState<"stream" | "grid">("stream");
    const [sketchPaused, setSketchPaused] = useState(false);

    // Storybooks loop pause
    const [storyLoopPaused, setStoryLoopPaused] = useState(false);

    // Scroll to section handler
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const yOffset = -90;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    // Scroll spy & back to top & active tool sync
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 600);

            const sectionElements = navSections.map((sec) => ({
                id: sec.id,
                el: document.getElementById(sec.id),
            }));

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const item = sectionElements[i];
                if (item.el) {
                    const rect = item.el.getBoundingClientRect();
                    if (rect.top <= 200) {
                        setActiveSection(item.id);

                        // Sync active Adobe tool based on section discipline
                        const toolMap: Record<string, string> = {
                            about: "select",
                            "story-books": "type",
                            "annual-report": "shape",
                            brochures: "type",
                            "social-media": "shape",
                            branding: "pen",
                            "flex-design": "shape",
                            "digital-art": "eyedropper",
                            sketching: "pen",
                        };
                        if (toolMap[item.id]) {
                            setActiveTool(toolMap[item.id]);
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Hotkey listener for Adobe tools (V, P, T, M, I, G)
    useEffect(() => {
        const handleToolKeys = (e: KeyboardEvent) => {
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement
            )
                return;

            const key = e.key.toLowerCase();
            if (key === "v") {
                setActiveTool("select");
                playTechTick();
            } else if (key === "p") {
                setActiveTool("pen");
                playTechTick();
            } else if (key === "t") {
                setActiveTool("type");
                playTechTick();
            } else if (key === "m") {
                setActiveTool("shape");
                playTechTick();
            } else if (key === "i") {
                setActiveTool("eyedropper");
                playTechTick();
            } else if (key === "g" || (e.metaKey && e.key === ";")) {
                setGuidesEnabled((prev) => {
                    const next = !prev;
                    if (next) playTechPop();
                    else playTechChirp();
                    return next;
                });
            }
        };

        window.addEventListener("keydown", handleToolKeys);
        return () => window.removeEventListener("keydown", handleToolKeys);
    }, []);

    // Lightbox keyboard navigation
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!lightboxItem) return;

            if (e.key === "Escape") {
                setLightboxItem(null);
            } else if (e.key === "ArrowRight") {
                const currentIndex = allGalleryItems.findIndex((it) => it.id === lightboxItem.id);
                const nextIndex = (currentIndex + 1) % allGalleryItems.length;
                setLightboxItem(allGalleryItems[nextIndex]);
            } else if (e.key === "ArrowLeft") {
                const currentIndex = allGalleryItems.findIndex((it) => it.id === lightboxItem.id);
                const prevIndex = (currentIndex - 1 + allGalleryItems.length) % allGalleryItems.length;
                setLightboxItem(allGalleryItems[prevIndex]);
            }
        },
        [lightboxItem]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const nextLightbox = () => {
        if (!lightboxItem) return;
        const currentIndex = allGalleryItems.findIndex((it) => it.id === lightboxItem.id);
        const nextIndex = (currentIndex + 1) % allGalleryItems.length;
        setLightboxItem(allGalleryItems[nextIndex]);
    };

    const prevLightbox = () => {
        if (!lightboxItem) return;
        const currentIndex = allGalleryItems.findIndex((it) => it.id === lightboxItem.id);
        const prevIndex = (currentIndex - 1 + allGalleryItems.length) % allGalleryItems.length;
        setLightboxItem(allGalleryItems[prevIndex]);
    };

    return (
        <div className="min-h-screen bg-[#111110] text-white selection:bg-[#B5892D] selection:text-black font-inter relative overflow-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
                        backgroundSize: "4rem 4rem",
                    }}
                />
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#B5892D]/10 rounded-full blur-[140px]" />
                <div className="absolute top-2/3 -right-48 w-96 h-96 bg-[#B5892D]/10 rounded-full blur-[140px]" />
            </div>

            {/* Optional Alignment Guides Overlay (Blueprint Mode ⌘;) */}
            {guidesEnabled && <AlignmentGuidesOverlay />}

            {/* Left Vector Pen Navigation Spine */}
            <ScrollPenSpine activeSection={activeSection} onSectionClick={scrollTo} />

            {/* Right Adobe Floating Creative Tools Palette */}
            <DesignerToolsDock
                activeTool={activeTool}
                setActiveTool={setActiveTool}
                guidesEnabled={guidesEnabled}
                setGuidesEnabled={setGuidesEnabled}
            />

            {/* ==================================================== */}
            {/* 1. HERO SECTION (Inspired by hero section.png)        */}
            {/* ==================================================== */}
            <section className="relative z-10 min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-12 pt-6 pb-14">
                <div className="max-w-7xl mx-auto w-full">
                    {/* Main Architectural Hero Container */}
                    <div className="relative border border-white/10 rounded-3xl bg-gradient-to-br from-[#161615] via-[#121211] to-[#0c0c0b] p-6 sm:p-10 md:p-14 overflow-hidden shadow-2xl backdrop-blur-xl">
                        {/* Ambient Gold Halo */}
                        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#B5892D]/15 rounded-full blur-3xl pointer-events-none" />

                        {/* TOP HEADER ROW: Geometric Monogram & Metadata */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 sm:pb-12 border-b border-white/10">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="w-10 h-10 border-2 border-[#B5892D] flex items-center justify-center relative group"
                                >
                                    <span className="w-2.5 h-2.5 bg-[#B5892D] transition-transform duration-300 group-hover:scale-150" />
                                </motion.div>
                                <div>
                                    <h2 className="text-sm sm:text-base font-bold tracking-[0.28em] uppercase text-white font-mono">
                                        MARK TAMANG
                                    </h2>
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#B5892D] font-medium">
                                        Creative Direction & Visual Design
                                    </p>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-[#B5892D]/10 text-[#B5892D] border border-[#B5892D]/20 font-mono tracking-wider">
                                    2019 — 2023 ARCHIVE
                                </span>
                                <span className="hidden md:inline-block px-3 py-1 text-xs rounded-full bg-white/5 text-white/70 border border-white/10 font-mono">
                                    8 Disciplines
                                </span>
                            </div>
                        </div>

                        {/* THE EDITORIAL GRID: Split Layout with Hairline Crosshair Dividers */}
                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-10 sm:pt-14 pb-4">
                            {/* Left Column: Bold Typographic Identity */}
                            <div className="lg:col-span-7 flex flex-col justify-between">
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B5892D] mb-4 font-mono font-medium"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-[#B5892D] animate-pulse" />
                                        GRAPHIC DESIGN PORTFOLIO
                                    </motion.div>

                                    {/* Giant Editorial Typography (port \n - folio.) */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1 }}
                                        className="select-none"
                                    >
                                        <VectorTextBox
                                            pointerLabel="Display [T]"
                                            pointerColor="#FF5A5F"
                                            tagPosition="right"
                                            showCursor
                                            className="p-1 sm:p-2.5"
                                        >
                                            <h1 className="text-[60px] sm:text-[90px] md:text-[115px] xl:text-[135px] font-black tracking-tight leading-[0.88] text-white">
                                                port
                                                <br />
                                                <span className="text-[#B5892D] inline-block -mr-1 sm:-mr-2 font-normal font-sans">
                                                    —
                                                </span>
                                                folio
                                                <span className="text-[#B5892D]">.</span>
                                            </h1>
                                        </VectorTextBox>
                                    </motion.div>
                                </div>

                                {/* Bottom Left: Micro Tagline & Quick Action */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="mt-8 sm:mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-white/60"
                                >
                                    <span className="flex items-center gap-2 text-white/80">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#B5892D]" />
                                        ECEC Innovation in Education
                                    </span>
                                    <span className="text-white/20">•</span>
                                    <span>Published Storybooks</span>
                                    <span className="text-white/20">•</span>
                                    <span>Branding & Print Systems</span>
                                </motion.div>
                            </div>

                            {/* Right Column: Editorial Timeline & Swiss Crosshair Layout */}
                            <div className="lg:col-span-5 relative flex flex-col justify-between lg:pl-10">
                                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-white/10" />

                                <div className="relative py-2 lg:py-6">
                                    <div className="space-y-8 relative">
                                        {/* 2023 marker */}
                                        <div className="flex items-start gap-4 group">
                                            <span className="font-mono text-lg font-bold text-white/50 group-hover:text-[#B5892D] transition-colors">
                                                2023
                                            </span>
                                            <div className="border-l border-white/10 pl-4 py-0.5">
                                                <p className="text-sm font-semibold text-white">
                                                    Digital Art, Campaigns & Multimedia
                                                </p>
                                                <p className="text-xs text-white/50 mt-0.5">
                                                    Large scale flex standees, photo manipulations, digital marketing
                                                </p>
                                            </div>
                                        </div>

                                        {/* Mid connector with solid square */}
                                        <div className="flex items-center gap-4 pl-0 relative">
                                            <div className="w-8 h-8 bg-[#B5892D] flex items-center justify-center shadow-lg shadow-[#B5892D]/20">
                                                <span className="w-3 h-3 bg-black" />
                                            </div>
                                            <div>
                                                <span className="inline-block text-xs font-mono uppercase tracking-[0.18em] text-[#B5892D] font-bold">
                                                    Graphic Designer
                                                </span>
                                                <p className="text-sm font-medium text-white/90">
                                                    ECEC Innovation in Education
                                                </p>
                                            </div>
                                        </div>

                                        {/* 2019 marker */}
                                        <div className="flex items-start gap-4 group">
                                            <span className="font-mono text-lg font-bold text-white/50 group-hover:text-[#B5892D] transition-colors">
                                                2019
                                            </span>
                                            <div className="border-l border-white/10 pl-4 py-0.5">
                                                <p className="text-sm font-semibold text-white">
                                                    20+ Published Storybooks & Curricula
                                                </p>
                                                <p className="text-xs text-white/50 mt-0.5">
                                                    Illustration, editorial typesetting, tri-fold brochures, annual reports
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Interactive Jump Button */}
                                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                    <button
                                        onClick={() => scrollTo("story-books")}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#B5892D] text-[#111110] hover:bg-white px-5 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-lg shadow-[#B5892D]/10 group"
                                    >
                                        <span>Explore Archive</span>
                                        <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                                    </button>
                                    <button
                                        onClick={() => scrollTo("about")}
                                        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-3.5 rounded-xl font-mono text-xs transition-all duration-300"
                                    >
                                        <span>Read Biography</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Live Interactive Cubic Bézier Vector Curve */}
                        <div className="pt-2 border-t border-white/10 mt-6">
                            <LiveBezierHero />
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================================================== */}
            {/* 2. STICKY CATEGORY JUMP NAVIGATION BAR               */}
            {/* ==================================================== */}
            <nav className="sticky top-[80px] xl:top-[90px] z-40 bg-[#111110]/95 backdrop-blur-md border-y border-white/10 py-3 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                            <span className="text-[11px] font-mono uppercase tracking-widest text-[#B5892D] hidden lg:inline-flex items-center mr-2">
                                JUMP TO:
                            </span>
                            {navSections.map((sec) => {
                                const isActive = activeSection === sec.id;
                                return (
                                    <button
                                        key={sec.id}
                                        onClick={() => {
                                            scrollTo(sec.id);
                                            playTechTick();
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${isActive
                                            ? "bg-[#B5892D] text-black font-semibold shadow-md shadow-[#B5892D]/20 scale-105"
                                            : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5"
                                            }`}
                                    >
                                        <span className={isActive ? "text-black/60" : "text-[#B5892D]"}>
                                            {sec.number}
                                        </span>
                                        <span>{sec.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Prepress CMYK Color Calibration & Registration Bar */}
                        <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-white/10 shrink-0">
                            <CMYKCalibrationBar />
                        </div>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT WRAPPER */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-32">
                {/* ==================================================== */}
                {/* 3. ABOUT ME SECTION                                  */}
                {/* ==================================================== */}
                <section id="about" className="scroll-mt-32">
                    <ArtboardFrame
                        artboardNumber="00"
                        title="Background & Creative Vision"
                        dimensions="Design Systems • 4+ Years"
                        colorProfile="Design & Code Synergy"
                        guidesEnabled={guidesEnabled}
                    >
                        <div className="border border-white/10 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 sm:p-12 lg:p-16 relative overflow-hidden backdrop-blur-xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B5892D]/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                <div className="lg:col-span-5">
                                    <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#B5892D] font-medium block mb-3">
                                        00 // Background & Vision
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                                        About Me
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <span className="text-3xl lg:text-4xl font-bold text-[#B5892D] font-mono">
                                                4+
                                            </span>
                                            <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                                                Years at ECEC Innovation
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <span className="text-3xl lg:text-4xl font-bold text-[#B5892D] font-mono">
                                                20+
                                            </span>
                                            <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                                                Published Children's Books
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <span className="text-3xl lg:text-4xl font-bold text-[#B5892D] font-mono">
                                                100+
                                            </span>
                                            <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                                                Print & Digital Collateral
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <span className="text-3xl lg:text-4xl font-bold text-[#B5892D] font-mono">
                                                Full
                                            </span>
                                            <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                                                Design & Code Synergy
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Exact user narrative with typographic baseline spec */}
                                <div className="lg:col-span-7 space-y-6 text-white/85 text-base sm:text-lg leading-relaxed font-light relative">
                                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10 text-[10px] font-mono text-[#B5892D] uppercase">
                                        <Type className="w-3.5 h-3.5" />
                                        <span>Editorial Typesetting // Optical Kerning // 8pt Baseline</span>
                                    </div>

                                    <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#B5892D] first-letter:mr-2">
                                        I worked as a Graphic Designer for over four years at{" "}
                                        <strong className="font-semibold text-white">
                                            ECEC Innovation in Education
                                        </strong>
                                        , creating a wide range of visual and educational materials, including
                                        children's storybooks, illustrations, worksheets, brochures, banners, and
                                        marketing campaigns.
                                    </p>

                                    <p>
                                        One of the most rewarding parts of my work was designing more than{" "}
                                        <strong className="font-semibold text-[#B5892D]">
                                            20 published children's storybooks
                                        </strong>
                                        , contributing to engaging and age-appropriate learning resources for children
                                        across diverse educational communities. I also worked in photography,
                                        videography, and multimedia editing, bringing educational ideas and stories to
                                        life through visual communication.
                                    </p>

                                    <div className="p-5 rounded-2xl bg-[#B5892D]/10 border border-[#B5892D]/20 text-white italic font-normal text-sm sm:text-base">
                                        "I’m passionate about combining creativity, visual storytelling, and thoughtful
                                        design to create meaningful experiences."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ArtboardFrame>
                </section>

                {/* ==================================================== */}
                {/* 4. SECTION 01: STORY BOOKS (3D LIGHTER BANNER & LOOP) */}
                {/* ==================================================== */}
                <section id="story-books" className="scroll-mt-32 space-y-10">
                    <ArtboardFrame
                        artboardNumber="01"
                        title="Story Books Editorial & Publication"
                        dimensions="A4 Spread • 300 DPI"
                        colorProfile="CMYK ISO-Coated"
                        guidesEnabled={guidesEnabled}
                    >
                        <div className="border-b border-white/10 pb-6 space-y-3 p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                <div>
                                    <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B5892D]">
                                        Section 01
                                    </span>
                                    <div className="mt-1">
                                        <VectorTextBox
                                            pointerLabel="Headline [T]"
                                            pointerColor="#fac70f"
                                            tagPosition="right"
                                        >
                                            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                                                Story Books
                                            </h2>
                                        </VectorTextBox>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-[#B5892D]/10 text-[#B5892D] border border-[#B5892D]/30 font-mono text-xs uppercase tracking-wider self-start sm:self-auto">
                                    20+ Published Editions
                                </span>
                            </div>
                            {/* ONE cohesive description for all story books */}
                            <p className="text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed font-light">
                                Designed and illustrated for diverse early learning milestones and developmental age
                                groups—ranging from toddler sensory engagement to early primary literacy. Each published
                                edition balances vibrant character design, cultural warmth, and pedagogical narrative
                                pacing across various communities.
                            </p>
                        </div>

                        {/* 3D LIGHTER FLOATING STAGE FOR "Children Story Books.png" */}
                        <div className="p-4 sm:p-6 space-y-10">
                            <ShapeSelectionBox
                                label="3D_STAGE // A4_SPREAD"
                                pointerName="Mark [V]"
                                accentColor="#fac70f"
                            >
                                <div
                                    onClick={() =>
                                        setLightboxItem({
                                            id: "sb-spotlight",
                                            title: "Children's Story Books — 20+ Published Editions",
                                            category: "Story Books",
                                            section: "01. Story Books",
                                            path: "/assets/graphic-design-images/Children Story Books.png",
                                            description:
                                                "Comprehensive collection of published children's storybooks created at ECEC Innovation in Education.",
                                            tag: "Master 3D Showcase",
                                        })
                                    }
                                    className="group relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-white/[0.08] via-[#1a1917]/60 to-[#0e0e0d] p-6 sm:p-12 shadow-2xl cursor-pointer transition-all duration-500 hover:border-[#B5892D]/50"
                                >
                        {/* Lighter Radial Studio Ambient Glow (highlights transparent PNG) */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.12)_0%,rgba(181,137,45,0.08)_45%,transparent_75%)] pointer-events-none" />

                        {/* Badge top-left */}
                        <div className="relative z-10 flex items-center justify-between pb-4">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B5892D] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#B5892D]/20">
                                <Sparkles className="w-3.5 h-3.5" />
                                Featured 3D Showcase
                            </span>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-white/80 text-xs font-mono backdrop-blur-md border border-white/15 group-hover:bg-[#B5892D] group-hover:text-black transition-all">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Inspect High-Res</span>
                            </div>
                        </div>

                        {/* Floating 3D Book Array with Soft Realistic Contact Shadow */}
                        <div className="relative w-full py-4 sm:py-8 flex flex-col items-center justify-center">
                            <motion.div
                                animate={{
                                    y: [-6, 6, -6],
                                    rotateZ: [-0.4, 0.4, -0.4],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative z-10 w-full max-w-4xl flex items-center justify-center"
                            >
                                <img
                                    src="/assets/graphic-design-images/Children Story Books.png"
                                    alt="Children Story Books Collection 3D Showcase"
                                    className="w-full h-auto max-h-[460px] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                                    style={{
                                        filter:
                                            "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.55)) drop-shadow(0 10px 18px rgba(181, 137, 45, 0.22))",
                                    }}
                                    loading="eager"
                                />
                            </motion.div>

                            {/* Realistic floor shadow that pulses in sync with floating books */}
                            <motion.div
                                animate={{
                                    scaleX: [0.92, 1.05, 0.92],
                                    opacity: [0.35, 0.6, 0.35],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="w-3/4 max-w-2xl h-6 bg-black/70 rounded-full blur-xl -mt-4 pointer-events-none"
                            />
                        </div>

                        {/* Bottom micro caption */}
                        <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-white/50 border-t border-white/10 mt-4">
                            <span>Published by ECEC Innovation in Education</span>
                            <span className="text-[#B5892D] mt-1 sm:mt-0 font-medium">Click image to expand in Lightbox</span>
                        </div>
                    </div>
                    </ShapeSelectionBox>

                    {/* INFINITE ELEGANT LOOP ANIMATION FOR INDIVIDUAL STORYBOOKS (Clickable) */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-[#B5892D]" />
                                <h3 className="text-sm sm:text-base font-semibold tracking-wide uppercase font-mono text-white/90">
                                    Published Front Covers & Editorial Spreads
                                </h3>
                            </div>
                            <span className="text-xs font-mono text-white/40 hidden sm:inline">
                                Hover to pause • Click cover to view
                            </span>
                        </div>

                        {/* Marquee Track Container with Fade Edges */}
                        <div
                            className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 py-6"
                            onMouseEnter={() => setStoryLoopPaused(true)}
                            onMouseLeave={() => setStoryLoopPaused(false)}
                        >
                            {/* Left & Right gradient edge masks */}
                            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#111110] to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#111110] to-transparent z-10 pointer-events-none" />

                            <div
                                className="flex gap-6 w-max"
                                style={{
                                    animation: "marqueeLeft 28s linear infinite",
                                    animationPlayState: storyLoopPaused ? "paused" : "running",
                                }}
                            >
                                {/* Duplicate the array twice for seamless continuous infinite loop */}
                                {[...storyBooksList, ...storyBooksList, ...storyBooksList].map((book, idx) => (
                                    <div
                                        key={`${book.id}-${idx}`}
                                        onClick={() => setLightboxItem(book)}
                                        className="group relative w-[200px] sm:w-[240px] flex-shrink-0 cursor-pointer rounded-2xl bg-white/5 border border-white/10 p-3 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-[#B5892D] hover:bg-white/10 shadow-xl"
                                    >
                                        {/* Realistic 3D Book Aspect & Spine Shadow */}
                                        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-black/50 flex items-center justify-center p-2 shadow-inner">
                                            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
                                            <img
                                                src={book.path}
                                                alt={book.title}
                                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                <div className="w-10 h-10 rounded-full bg-[#B5892D] text-black flex items-center justify-center shadow-xl">
                                                    <Eye className="w-4 h-4" />
                                                </div>
                                            </div>
                                            {book.tag && (
                                                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-[#B5892D] border border-white/10 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                                                    {book.tag}
                                                </span>
                                            )}
                                        </div>

                                        <div className="pt-3 text-center">
                                            <h4 className="font-semibold text-white text-xs sm:text-sm group-hover:text-[#B5892D] transition-colors truncate">
                                                {book.title}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    </div>
                    </ArtboardFrame>
                </section>

                {/* ==================================================== */}
                {/* 5. SECTION 02: ANNUAL REPORT (ENTIRE BOOK SHOWCASE)  */}
                {/* ==================================================== */}
                <section id="annual-report" className="scroll-mt-32 space-y-8">
                    <ArtboardFrame
                        artboardNumber="02"
                        title="Annual Report Publication Design"
                        dimensions="A4 Booklet • CMYK ISO"
                        colorProfile="300 DPI // Prepress"
                        guidesEnabled={guidesEnabled}
                    >
                        <div className="border-b border-white/10 pb-6 space-y-3 p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                <div>
                                    <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B5892D]">
                                        Section 02
                                    </span>
                                    <div className="mt-1">
                                        <VectorTextBox
                                            pointerLabel="Headline [T]"
                                            pointerColor="#FF5A5F"
                                            tagPosition="right"
                                        >
                                            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                                                Annual Report
                                            </h2>
                                        </VectorTextBox>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-[#B5892D]/10 text-[#B5892D] border border-[#B5892D]/30 font-mono text-xs uppercase tracking-wider self-start sm:self-auto">
                                    Full Publication Design
                                </span>
                            </div>
                            {/* Explanation that Mark designed the whole book */}
                            <p className="text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed font-light">
                                End-to-End Publication Design: Conceptualized, designed, and laid out the entire multi-page
                                annual report from cover to back for ECEC Innovation in Education. These selected pages highlight
                                the comprehensive visual system—unifying cover art direction, structured internal editorial grids,
                                financial data presentation, and custom vector cartography into a polished institutional milestone.
                            </p>
                        </div>

                        {/* Interactive Editorial Magazine Spread Viewer */}
                        <div className="p-4 sm:p-6">
                            <ShapeSelectionBox
                                label="SPREAD_VIEWER // 16:10"
                                pointerName="Spread [V]"
                                accentColor="#fac70f"
                            >
                                <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#161615] to-[#0c0c0b] p-6 sm:p-10 shadow-2xl space-y-6">
                                    {/* Interactive Tabs */}
                                    <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
                                        {annualReportHighlights.map((item, index) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveReportTab(index)}
                                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-300 flex items-center gap-2 ${activeReportTab === index
                                                    ? "bg-[#B5892D] text-black font-bold shadow-lg shadow-[#B5892D]/20"
                                                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5"
                                                    }`}
                                            >
                                                <span>{item.tab}</span>
                                                <span className={activeReportTab === index ? "text-black/60" : "text-[#B5892D]"}>
                                                    • {item.aspect}
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Spotlight Display */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                                        <div
                                            className="lg:col-span-8 group relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 p-4 sm:p-6 cursor-pointer"
                                            onClick={() => setLightboxItem(annualReportList[activeReportTab])}
                                        >
                                            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center overflow-hidden">
                                                <AnimatePresence mode="wait">
                                                    <motion.img
                                                        key={annualReportHighlights[activeReportTab].id}
                                                        src={annualReportHighlights[activeReportTab].path}
                                                        alt={annualReportHighlights[activeReportTab].title}
                                                        initial={{ opacity: 0, scale: 0.96 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.96 }}
                                                        transition={{ duration: 0.4 }}
                                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                </AnimatePresence>

                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                    <div className="px-5 py-2.5 rounded-full bg-[#B5892D] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl">
                                                        <Maximize2 className="w-4 h-4" />
                                                        <span>Expand High-Resolution Spread</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Spread Details Breakdown */}
                                        <div className="lg:col-span-4 space-y-4">
                                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B5892D] block">
                                                Page Specification
                                            </span>
                                            <h3 className="text-xl sm:text-2xl font-bold text-white">
                                                {annualReportHighlights[activeReportTab].title}
                                            </h3>
                                            <p className="text-sm text-white/70 leading-relaxed font-light">
                                                {annualReportHighlights[activeReportTab].summary}
                                            </p>

                                            <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-white/60">
                                                <div className="flex justify-between">
                                                    <span>Publication:</span>
                                                    <span className="text-white">ECEC Annual Report</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Scope:</span>
                                                    <span className="text-[#B5892D]">Cover-to-Cover Design</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Medium:</span>
                                                    <span className="text-white">Print & Digital Distribution</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setLightboxItem(annualReportList[activeReportTab])}
                                                className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-[#B5892D] text-white hover:text-black font-mono text-xs uppercase font-semibold transition-all duration-300 border border-white/10"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>Inspect Detail View</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ShapeSelectionBox>
                        </div>
                    </ArtboardFrame>
                </section>

                {/* ==================================================== */}
                {/* 6. SECTION 03: TRI-FOLD BROCHURES                    */}
                {/* ==================================================== */}
                <section id="brochures" className="scroll-mt-32 space-y-8">
                    <ArtboardFrame
                        artboardNumber="03"
                        title="Tri-Fold Collateral Systems"
                        dimensions="A4 Tri-Fold • 3mm Bleed"
                        colorProfile="CMYK / 300 DPI"
                        guidesEnabled={guidesEnabled}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 p-4 sm:p-6">
                            <div>
                                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B5892D]">
                                    Section 03
                                </span>
                                <div className="mt-1">
                                    <VectorTextBox
                                        pointerLabel="Headline [T]"
                                        pointerColor="#fac70f"
                                        tagPosition="right"
                                    >
                                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                                            Tri-Fold Brochures
                                        </h2>
                                    </VectorTextBox>
                                </div>
                            </div>
                            <p className="text-sm text-white/60 max-w-md font-mono">
                                Promotional and informational print collateral for ECEC Innovation and Nepal Open University.
                            </p>
                        </div>

                        <div className="p-4 sm:p-6">
                            <ShapeSelectionBox
                                label="TRIFOLD_GRID // 4-PANELS"
                                pointerName="Collateral [V]"
                                accentColor="#fac70f"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {brochuresList.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            whileHover={{ y: -6 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => setLightboxItem(item)}
                                            className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-[#B5892D]/40 transition-all duration-300"
                                        >
                                            <div className="relative w-full aspect-[16/10] bg-black/30 p-4 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={item.path}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                    <div className="w-12 h-12 rounded-full bg-[#B5892D] text-black flex items-center justify-center shadow-xl">
                                                        <Eye className="w-5 h-5" />
                                                    </div>
                                                </div>
                                                {item.tag && (
                                                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 text-[#B5892D] border border-white/10 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                                                        {item.tag}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="p-5 border-t border-white/10">
                                                <h4 className="font-semibold text-white text-base group-hover:text-[#B5892D] transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </ShapeSelectionBox>
                        </div>
                    </ArtboardFrame>
                </section>

                {/* ==================================================== */}
                {/* 7. SECTION 04: SOCIAL MEDIA (ANIMATED DUAL STREAM)   */}
                {/* ==================================================== */}
                <section id="social-media" className="scroll-mt-32 space-y-8">
                    <ArtboardFrame
                        artboardNumber="04"
                        title="Social Media Campaign Stream"
                        dimensions="1080 × 1080 px • sRGB"
                        colorProfile="Digital Screen"
                        guidesEnabled={guidesEnabled}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 p-4 sm:p-6">
                            <div>
                                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B5892D]">
                                    Section 04
                                </span>
                                <div className="mt-1">
                                    <VectorTextBox
                                        pointerLabel="Headline [T]"
                                        pointerColor="#FF5A5F"
                                        tagPosition="right"
                                    >
                                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                                            Social Media Campaigns
                                        </h2>
                                    </VectorTextBox>
                                </div>
                            </div>
                            {/* View Toggle */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setSocialViewMode("loop")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${socialViewMode === "loop"
                                        ? "bg-[#B5892D] text-black font-semibold"
                                        : "bg-white/5 text-white/70 hover:bg-white/10"
                                        }`}
                                >
                                    <Play className="w-3.5 h-3.5" />
                                    <span>Animated Stream</span>
                                </button>
                                <button
                                    onClick={() => setSocialViewMode("grid")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${socialViewMode === "grid"
                                        ? "bg-[#B5892D] text-black font-semibold"
                                        : "bg-white/5 text-white/70 hover:bg-white/10"
                                        }`}
                                >
                                    <Grid className="w-3.5 h-3.5" />
                                    <span>Grid View</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6">
                            <ShapeSelectionBox
                                label="DUAL_STREAM // MARQUEE"
                                pointerName="Motion [V]"
                                accentColor="#FF5A5F"
                            >
                                {socialViewMode === "loop" ? (
                                    /* DUAL-TRACK INFINITE MARQUEE STREAM */
                                    <div
                                        className="space-y-4 overflow-hidden rounded-3xl border border-white/10 bg-black/40 py-8 relative"
                                        onMouseEnter={() => setSocialPaused(true)}
                                        onMouseLeave={() => setSocialPaused(false)}
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#111110] to-transparent z-10 pointer-events-none" />
                                        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#111110] to-transparent z-10 pointer-events-none" />

                                        {/* Row 1 (glides left) */}
                                        <div
                                            className="flex gap-4 sm:gap-6 w-max"
                                            style={{
                                                animation: "marqueeLeft 36s linear infinite",
                                                animationPlayState: socialPaused ? "paused" : "running",
                                            }}
                                        >
                                            {[...socialMediaList.slice(0, 8), ...socialMediaList.slice(0, 8), ...socialMediaList.slice(0, 8)].map(
                                                (post, idx) => (
                                                    <div
                                                        key={`r1-${post.id}-${idx}`}
                                                        onClick={() => setLightboxItem(post)}
                                                        className="group relative w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer flex-shrink-0 hover:scale-105 hover:border-[#B5892D] transition-all duration-300 shadow-xl"
                                                    >
                                                        <img
                                                            src={post.path}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                                            <span className="text-[10px] font-mono text-[#B5892D] uppercase font-bold">
                                                                {post.tag}
                                                            </span>
                                                            <p className="text-xs text-white line-clamp-2">{post.title}</p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {/* Row 2 (glides right) */}
                                        <div
                                            className="flex gap-4 sm:gap-6 w-max"
                                            style={{
                                                animation: "marqueeRight 36s linear infinite",
                                                animationPlayState: socialPaused ? "paused" : "running",
                                            }}
                                        >
                                            {[...socialMediaList.slice(8), ...socialMediaList.slice(8), ...socialMediaList.slice(8)].map(
                                                (post, idx) => (
                                                    <div
                                                        key={`r2-${post.id}-${idx}`}
                                                        onClick={() => setLightboxItem(post)}
                                                        className="group relative w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer flex-shrink-0 hover:scale-105 hover:border-[#B5892D] transition-all duration-300 shadow-xl"
                                                    >
                                                        <img
                                                            src={post.path}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                                            <span className="text-[10px] font-mono text-[#B5892D] uppercase font-bold">
                                                                {post.tag}
                                                            </span>
                                                            <p className="text-xs text-white line-clamp-2">{post.title}</p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    /* STATIC GRID VIEW */
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                                        {socialMediaList.map((post) => (
                                            <motion.div
                                                key={post.id}
                                                whileHover={{ scale: 1.03 }}
                                                transition={{ duration: 0.25 }}
                                                onClick={() => setLightboxItem(post)}
                                                className="group relative rounded-xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-[#B5892D]/50 transition-all duration-300 aspect-square"
                                            >
                                                <img
                                                    src={post.path}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                                                    <span className="text-[10px] font-mono text-[#B5892D] uppercase tracking-wider font-bold">
                                                        {post.tag}
                                                    </span>
                                                    <p className="text-xs text-white font-medium line-clamp-2">{post.title}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </ShapeSelectionBox>
                        </div>
                    </ArtboardFrame>
                </section>

                {/* ==================================================== */}
                {/* 8. SECTION 05: LOGO & BRANDING                       */}
                {/* ==================================================== */}
                <section id="branding" className="scroll-mt-32 space-y-8">
                    <ArtboardFrame
                        artboardNumber="05"
                        title="Brand Identity & Vector Marks"
                        dimensions="Scalable Vector • Pantone"
                        colorProfile="Spot Colors / Vector"
                        guidesEnabled={guidesEnabled}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 p-4 sm:p-6">
                            <div>
                                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B5892D]">
                                    Section 05
                                </span>
                                <div className="mt-1">
                                    <VectorTextBox
                                        pointerLabel="Headline [T]"
                                        pointerColor="#fac70f"
                                        tagPosition="right"
                                    >
                                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                                            Logo & Branding
                                        </h2>
                                    </VectorTextBox>
                                </div>
                            </div>
                            <p className="text-sm text-white/60 max-w-md font-mono">
                                Identity design, vector symbols, packaging mockups, and corporate brand guidelines.
                            </p>
                        </div>

                        <div className="p-4 sm:p-6">
                            <ShapeSelectionBox
                                label="IDENTITY_GRID // 6-MARKS"
                                pointerName="Vector [V]"
                                accentColor="#fac70f"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {brandingList.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            whileHover={{ y: -6 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => setLightboxItem(item)}
                                            className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-[#B5892D]/40 transition-all duration-300 flex flex-col"
                                        >
                                            <div className="relative w-full aspect-[4/3] bg-black/40 p-4 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={item.path}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                    <div className="w-12 h-12 rounded-full bg-[#B5892D] text-black flex items-center justify-center shadow-xl">
                                                        <Eye className="w-5 h-5" />
                                                    </div>
                                                </div>
                                                {item.tag && (
                                                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 text-[#B5892D] border border-white/10 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                                                        {item.tag}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="p-5 border-t border-white/10 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-white text-base group-hover:text-[#B5892D] transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    {item.description && (
                                                        <p className="text-xs text-white/60 mt-1 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </ShapeSelectionBox>
                        </div>
                    </ArtboardFrame>
                </section>

                {/* ==================================================== */}
                {/* 9. SECTION 06: FLEX STANDEE (PORTRAIT ON STAND)      */}
                {/* ==================================================== */}
                <section id="flex-design" className="scroll-mt-32 space-y-8">
                    <ArtboardFrame
                        artboardNumber="06"
                        title="Flex & Roll-Up Exhibition Standees"
                        dimensions="3 × 6 ft • Large Format"
                        colorProfile="CMYK 150 DPI Large"
                        guidesEnabled={guidesEnabled}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 p-4 sm:p-6">
                            <div>
                                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B5892D]">
                                    Section 06
                                </span>
                                <div className="mt-1">
                                    <VectorTextBox
                                        pointerLabel="Headline [T]"
                                        pointerColor="#fac70f"
                                        tagPosition="right"
                                    >
                                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                                            Flex Design — Roll-Up Standee
                                        </h2>
                                    </VectorTextBox>
                                </div>
                            </div>
                            <p className="text-sm text-white/60 max-w-md font-mono">
                                Portrait pull-up exhibition banner engineered for high-visibility stage presentation.
                            </p>
                        </div>

                        <div className="p-4 sm:p-6">
                            <ShapeSelectionBox
                                label="3D_STANDEE // 3×6 FT"
                                pointerName="Exhibition [V]"
                                accentColor="#fac70f"
                            >
                                <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#161615] via-[#111110] to-[#0a0a09] p-6 sm:p-12 shadow-2xl">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                                        {/* REALISTIC 3D ROLL-UP STANDEE WITH ALUMINUM CASSETTE & FEET */}
                                        <div className="lg:col-span-6 flex flex-col items-center justify-center relative py-6">
                                            {/* Overhead Spotlight illumination on Standee */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#B5892D]/20 rounded-full blur-3xl pointer-events-none" />

                                            <div
                                                onClick={() => setLightboxItem(flexItem)}
                                                className="group relative cursor-pointer flex flex-col items-center w-full max-w-[340px] sm:max-w-[400px]"
                                            >
                                                {/* TOP ALUMINUM CLAMPING RAIL */}
                                                <div className="w-[94%] h-3.5 bg-gradient-to-r from-neutral-500 via-neutral-300 to-neutral-600 rounded-t-sm shadow-md border-b border-neutral-700 relative z-20">
                                                    <div className="absolute left-1 top-0.5 w-1.5 h-2 bg-neutral-800 rounded-xs" />
                                                    <div className="absolute right-1 top-0.5 w-1.5 h-2 bg-neutral-800 rounded-xs" />
                                                </div>

                                                {/* VERTICAL BANNER CANVAS */}
                                                <div className="relative w-[90%] aspect-[1/2] bg-black/60 shadow-2xl overflow-hidden border-x border-neutral-700/50 group-hover:shadow-[#B5892D]/20 transition-all duration-500">
                                                    <img
                                                        src={flexItem.path}
                                                        alt={flexItem.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                        loading="lazy"
                                                    />

                                                    {/* Subtle realistic lighting sheen */}
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                                                    {/* Hover expand overlay */}
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                        <div className="px-4 py-2 rounded-full bg-[#B5892D] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl">
                                                            <Maximize2 className="w-4 h-4" />
                                                            <span>Inspect Standee</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* BOTTOM RETRACTABLE CASSETTE BASE (Aluminum Box) */}
                                                <div className="w-[98%] h-6 bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-700 rounded-sm shadow-2xl border-t border-neutral-400 relative z-20 flex items-center justify-center">
                                                    <div className="w-16 h-1 bg-neutral-800/40 rounded-full" />
                                                </div>

                                                {/* TWO STABILIZING SWIVEL FEET PROTRUDING AT BOTTOM */}
                                                <div className="w-full flex justify-between px-6 -mt-1 relative z-10">
                                                    <div className="w-20 sm:w-28 h-3.5 bg-gradient-to-b from-neutral-700 to-neutral-900 rounded-full shadow-lg border border-neutral-600" />
                                                    <div className="w-20 sm:w-28 h-3.5 bg-gradient-to-b from-neutral-700 to-neutral-900 rounded-full shadow-lg border border-neutral-600" />
                                                </div>

                                                {/* Floor Contact Shadow */}
                                                <div className="w-4/5 h-4 bg-black/80 rounded-full blur-md mt-1 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* SPECIFICATION BREAKDOWN */}
                                        <div className="lg:col-span-6 space-y-6">
                                            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B5892D] block">
                                                Exhibition Specification
                                            </span>
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white">
                                                {flexItem.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                                                {flexItem.description}
                                            </p>

                                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 font-mono text-xs">
                                                <div className="flex justify-between border-b border-white/5 pb-2">
                                                    <span className="text-white/50">Display Format:</span>
                                                    <span className="text-[#B5892D] font-semibold">Portrait Roll-Up Standee</span>
                                                </div>
                                                <div className="flex justify-between border-b border-white/5 pb-2">
                                                    <span className="text-white/50">Dimensions:</span>
                                                    <span className="text-white">8ft × 4ft (822 × 1647 px source)</span>
                                                </div>
                                                <div className="flex justify-between border-b border-white/5 pb-2">
                                                    <span className="text-white/50">Material & Print:</span>
                                                    <span className="text-white">Heavyweight PVC Flex • 300 DPI CMYK</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-white/50">Client:</span>
                                                    <span className="text-white">ECEC Innovation in Education</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setLightboxItem(flexItem)}
                                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B5892D] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-[#B5892D]/10"
                                            >
                                                <Maximize2 className="w-4 h-4" />
                                                <span>View Full-Scale Standee</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ShapeSelectionBox>
                        </div>
                    </ArtboardFrame>
                </section>

                {/* ==================================================== */}
                {/* 10. SECTION 07: DIGITAL ART & PAINTING               */}
                {/* ==================================================== */}
                <section id="digital-art" className="scroll-mt-32 space-y-8">
                    <ArtboardFrame
                        artboardNumber="07"
                        title="Digital Art & Matte Painting"
                        dimensions="3840 × 2160 px • RGB"
                        colorProfile="16-Bit Wide Color"
                        guidesEnabled={guidesEnabled}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 p-4 sm:p-6">
                            <div>
                                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B5892D]">
                                    Section 07
                                </span>
                                <div className="mt-1">
                                    <VectorTextBox
                                        pointerLabel="Headline [T]"
                                        pointerColor="#FF5A5F"
                                        tagPosition="right"
                                    >
                                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                                            Digital Art & Painting
                                        </h2>
                                    </VectorTextBox>
                                </div>
                            </div>
                            <p className="text-sm text-white/60 max-w-md font-mono">
                                Conceptual photo manipulation, digital portraiture, lighting studies, and visual storytelling.
                            </p>
                        </div>

                        <div className="p-4 sm:p-6">
                            <ShapeSelectionBox
                                label="MATTE_CANVAS // 4-COLS"
                                pointerName="Brush [B]"
                                accentColor="#FF5A5F"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {digitalArtList.map((art) => (
                                        <motion.div
                                            key={art.id}
                                            whileHover={{ y: -6 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => setLightboxItem(art)}
                                            className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-[#B5892D]/40 transition-all duration-300 flex flex-col"
                                        >
                                            <div className="relative w-full aspect-[4/5] bg-black/30 p-3 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={art.path}
                                                    alt={art.title}
                                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                    <div className="w-12 h-12 rounded-full bg-[#B5892D] text-black flex items-center justify-center shadow-xl">
                                                        <Eye className="w-5 h-5" />
                                                    </div>
                                                </div>
                                                {art.tag && (
                                                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 text-[#B5892D] border border-white/10 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                                                        {art.tag}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="p-4 border-t border-white/10 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-white text-sm group-hover:text-[#B5892D] transition-colors">
                                                        {art.title}
                                                    </h4>
                                                    {art.description && (
                                                        <p className="text-xs text-white/60 mt-1 line-clamp-2">
                                                            {art.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </ShapeSelectionBox>
                        </div>
                    </ArtboardFrame>
                </section>

                {/* ==================================================== */}
                {/* 11. SECTION 08: SKETCHING (ANIMATED ART STREAM)      */}
                {/* ==================================================== */}
                <section id="sketching" className="scroll-mt-32 space-y-8">
                    <ArtboardFrame
                        artboardNumber="08"
                        title="Sketching & Concept Line Art"
                        dimensions="Graphite on Paper • Archival"
                        colorProfile="Monochrome High-Pass"
                        guidesEnabled={guidesEnabled}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 p-4 sm:p-6">
                            <div>
                                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B5892D]">
                                    Section 08
                                </span>
                                <div className="mt-1">
                                    <VectorTextBox
                                        pointerLabel="Headline [T]"
                                        pointerColor="#fac70f"
                                        tagPosition="right"
                                    >
                                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                                            Sketching & Concept Line Art
                                        </h2>
                                    </VectorTextBox>
                                </div>
                            </div>
                            {/* View Toggle */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setSketchViewMode("stream")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${sketchViewMode === "stream"
                                        ? "bg-[#B5892D] text-black font-semibold"
                                        : "bg-white/5 text-white/70 hover:bg-white/10"
                                        }`}
                                >
                                    <Play className="w-3.5 h-3.5" />
                                    <span>Animated Reel</span>
                                </button>
                                <button
                                    onClick={() => setSketchViewMode("grid")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${sketchViewMode === "grid"
                                        ? "bg-[#B5892D] text-black font-semibold"
                                        : "bg-white/5 text-white/70 hover:bg-white/10"
                                        }`}
                                >
                                    <Grid className="w-3.5 h-3.5" />
                                    <span>All 12 Sketches</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6">
                            <ShapeSelectionBox
                                label="PENCIL_REEL // 12-SKETCHES"
                                pointerName="Pencil [N]"
                                accentColor="#fac70f"
                            >
                                {sketchViewMode === "stream" ? (
                                    /* ANIMATED CONTINUOUS SKETCHING STREAM */
                                    <div
                                        className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 py-8"
                                        onMouseEnter={() => setSketchPaused(true)}
                                        onMouseLeave={() => setSketchPaused(false)}
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#111110] to-transparent z-10 pointer-events-none" />
                                        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#111110] to-transparent z-10 pointer-events-none" />

                                        <div
                                            className="flex gap-6 w-max"
                                            style={{
                                                animation: "marqueeLeft 32s linear infinite",
                                                animationPlayState: sketchPaused ? "paused" : "running",
                                            }}
                                        >
                                            {[...sketchingList, ...sketchingList, ...sketchingList].map((sketch, idx) => (
                                                <div
                                                    key={`sk-${sketch.id}-${idx}`}
                                                    onClick={() => setLightboxItem(sketch)}
                                                    className="group relative w-48 sm:w-60 aspect-[3/4] rounded-2xl overflow-hidden bg-[#181817] border border-white/10 p-2 cursor-pointer flex-shrink-0 hover:scale-105 hover:border-[#B5892D] transition-all duration-300 shadow-xl"
                                                >
                                                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/50">
                                                        <img
                                                            src={sketch.path}
                                                            alt={sketch.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center backdrop-blur-[1px]">
                                                            <span className="text-xs font-mono font-semibold text-[#B5892D]">
                                                                {sketch.title}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* STATIC GRID VIEW (ALL 12 SKETCHES) */
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                        {sketchingList.map((sketch) => (
                                            <motion.div
                                                key={sketch.id}
                                                whileHover={{ scale: 1.04 }}
                                                transition={{ duration: 0.25 }}
                                                onClick={() => setLightboxItem(sketch)}
                                                className="group relative rounded-xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-[#B5892D]/40 transition-all duration-300 aspect-[3/4]"
                                            >
                                                <img
                                                    src={sketch.path}
                                                    alt={sketch.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center backdrop-blur-[1px]">
                                                    <span className="text-[11px] font-mono font-semibold text-[#B5892D]">
                                                        {sketch.title}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </ShapeSelectionBox>
                        </div>
                    </ArtboardFrame>
                </section>

                {/* ==================================================== */}
                {/* 12. FINAL COOL CLOSING SECTION & CONTACT BUTTON       */}
                {/* ==================================================== */}
                <section className="pt-10">
                    <div className="relative rounded-3xl border border-[#B5892D]/30 bg-gradient-to-br from-[#1b1a16] via-[#141412] to-[#0a0a09] p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl text-center">
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#B5892D]/15 rounded-full blur-[120px] pointer-events-none" />

                        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B5892D]/10 text-[#B5892D] border border-[#B5892D]/30 text-xs font-mono uppercase tracking-[0.2em] font-semibold">
                                <Sparkles className="w-3.5 h-3.5" />
                                Let's Design Together
                            </span>

                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                                Open to{" "}
                                <span className="text-[#B5892D] italic font-pixel font-normal">
                                    Opportunities!
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed font-light">
                                If you believe my experience, creativity, and skills make me a good fit for your Graphic Designer role, I'd love to have a conversation. Please feel free to get in touch!
                            </p>

                            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#B5892D] text-[#111110] hover:bg-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-xl shadow-[#B5892D]/20 group"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>Get In Touch</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </Link>

                                <Link
                                    href="/projects"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/15 px-8 py-4 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300"
                                >
                                    <Layers className="w-4 h-4 text-[#B5892D]" />
                                    <span>View Software Projects</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ==================================================== */}
            {/* 13. FULLSCREEN INTERACTIVE LIGHTBOX MODAL            */}
            {/* ==================================================== */}
            <AnimatePresence>
                {lightboxItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
                        onClick={() => setLightboxItem(null)}
                    >
                        {/* Lightbox Topbar */}
                        <div
                            className="flex items-center justify-between z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-md bg-[#B5892D]/20 text-[#B5892D] text-xs font-mono font-semibold">
                                    {lightboxItem.section}
                                </span>
                                <span className="text-white/60 text-xs font-mono hidden sm:inline">
                                    {allGalleryItems.findIndex((it) => it.id === lightboxItem.id) + 1} /{" "}
                                    {allGalleryItems.length}
                                </span>
                            </div>

                            <button
                                onClick={() => setLightboxItem(null)}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B5892D] text-white hover:text-black flex items-center justify-center transition-all duration-300 border border-white/20"
                                aria-label="Close Lightbox"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Lightbox Center Image & Controls */}
                        <div
                            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={prevLightbox}
                                className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-[#B5892D] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-300"
                                aria-label="Previous Image"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <motion.div
                                key={lightboxItem.id}
                                initial={{ scale: 0.94, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.94, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center p-2"
                            >
                                <img
                                    src={lightboxItem.path}
                                    alt={lightboxItem.title}
                                    className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                                />
                            </motion.div>

                            <button
                                onClick={nextLightbox}
                                className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-[#B5892D] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-300"
                                aria-label="Next Image"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Lightbox Footer Caption */}
                        <div
                            className="text-center max-w-xl mx-auto space-y-1 z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-bold text-white">
                                {lightboxItem.title}
                            </h3>
                            {lightboxItem.description && (
                                <p className="text-xs text-white/60">
                                    {lightboxItem.description}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ==================================================== */}
            {/* 14. FLOATING BACK TO TOP BUTTON                      */}
            {/* ==================================================== */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#B5892D] text-black shadow-2xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
                        aria-label="Back to Top"
                    >
                        <ChevronUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* CSS KEYFRAMES FOR MARQUEE ANIMATIONS */}
            <style jsx global>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-33.333333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
        </div>
    );
}
