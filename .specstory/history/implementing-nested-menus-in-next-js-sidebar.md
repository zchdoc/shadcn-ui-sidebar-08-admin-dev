## SpecStory

## Implementing Nested Menus in Next.js Sidebar (2025/1/22 15:39:00)

_**User**_

当前项目是一个 nextjs shadcn ui的项目，使用了shadcn ui的sidebar，我想在二级折叠菜单下再创建一级菜单，如图，比如在History 下创建一级 yesterday 菜单来显示一个页面 ，怎么做呢,帮我实现这个功能并修复文件中的错误

---

_**Assistant**_

我来帮您实现多级菜单的功能。从您的需求来看，我们需要在 `SidebarMenuSub` 组件中添加对多级菜单的支持。

以下是修改建议：

```typescript:src/components/ui/sidebar.tsx
// ... 现有代码保持不变 ...

// 修改 SidebarMenuSub 组件
const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'> & {
    level?: number // 添加 level 属性来控制缩进
  }
>(({ className, level = 1, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    data-level={level}
    className={cn(
      'flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border py-0.5',
      level === 1 ? 'mx-3.5 px-2.5' : 'mx-2.5 px-2', // 根据层级调整边距
      'group-data-[collapsible=icon]:hidden',
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = 'SidebarMenuSub'

// 修改 SidebarMenuSubButton 组件
const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & {
    asChild?: boolean
    size?: 'sm' | 'md'
    isActive?: boolean
    level?: number // 添加 level 属性
  }
>(({ asChild = false, size = 'md', isActive, level = 1, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-level={level}
      data-active={isActive}
      className={cn(
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        level > 1 && 'pl-4', // 更深层级的菜单项增加左内边距
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton'

// ... 其他代码保持不变 ...
```

现在您可以这样使用多级菜单：

```tsx:src/components/app-sidebar.tsx
import { Link } from 'next/link'
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar'

export function AppSidebar() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          History
        </SidebarMenuButton>
        <SidebarMenuSub>
          {/* 第一级子菜单 */}
          <SidebarMenuItem>
            <SidebarMenuSubButton asChild>
              <Link href="/history/today">Today</Link>
            </SidebarMenuSubButton>
          </SidebarMenuItem>
<<<<<<< Updated upstream

=======

>>>>>>> Stashed changes
          {/* 带有二级子菜单的项目 */}
          <SidebarMenuItem>
            <SidebarMenuSubButton>
              Yesterday
            </SidebarMenuSubButton>
            <SidebarMenuSub level={2}>
              {/* 第二级子菜单 */}
              <SidebarMenuItem>
                <SidebarMenuSubButton level={2} asChild>
                  <Link href="/history/yesterday/morning">Morning</Link>
                </SidebarMenuSubButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuSubButton level={2} asChild>
                  <Link href="/history/yesterday/afternoon">Afternoon</Link>
                </SidebarMenuSubButton>
              </SidebarMenuItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenuSub>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
```

主要改动说明：

1. 为 `SidebarMenuSub` 添加了 `level` 属性，用于控制不同层级的缩进和样式
2. 为 `SidebarMenuSubButton` 添加了 `level` 属性，用于控制按钮的样式
3. 根据层级调整了边距和内边距，使得多级菜单的视觉层次更清晰
4. 使用 `data-level` 属性来标记不同层级的菜单项

使用这个改进后的组件，您可以：
<<<<<<< Updated upstream

=======

> > > > > > > Stashed changes

- 创建任意层级的子菜单
- 每个层级都有适当的缩进
- 保持了原有的悬停、激活等状态样式
- 完全兼容原有的折叠功能

要使用这个功能，只需要按照示例代码嵌套 `SidebarMenuSub` 和 `SidebarMenuSubButton` 组件，并指定适当的 `level` 属性即可。每个菜单项都可以通过 `Link` 组件链接到对应的页面。

---

_**User**_

For the code present, we get this error:
<<<<<<< Updated upstream

```
模块 ""next/link"" 没有导出的成员 "Link"。你是想改用 "import Link from "next/link"" 吗?
```

=======

```
模块 ""next/link"" 没有导出的成员 "Link"。你是想改用 "import Link from "next/link"" 吗?
```

> > > > > > > Stashed changes
> > > > > > > How can I resolve this? If you propose a fix, please make it concise.

---

_**Assistant**_

修改 Link 的导入语句：

```typescript:src/components/app-sidebar.tsx
// ... 现有代码保持不变 ...
- import { Link } from 'next/link'
+ import Link from 'next/link'
// ... 现有代码保持不变 ...
```

这是因为 next/link 是默认导出(default export)，而不是命名导出(named export)。

---

_**User**_

