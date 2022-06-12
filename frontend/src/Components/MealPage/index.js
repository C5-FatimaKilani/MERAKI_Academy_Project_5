import React, { useEffect, useState } from "react";
import { setMeals } from "../../redux/reducers/meals";
import { setComments,addNewComment } from "../../redux/reducers/comment";
import {addRating} from "../../redux/reducers/rating/rating"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealPage = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { meals, token,comments,allComments } = useSelector((state) => {
    return {
      token: state.auth.token,
      meals: state.meals.meals,
      comments:state.comments.comments,
      allComments:state.comments.allComments
    };
  });
  console.log(token);
  const getAllComments = async (id) => {
    await axios
      .get(
        `http://localhost:5000/comment/${id}`,
        
        
      )
      .then((result) => {
        console.log(result);
        dispatch(setComments( result.data.result));

      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addComment = async (id) => {
    await axios
      .post(
        `http://localhost:5000/comment/${id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch(addNewComment( {
          comment:result.data.result,
          id:result.data.result.insertId,
          commenter:result.data.commenter
        }));

      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/meals/id/${id}`)
      .then((result) => {
        dispatch(setMeals(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
      
     getAllComments(id)
      
  }, [allComments]);
  return (
    <div>
      {meals.length
        ? meals.map((element) => {
            return (
              <div>
                <img src={element.image} />
                <h1>{element.meal_name}</h1>

                <div>{/* for rating */}</div>

                <div>
                  <textarea
                    placeholder="إضافة تعليق..."
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                  />
                  <button onClick={() => {
                   
                    addComment(element.id)}}>
                  إضافة
                  </button>
                  
                </div>
              </div>
            );
          })
        : ""}
      {allComments.length?
                  allComments.map((element)=>{
                    return(
                      <p>{element.comment}</p>
                    )
                  })
                  :""}
    </div>
  );
};

export default MealPage;
