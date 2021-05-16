import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import ShoppingItem from '../ShoppingItem/ShoppingItem';
import BuyListApiService from '../services/buylist-api-service';
import FinishItem from '../FinishItem/FinishItem';
import './ShoppingPage.css';
import {format} from 'date-fns';
export default class Shopping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finishStatus: false,
            uncheckItems: [],
            showConfirm: false,
            getAll: false,
            listName: "",
        };
    }
    static contextType = BuyListsContext;
    static defaultProps = {
        history: {
          push: () => {},
        },
        match: {
          params:{}
        }
    };
    
    showConfirmFunc = () => {
        this.setState({showConfirm: true});
    }

    finishShopping = () => {
        const ListItems = this.context.selectedBuyList || [];
        const uncheckItems = ListItems.filter(item => !this.context.checkSet.has(item.id));
        // When click "Finish" button, if all item is checked, set "getAll" state to be true
        // Otherwise, set "uncheckItems" and change "finishStatus" to be true
        if (uncheckItems.length) {
            this.setState({
                finishStatus:true,
                uncheckItems,
            });
        }
        else{
            this.setState({
                getAll: true,
            });
        }
    }
    deleteList = (listId) => {
        const { select ='' } = this.props;
        // deleteList based on select
        if (select === "Now"){
          BuyListApiService.deleteBuyList(listId)
          .then(res => {
            this.context.deleteBuyList(listId);
            this.props.history.push('/buyLists');
          })
          .catch(this.context.setError)
        }
        else {
          BuyListApiService.deleteNextList(listId)
          .then(res => {
            this.context.deleteNextList(listId);
            this.props.history.push('/nextLists');
          })
          .catch(this.context.setError)
        }
        
    }

    onUnload(event) { 
        alert('Page Refreshed');
    }
    componentDidMount(){
        window.addEventListener("beforeunload", this.onUnload)
        window.onbeforeunload = function() {
            this.onUnload();
            return "";
        }.bind(this);
        const {listId} = this.props.match.params;
        this.context.clearError();
        const {select} = this.props;
        if (select === "Now"){
            BuyListApiService.getBuyListItems(listId)
            .then(res => {
                console.log(res);
                this.context.setSelectedBuyList(res.listItems);
                this.setState({listName: res.listName});
            })
            .catch(err => this.context.setError(err.error))
        }
        else if (select === "Next"){
            BuyListApiService.getNextListItems(listId)
            .then(res => {
                this.context.setSelectedBuyList(res.listItems);
                this.setState({listName: res.listName});
            })
            .catch(err => this.context.setError(err.error))
        }
        
    }
    componentWillUnmount() {
        this.context.clearCheckSet();
        this.context.clearNextSet();
        this.context.clearSelectedBuyList();
        window.removeEventListener("beforeunload", this.onUnload);
        window.onbeforeunload = () => {};
    }
    renderItems(ListItems) {
        return (
            ListItems.map(item => 
                <li className="Shopping__list_item" key = {item.id}>
                    <ShoppingItem item={item}/>
                </li>
            )
        )
    }
    addNext = (uncheckItems) => {
        const nextItems = uncheckItems.filter(item => this.context.nextSet.has(item.id));
        const nextName = this.state.listName + ' Next';
        // const nextName = (format(new Date(), "yyyy-MM-dd hh-mm-ss")).toString();
        console.log(nextName);
        // add all uncheckItems to next list
        if (nextItems.length) {
            // firstly, post a new newNextList
            BuyListApiService.postNextList(nextName, 'Next')
                .then(res => {
                    this.context.addNextList(res)
                    const newNextList = res;
                    // insert all uncheckItems to newNextList
                    Promise.all(
                        nextItems.map(item => 
                            BuyListApiService.postItem(item.itemName, newNextList.id))
                    )
                    .then(res => {
                        this.props.history.push('/nextLists');
                    })
                    .catch(err => this.context.setError(err.error))
                })
                .catch(err => this.context.setError(err.error))
            
        }
        else {
            // if no item is added to next list, go back to buylist page
            this.props.history.push('/buyLists');
        }
    }
    addAll = (uncheckItems) => {
        // automatically add all uncheckItems to new nextlist
        const nextItems = uncheckItems;
        const nextName = this.state.listName + ' Next';
        // const nextName = (format(new Date(), "yyyy-mm-dd hh-mm-ss")).toString();
        BuyListApiService.postNextList(nextName, 'Next')
            .then(res => {
                this.context.addNextList(res)
                const newNextList = res;
                Promise.all(
                    nextItems.map(item => 
                        BuyListApiService.postItem(item.itemName, newNextList.id))
                )
                .then(res => {
                    this.props.history.push('/nextLists');
                })
                .catch(err => this.context.setError(err.error))
            })
            .catch(err => this.context.setError(err.error))     
    }
        
    render() {
        const ListItems = this.context.selectedBuyList || [];
        console.log(ListItems);
        const {error} = this.context;
        const {listId} = this.props.match.params;
        const uncheckItems = this.state.uncheckItems || [];
        return (error ?
                <div role='alert'>
                    <p className='red'>{error}</p>
                </div>
                :
                <section className="Shopping_section">
                <h2>Shopping</h2>
                <h3>{this.state.listName}</h3>
                {!this.state.getAll ? 
                    !this.state.finishStatus ? 
                    <div>       
                        {this.state.showConfirm && 
                        <div className="Shopping__confirm">
                            <h2>Are you sure? </h2>
                            <div className="Shpping__confirm_btnGroup">
                                <button className="btn_type_2" 
                                onClick={() => this.setState({showConfirm:false})}>
                                    No
                                </button>
                                <button className="btn_type_2" onClick={() => this.finishShopping()}>
                                    Yes
                                </button>
                            </div>
                        </div>
                        }
                        <ul className="Shopping__list">
                            {this.renderItems(ListItems)}
                        </ul>
                        <button className="btn_type_1 Shopping_Finish_btn" 
                        onClick={() => this.showConfirmFunc()}> 
                            Finish 
                        </button>
                    </div>
                    :
                    <div>
                        <ul>
                            <FinishItem uncheckItems={uncheckItems}/>
                        </ul>
                        <div className="Finish_btnGroup">
                            <button className="btn_type_2" onClick={() => this.addNext(uncheckItems)}> 
                                OK 
                            </button>
                            <button className="btn_type_2 red" onClick={() => this.addAll(uncheckItems)}>
                                Add all to next time
                            </button>
                        </div>
                    </div>
                :
                <div className="Shopping__getAll">
                    <h2>Get everything</h2>
                    <div className="Shopping__getAll_btnGroup">
                        <button className="btn_type_2" onClick={() => this.addNext([])}>
                            OK 
                        </button>
                        <button className="btn_type_2 red" onClick={() => this.deleteList(listId)}>
                            Delete this list 
                        </button>
                    </div>
                </div>
                }
                </section>
        );
    }
}
