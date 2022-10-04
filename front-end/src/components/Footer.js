import {React , useState }from "react";
import { Link } from "react-router-dom";

export default (props) => {
    const [moreText, setMoreText] = useState(false);
            <div className="footer">
               <footer className="footer--pin">
               <p>{moreText ? "FOOTER STILL PINNED" : "FOOTER"}</p>
                </footer>
            </div>

        
    }