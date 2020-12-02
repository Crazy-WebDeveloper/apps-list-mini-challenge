import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './actions';
import Child from './child/Child';

// import NewTodo from '../components/NewTodo';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super();
    this.onSearchFiltering = this.onSearchFiltering.bind(this);
    this.onMenuClicked = this.onMenuClicked.bind(this);
    this.onChangePagenation = this.onChangePagenation.bind(this);
    this.state = {
      menuList : ["Channels", "Dialer", "Optimization", "Reporting", "Voice Analytics"],
      childList : [],
      seletedMenuId : "Channels"
    }
  }
  componentDidMount() {
    this.props.fetchData(this.state.menuList[0], null);
  }
  componentWillUpdate(props, state) {
    console.log("<>", props);

  }
  
  onChangePagenation(e) {
   if(this.props.page_num === Math.ceil(this.props.childList.length / 3) && e === "right") return;
   if(this.props.page_num === Math.ceil(this.props.childList.length / 3) && e === "left") return;
   if(this.props.page_num === 0 && e === "left") return;
   if(e === "right") this.props.setPageNum(this.props.page_num + 1);
   else if(e === "left") this.props.setPageNum(this.props.page_num - 1)
   else this.props.setPageNum(e);
  }
  onSearchFiltering(e) {
    let fil_val = e.target.value;
  
    this.props.fetchData(this.props.selectedMenuId, fil_val);
  }
  onMenuClicked(e) {
    this.props.fetchData(e, null)
  }
  render() {

    const menu_data = this.state.menuList.map((item, index) => {
      return <li class={index === 0 ? "active" : ""}><a href="#" onClick={() => this.onMenuClicked(item)}>{item}</a></li>
    })
    let tmp = this.props.childList.slice();
    let view_data = [];
    for(let i = 0; i < 3; i++) {
      let pgNum = Number(this.props.page_num);
      if(pgNum === 0) pgNum++;
      if(tmp[i + (pgNum-1)*3])
      view_data.push(tmp[i + (pgNum-1)*3])
    }
    console.log("<>", view_data);
    
    let temp_ary = [];
    for(let i = 0 ; i < view_data.length; i++) {
      let sum = 0;
      let a = {};
      for(let j = 0 ; j < view_data[i].subscriptions.length ; j++) {
        sum += view_data[i].subscriptions[j].price;
      }
      a.order = i;
      a.sum = sum;
      temp_ary.push(a);  
    }
    temp_ary.sort(function(a, b) { return a.sum - b.sum });
    let DataAry = [];
    for( let i = 0; i < temp_ary.length ; i++ ) {
      DataAry.push(view_data[temp_ary[i].order]);
    }
    let childData = []
    if(view_data) {
      childData = DataAry.map((item, index) => {
        return <Child data={item} category={this.props.selectedMenuId}></Child>
    })}
    const pageCount = Math.ceil(this.props.childList.length / 3);
    const pageSecionData = [];
    
    for(let i = 0 ; i < pageCount; i++) {
      const p = <li><a href="#" onClick={() => this.onChangePagenation(i+1)}>{i+1}</a></li>
      pageSecionData.push(p);
    }
    
    return (
      <div class="flex-container">
        <nav class="nav-categories">
        <h2>Categories</h2>

        <ul class="nav-menu">
          {menu_data}
        </ul>
      </nav>
      <section class="apps-list">
        <header>
          <input type="text" placeholder="Search by App" onChange={this.onSearchFiltering}/>
        </header>
        {this.props.childList ? childData : []}
        <ul class="pagination">
          <li><a href="#" onClick={() => this.onChangePagenation("left")}>&lt;</a></li>
          {pageSecionData}
          <li><a href="#" onClick={() => this.onChangePagenation("right")}>&gt;</a></li>
        </ul>
        </section>
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddTodo: todo => {
//       dispatch(addTodo(todo));
//     }
//   };
// };
const mapStateToProps = (state) => {
  console.log("<>", state) // state
  return {
    childList: state.fetchDataReducer.fetch_data ? state.fetchDataReducer.fetch_data : [],
    page_num: state.fetchDataReducer.page_num > 0 ? state.fetchDataReducer.page_num : 1,
    selectedMenuId: state.fetchDataReducer.selectedMenuId
  }
}
export default connect(
  mapStateToProps,
  actions
)(App);
