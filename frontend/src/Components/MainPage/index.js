
import "./style.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changePage } from "../../redux/reducers/page/pageReducer";

const MainPage=()=>{
  const dispatch = useDispatch();

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
    .catch((err) => {throw err});
}, []);

return(
    <div className="mainpage">

{meals.length &&
              meals.map((meal, index) => {
              return (
               
                 
                  <Link
                      to={`/meals/${meal.id}`}
                      onClick={() => {
                        dispatch(changePage(1));
                      }}
                    >
                      <img
                        src={meal.image}
                        alt=""
                        key={meal.id}
                        width={"150px"}
                      />
                    </Link>
               )
                    
                  })
       }                             
  </div>  

) 
}       

export default MainPage