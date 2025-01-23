## SpecStory

## LocalDebugButtons Component Collapsible Modification (2025/1/23 14:16:27)

_**User**_

src/app/dashboard/bookmark/chrome-bookmark/page.tsx 里有一个 LocalDebugButtons 组件帮我把这个显示为一个可折叠的区域，增加页面显示区域以显示更多内容

---

_**Assistant**_

我来帮你修改，让 LocalDebugButtons 组件变成可折叠的区域。我会使用 shadcn-ui 的 Accordion 组件来实现这个功能。

首先让我看一下相关文件的内容：

---

_**Assistant**_

---

_**Assistant**_

---

_**Assistant**_

我现在来修改这两个文件，将 LocalDebugButtons 组件包装在一个可折叠的 Accordion 组件中：

---

_**Assistant**_

```
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { isLocalEnvironment } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface LocalDebugButtonsProps {
  onLoadLocalBookmarks: () => void
  onOpenLocalFolder: () => void
  onUploadBookmarks: () => void
  onCopyCmdLocalBookmarks: () => void
}

export function LocalDebugButtons({
  onLoadLocalBookmarks,
  onOpenLocalFolder,
  onUploadBookmarks,
  onCopyCmdLocalBookmarks,
}: LocalDebugButtonsProps) {
  if (!isLocalEnvironment()) {
    return (
      <div className="flex-none px-8 hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="debug-buttons">
            <AccordionTrigger>调试功能区域</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onCopyCmdLocalBookmarks}>
                    复制命令行拷贝 Bookmarks
                  </Button>
                  <Button variant="outline">上传 Bookmarks 文件到服务端</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }

  return (
    <div className="flex-none px-8">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="debug-buttons">
          <AccordionTrigger>调试功能区域</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button variant="outline" onClick={onLoadLocalBookmarks}>
                  加载本地 Bookmarks
                </Button>
                <Button variant="outline" onClick={onOpenLocalFolder}>
                  打开本地书签文件夹
                </Button>
                <Button variant="outline" onClick={onUploadBookmarks}>
                  上传 Bookmarks 文件
                </Button>
              </div>
              <Label className="text-sm text-muted-foreground">
                (三个功能仅在本地调试有效)
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
```

---

_**Assistant**_

看起来我们需要创建 accordion 组件。让我先检查一下是否已经存在这个组件：

---

_**Assistant**_

---

_**Assistant**_

很好，accordion 组件已经存在。让我们看看它的内容：

---

_**Assistant**_

---

_**Assistant**_

看来 accordion 组件文件虽然存在，但可能有权限问题。不过没关系，我们可以直接从 shadcn-ui 创建这个组件。

---

_**Assistant**_

```
npx shadcn-ui@latest add accordion
```

---

_**Assistant**_

看来安装命令有些问题。让我们尝试另一种方式：

---

_**Assistant**_

```
pnpm dlx shadcn-ui@latest add accordion
```

---

_**Assistant**_

看来安装 shadcn-ui 组件遇到了一些问题。让我们直接手动创建 accordion 组件：

---

_**Assistant**_

```
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

---

_**Assistant**_

现在我们需要安装必要的依赖：

---

_**Assistant**_

```
pnpm add @radix-ui/react-accordion
```

---

_**Assistant**_

---

---
