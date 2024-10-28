import { Provider } from "react-redux";
import TaskManager from "./components/TaskManager";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <TaskManager />
      </div>
    </Provider>
  );
}

export default App;
