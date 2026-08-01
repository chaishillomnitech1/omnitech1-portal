import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SpiritualDashboard from './SpiritualDashboard'
import OperationalDashboard from './OperationalDashboard'
import App from './App.tsx'
import ArchiveLayout from './archive/ArchiveLayout'
import ArchiveLanding from './archive/ArchiveLanding'
import ArchiveViewer from './archive/ArchiveViewer'
import ArchiveTimeline from './archive/ArchiveTimeline'
import ArchiveChapters from './archive/ArchiveChapters'
import ArchiveRepos from './archive/ArchiveRepos'
import ConsciousnessMirror from './archive/ConsciousnessMirror'
import ArchiveExport from './archive/ArchiveExport'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SpiritualDashboard />} />
          <Route path="/command-center" element={<OperationalDashboard />} />
          <Route path="/legacy" element={<App />} />
          <Route path="/archive" element={<ArchiveLayout />}>
            <Route index element={<ArchiveLanding />} />
            <Route path="viewer" element={<ArchiveViewer />} />
            <Route path="timeline" element={<ArchiveTimeline />} />
            <Route path="chapters/:id" element={<ArchiveChapters />} />
            <Route path="repos" element={<ArchiveRepos />} />
            <Route path="gift" element={<ConsciousnessMirror />} />
            <Route path="export" element={<ArchiveExport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
