import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navigation/Navbar';
import { Sidebar } from './components/Navigation/Sidebar';
import { AuthScreen } from './components/Auth/AuthScreen';
import { ProjectHub } from './components/ProjectHub/ProjectHub';
import { ProjectPhaseTimeline } from './components/Phases/ProjectPhaseTimeline';
import { ProjectSpace } from './components/ProjectSpace/ProjectSpace';
import { PersonalDashboard } from './components/Dashboard/PersonalDashboard';
import { ScrumBoard } from './components/Board/ScrumBoard';
import { BacklogView } from './components/Backlog/BacklogView';
import { TimelineView } from './components/Timeline/TimelineView';
import { AgileReports } from './components/Reports/AgileReports';
import { OrganizationSettings } from './components/Admin/OrganizationSettings';
import { OnboardingWizard } from './components/Onboarding/OnboardingWizard';
import { WorkItemDetailModal } from './components/WorkItem/WorkItemDetailModal';

const AppContent: React.FC = () => {
  const { activeView, onboarding, setCurrentProject } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'project_hub' | 'workspace'>('project_hub');

  // Screen 1: Auth Guard
  if (!isAuthenticated) {
    return <AuthScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Screen 2: Project Launcher Hub & Methodology Selector
  if (currentScreen === 'project_hub') {
    return (
      <div className="min-h-screen bg-vertex-lightBg dark:bg-vertex-darkBg text-vertex-ink dark:text-vertex-polarWhite">
        <Navbar 
          onOpenProjectHub={() => setCurrentScreen('project_hub')}
          onLogout={() => setIsAuthenticated(false)}
        />
        <ProjectHub
          onSelectProject={(selectedProject) => {
            setCurrentProject(selectedProject);
            setCurrentScreen('workspace');
          }}
        />
      </div>
    );
  }

  // Screen 3: Full Enterprise Project Workspace
  const renderMainView = () => {
    switch (activeView) {
      case 'dashboard':
      case 'mywork':
        return <PersonalDashboard />;
      case 'board':
      case 'backlog':
      case 'timeline':
      case 'reports':
      case 'teams':
      case 'admin':
      default:
        return <ProjectSpace />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-vertex-lightBg dark:bg-vertex-darkBg text-vertex-ink dark:text-vertex-polarWhite transition-colors">
      <Navbar 
        onOpenProjectHub={() => setCurrentScreen('project_hub')}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Multi-Phase Lifecycle Timeline Header */}
      <ProjectPhaseTimeline />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-12">
          {renderMainView()}
        </main>
      </div>

      {/* Work Item Detail Modal */}
      <WorkItemDetailModal />

      {/* Onboarding Wizard Modal if active */}
      {!onboarding.isCompleted && <OnboardingWizard />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
