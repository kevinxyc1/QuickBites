import gatherData from "./firebase"
import React, { useState, Fragment, useEffect } from 'react';
import { databaseRef } from "./firebase";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import test from "./images/icewine.jpg"

import './Customers.css'

function ReturnImage(props){
  if(props.name === "Ice Wine"){
    return(
      <img class="card-img-top" src="https://www.lcbo.com/content/dam/lcbo/products/018564.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg" alt="Card image cap" style={{width:"260px", height: "400px"}}/>
    )
  } else if (props.name === "Cabbage") {
    return(
      <img class="card-img-top" src="https://i5.walmartimages.ca/images/Enlarge/272/109/6000191272109.jpg" alt="Card image cap" style={{width:"270px", height: "400px"}}/>
    )
  } else if (props.name === "Lettuce") {
    return(
      <img class="card-img-top" src="https://cdn2.stylecraze.com/wp-content/uploads/2013/07/16-Best-Benefits-Of-Lettuce-For-Skin-Hair-And-Health.jpg" alt="Card image cap"  style={{width:"260px", height: "400px"}}/>
    )
  } else if (props.name === "Ramen Noodles") {
    return(
      <img class="card-img-top" src="https://media.istockphoto.com/photos/asian-ramen-instant-noodles-isolated-on-white-background-picture-id175853937" alt="Card image cap" style={{width:"260px", height: "400px"}}/>
    )
  } 
}

function DataCard(props) {
  return (
    <div class="col-md-2">
    <div class="card text-center">
      
      <ReturnImage name={props.item}/>
      <div class="card-body">
        <h3 class="card-title">{props.item}</h3>
        <h5 class="card-text">{props.name}</h5>
        <h7 class="card-text">Previous Price: {props.old}</h7>
        <br></br>
        <h5 class="card-text"><b>Discounted Price:</b> {props.new}</h5>
      </div> 
    </div>
    </div>
  )
}


function Customers(props) {
  const [data, setData] = useState([]);
  const [showFood, setShowFood] = useState(false);

  function testFunction() {
    databaseRef.collection('food_items').get({ source: "server" })
      .then(value => value.docs)
      .then((docs) => {
        return docs.map(doc => doc.id);
      })
      .then((docIds) => {
        var docPromises = docIds.map((docId) => {
          var docRef = databaseRef.collection('food_items').doc(docId);
          return docRef.get({ source: 'server' });
        });
        return Promise.all(docPromises);
      })
      .then((docObjs) => {
        return docObjs.map(doc => doc.data())
      }).then((listings => {
        setTimeout(() => { setShowFood(true) }, 0.000000000000000000000000000000001);
        for (const item of listings) {
          for (const food of item.Items) {
            data.push({
              Name: item.Name,
              Address: item.Address,
              Item: food,
              OldPrice: item.Old_Prices[item.Items.indexOf(food)],
              NewPrice: item.New_Prices[item.Items.indexOf(food)],
              Phone: item.Phone
            })
          }
        }
      })
      )
  }

  useEffect(() => {
    testFunction();

  }, [])


  function createCards() {
    return (data.map((food) => {
      return (
        <DataCard item={food.Item} name={food.Name} old={food.OldPrice} new={food.NewPrice} />
      )
    }))
  }

  return (
    <div class="entire">
    <Fragment>
      <h1 class="text-center">Our Current Items For Sale </h1>
      <br></br>
      <h3 class="text-center">Please reach out and support these businesses by purchasing their products!</h3>
      <hr></hr>
      {!data.length ? (
        <h1 class="text-center">Loading...</h1>
      ) : (
          createCards()
        )}
    </Fragment>
    </div>
  )
}

export default Customers;