import userEvent from '@testing-library/user-event';
import { Home, User, Folder, Calendar, FileText, ChartBar, Cog, ClipboardList, Cloudy, BriefCaseMedical } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

type Activity = {
  user: string;
  time: string;
  action: string;
  comment?: string;
};

const activityFeeds: Record<string, Activity[]> = {
  "Activity": [
    { user: 'John Smith', time: '2 hours ago', action: 'created a new policy' },
    { user: 'John Smith', time: '3 hours ago', action: 'updated the policy' },
  ]
}
