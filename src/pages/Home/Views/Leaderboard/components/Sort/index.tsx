import { useTheme } from "../../../../../../store/theme/hook";
import React, { useEffect, useReducer, useState } from "react";
import leaderboardActions from "../../../../../../store/leaderboard/action";
import boardState, {
  type InitState,
} from "../../../../../../store/leaderboard/state";
const initialState = {
  selectedItemId: 1,
  direction: "desc",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        selectedItemId: action.payload.id,
      };
    case "DESELECT_ITEM":
      return {
        ...state,
        selectedItemId: null,
      };
    case "SET_DIRECTION":
      return {
        ...state,
        direction: action.payload.direction,
      };
    default:
      return state;
  }
};
const Sort = () => {
  const listDetailInfo = boardState.filters;
  const [state, dispatch] = useReducer(reducer, listDetailInfo.sort);
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (isAscending: any) => {
    setSortAsc(isAscending);
    dispatch({
      type: "SET_DIRECTION",
      payload: {
        direction: isAscending ? "asc" : "desc",
      },
    });
  };
  const handleBoardFilter = () => {
    leaderboardActions.setFilterBoard({
      name: "sort",
      value: { ...state },
    });
    global.app_event.songFilterChanged();
  };
  useEffect(() => {
    handleBoardFilter();
  }, [state.direction, state.selectedItemId]);

  const theme = useTheme();
  const handleItemSelection = (item: any) => {
    if (item.id !== state.selectedItemId) {
      dispatch({ type: "ADD_ITEM", payload: item });
    } else {
      dispatch({ type: "DESELECT_ITEM" });
    }
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          flexDirection: "row",
          marginBottom: 5,
          justifyContent: "flex-end",
        }}
      >
        <button onClick={() => handleSort(true)}>
          <p
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: theme["c-050"],
              backgroundColor: sortAsc
                ? theme["c-button-background-active"]
                : "transparent",
            }}
          >
            Croissant
          </p>
        </button>
        <button onClick={() => handleSort(false)}>
          <p
            style={{
              padding: 5,
              borderWidth: 1,
              borderColor: theme["c-050"],
              backgroundColor: !sortAsc
                ? theme["c-button-background-active"]
                : "transparent",
            }}
          >
            Décroissant
          </p>
        </button>
      </div>
      {boardState.sortData.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemSelection(item)}
          style={{
            // borderRadius:5,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            marginBottom: 5,
            borderWidth: 1,
            borderColor: theme["c-button-background"],
            backgroundColor:
              item.id === state.selectedItemId
                ? theme["c-button-background-active"]
                : "transparent",
            borderRadius: 8,
          }}
        >
          {item.id === state.selectedItemId ? (
            <div
              style={{
                color: theme["c-button-font"],
              }}
            >
              Check
            </div>
          ) : (
            <div
              style={{
                color: theme["c-150"],
              }}
            >
              No - Check
            </div>
          )}

          <p
            style={{
              marginLeft: 10,
              fontSize: 15,
              //  fontWeight:'bold'
            }}
          >
            {item.title}
          </p>
        </button>
      ))}
    </div>
  );
};

export default Sort;
