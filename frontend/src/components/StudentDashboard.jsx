import React from 'react';
import StudentTopBar from './StudentTopBar';
import GreetingPanel from './GreetingPanel';
import StudentStatCards from './StudentStatCards';
import LearningTimeChart from './LearningTimeChart';
import ActivityCalendar from './ActivityCalendar';
import MyCoursesSection from './MyCoursesSection';

const StudentDashboard = () => {
  return (
    <div className="space-y-4">
      <StudentTopBar />
      <GreetingPanel />
      <StudentStatCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LearningTimeChart />
        <ActivityCalendar />
      </div>
      <MyCoursesSection />
    </div>
  );
};

export default StudentDashboard;