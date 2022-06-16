
import "./style.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const MainPage=()=>{
    const [meal, setMeal] = useState([]);
    const { meals, page } = useSelector(
        (state) => {
          return {
            meals: state.meals.meals,
            page: state.page.page,
          };
        }
      );

    useEffect(() => {
    axios
    .get("http://localhost:5000/meals")
    .then((result) => {
      setMeal(result.data.result);
    })
    .catch((err) => {});
}, [page]);

return(
    <div className="mainpage">

   
    </div>
)
}

export default MainPage