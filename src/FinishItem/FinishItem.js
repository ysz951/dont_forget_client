import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import './FinishItem.css'
export default class FinishItem extends Component {
  static contextType = BuyListsContext;
  static defaultProps = {
    uncheckItems: [{
        id: null,
        itemName: '',
    }]
  }
  render() {
    const {uncheckItems} = this.props;
    return (
        uncheckItems.map(item => 
            <li key={item.id} className="FinishItem">
                {this.context.nextSet.has(item.id) 
                ? <span className="red">{item.itemName}</span>
                : item.itemName
                }
                {this.context.nextSet.has(item.id) 
                ? <button className="btn_type_2" onClick={() => {this.context.deleteNext(item.id)}}> 
                    Cancel 
                  </button>
                : <button className="btn_type_2" onClick={() => {this.context.addNext(item.id)}}>
                    Next time 
                  </button>
                }
            </li>
        )
    )
 }
}
