import { Skeleton } from '@/components/ui/skeleton'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'

export function SidebarSkeletonStyle1() {
  return (
    <Sidebar className="bg-gradient-to-b from-background to-muted/20">
      <SidebarHeader className="border-none p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[160px]" />
            <Skeleton className="h-3 w-[140px]" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        {/* Main Navigation */}
        <div className="space-y-6">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-5 w-[80%]" />
              </div>
            ))}
          </div>

          {/* Secondary Items */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-md" />
                <Skeleton className="h-4 w-[70%]" />
              </div>
            ))}
          </div>

          {/* Project Items */}
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-3 w-[60%]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-none p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
