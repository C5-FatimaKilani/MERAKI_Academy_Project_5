import React, { useEffect, useState } from "react";
import { setMeals } from "../../redux/reducers/meals";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealPage = () => {
  const [comment, setComment] = useState("")
  const { id } = useParams();
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => {
    return {
      meals: state.meals.meals,
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/meals/id/${id}`)
      .then((result) => {
        dispatch(setMeals(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {meals.length ?
        meals.map((element) => {
        return(<div>
        <img src={element.image}/>
        <h1>{element.meal_name}</h1>
        <div >
              <textarea
                placeholder="comment..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  // dispatch(addNewComment(meal._id));
                }}
              >
                Add comment
              </button>
              </div>
        </div>);
        }):""
        }
        {console.log(meals)}
    </div>
  );
};






export default MealPage

