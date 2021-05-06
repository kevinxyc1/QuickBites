import React, { useState, Fragment } from 'react';
import { writeUserData } from "./firebase";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import './Restaurants.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


function MultiplePriceGoods(props) {
  const [alreadyItem, setAlready] = useState(false);


  const showAdded = () => {
    console.log(props.pricesList)
    console.log(props.oldPrices);
    return props.itemsList.map((item) => {
      return (
        <div>
          <div>Item Name: {item} </div>
          <div>Prev. Price: {props.oldPrices[props.itemsList.indexOf(item)]} </div>
          <div>Disc. Price: {props.pricesList[props.itemsList.indexOf(item)]} </div>
          <br></br>
        </div>
      )

    })
  }

  

  const addItem = () => {
    props.setItemsList([...props.itemsList, props.tempItem]);
    props.setPricesList([...props.pricesList, props.tempPrice]);
    props.setOldPrices([...props.oldPrices, props.tempOld]);
    console.log(props.itemsList);
    console.log(props.pricesList);
    props.setTempItem("New Price");
    props.setTempOld("Old Price")
    props.setTempPrice(0);
  }

  return (
    <Fragment>
      <Form.Group>
        <Form.Label>Item Name</Form.Label>
        <Form.Control type="Name" placeHolder={props.tempItem}
          onChange={(e) => props.setTempItem(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Prev. Price</Form.Label>
        <Form.Control type="Name" placeHolder={props.tempOld}
          onChange={(e) => props.setTempOld(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Disc. Price</Form.Label>
        <Form.Control type="Name" placeHolder={props.tempPrice}
          onChange={(e) => props.setTempPrice(e.target.value)} />
      </Form.Group>

      {!alreadyItem ? (
        <h5 style={{ textAlign: "center" }}>There are currently no items added.</h5>
      ) : (
          <div>
            
           {showAdded()}
            
          </div>
        )}

      <center>
        <Button variant="primary" type="submit" onClick={(event) => {
          event.preventDefault();
          setAlready(true)
          addItem()
        }}>
          Add Additional Item
        </Button>
      </center>
      <hr></hr>
    </Fragment>
  )
}

function Restaurants() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("")
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);
  const [oldPrices, setOldPrices] = useState([]);
  const [tempItem, setTempItem] = useState("Enter Item Here");
  const [tempPrice, setTempPrice] = useState("New Price");
  const [tempOld, setTempOld] = useState("Old Price");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    event.preventDefault()
    console.log("entered function");
    if (tempPrice != 0) {
      console.log("ran here");
      items.push(tempItem);
      prices.push(tempPrice);
      oldPrices.push(tempOld);
      writeUserData(name, address, [...items, tempItem], [...prices, tempPrice], [...oldPrices, tempOld], contact);
      // setItems();
      // setPrices([...prices, tempPrice]);
      // setOldPrices([...oldPrices, tempOld]);
    }
    writeUserData(name, address, items, prices, oldPrices, contact);
  }



  return (
    <Fragment>
      <div class="entire">
      <div class= "container">
        <br></br>
      <div class='row'>
        <div class="col-md-3"></div>
        <div class="col-md-6 text-center"><h1>Our Restaurant Partners</h1></div>
        <div class="col-md-3"></div>
      </div>

        <br></br>
      <div class='row'>
        <h3 class='text-center'>"QuickBites aims to help local restaurants in Toronto to ensure that they are profitable despite the lack of customers due to COVID-19. 
          We allow businesses to advertise their perishables such as alcohol and frozen goods at a cheaper price to customers."</h3>
      </div>
      <hr></hr>

      <div class='row'>
        <div class='col'>
          <img class="rounded mx-auto d-block" src="https://s3.amazonaws.com/btoimage/prism-thumbnails/listings/gols-lanzhou-noodle-mississauga-1.jpg-resize_then_crop-_frame_bg_color_FFF-h_1365-gravity_center-q_70-preserve_ratio_true-w_2048_.webp" alt="Magic Noodle" />
          <h5 class='text-center'> Magic Noodle </h5>
          <img class="rounded mx-auto d-block" src="https://media-cdn.tripadvisor.com/media/photo-s/0e/e0/c9/f4/hello.jpg" alt="Kelseys" />
          <h5 class='text-center'> Kelseys </h5>
        </div>
        <div class='col'>
          <img class="rounded mx-auto d-block" src="https://images.dailyhive.com/20180123074719/keg2.jpg" alt="St. Louis" />
          <h5 class='text-center'> St. Louis BBQ </h5>
          <img class="rounded mx-auto d-block" src="https://s3.amazonaws.com/btoimage/prism-thumbnails/articles/20180215-2048-CongeeTown10.jpg-resize_then_crop-_frame_bg_color_FFF-h_1365-gravity_center-q_70-preserve_ratio_true-w_2048_.webp" alt="Congee Queen" />
          <h5 class='text-center'> Congee Queen </h5>
        </div>
        <div class='col'>
          <img class="rounded mx-auto d-block" src="https://otg.imgix.net/assets/grid/toronto/annex-koreatown/owl-of-minerva/N_OWL_5.jpg?auto=format%2Ccompress&crop=focalpoint&fit=min&fm=jpg&fp-x=0.5&fp-y=0.5&ixlib=php-1.1.0&q=80&w=1200&s=8ed66659f574fc8ac17102dcc2cdd7b7" alt="Owl of Minerva" />
          <h5 class='text-center'> Owl of Minerva </h5>
          <img class="rounded mx-auto d-block" src="https://lh3.googleusercontent.com/RFow5rf6Ii92d5XWaFIyr9xd6nqm2QtmadbPcrxjkdGH2oDKv8cdNRgkbqf6ZWkKfzmR" alt="Swiss Chalet" />
          <h5 class='text-center'> Swiss Chalet </h5>
        </div>
        <div class='col'>
          <img class="rounded mx-auto d-block" src="https://lh3.googleusercontent.com/proxy/IDZgoQ6P5bXHjqgemWEXryWzrScOhSunAllL_RdmUmWcnc6iMKkTHmHuYjywOIDgRumc-EYxJzplgkQ_CY4Zixbad44lGg" alt="Mi-Ne Sushi" />
          <h5 class='text-center'> Mi-Ne Sushi </h5>
          <img class="rounded mx-auto d-block" src="https://s3.amazonaws.com/btoimage/prism-thumbnails/articles/bestofrankedlistings/dragon-boat-fusion-cuisine-richmond-hill-5d4652c1.jpg-resize_then_crop-_frame_bg_color_FFF-h_480-gravity_center-q_70-preserve_ratio_true-w_720_.webp" alt="Dragon Boat Fusion" />
          <h5 class='text-center'> Dragon Boat Fusion </h5>
        </div>
      </div>
      
      
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title class='text-center' id='caption'>
            <h3 class='text-center' id='caption'>Product Submission </h3>
          </Modal.Title>
        </Modal.Header>
        
        <Form id='caption-form'>
          <br></br>
          <Form.Group>
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control type="Name" placeHolder="Restaurant Name"
              onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Restaurant Address</Form.Label>
            <Form.Control type="Name" placeHolder="Restaurant Address"
              onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Restaurant Contact</Form.Label>
            <Form.Control type="Name" placeHolder="Restaurant Phone"
              onChange={(e) => setContact(e.target.value)} />
          </Form.Group>

          <MultiplePriceGoods 
            setItemsList={setItems} 
            setOldPrices={setOldPrices} 
            tempPrice={tempPrice} 
            tempItem={tempItem} 
            setTempItem={setTempItem} 
            setTempPrice={setTempPrice}
            setTempOld={setTempOld}
            tempOld={tempOld} 
            setPricesList={setPrices} 
            oldPrices={oldPrices} 
            itemsList={items} 
            pricesList={prices} />

          <center>
            <Button variant="primary" type="submit" onClick={(event) => {handleChange(event) }}>
              Submit
        </Button>
        <br></br>
          </center>
          <br></br>
        </Form>
        
      
      </Modal>

      <hr></hr>
      <br></br>

      <div class='row text-center' id="caption">
        <h3 class='text-center' id="caption">Are you interested in our incentive? Come join us now as a restaurant!</h3>
      </div>

      <div class='text-center'>
        <br></br>
        <Button
          onClick={() => {
            handleShow();
          }}
          style={{
            fontSize: "35px",
            border: "none",
          }}
        >
          <FontAwesomeIcon icon={faCoffee} /> 
          &ensp;
        Submit Sale
          </Button>
        
      </div>
      <br></br>
      </div>
      </div>
    </Fragment>
  );

}

export default Restaurants;