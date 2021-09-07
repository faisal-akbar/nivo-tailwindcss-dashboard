import './App.css';
import APIContextProvider from './components/Context/apiContext';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
    return (
        <APIContextProvider>
            <div className="w-full">
                <Header />
                <Dashboard />
            </div>
        </APIContextProvider>
    );
}

export default App;
