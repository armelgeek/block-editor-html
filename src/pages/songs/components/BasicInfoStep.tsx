import { useEffect } from "react";
import {
  Action,
  ActionType as LrcActionType,
  IState,
} from "../SongForm";
function BasicInfoStep({
  state,
  dispatch,
  onNextStep,
  onPrevStep,
  isComplete,
}: any) {
  function handleChange(event: any) {
    const { name, value } = event.target;
    dispatch({ type: "update", payload: { [name]: value } });
  }
  const handeNext = () =>{
    onNextStep();
    /**dispatch({
      type: LrcActionType.info,
      payload: { name: "ti", value: state.title },
    });**/
  }
 /**useEffect(() => {
    if(state.title.length > 0){
      dispatch({
        type: LrcActionType.info,
        payload: { name: "ti", value: "armel" },
      });
    }
  
  }, []); */ 
  return (
    <div>
      <h2>Basic Information</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={state.title || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="button" onClick={onPrevStep}>
            Previous
          </button>
          <button type="button" onClick={handeNext} disabled={!isComplete}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default BasicInfoStep;
