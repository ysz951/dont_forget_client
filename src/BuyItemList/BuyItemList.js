import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
import './BuyItemList.css';
import ListNav from '../ListNav/ListNav';
import BuyListApiService from '../services/buylist-api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {format} from 'date-fns';
export default class BuyItemList extends Component {
  constructor(props){
    super(props);
    this.state = {
      listName: '',
      textAreaActive: false,
      selectedItemId: null,
    }
  }
  static contextType = BuyListsContext;
  static defaultProps = {
    match: {
      params:{}
    }
    ,
    history: {
      push: () => {}
    }
  };
  componentDidMount(){
        const {listId} = this.props.match.params;
        this.context.clearError();
        const { select ='' } = this.props;
        // get selected list items based on 'select' 
        if (select === 'Now'){
            BuyListApiService.getBuyListItems(listId)
            .then(res => {
                this.context.setItems(res);
                this.setState({listName: res.listName});
            })
            .catch(err => this.context.setError(err.error))
        }
        else {
          BuyListApiService.getBuyListItems(listId)
          .then(res => {
              this.context.setItems(res);
              this.setState({listName: res.listName});
          })
          .catch(err => this.context.setError(err.error))
        }
        
  }
  componentWillUnmount() {
    // clear items
    this.context.clearItems();
  }
  renderItems(ListItems, select) {
    return ( 
        ListItems.map(item => 
            <li className="Buy_List_item" key = {item.id}>
                {
                  this.state.textAreaActive && item.id === this.state.selectedItemId ?
                  <form
                      className='Buy_List_item_form'
                      onSubmit={this.submitUpdateItem}
                  > 
                      <textarea
                      className='Buy_List_item_textarea'
                      required
                      aria-label='Type a item name...'
                      name='updateItem'
                      id='updateItem'
                      defaultValue={item.itemName}
                      rows='1'
                      />
                      <div className="Buy__list_item_updateBtnGroup">
                        <button className="btn_type_2" type='button' 
                          onClick={this.closeTextArea}>
                            Cancel
                        </button>
                        <button className="btn_type_3" type='submit'>
                            Update
                        </button>
                      </div>
                  </form>
                  :
                  <div className="Buy__list_item_delteEditGroup">
                  <button className="Buy_List_item_deleteBtn iconButton"onClick={() => this.deleteItem(item.id)}> 
                    <FontAwesomeIcon icon='trash-alt' />
                  </button>
                  {' '}
                  <p className="Fredoka Buy__list_itemName">{item.itemName}</p>
                  {' '}
                  <button className="Buy_List_item_editBtn iconButton" onClick={() => this.changeButtonClick(item.id)}> 
                    <FontAwesomeIcon icon='edit' />
                  </button>
                  </div>
                }
                <p className="Buy__list_item_dateCreated light-black Lora">{item.createdAt}</p>
            </li>
            
        )
    )
  }
  submitUpdateItem = ev => {
    ev.preventDefault();
    const {updateItem} = ev.target;
    const {listId} = this.props.match.params;
    // update item name
    BuyListApiService.updateItem(this.state.selectedItemId, updateItem.value, listId)
      .then(res => {
        this.context.updateItem(this.state.selectedItemId, updateItem.value)
        this.setState({
          textAreaActive: false,
          selectedItemId: null,
        })
      })
      .catch(this.context.setError)
  }
  deleteItem = (itemId) => {
    // delete item
    BuyListApiService.deleteItem(itemId)
      .then(res => {
        this.context.deleteItem(itemId);
      })
      .catch(this.context.setError)
  }
  changeButtonClick = (itemId) => {
    this.setState({
      textAreaActive: true,
      selectedItemId: itemId,
    })
  }
  closeTextArea = () => {
    this.setState({
      textAreaActive: false,
      selectedItemId: null,
    });
  }

  deleteList = (listId, newNextList) => {
    // delte list 
    BuyListApiService.deleteNextList(listId)
    .then(res => {
      this.context.deleteNextList(listId);
      this.props.history.push(`/shopping/now/${newNextList.id}`);
    })
    .catch(this.context.setError)   
  }

  addBuy = (nextItems) => {
    const nextName = this.state.listName;
    const {listId} = this.props.match.params;
    BuyListApiService.postBuyList(nextName)
        .then(res => {
            this.context.addBuyList(res)
            const newNextList = res;
            Promise.all(
                nextItems.map(item => 
                    BuyListApiService.postItem(item.itemName, newNextList.id))
            )
            .then(res => {
                this.deleteList(listId, newNextList);
            })
            .catch(err => this.context.setError(err.error))
        })
        .catch(err => this.context.setError(err.error))
  }

  goShopping = (select) => {
    if (!this.context.items.length) {
      alert('No item')
    }
    else{
      
      if (select === "Next") {
        const ListItems = this.context.items || [];
        this.addBuy(ListItems);
      }
      else {
        const {listId} = this.props.match.params;
        this.props.history.push(`/shopping/now/${listId}`)
      }
      // select === "Now" ? this.props.history.push(`/shopping/now/${listId}`) : this.props.history.push(`/shopping/next/${listId}`);
    }
  }

  render() {
    const { select ='' } = this.props;
    const ListItems = this.context.items || [];
    const {listId} = this.props.match.params;
    const { error } = this.context;
    return (
        <>
            <ListNav select={select}/>
            {error ?
            <div role='alert' className="Buy__Items_error">
                <p className='red'>{error}</p>
            </div>
            :
            <section className="Buy__Items_section">
                <h2>{this.state.listName}</h2>
                <ul className="Buy__ListItems">
                    {this.renderItems(ListItems, select)}
                </ul>
                <button className="Buy__shoppingBtn" onClick={() => {this.goShopping(select)}}>
                  <FontAwesomeIcon className="Buy__shoppingLink__icon" icon="shopping-cart"/>
                  {' '}
                  <span className="Libre bold">Go Shopping</span>
                </button>
                {/* {select === "Now" ?
                <p className="Buy__shoppingLink">
                    <Link to={`/shopping/now/${listId}`}>
                    <FontAwesomeIcon className="Buy__shoppingLink__icon" icon="shopping-cart"/>
                    {' '}
                    Go Shopping
                    </Link>
                </p>
                :
                <p className="Buy__shoppingLink">
                    <Link to={`/shopping/next/${listId}`}>
                    <FontAwesomeIcon className="Buy__shoppingLink__icon" icon="shopping-cart"/>
                    {' '}
                        Go Shopping
                    </Link>
                </p>
                } */}
                {   
                    select === "Now" && 
                    <Link className = 'AddItem__Link' to={`/addBuyItem/${listId}`}> 
                    <FontAwesomeIcon className="AddBuyList_item__icon" icon="plus"/>
                        <span>Item</span>
                    </Link>
                }
            </section>
            }
        </>
    );
  }
}
