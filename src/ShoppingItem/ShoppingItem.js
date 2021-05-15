import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import './ShoppingItem.css'
export default class ShoppingItem extends Component {
  static contextType = BuyListsContext;
  static defaultProps = {
    item: {
        id: null,
        itemName: '',
    }
  }
  state = {
      checked: false,
      nextTime: false
  }
  changeCheck = (itemId) => {
    this.setState({checked: !this.state.checked})
    this.state.checked ? this.context.deleteCheck(itemId) : this.context.addCheck(itemId);
    if (!this.state.checked) {
      this.context.deleteNext(itemId)
      this.setState({nextTime: false});
    }
  }
  changeNext = (itemId) => {
    this.setState({nextTime: !this.state.nextTime})
    this.state.nextTime ? this.context.deleteNext(itemId) : this.context.addNext(itemId);
    
  }
  render() {
    const {item} = this.props;
    return (
        <div className="Shopping__Item">
            <button className="btn_type_2" onClick={() => this.changeCheck(item.id)}>
                {this.state.checked ? 'Undo' : 'Done'}
            </button>
            {!this.context.nextSet.has(item.id) ?
            <p className = {this.state.checked ? 'Shopping__Item_check' : 'Shopping__Item_uncheck bold'}>
              {item.itemName}
            </p>
            :
            <p className = 'Shopping__Item_uncheck red'>
              {item.itemName}
            </p>
            }
            {!this.state.checked && 
              <button className="btn_type_2" onClick={() => this.changeNext(item.id)}>
                {this.state.nextTime ? 'Cancel' : 'Next time'}
              </button>}
        </div>
    );
  }
}
