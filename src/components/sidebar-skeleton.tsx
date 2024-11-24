import { Skeleton } from "@/components/ui/skeleton"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function SidebarSkeleton() {
  return (
    <Sidebar>
      <SidebarHeader className="border-none">
        <div className="flex items-center gap-2 px-4 py-2">
          <Skeleton className="h-8 w-8" />
          <div className="flex-1">
            <Skeleton className="h-4 w-[120px]" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col gap-2 px-4 py-2">
          {/* 导航项骨架屏 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter className="border-none">
        <div className="flex items-center gap-2 px-4 py-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-[100px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}