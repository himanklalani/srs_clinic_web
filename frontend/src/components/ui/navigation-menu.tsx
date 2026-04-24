"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import PageLink from "@/components/PageLink"; 

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Treatments", href: "/treatments" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250, restDelta: 0.5 },
      opacity: { duration: 0.2 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      restDelta: 0.5,
      restSpeed: 0.5,
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3.5rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants: Variants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15, restDelta: 0.5 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.15 } },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    }
  },
}

export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);
  // Track whether nav links are interactive — only true when fully expanded
  const [linksReady, setLinksReady] = React.useState(true);
  
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      setLinksReady(false);
      scrollPositionOnCollapse.current = latest; 
    } else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
      setExpanded(true);
    }
    
    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        aria-label="Main navigation"
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        onAnimationComplete={(definition) => {
          if (definition === "expanded") setLinksReady(true);
        }}
        className={cn(
          "flex items-center overflow-hidden rounded-full border border-primary/20 bg-[#faf8f5]/80 shadow-lg backdrop-blur-md h-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          !isExpanded && "cursor-pointer justify-center"
        )}
      >
        <motion.div
          variants={logoVariants}
          className="flex-shrink-0 flex items-center font-semibold pl-6 pr-4 text-primary"
        >
          {/* Decorative compass icon — hidden from screen readers */}
          <Navigation className="h-5 w-5 fill-primary" aria-hidden="true" />
        </motion.div>

        {/* Nav Links in Center */}
        <div className={cn("flex flex-1 items-center justify-center gap-[1px] sm:gap-3 ml-0 sm:ml-4 mr-3 sm:mr-8", !linksReady && "pointer-events-none")}>
          {navItems.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <PageLink
                href={item.href}
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] sm:text-xs md:text-sm font-medium text-text/70 hover:text-primary transition-colors px-1.5 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-surface/50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.name}
              </PageLink>
            </motion.div>
          ))}
          <motion.div variants={itemVariants}>
            <PageLink
              href="/book"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "ml-0.5 sm:ml-3 text-[10px] sm:text-xs md:text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors px-3 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                !linksReady && "pointer-events-none"
              )}
            >
              Book
            </PageLink>
          </motion.div>
        </div>

        {/* Collapsed logo icon — announced as "Open navigation" for SR */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
            className="flex items-center justify-center"
            aria-label={!isExpanded ? "Open navigation menu" : undefined}
          >
            <img
              src="https://res.cloudinary.com/dswvmoboh/image/upload/ce42deb6-628f-42c0-bfe0-584a1bd0c22d_fno5wf.png"
              alt="Dr. Saachi Shingrani Dental Clinic logo"
              className="h-10 w-10 object-contain drop-shadow-md"
            />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}
