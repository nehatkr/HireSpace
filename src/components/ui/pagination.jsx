import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex flex-row items-center gap-1 glass-effect rounded-lg p-2",
      className
    )}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

const PaginationLink = ({ className, isActive, size = "icon", ...props }) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    variant={isActive ? "blue" : "ghost"}
    size={size}
    className={cn(
      "hover-lift transition-all duration-300 relative overflow-hidden group",
      isActive && "bg-blue-500 text-white shadow-lg",
      !isActive && "hover:bg-white/10 hover:text-blue-400",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-20"></div>
    <span className="relative z-10">{props.children}</span>
  </Button>
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({ className, ...props }) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5 hover-lift group", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, ...props }) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5 hover-lift group", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({ className, ...props }) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center text-gray-400", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}