import { Skeleton } from "@/components/ui/skeleton"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function SidebarSkeletonStyle2() {
  return (
    <Sidebar className="relative overflow-hidden">
      {/* 动态波浪效果背景 */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-muted/20 to-background animate-wave" />
      
      <SidebarHeader className="border-none">
        <div className="p-3 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="h-[1px] bg-border/50" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="px-3 space-y-6">
          {/* 主导航组 */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-16 mb-3" /> {/* 分组标签 */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 flex-1 max-w-[140px]" />
                {i === 0 && <Skeleton className="h-3 w-3 ml-auto" />}
              </div>
            ))}
          </div>

          {/* 次要导航组 */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-20 mb-3" /> {/* 分组标签 */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
            ))}
          </div>

          {/* 项目组 */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-14 mb-3" /> {/* 分组标签 */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="p-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="h-3 w-[80px] ml-7" />
              </div>
            ))}
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50">
        <div className="p-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-3 w-[80px]" />
            </div>
            <Skeleton className="h-5 w-5" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}