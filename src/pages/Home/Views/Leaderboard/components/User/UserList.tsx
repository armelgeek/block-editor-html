import { useTheme } from "../../../../../../store/theme/hook";
import React, { useReducer } from "react";

const initialState = {
  selectedItems: [],
  // Add any other relevant state variables here
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload.id],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (itemId) => itemId !== action.payload.id
        ),
      };
    case "DESELECT_ALL":
      return {
        ...state,
        selectedItems: [],
      };
    // Add any other relevant actions here
    default:
      return state;
  }
};

const UserList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const items = [
    {
      id: 1,
      title: "One",
    },
    {
      id: 2,
      title: "Two",
    },
    {
      id: 3,
      title: "Three",
    },
    {
      id: 4,
      title: "Four",
    },
    {
      id: 5,
      title: "Five",
    },
    {
      id: 6,
      title: "Six",
    },
    {
      id: 7,
      title: "One",
    },
    {
      id: 8,
      title: "Two",
    },
    {
      id: 9,
      title: "Three",
    },
    {
      id: 10,
      title: "Four",
    },
    {
      id: 11,
      title: "Five",
    },
    {
      id: 12,
      title: "Six",
    },
  ];
  const theme = useTheme();

  const handleItemSelection = (item: any) => {
    if (
      state.selectedItems.length > 0 &&
      state.selectedItems.includes(item.id)
    ) {
      dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } });
    } else {
      dispatch({ type: "ADD_ITEM", payload: { id: item.id } });
    }
  };

  const handleDeselectAll = () => {
    dispatch({ type: "DESELECT_ALL" });
  };

  return (
    <div style={{ width: "100%" }}>
      {state.selectedItems.length > 0 && (
        <button
          style={{
            padding: 10,
            width: 100,
            borderRadius: 10,
            backgroundColor: theme["c-button-background"],
          }}
          onClick={handleDeselectAll}
        >
          <p style={{ color: theme["c-950"] }}>Deselect All</p>
        </button>
      )}
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemSelection(item)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            marginBottom: 5,
            borderWidth: 1,
            borderColor: theme["c-button-background"],
            backgroundColor: state.selectedItems.includes(item.id)
              ? theme["c-button-background-active"]
              : "transparent",
            borderRadius: 8,
          }}
        >
          {state.selectedItems.includes(item.id) ? (
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

          <p style={{ marginLeft: 10, fontSize: 15 }}>{item.title}</p>
        </button>
      ))}
    </div>
  );
};

export default UserList;
