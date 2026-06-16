import React from 'react'
import { TopBar } from './TopBar'
import { StatCards } from './StatCards'
import { ActivityGraph } from './ActivityGraph'
import { LmsCources } from './LmsCources'

const AdminDashboard = () => {
  return (
    <div className="space-y-4">
      <TopBar/>
      <StatCards/>
      <ActivityGraph/>
      <div className="col-span-12 px-4 grid gap-3 grid-cols-12">
        <LmsCources />
      </div>
    </div>
  )
}

export default AdminDashboard
