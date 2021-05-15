import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './LandingPage.css';
function LandingPage(props){
    return(
        <div className="LandingPage">
            <div className="LandingPage_image_group">
                <div className="LandingPage_image"/>
            </div>
            <div className="LandingPage_text_group">
                
                <h1>
                    <span className="Lustria">
                        Dont forget what you want !
                    </span>
                </h1>
                {/* Create your Shopping List

As you find the items in the store, mark them as Done

If you're not able to find an item, mark it as Next Time */}
                <p className="Lora bold">Create your 
                    <span className="brown"> To Buy List</span>
                </p>
                <p className="Lora bold">
                    As you find the items in the store, mark them as 
                    <span className="brown"> Done</span>
                </p>
                <p className="Lora bold">If you're not able to find an item, mark it as 
                    <span className="brown"> Next Time</span>
                </p>
                <p className="LandingPage_findMore Fredoka">
                    <Link to='/login'>
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default withRouter(LandingPage);
