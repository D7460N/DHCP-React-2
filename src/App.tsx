import './App.css';
import './index.css';
import Layout from './layout/Layout';
import ServerContent from './pages/admin/Servers';
import ScopeContent from './pages/Scopes';
import OptionTypeContent from './pages/admin/OptionTypes';
import AuditContent from './pages/Audit';
import ScopeTypesContent from './pages/admin/ScopeTypes';
import OptionSetsContent from './pages/admin/OptionSets';
import ServerTypesContent from './pages/admin/ServerTypes';
import OptionSetContent from './pages/admin/OptionSets/index';
import { Route, Routes } from 'react-router-dom';
import SettingsContent from './pages/Settings/pages';
import ScopeDetails from './pages/Scopes/ScopeDetails';

export default function DhcpApp({ basePath = ""} : {basePath?: string}) {
  return (
    <Routes>
      <Route element={<Layout basePath={basePath} />}>
        <Route path="/admin/scopetypes" element={<ScopeTypesContent/>}>
        <Route path="/admin/optionsets" element={<OptionSetsContent/>}>
        <Route path="/admin/optiontypes" element={<OptionTypeContent/>}>
        <Route path="/admin/optionsets" element={<OptionSetContent/>}>
        <Route path="/admin/servertypes" element={<ServerTypesContent/>}>
        <Route path="/admin/servers" element={<ServerContent/>}>
        <Route path="/scopes" element={<ScopeContent/>}>
        <Route path="/scpoes/:id" element={<ScopeDetails/>}>
        <Route path="/audit" element={<AuditContent/>}>
        <Route path={'settings/application'} element={<SettingsContent />}>
        <Route path="*" element={<ScopeContent/>}>
        {/**<Route path="*" element{<div>Not Found</div>}/> */}
      </Route>
    </Routes>
  );
}
          
