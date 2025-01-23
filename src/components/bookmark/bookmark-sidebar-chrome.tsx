import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useEffect } from 'react'

interface BookmarkGroup {
  title: string
  children?: Record<string, BookmarkGroup>
  links: Array<{ title: string; url: string }>
}

interface BookmarkSidebarProps {
  bookmarkData: Record<string, BookmarkGroup>
  selectedGroups: string[]
  onGroupChange: (value: string[]) => void
}

interface LevelData {
  data: Record<string, BookmarkGroup>
  selected: string
}

export function BookmarkSidebarChrome({
  bookmarkData,
  selectedGroups,
  onGroupChange,
}: BookmarkSidebarProps) {
  const [levels, setLevels] = useState<LevelData[]>([
    { data: bookmarkData, selected: selectedGroups[0] || '' },
  ])

  const handleGroupSelect = (value: string, level: number) => {
    const newSelectedGroups = [...selectedGroups.slice(0, level), value]
    onGroupChange(newSelectedGroups)

    const newLevels = [...levels.slice(0, level + 1)]
    newLevels[level] = { ...newLevels[level], selected: value }

    let currentGroup = bookmarkData[value]
    for (let i = 1; i < level + 1; i++) {
      if (!currentGroup) break
      if (currentGroup.children) {
        currentGroup = currentGroup.children[newSelectedGroups[i]]
      } else {
        break
      }
    }

    if (
      currentGroup?.children &&
      Object.keys(currentGroup.children).length > 0
    ) {
      newLevels.push({
        data: currentGroup.children,
        selected: '',
      })
    }

    setLevels(newLevels)
  }

  useEffect(() => {
    setLevels([{ data: bookmarkData, selected: selectedGroups[0] || '' }])
  }, [bookmarkData, selectedGroups])

  useEffect(() => {
    if (selectedGroups.length === 0) {
      setLevels([{ data: bookmarkData, selected: '' }])
      return
    }

    const newLevels: LevelData[] = [
      { data: bookmarkData, selected: selectedGroups[0] },
    ]
    let currentGroup = bookmarkData[selectedGroups[0]]

    for (let i = 1; i < selectedGroups.length; i++) {
      if (!currentGroup?.children) break

      newLevels.push({
        data: currentGroup.children,
        selected: selectedGroups[i],
      })
      if (currentGroup.children) {
        currentGroup = currentGroup.children[selectedGroups[i]]
      } else {
        break
      }
    }

    if (
      currentGroup?.children &&
      Object.keys(currentGroup.children).length > 0
    ) {
      newLevels.push({
        data: currentGroup.children,
        selected: '',
      })
    }

    setLevels(newLevels)
  }, [selectedGroups, bookmarkData])

  return (
    <div className="space-y-4 h-[calc(100vh-13rem)] overflow-y-auto">
      {levels.map((level, index) => (
        <Select
          key={index}
          value={level.selected}
          onValueChange={(value) => handleGroupSelect(value, index)}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={`Select ${index === 0 ? 'a group' : 'a sub-group'}`}
            />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(level.data).map(([key, group]) => (
              <SelectItem key={key} value={key}>
                {group.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}
