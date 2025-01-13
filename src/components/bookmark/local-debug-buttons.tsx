import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { isLocalEnvironment } from '@/lib/utils'

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
      <div className="flex-none px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCopyCmdLocalBookmarks}>
              复制命令行拷贝 Bookmarks
            </Button>
            {/* onLoadLocalBookmarksToServer */}
            <Button variant="outline" onClick={alert}>
              上传 Bookmarks 文件到服务端
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-none px-8 py-4">
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
    </div>
  )
}
