"use client";

import Link from "next/link";
import {
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import { Container } from "./container";
import { NavLinks } from "./nav-links";
import { Button } from "./button";
import SVGLogo from "./svg-logo";

function MenuIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof PopoverButton<typeof Link>>,
    "as" | "className"
  >
) {
  return (
    <PopoverButton
      as={Link}
      className="block text-base tracking-tight leading-7 text-secondary-foreground"
      {...props}
    />
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-md">
  <nav className="px-8 mx-auto max-w-6xl">
    <Container className="flex relative z-50 justify-between py-4">
      <div className="flex relative z-10 gap-16 justify-between items-center w-full">
        <Link href="/" className="flex gap-2 items-center font-semibold">
          <SVGLogo />
          <span className="text-lg font-bold text-slate-800">
            TeachTechAI
          </span>
        </Link>
        <div className="hidden justify-center items-center lg:flex lg:gap-10">
          <NavLinks />
          <Button href="/sign-up" color="green">
            Get Started
          </Button>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <Popover className="lg:hidden">
          {({ open }) => (
            <>
              <PopoverButton
                className="inline-flex relative z-10 items-center p-2 -m-2 rounded-lg ui-not-focus-visible:outline-none stroke-slate-900 hover:bg-white/40 hover:stroke-slate-600 active:stroke-slate-900"
                aria-label="Toggle site navigation"
              >
                {({ open }) =>
                  open ? (
                    <ChevronUpIcon className="w-6 h-6" />
                  ) : (
                    <MenuIcon className="w-6 h-6" />
                  )
                }
              </PopoverButton>
              <AnimatePresence initial={false}>
                {open && (
                  <>
                    <PopoverOverlay
                      static
                      as={motion.div}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-0 backdrop-blur bg-white/50"
                    />
                    <PopoverPanel
                      static
                      as={motion.div}
                      initial={{ opacity: 0, y: -32 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        y: -32,
                        transition: { duration: 0.2 },
                      }}
                      className="absolute inset-x-0 top-0 z-0 px-6 pt-32 pb-6 rounded-b-2xl shadow-2xl origin-top bg-white/50 backdrop-blur-lg shadow-slate-900/20"
                    >
                      <div className="space-y-4">
                        <MobileNavLink href="/#features">
                          Features
                        </MobileNavLink>
                       
                      </div>
                      <div className="flex flex-col gap-4 mt-8">
                        <Button href="/" outline>
                          Log in
                        </Button>
                        <Button href={"/dashboard"}>Get Started</Button>
                      </div>
                    </PopoverPanel>
                  </>
                )}
              </AnimatePresence>
            </>
          )}
        </Popover>
      </div>
    </Container>
  </nav>
</header>

  );
}
