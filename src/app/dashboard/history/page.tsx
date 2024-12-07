'use client'

import { Card } from '@/components/ui/card'
import { LineChart } from 'lucide-react'

export default function HistoryPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <Card className="p-4">
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Recent Activities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="p-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Activity {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a sample activity card showing historical data
                  </p>
                  <div className="h-32 bg-muted/20 rounded-md flex items-center justify-center">
                    Chart {i}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
