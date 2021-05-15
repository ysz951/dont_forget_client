import React, { Component } from 'react';

const BuyListsContext = React.createContext({
  buyLists: [],
  nextLists: [],
  items: [],
  itemToList: [],
  selectedBuyList: [],
  setSelectedBuyList: () => {},
  setError: () => {},
  setBuyLists: () => {},
  deleteBuyList: () => {},
  updateBuyList: () => {},
  deleteNextList: () => {},
  updateNextList: () => {},
  setNextLists: () => {},
  clearError: () => {},
  setItems: () => {},
  clearItems: () => {},
  addBuyList: () => {},
  addItem: () => {},
  addCheck: () => {},
  deleteCheck: () => {},
  addNext: () => {},
  deleteNext: () => {},
  clearCheckSet: () => {},
  clearNextSet: () => {},
  addNextList: () => {},
  clearSelectedBuyList: () => {},
  clearBuyLists: () => {},
  clearNextLists: () => {},
  deleteItem: () => {},
  updateItem: () => {},
  checkSet: new Set(),
  nextSet: new Set(),
  error: null,
});

export default BuyListsContext;

export class BuyListsProvider extends Component {
  state = {
    buyLists: [],
    nextLists: [],
    items: [],
    itemToList: [],
    selectedBuyList: [],
    error: null,
    checkSet: new Set(),
    nextSet: new Set(),
  };

  setBuyLists = buyLists => {
    this.setState({buyLists});
  }
  setNextLists = nextLists => {
    this.setState({nextLists});
  }
  clearBuyLists = () => {
    this.setBuyLists([]);
  }
  clearNextLists = () => {
    this.setNextLists([]);
  }
  addBuyList = buyList => {
    this.setBuyLists([
      ...this.state.buyLists,
      buyList
    ]);
  }
  deleteBuyList = listId => {
    const newBuyLists = this.state.buyLists.filter(list => Number(list.id) !== Number(listId));
    this.setBuyLists(newBuyLists);
  }
  deleteNextList = listId => {
    const newNextLists = this.state.nextLists.filter(list => Number(list.id) !== Number(listId));
    this.setNextLists(newNextLists);
  }
  updateBuyList = (listId, list_name) => {
    const newBuyLists = this.state.buyLists;
    const index = newBuyLists.findIndex(list => list.id === listId);
    newBuyLists[index].listName = list_name;
    this.setBuyLists(newBuyLists);
  }
  updateNextList = (listId, list_name) => {
    const newNextLists = this.state.nextLists;
    const index = newNextLists.findIndex(list => list.id === listId);
    newNextLists[index].listName = list_name;
    this.setNextLists(newNextLists);
  }
  addNextList = nextList => {
    this.setNextLists([
      ...this.state.nextLists,
      nextList
    ]);
  }
  addCheck = itemId => {
    const newCheckSet = this.state.checkSet;
    newCheckSet.add(itemId);
    this.setState({checkSet: newCheckSet});
  }
  deleteCheck = itemId => {
    const newCheckSet = this.state.checkSet;
    newCheckSet.delete(itemId);
    this.setState({checkSet: newCheckSet});
  }
  clearCheckSet = () => {
    this.setState({checkSet: new Set()});
  }
  addNext = itemId => {
    const newNextSet = this.state.nextSet;
    newNextSet.add(itemId);
    this.setState({nextSet: newNextSet});
  }
  deleteNext = itemId => {
    const newNextSet = this.state.nextSet;
    newNextSet.delete(itemId);
    this.setState({nextSet: newNextSet});
  }
  
  clearNextSet = () => {
    this.setState({nextSet: new Set()});
  }
  setItems = items => {
    this.setState({items});
  }

  addItem = item => {
    this.setItems([
      ...this.state.items,
      item
    ]);
  }
  deleteItem = itemId => {
    const newItems = this.state.items.filter(item => Number(item.id) !== Number(itemId));
    this.setItems(newItems);
  }
  updateItem = (itemId, item_name) => {
    const newItems = this.state.items;
    const index = newItems.findIndex(item => item.id === itemId);
    newItems[index].itemName = item_name;
    this.setItems(newItems);
  }
  clearItems = () => {
    this.setState({items: []});
    this.setState({selectedBuyList: null});
  }
  setError = error => {
    console.error(error);
    this.setState({
      error: "error"
    });
  }
  clearError = () => {
    this.setState({ error: null });
  }
  setSelectedBuyList = listItems => {
    // console.log(listItems)
    this.setState({selectedBuyList: listItems});
  }
  clearSelectedBuyList = () => {
    this.setSelectedBuyList([]);
  }
  render() {
    const value = {
      buyLists: this.state.buyLists,
      nextLists: this.state.nextLists,
      items: this.state.items,
      itemToList: this.state.itemToList,
      selectedBuyList: this.state.selectedBuyList,
      setSelectedBuyList: this.setSelectedBuyList,
      setError: this.setError,
      setBuyLists: this.setBuyLists,
      deleteBuyList: this.deleteBuyList,
      updateBuyList: this.updateBuyList,
      setNextLists: this.setNextLists,
      deleteNextList: this.deleteNextList,
      updateNextList: this.updateNextList,
      clearError: this.clearError,
      setItems: this.setItems,
      clearItems: this.clearItems,
      addBuyList: this.addBuyList,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      updateItem: this.updateItem,
      addCheck: this.addCheck,
      deleteCheck: this.deleteCheck,
      addNext: this.addNext,
      deleteNext: this.deleteNext,
      clearCheckSet: this.clearCheckSet,
      clearNextSet: this.clearNextSet,
      addNextList: this.addNextList,
      clearSelectedBuyList: this.clearSelectedBuyList,
      clearBuyLists: this.clearBuyLists,
      clearNextLists: this.clearNextLists,
      error: this.state.error,
      checkSet: this.state.checkSet,
      nextSet: this.state.nextSet,
    };
    return (
      <BuyListsContext.Provider value={value}>
        {this.props.children}
      </BuyListsContext.Provider>
    );
  }
}