<<<<<<< Updated upstream
History 下面没有出现 三级菜单呢
=======
History 下面没有出现 三级菜单呢

> > > > > > > Stashed changes

---

_**Assistant**_

我来帮您在 Yesterday 下面的 Morning 菜单下添加三级菜单。我们只需要继续嵌套 `SidebarMenuSub` 组件即可：

```typescript:src/components/app-sidebar.tsx
// ... 现有代码保持不变 ...

<SidebarMenuItem>
  <SidebarMenuSubButton>
    Yesterday
  </SidebarMenuSubButton>
  <SidebarMenuSub level={2}>
    {/* 第二级子菜单 */}
    <SidebarMenuItem>
      <SidebarMenuSubButton level={2}>
        Morning
      </SidebarMenuSubButton>
      {/* 添加第三级子菜单 */}
      <SidebarMenuSub level={3}>
        <SidebarMenuItem>
          <SidebarMenuSubButton level={3} asChild>
            <Link href="/history/yesterday/morning/early">Early Morning</Link>
          </SidebarMenuSubButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuSubButton level={3} asChild>
            <Link href="/history/yesterday/morning/late">Late Morning</Link>
          </SidebarMenuSubButton>
        </SidebarMenuItem>
      </SidebarMenuSub>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuSubButton level={2} asChild>
        <Link href="/history/yesterday/afternoon">Afternoon</Link>
      </SidebarMenuSubButton>
    </SidebarMenuItem>
  </SidebarMenuSub>
</SidebarMenuItem>

// ... 现有代码保持不变 ...
```

这样就在 Morning 下面添加了 "Early Morning" 和 "Late Morning" 两个三级菜单项。每个层级都使用了相应的 `level` 属性来确保正确的缩进和样式。

如果您发现三级菜单的缩进不够明显，我们还可以修改 `sidebar.tsx` 中的样式来调整不同层级的缩进距离。需要调整吗？

---

_**User**_

还是没有出现三级菜单，为什么呢，仔细看下代码结构和代码呢

---

_**Assistant**_

让我们仔细检查一下代码。我注意到需要调整 `sidebar.tsx` 中的样式，因为当前的样式配置可能没有正确处理第三级菜单。

让我们修改 `sidebar.tsx` 中的相关组件：

```typescript:src/components/ui/sidebar.tsx
// ... 现有代码保持不变 ...

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'> & {
    level?: number
  }
>(({ className, level = 1, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    data-level={level}
    className={cn(
      'flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border py-0.5',
      // 根据不同层级设置不同的边距
<<<<<<< Updated upstream
      level === 1 ? 'mx-3.5 px-2.5' :
      level === 2 ? 'mx-2.5 px-2' :
=======
      level === 1 ? 'mx-3.5 px-2.5' :
      level === 2 ? 'mx-2.5 px-2' :
>>>>>>> Stashed changes
      'mx-2 px-1.5',  // 第三级及更深层级的样式
      'group-data-[collapsible=icon]:hidden',
      className
    )}
    {...props}
  />
))

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & {
    asChild?: boolean
    size?: 'sm' | 'md'
    isActive?: boolean
    level?: number
  }
>(({ asChild = false, size = 'md', isActive, level = 1, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-level={level}
      data-active={isActive}
      className={cn(
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        // 根据层级增加缩进
        level === 2 && 'pl-4',
        level === 3 && 'pl-6',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  )
})
```

主要修改了两个地方：

1. `SidebarMenuSub` 组件中增加了对第三级菜单的样式支持
2. `SidebarMenuSubButton` 组件中增加了第三级菜单的缩进样式

这些修改应该能让三级菜单正确显示出来，并且有适当的缩进层级。如果还是没有显示，请检查：

1. 菜单是否能正常展开（点击 Yesterday 和 Morning 后是否有响应）
2. 控制台是否有任何错误信息
3. 使用浏览器开发者工具检查 HTML 结构是否正确嵌套

您能告诉我现在的具体表现是什么样的吗？是完全看不到三级菜单，还是看到了但样式不对？

---

_**User**_

<<<<<<< Updated upstream
我给你截图看一下
=======
我给你截图看一下

> > > > > > > Stashed changes

---

_**Assistant**_

从截图中我看到，History 菜单似乎没有展开的功能。这是因为我们需要添加展开/折叠的状态控制。让我们修改代码：

