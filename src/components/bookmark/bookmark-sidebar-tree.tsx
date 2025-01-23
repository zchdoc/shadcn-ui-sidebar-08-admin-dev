import { ChevronRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface BookmarkGroup {
  title: string
  children?: Record<string, BookmarkGroup>
  links: Array<{ title: string; url: string }>
}

interface BookmarkSidebarTreeProps {
  bookmarkData: Record<string, BookmarkGroup>
  selectedGroups: string[]
  onGroupChange: (value: string[]) => void
}

interface TreeNodeProps {
  name: string
  group: BookmarkGroup
  path: string[]
  selectedGroups: string[]
  onSelect: (path: string[]) => void
}

const TreeNode = ({
  name,
  group,
  path,
  selectedGroups,
  onSelect,
}: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(selectedGroups.includes(name))
  const isSelected = selectedGroups.join('/') === path.join('/')

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const handleSelect = () => {
    onSelect(path)
  }

  return (
    <div>
      <div
        className={cn(
          'flex items-center py-1 px-2 cursor-pointer hover:bg-accent rounded-md',
          isSelected && 'bg-accent'
        )}
        onClick={handleSelect}
      >
        {group.children && Object.keys(group.children).length > 0 ? (
          <button
            onClick={handleToggle}
            className="p-1 hover:bg-accent rounded-md mr-1"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <div className="w-6" />
        )}
        <span>{group.title}</span>
      </div>
      {isExpanded && group.children && (
        <div className="ml-4">
          {Object.entries(group.children).map(([childName, childGroup]) => (
            <TreeNode
              key={childName}
              name={childName}
              group={childGroup}
              path={[...path, childName]}
              selectedGroups={selectedGroups}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function BookmarkSidebarTree({
  bookmarkData,
  selectedGroups,
  onGroupChange,
}: BookmarkSidebarTreeProps) {
  return (
    <div className="space-y-1 h-[calc(100vh-13rem)] overflow-y-auto">
      {Object.entries(bookmarkData).map(([name, group]) => (
        <TreeNode
          key={name}
          name={name}
          group={group}
          path={[name]}
          selectedGroups={selectedGroups}
          onSelect={onGroupChange}
        />
      ))}
    </div>
  )
}
