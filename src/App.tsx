import { Toaster } from 'react-hot-toast';
import LandingPage from './components/landing-page/landing-page';
import './index.css';

function App() {
  return (
    <div className="bg-zinc-900 min-h-screen flex">
      <LandingPage />
      <Toaster
        position="bottom-right"
        toastOptions={{
          error: {
            style: {
              background: '#52525b',
              color: 'white'
            }
          },
          success: {
            style: {
              background: '#52525b',
              color: 'white'
            }
          }
        }}
      />
    </div>
  );
}

export default App;
