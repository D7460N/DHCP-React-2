import './App.css';
import './index.css';
import { Layout } from './layout/Layout';
import ScopeContent from './pages/Scopes';
import { ConfirmationProvider } from './components/Confirmation';

function App() {
  return (
    <ConfirmationProvider>
      <Layout >
        <ScopeContent />
      </Layout>
    </ConfirmationProvider>
  );
}

export default App;
