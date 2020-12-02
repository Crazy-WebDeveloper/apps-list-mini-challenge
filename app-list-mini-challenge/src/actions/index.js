import axios from 'axios';

const LOCAL_URL = "http://localhost:3000";
export function fetchData(param, fil_val) {
  return function (dispatch) {
    return axios.get(`${LOCAL_URL}/apps.json`)
      .then(({ data }) => {
        let rtn_Ary = [];
        for(let item of data) {
          for(let val of item.categories) {
            if(val === param) {
              rtn_Ary.push(item);
              continue;
            }
          }
        }
        let rtnVal = [];
        if(fil_val !== null) {          
          for(let item of rtn_Ary) {
            if(item.name.toLowerCase().indexOf(fil_val.toLowerCase()) >= 0) {
              rtnVal.push(item);
            }
          }
        }
 
        dispatch({
          type: "FETCH_DATA",
          Payload: fil_val === null ? rtn_Ary : rtnVal,
          selectedMenuId: param,
          page_num: 1
        })
      });
  };
}

export function setPageNum(pageNum) {
  return function (dispatch) {
    dispatch({
      type: "SET_PAGENUM",
      Payload: pageNum
    })
  };
}

export function setFilterData(ary) {
  return function (dispatch) {
    dispatch({
      type: "FETCH_DATA",
      Payload: ary
    })
  };
}