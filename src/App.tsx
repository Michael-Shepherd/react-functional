import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import Message from "./components/message/Message";
import { useState } from "react";
function App() {
  let items = ["Joburg", "Cape Town", "Durban", "Bloem"];
  const [alertVisible, setAlertVisible] = useState(false);

  const handleItemClicked = () => {
    setAlertVisible(!alertVisible);
  };

  return (
    <div>
      {alertVisible && <Alert onClose={handleItemClicked}>My Alert</Alert>}

      <Button onClicked={handleItemClicked} colour="success">
        Wololo
      </Button>
    </div>
  );
}

export default App;
