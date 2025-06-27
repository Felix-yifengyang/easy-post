import { useState } from "react";

export default function App() {
  return (
    <>
      <h1>Welcome to my app</h1>
      <MyButton />
      <MyButton />
    </>
  )
}

function MyButton() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <button onClick={handleClick}>
      I'm a button:{count}
    </button>
  );
}