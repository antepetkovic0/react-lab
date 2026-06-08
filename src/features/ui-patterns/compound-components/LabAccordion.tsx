import { ChevronDownIcon } from 'lucide-react'
import React, { useContext, useId, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

interface LabAccordionContextType {
  openId: string | null
  toggleItem: (id: string) => void
}

const LabAccordionContext = React.createContext<
  LabAccordionContextType | undefined
>(undefined)

const useLabAccordionContext = () => {
  const context = useContext(LabAccordionContext)
  if (!context) {
    throw new Error(
      'LabAccordion compound components must be used within a <LabAccordion>.',
    )
  }
  return context
}

interface LabAccordionItemContextType {
  id: string
  triggerId: string
  contentId: string
}

const LabAccordionItemContext = React.createContext<
  LabAccordionItemContextType | undefined
>(undefined)

const useLabAccordionItemContext = () => {
  const context = useContext(LabAccordionItemContext)
  if (!context) {
    throw new Error(
      '<LabAccordionTrigger> and <LabAccordionContent> must be used within a <LabAccordionItem>.',
    )
  }
  return context
}

interface LabAccordionProps {
  defaultValue?: string
  children: React.ReactNode
}

interface LabAccordionItemProps {
  value: string
  children: React.ReactNode
}

interface LabAccordionTriggerProps {
  children: React.ReactNode
}

interface LabAccordionContentProps {
  children: React.ReactNode
}

function LabAccordion({ defaultValue, children }: LabAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultValue ?? null)

  const toggleItem = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id))
  }

  return (
    <LabAccordionContext.Provider value={{ openId, toggleItem }}>
      <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
        {children}
      </div>
    </LabAccordionContext.Provider>
  )
}

function LabAccordionItem({ value, children }: LabAccordionItemProps) {
  const generatedId = useId()
  const contextValue = useMemo<LabAccordionItemContextType>(
    () => ({
      id: value,
      triggerId: `${generatedId}-trigger`,
      contentId: `${generatedId}-content`,
    }),
    [generatedId, value],
  )

  return (
    <LabAccordionItemContext.Provider value={contextValue}>
      <div className="border-b last:border-b-0">{children}</div>
    </LabAccordionItemContext.Provider>
  )
}

function LabAccordionTrigger({ children }: LabAccordionTriggerProps) {
  const { openId, toggleItem } = useLabAccordionContext()
  const { id, contentId, triggerId } = useLabAccordionItemContext()
  const isOpen = openId === id

  return (
    <h3>
      <button
        aria-controls={contentId}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        id={triggerId}
        onClick={() => toggleItem(id)}
        type="button"
      >
        <span>{children}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            'size-4 shrink-0 text-muted-foreground transition-transform',
            isOpen && 'rotate-180 text-primary',
          )}
        />
      </button>
    </h3>
  )
}

function LabAccordionContent({ children }: LabAccordionContentProps) {
  const { openId } = useLabAccordionContext()
  const { id, triggerId, contentId } = useLabAccordionItemContext()
  const isOpen = openId === id

  return (
    <section
      aria-labelledby={triggerId}
      className="px-4 pb-4 text-sm leading-6 text-muted-foreground"
      hidden={!isOpen}
      id={contentId}
    >
      {children}
    </section>
  )
}

export {
  LabAccordion,
  LabAccordionContent,
  LabAccordionItem,
  LabAccordionTrigger,
}
