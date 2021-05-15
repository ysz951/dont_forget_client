import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import ListNav from '../ListNav/ListNav';
import { Link, withRouter } from 'react-router-dom';
import BuyListApiService from '../services/buylist-api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {format} from 'date-fns';
import './CurListsPage.css';
class CurListsPage extends Component {
  static contextType = BuyListsContext;
  state = {
    textAreaActive: false,
    selectedListId: null,
  }
  componentDidMount() {
    this.context.clearError();
    const {select=''} = this.props;
    if (select==="Now"){
      BuyListApiService.getBuyLists()
      .then(this.context.setBuyLists)
      .catch(this.context.setError)
    }
    else{
      BuyListApiService.getNextLists()
      .then(this.context.setNextLists)
      .catch(this.context.setError)
    }
  }
  componentWillUnmount() {
    this.context.clearBuyLists();
    this.context.clearNextLists();
  }
  deleteList = (listId) => {
    const { select ='' } = this.props;

    
    BuyListApiService.deleteBuyList(listId)
      .then(res => {
        if (select === "Now")this.context.deleteBuyList(listId);
        else this.context.deleteNextList(listId);
      })
      .catch(this.context.setError)
    
  }
  changeButtonClick = (listId) => {
    this.setState({
      textAreaActive: true,
      selectedListId: listId,
    })
  }
  closeTextArea = () => {
    this.setState({
      textAreaActive: false,
      selectedListId: null,
    });
  }
  submitUpdateList = ev => {
    ev.preventDefault();
    const {updateList} = ev.target;
    const { select ='' } = this.props;
    // this.context.updateNextList(this.state.selectedListId, updateList.value)
    BuyListApiService.updateBuyList(this.state.selectedListId, updateList.value)
    .then(res => {
      console.log(select);
      console.log(updateList.value);
      if (select === 'Now') this.context.updateBuyList(this.state.selectedListId, updateList.value)
      else this.context.updateNextList(this.state.selectedListId, updateList.value)
      this.setState({
        textAreaActive: false,
        selectedListId: null,
      })
    })
    .catch(err => this.context.setError(err.error))
    // if (select === 'Now') {
    //   BuyListApiService.updateBuyList(this.state.selectedListId, updateList.value)
    //   .then(res => {
    //     this.context.updateBuyList(this.state.selectedListId, updateList.value)
    //     this.setState({
    //       textAreaActive: false,
    //       selectedListId: null,
    //     })
    //   })
    //   .catch(err => this.context.setError(err.error))
    // }
    // else{
    //   BuyListApiService.updateNextList(this.state.selectedListId, updateList.value)
    //   .then(res => {
    //     this.context.updateNextList(this.state.selectedListId, updateList.value)
    //     this.setState({
    //       textAreaActive: false,
    //       selectedListId: null,
    //     })
    //   })
    //   .catch(err => this.context.setError(err.error))
    // }
  }
  renderLists(selectLists, select) {
    return selectLists.map(list => 
      <li className="Buy__list" key = {list.id}>
         {this.state.textAreaActive && list.id === this.state.selectedListId ?
          <form
            className='Buy__list_form'
            onSubmit={this.submitUpdateList}
          > 
            <textarea
              className='Buy__list_textarea'
              required
              aria-label='Type a list name...'
              name='updateList'
              id='updateList'
              defaultValue={list.listName}
              rows='1'
            />
            <div className="Buy__list_updateBtnGroup">
              <button className="btn_type_2" type='button' onClick={this.closeTextArea}>
                Cancel
              </button>
              <button className="btn_type_3" type='submit'>
                Update
              </button>
            </div>
          </form>
          :
          <div className="Buy__list_delteEditGroup">
          {/* faEdit, faTrashAlt */}
            <button className="Buy__list_deleteBtn iconButton" onClick={() => this.deleteList(list.id)}>
              <FontAwesomeIcon icon='trash-alt' />
            </button>
            {' '}
            <BuyList list={list} select={select}/>
            {' '}
            <button className="Buy__list_editBtn iconButton" onClick={() => this.changeButtonClick(list.id)}> 
              <FontAwesomeIcon icon='edit' />
            </button>
          </div>
          }
        <p className="Buy__list_dateCreated light-black Lora">{list.createdAt}</p>
      </li>
      )
  }

  render() {
    const { error } = this.context;
    const {select=""} = this.props;
    const selectLists = (select === 'Now' ? this.context.buyLists : this.context.nextLists ) || [];
    return (
      <>
        <ListNav select={select}/>
        <section className="Buy__Lists_section">
          <div role='alert'>
            <p className='red'>{error}</p>
          </div>
          <ul className="Buy__Lists">
            {this.renderLists(selectLists, select)}
          </ul>
        </section>
        {
          select === "Now" && 
          <Link className = 'AddBuyList__Link' to='/addbuylist'> 
            <FontAwesomeIcon className="AddBuyList__icon" icon="plus"/>
              <span>List</span>
          </Link>
        }
      </>
    );
  }
}
export default withRouter(CurListsPage)

function BuyList({list, select}){
  return (
    <p className="Buy__list_name Fredoka">
        {select === "Now" ?
        <Link to={`/buyLists/${list.id}`}>
            {list.listName}
        </Link>
        :
        <Link to={`/nextLists/${list.id}`}>
            {list.listName}
        </Link>
        }
    </p>

  )
}
