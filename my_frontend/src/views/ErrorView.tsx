import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorView() {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Call effect function" + counter);
    const interval_id = setInterval(() => {
      console.log(counter);
      if (counter == 0) {
        navigate("/");
      } else {
        setCounter((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval_id);
    };
  }, [counter]);

  return (
    <div>
      <h1>Ой, что-то пошло не так!</h1>
      <h3>Возврат на главную страницу через {counter} секунд</h3>
    </div>
  );
}