```typescript:src/components/app-sidebar.tsx
// ... 其他导入保持不变 ...

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // ... 其他状态保持不变 ...
  const [historyOpen, setHistoryOpen] = React.useState(false)
  const [yesterdayOpen, setYesterdayOpen] = React.useState(false)
  const [morningOpen, setMorningOpen] = React.useState(false)

  return (
    <Sidebar collapsible="offcanvas" {...props} variant="floating" side="left">
      {/* ... 其他内容保持不变 ... */}
      <SidebarContent>
        <NavMain items={navMainConfig} />
        <NavProjects projects={projectsConfig} />
        <NavSecondary items={navSecondaryWithTheme} className="mt-auto" />
        <SidebarMenu>
          <SidebarMenuItem>
<<<<<<< Updated upstream
            <SidebarMenuButton
=======
            <SidebarMenuButton
>>>>>>> Stashed changes
              onClick={() => setHistoryOpen(!historyOpen)}
            >
              History
            </SidebarMenuButton>
            {historyOpen && (
              <SidebarMenuSub>
                <SidebarMenuItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/history/today">Today</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuItem>
<<<<<<< Updated upstream

                <SidebarMenuItem>
                  <SidebarMenuSubButton
=======

                <SidebarMenuItem>
                  <SidebarMenuSubButton
>>>>>>> Stashed changes
                    onClick={() => setYesterdayOpen(!yesterdayOpen)}
                  >
                    Yesterday
                  </SidebarMenuSubButton>
                  {yesterdayOpen && (
                    <SidebarMenuSub level={2}>
                      <SidebarMenuItem>
<<<<<<< Updated upstream
                        <SidebarMenuSubButton
=======
                        <SidebarMenuSubButton
>>>>>>> Stashed changes
                          level={2}
                          onClick={() => setMorningOpen(!morningOpen)}
                        >
                          Morning
                        </SidebarMenuSubButton>
                        {morningOpen && (
                          <SidebarMenuSub level={3}>
                            <SidebarMenuItem>
                              <SidebarMenuSubButton level={3} asChild>
                                <Link href="/history/yesterday/morning/early">Early Morning</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuSubButton level={3} asChild>
                                <Link href="/history/yesterday/morning/late">Late Morning</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuItem>
                          </SidebarMenuSub>
                        )}
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuSubButton level={2} asChild>
                          <Link href="/history/yesterday/afternoon">Afternoon</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuItem>
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      {/* ... 其他内容保持不变 ... */}
    </Sidebar>
  )
}
```

主要改动：

1. 添加了三个状态来控制各级菜单的展开/折叠：
   <<<<<<< Updated upstream

=======

> > > > > > > Stashed changes

- `historyOpen` 控制 History 菜单
- `yesterdayOpen` 控制 Yesterday 子菜单
- `morningOpen` 控制 Morning 子菜单

2. 使用条件渲染（`&&` 操作符）来控制子菜单的显示/隐藏

3. 为每个可展开的菜单项添加了 `onClick` 处理函数来切换状态

这样修改后，点击 History 会展开第一级菜单，点击 Yesterday 会展开第二级菜单，点击 Morning 会展开第三级菜单。每个层级都可以独立控制展开/折叠状态。

---

_**User**_

还是没有 会不会这个shadcnui 的 sidebar 本身就不支持三级菜单

---

_**Assistant**_

从代码结构来看，shadcn ui 的 sidebar 组件本身并没有限制多级菜单的嵌套层级。让我们检查一下可能的问题：

1. 首先，让我们检查 `SidebarMenuSubButton` 组件是否正确处理了 `onClick` 事件。当它与 `asChild` 和 `Link` 一起使用时，可能会有事件冲突。

让我们修改一下代码结构：

```typescript:src/components/app-sidebar.tsx
<SidebarMenuItem>
  <SidebarMenuButton onClick={() => setHistoryOpen(!historyOpen)}>
    History
  </SidebarMenuButton>
  {historyOpen && (
    <SidebarMenuSub>
      {/* Today 菜单项 */}
      <SidebarMenuItem>
        <SidebarMenuSubButton asChild>
          <Link href="/history/today">Today</Link>
        </SidebarMenuSubButton>
      </SidebarMenuItem>
<<<<<<< Updated upstream

      {/* Yesterday 菜单项及其子菜单 */}
      <SidebarMenuItem>
        {/* 这里不使用 asChild，因为需要处理点击事件 */}
        <SidebarMenuSubButton
=======

      {/* Yesterday 菜单项及其子菜单 */}
      <SidebarMenuItem>
        {/* 这里不使用 asChild，因为需要处理点击事件 */}
        <SidebarMenuSubButton
>>>>>>> Stashed changes
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setYesterdayOpen(!yesterdayOpen);
          }}
        >
          Yesterday
        </SidebarMenuSubButton>
        {yesterdayOpen && (
          <SidebarMenuSub level={2}>
            <SidebarMenuItem>
<<<<<<< Updated upstream
              <SidebarMenuSubButton
=======
              <SidebarMenuSubButton
>>>>>>> Stashed changes
                level={2}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMorningOpen(!morningOpen);
                }}
              >
                Morning
              </SidebarMenuSubButton>
              {morningOpen && (
                <SidebarMenuSub level={3}>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton level={3} asChild>
                      <Link href="/history/yesterday/morning/early">Early Morning</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton level={3} asChild>
                      <Link href="/history/yesterday/morning/late">Late Morning</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuSubButton level={2} asChild>
                <Link href="/history/yesterday/afternoon">Afternoon</Link>
              </SidebarMenuSubButton>
            </SidebarMenuItem>
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    </SidebarMenuSub>
  )}
</SidebarMenuItem>
```

