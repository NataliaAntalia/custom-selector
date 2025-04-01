
import './App.css'
import {Select} from "./components/Select/Select";
import {useState} from "react";


 const App = () => {

  const values = [
    {title: "Moscow", value: 1},
    {title: "Minsk", value: 2},
    {title: "Kiev", value: 3}
  ]

  const [value, setValue] = useState(1)


  return (
      <div className="app">
        <Select value={value} onChange={setValue} items={values}/>
      </div>
  )
}

export default App;
