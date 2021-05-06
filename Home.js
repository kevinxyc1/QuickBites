import React, { Component, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Home.css'
import Typing from 'react-typing-animation'
import logo from './image.jpg';

function Home() {

    return (
        <div class="home-container">
            <Typing>
                <span class="home-title">QuickBites</span>
                <span class="home-heading">Connecting restaurants with customers</span>
                <span class="home-heading-2">in light of COVID-19</span>
            </Typing>
            <div class="transbox">
                <img id="bg" className="img-responsive" src="https://img5.goodfon.com/wallpaper/nbig/f/9f/goluboi-fon-desert-morozhenoe-assorti.jpg" alt="logo" />
            </div>
        </div>
    );
}

export default Home;