主要改动：

1. 为点击事件处理函数添加了 `e.preventDefault()` 和 `e.stopPropagation()`，防止事件冒泡
2. 对于需要展开/折叠的菜单项，不使用 `asChild` 和 `Link`
3. 只在最终的叶子节点（没有子菜单的项目）使用 `asChild` 和 `Link`

如果这样修改后还是不能展开，我们可能需要检查：

1. 是否需要修改 `sidebar.tsx` 中的样式，确保子菜单的可见性
2. 是否需要添加展开/折叠的视觉指示器（比如箭头图标）
3. 是否需要添加动画效果

您觉得要试试哪个方向？

---

_**User**_

修改 sidebar.tsx 中的样式，确保子菜单的可见性

---

_**Assistant**_

## <<<<<<< Updated upstream

---

=======
让我们修改 `sidebar.tsx` 中的样式，确保子菜单的可见性和正确的层级显示：

```typescript:src/components/ui/sidebar.tsx
// ... 其他代码保持不变 ...

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'> & {
    level?: number
  }
>(({ className, level = 1, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    data-level={level}
    className={cn(
      'flex min-w-0 flex-col gap-1 py-1',  // 移除 translate-x-px
      level === 1 && 'ml-4 border-l border-sidebar-border pl-2',
      level === 2 && 'ml-3 border-l border-sidebar-border pl-2',
      level === 3 && 'ml-2 border-l border-sidebar-border pl-2',
      'group-data-[collapsible=icon]:hidden',
      className
    )}
    {...props}
  />
))

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & {
    asChild?: boolean
    size?: 'sm' | 'md'
    isActive?: boolean
    level?: number
  }
>(({ asChild = false, size = 'md', isActive, level = 1, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-level={level}
      data-active={isActive}
      className={cn(
        'flex h-8 min-w-0 items-center gap-2 rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        '[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        level === 1 && 'font-medium',
        level === 2 && 'text-sm',
        level === 3 && 'text-sm text-muted-foreground',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  )
})

// ... 其他代码保持不变 ...

// 添加一个新的组件用于显示展开/折叠指示器
const SidebarMenuIcon = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<'span'> & {
    open?: boolean
  }
>(({ open, className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'ml-auto transform transition-transform duration-200',
      open && 'rotate-90',
      className
    )}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </span>
))
SidebarMenuIcon.displayName = 'SidebarMenuIcon'

// 导出新组件
export {
  // ... 其他导出保持不变 ...
  SidebarMenuIcon,
}
```

然后在 `app-sidebar.tsx` 中使用展开/折叠指示器：

```typescript:src/components/app-sidebar.tsx
// 在顶部导入 ChevronRight
import { Sun, MoonStar, ChevronRight } from 'lucide-react'

// ... 其他代码保持不变 ...

<SidebarMenuButton onClick={() => setHistoryOpen(!historyOpen)}>
  History
  <ChevronRight className={cn(
    "ml-auto h-4 w-4 transition-transform duration-200",
    historyOpen && "rotate-90"
  )} />
</SidebarMenuButton>

// ... 在 Yesterday 按钮中
<SidebarMenuSubButton
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setYesterdayOpen(!yesterdayOpen);
  }}
>
  Yesterday
  <ChevronRight className={cn(
    "ml-auto h-4 w-4 transition-transform duration-200",
    yesterdayOpen && "rotate-90"
  )} />
</SidebarMenuSubButton>

// ... 在 Morning 按钮中
<SidebarMenuSubButton
  level={2}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setMorningOpen(!morningOpen);
  }}
>
  Morning
  <ChevronRight className={cn(
    "ml-auto h-4 w-4 transition-transform duration-200",
    morningOpen && "rotate-90"
  )} />
</SidebarMenuSubButton>
```

主要改动：

1. 调整了子菜单的缩进和边框样式
2. 为不同层级的菜单项添加了不同的字体大小和颜色
3. 添加了展开/折叠指示器
4. 优化了菜单项的高度和间距
5. 添加了过渡动画效果

这些修改应该能让多级菜单更加清晰和易用。每个层级都有明显的视觉区分，并且有展开/折叠的指示器。

---

---

> > > > > > > Stashed changes
