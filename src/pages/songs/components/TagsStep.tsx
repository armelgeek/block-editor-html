import { useReducer, useState,useEffect } from 'react';

function tagReducer(state, action) {
  switch (action.type) {
    case 'add':
      if (state.includes(action.payload)) {
        return state;
      } else {
        return [...state, action.payload];
      }
   case 'set':
      return action.payload;
    case 'remove':
      return state.filter((tag) => tag !== action.payload);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function TagsStep({state,dispatch}) {
  const [tagInput, setTagInput] = useState('');
  const [tags, internalDispatch] = useReducer(tagReducer, state.tag_names);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const handleTagInput = async (event) => {
    const input = event.target.value;
    setTagInput(input);
    // Query the database for suggested tags
    if (input.length > 0) {
    	setIsLoading(true);
      const response = await fetch(`http://localhost:8100/search/tags?page=1&limit=20&q=${input}`);
      const fetchedTags = await response.json();
      // Filter out tags that are already in the list
      const filteredTags = fetchedTags.tags.filter((tag) => !tags.includes(tag.name));
    	setIsLoading(false);
      
      setSuggestedTags(filteredTags);
    } else {
      setSuggestedTags([]);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const tag = tagInput.trim();
      if (tag.length > 0) {
        internalDispatch({ type: 'add', payload: tag });
        setTagInput('');
        setSuggestedTags([]);
      }
    }
  };

  const handleSuggestedTagClick = async (tag) => {
    internalDispatch({ type: 'add', payload: tag });
    setTagInput('');
    setSuggestedTags([]);
  };

  const handleTagRemove = (tag) => {
    internalDispatch({ type: 'remove', payload: tag });
  };
  useEffect(() => {
    dispatch({ type: "update", payload: { tag_names: tags } });
  }, [dispatch, tags]);
  return (
    <div>
      <div>
        {tags.map((tag) => (
          <span key={tag}>
            {tag}{' '}
            <button type="button" onClick={() => handleTagRemove(tag)}>
              x
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={tagInput}
        onChange={handleTagInput}
        onKeyDown={handleKeyDown}
        placeholder="tags ...."
      />

      {suggestedTags.length > 0 && (
        <ul>
          {suggestedTags.map((tag) => (
            <li key={tag.id}>
              <button type="button" onClick={() => handleSuggestedTagClick(tag.name)}>
                {tag.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagsStep;