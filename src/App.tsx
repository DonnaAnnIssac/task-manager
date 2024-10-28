import { Provider } from "react-redux";
import TaskManager from "./components/TaskManager";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <TaskManager />
      </div>
    </Provider>
  );
}

export default App;
