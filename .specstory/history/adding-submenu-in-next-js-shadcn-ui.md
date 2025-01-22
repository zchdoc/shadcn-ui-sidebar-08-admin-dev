## SpecStory

## Adding Submenu in Next.js Shadcn UI (2025/1/22 13:57:07)

_**User**_

当前项目是一个 nextjs shadcn ui的项目，使用了shadcn ui的sidebar，我想在二级折叠菜单下再创建一级菜单，如图，比如在History 下创建一级 yesterday 菜单来显示一个页面 ，怎么做呢

---

_**Assistant**_

我来帮您在History下添加子菜单。需要修改几个文件来实现这个功能。

首先修改导航配置文件:

```typescript:src/config/navigation.ts
// ... existing code ...
export type SidebarNavItem = {
  title: string;
  href?: string;
  icon?: any;
  items?: SidebarNavItem[];
  disabled?: boolean;
}

export const sidebarNav: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Playground",
    icon: PlayCircle,
    items: [
      {
        title: "Browser",
        href: "/playground/browser",
      },
      {
        title: "History",
        href: "/playground/history",
        items: [  // 添加History的子菜单
          {
            title: "Yesterday",
            href: "/playground/history/yesterday",
          }
        ]
      },
      // ... existing code ...
    ]
  },
  // ... existing code ...
]
```

然后需要修改sidebar组件来支持三级菜单的渲染:

```typescript:src/components/app-sidebar.tsx
// ... existing code ...

const SidebarNavItem = ({ item }: { item: SidebarNavItem }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 检查是否有子菜单
  const hasSubNav = item.items && item.items.length > 0;

  // 检查当前路径是否匹配
  const isActive = pathname === item.href;

  if (hasSubNav) {
    return (
      <AccordionItem value={item.title}>
        <AccordionTrigger className="px-2">
          <span className="flex items-center gap-2">
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.title}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-1 pl-6">
            {item.items.map((subItem, index) => (
              <div key={index}>
                {subItem.items ? (
                  // 渲染三级菜单
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {subItem.title}
                    </Button>
                    {isOpen && (
                      <div className="pl-4 flex flex-col space-y-1">
                        {subItem.items.map((thirdItem, idx) => (
                          <Link
                            key={idx}
                            href={thirdItem.href || '#'}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm",
                              pathname === thirdItem.href
                                ? "bg-muted font-medium text-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {thirdItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // 渲染二级菜单项
                  <Link
                    href={subItem.href || '#'}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm",
                      pathname === subItem.href
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {subItem.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  // ... existing code for non-submenu items ...
}

// ... rest of the existing code ...
```

最后，您需要创建对应的页面文件:

```typescript:src/app/playground/history/yesterday/page.tsx
export default function HistoryYesterdayPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Yesterday's History</h1>
      {/* 添加您的页面内容 */}
    </div>
  )
}
```

这些修改将会：

1. 在导航配置中添加三级菜单结构
2. 更新sidebar组件以支持三级菜单的渲染
3. 创建新的页面组件

完成这些修改后，您就可以在History下看到Yesterday这个子菜单了，点击后会跳转到对应的页面。记得根据您的具体需求调整样式和交互效果。

---

_**User**_

For the code present, we get this error:

```
Unexpected any. Specify a different type.
```

How can I resolve this? If you propose a fix, please make it concise.

---

_**Assistant**_

让我们修复 `SidebarNavItem` 类型中的 `any` 问题。我们可以使用 `LucideIcon` 类型来替代 `any`。

```typescript:src/config/navigation.ts
import { LucideIcon } from 'lucide-react'

export type SidebarNavItem = {
  title: string;
  href?: string;
  icon?: LucideIcon;  // 替换 any 为 LucideIcon
  items?: SidebarNavItem[];
  disabled?: boolean;
}
```

这样可以为图标属性提供正确的类型定义，避免使用 `any`。`LucideIcon` 是 lucide-react 库提供的图标组件类型。

---

_**User**_

For the code present, we get this error:

```
对象字面量只能指定已知属性，并且“url”不在类型“SidebarNavItem”中。
```

How can I resolve this? If you propose a fix, please make it concise.

---

_**Assistant**_

我们需要在 `SidebarNavItem` 类型中添加 `url` 和 `isActive` 属性：

```typescript:src/config/navigation.ts
export type SidebarNavItem = {
  title: string;
  href?: string;
  url?: string;  // 添加 url 属性
  icon?: LucideIcon;
  items?: SidebarNavItem[];
  disabled?: boolean;
  isActive?: boolean;  // 添加 isActive 属性
}
```

这样就可以解决类型错误，因为现在类型定义包含了代码中使用的所有属性。

---

_**User**_

For the code present, we get this error:

```
`'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.
```

How can I resolve this? If you propose a fix, please make it concise.

---

_**Assistant**_

在 `yesterday/page.tsx` 中，我们需要将单引号改为双引号：

```typescript:src/app/playground/history/yesterday/page.tsx
export default function HistoryYesterdayPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Yesterday&apos;s History</h1>
      {/* 添加您的页面内容 */}
    </div>
  )
}
```

这里使用 `&apos;` 来转义单引号，这是 React/Next.js 中处理撇号的推荐方式。

---

_**User**_

For the code present, we get this error:

```
找不到模块“react-router-dom”或其相应的类型声明。
```

How can I resolve this? If you propose a fix, please make it concise.

---

_**Assistant**_

由于这是 Next.js 项目，我们应该使用 `next/link` 而不是 `react-router-dom`：

```typescript:src/components/app-sidebar.tsx
- import { Link } from 'react-router-dom'
+ import Link from 'next/link'
```

这样可以解决模块找不到的问题，同时也是 Next.js 项目中正确的路由链接使用方式。

---

_**User**_

For the code present, we get this error:

```
找不到模块“@/hooks/use-pathname”或其相应的类型声明。
```

How can I resolve this? If you propose a fix, please make it concise.

---

_**Assistant**_

在 Next.js 中，我们应该使用 `next/navigation` 中的 `usePathname`：

```typescript:src/components/app-sidebar.tsx
- import { usePathname } from '@/hooks/use-pathname'
+ import { usePathname } from 'next/navigation'
```

这是 Next.js 提供的官方路由钩子，用于获取当前路径。

---

_**User**_

For the code present, we get this error:

```
找不到模块“@/components/ui/accordion”或其相应的类型声明。
```

How can I resolve this? If you propose a fix, please make it concise.

---

_**Assistant**_

---

---
