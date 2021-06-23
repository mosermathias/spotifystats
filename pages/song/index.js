import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useEffect, useState } from "react"; 
import NavComponent from '../../components/Nav';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

export default function Song() {
    const [change, setChange] = useState("");
    const handleChange = (event) => {
        console.log(event.target.value);
        setChange(event.target.value);
      }
    function a(message){
        console.log(message);
    ;  }
    function redirect(){
    
    }
    return (
    <div>
        <NavComponent></NavComponent>
        <div className={styles.container}>
        <InputGroup className="col-lg-8">
                <FormControl
                type="text"
                placeholder="Spotify-ID"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={handleChange(this)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={redirect()}>
                Get Song Information
                </Button>
            </InputGroup>
            <input type="text" onChange={handleChange(this)}></input>
        </div>
    </div>
    )
    }
