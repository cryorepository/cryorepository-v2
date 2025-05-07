"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Search } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function NavMenu() {
  return (
    <NavigationMenu className="sm:block hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">Navigation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/search"
                  >
                    <Search />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Search
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Scour our database for Cryoprotective Agents that fit your use case.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/database" title="Indexed Database">
                View all our articles and filter through our database.
              </ListItem>
              <ListItem href="/references" title="Reference Index">
                Find and access articles through references.
              </ListItem>
              <ListItem href="/contact" title="Contact Us">
                Get in touch with us for inquiries, feedback, or support.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
