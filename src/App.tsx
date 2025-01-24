import './index.css';
// import { AddAgent } from './components/add-agent/AddAgent';
// import { Button } from './components/button/Button';
import { logger } from './hooks/error/logger';

function App() {
  return (
    <div className="bg-zinc-800 min-h-screen flex">
      <div className="flex flex-col space-y-4">
        <p className="text-4xl text-purple-400 mt-4">
          Audio Follow Video Agent
        </p>
      </div>
    </div>
  );
}

export default App;
