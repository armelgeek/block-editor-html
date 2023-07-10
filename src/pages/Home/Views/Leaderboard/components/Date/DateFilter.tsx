import React, { memo, useReducer } from "react";
//import { useI18n } from "../../../../lang";
import boardState, { type InitState } from "../../../../../../store/leaderboard/state";
import leaderboardActions from "../../../../../../store/leaderboard/action";
const Item = ({ id, name, dispatch, isActive = false }: any) => {
  const handleToggle = () => {
    dispatch({ type: "toggle", id: id });
    leaderboardActions.setFilterBoard({
      name: "date",
      value: { id, name },
    });
    global.app_event.songFilterChanged();
    //ref.current?.hide();
  };
  return (
    <button onClick={handleToggle}>{name}</button>
  );
};

const initialState = {
  checkedItems: {},
  lastCheckedItemId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      const newCheckedItems = { ...state.checkedItems };
      if (state.checkedItems[action.id]) {
        delete newCheckedItems[action.id];
      } else {
        newCheckedItems[action.id] = true;
      }
      return {
        checkedItems: newCheckedItems,
        lastCheckedItemId: action.id,
      };
    default:
      throw new Error("Invalid action type");
  }
}

export default memo(() => {
  //const t = useI18n();
  const dateList = [
    {
      name: "Hier",
      value: 5,
    },
    {
      name: "Aujourd'hui",
      value: 1,
    },
    {
      name: "Cette semaine",
      value: 2,
    },
    {
      name: "Ce mois ci",
      value: 3,
    },
    {
      name: "Cette année",
      value: 4,
    },
  ];
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div >
        {dateList.map(({ name, value }: any) => (
          <Item
            name={name}
            id={value}
            dispatch={dispatch}
            isActive={boardState.filters?.date?.id == value}
            key={value}
          />
        ))}
      </div>
    </>
  );
});