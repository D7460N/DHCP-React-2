import { Routes, Route } from 'react-router-dom';
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Topbar } from "../components/Topbar/Topbar";
import { ScopeForm } from '../pages/Scopes/ScopeForm';
import OptionTypeContent from '../pages/OptionTypes/OptionTypeContent';
import ServerContent from '../pages/Servers/ServerContent';
import AuditContent from '../pages/Audit';
import ScopeTypesContent from '../pages/ScopeTypes';
import OptionSetsContent from '../pages/OptionSets';
import ServerTypesContent from '../pages/ServerTypes';
import ScopeContent from '../pages/Scopes';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/scopetypes" element={<ScopeTypesContent/>}/>
            <Route path="/optionsets" element={<OptionSetsContent/>}/>
            <Route path="/optiontypes" element={<OptionTypeContent/>}/>
            <Route path="/servertypes" element={<ServerTypesContent/>}/>
            <Route path="/servers" element={<ServerContent/>}/>
            <Route path="/scopes" element={<ScopeContent/>}/>
            <Route path="/audit" element={<AuditContent/>}/>
            <Route path="*" element={<ScopeContent/>}/>
          </Routes>
        </main>
      </div>
    </div>
  );
}
