import React from 'react';
import { Link } from 'react-router-dom';
import './ListNav.css';
export default function ListNav(props) {
    const {select = ''} = props;
    return (
        <ul className="ListNav">
            <li>
                
                {select === 'Now' ?   
                <Link  className="Seleted_Nav border_left" to='/buyLists'>
                    <h2> 
                        To Buy List
                    </h2>
                </Link>
                :               
                <Link to='/buyLists'>
                    <h2> 
                        To Buy List
                    </h2>
                </Link>
                }
            </li>
            <li> 
                
                {select === 'Next' ?               
                <Link   className="Seleted_Nav border_right" to='/nextLists'>
                    <h2>
                        Next Time List
                    </h2>
                </Link>
                :   
                <Link to='/nextLists'>
                    <h2>
                        Next Time List
                    </h2>
                </Link>
                }
                
            </li>
        </ul>
    )
}
