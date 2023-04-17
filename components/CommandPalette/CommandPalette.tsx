/* eslint-disable react/no-unknown-property */
//@ts-nocheck
import "./CommandPalette.css"

import { Command, useCommandState } from "cmdk"
import { motion } from "framer-motion"
import { useToggle } from "lib/hooks"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"
import * as React from "react"
import {
  Activity,
  Copy,
  Edit,
  GitHub,
  Home,
  Info,
  Linkedin,
  Monitor,
  Moon,
  Sun,
  Twitter,
} from "react-feather"
import tinykeys from "tinykeys"

const CommandItem = ({
  onSelect,
  value,
  children,
}: {
  onSelect?: (value: string) => void
  value: string
  children: React.ReactNode
}) => {
  const currentValue = useCommandState((state) => state.value)
  return (
    <Command.Item onSelect={ onSelect } value={ value }>
      <span className="content">{ children }</span>
      { currentValue === value ? (
        <motion.span
          layoutId="highlight"
          className="highlight"
          transition={ {
            duration: 0.2,
          } }
        />
      ) : null }
    </Command.Item>
  )
}

const CommandPalette = () => {
  const router = useRouter()
  const { setTheme } = useTheme()
  const [open, toggleOpen] = useToggle()

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const unsubscribe = tinykeys(window, {
      "$mod+KeyK": () => {
        toggleOpen()
      },
    })
    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSetTheme = (val: string) => {
    setTheme(val)
    toggleOpen()
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    toggleOpen()
  }

  return (
    <>
      <Command.Dialog
        open={ open }
        onOpenChange={ toggleOpen }
        label="Global Command Palette"
      >
        <div cmdk-header="">
          <Command.Input placeholder="Type a command or search..." />
          <button
            aria-label="Close command palette"
            cmdk-header-esc=""
            onClick={ () => toggleOpen() }
            tabIndex={ -1 }
          >
            ESC
          </button>
        </div>
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Navigation &not;">
            <CommandItem
              onSelect={ () => {
                router.push("/")
                toggleOpen()
              } }
              value="index"
            >
              <Home />
              <span>Index</span>
            </CommandItem>
            <CommandItem
              onSelect={ () => {
                router.push("/posts")
                toggleOpen()
              } }
              value="posts"
            >
              <Edit />
              <span>Posts</span>
            </CommandItem>

            <CommandItem
              onSelect={ () => {
                router.push("/activity")
                toggleOpen()
              } }
              value="activity"
            >
              <Activity />
              <span>Activity</span>
            </CommandItem>

            <CommandItem
              onSelect={ () => {
                router.push("/stack")
                toggleOpen()
              } }
              value="stack"
            >
              <Info />
              <span>Stack</span>
            </CommandItem>
          </Command.Group>

          <Command.Group heading="Connect &not;">
            <CommandItem
              onSelect={ () =>
                window.open("https://twitter.com/hybrid_alex", "_blank")
              }
              value="twitter"
            >
              <Twitter />
              <span>Twitter</span>
            </CommandItem>
            <CommandItem
              onSelect={ () =>
                window.open("https://github.com/alexcarpenter", "_blank")
              }
              value="github"
            >
              <GitHub />
              <span>Github</span>
            </CommandItem>
            <CommandItem
              onSelect={ () =>
                window.open(
                  "https://www.linkedin.com/in/imalexcarpenter/",
                  "_blank"
                )
              }
              value="linkedin"
            >
              <Linkedin />
              <span>LinkedIn</span>
            </CommandItem>
          </Command.Group>

          <Command.Group heading="Appearance &not;">
            <CommandItem onSelect={ handleSetTheme } value="system">
              <Monitor />
              <span>System</span>
            </CommandItem>
            <CommandItem onSelect={ handleSetTheme } value="light">
              <Sun />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={ handleSetTheme } value="dark">
              <Moon />
              <span>Dark</span>
            </CommandItem>
          </Command.Group>

          <Command.Group heading="Commands &not;">
            <CommandItem onSelect={ handleCopyUrl } value="copy">
              <Copy />
              <span>Copy current URL</span>
            </CommandItem>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  )
}

export { CommandPalette }
