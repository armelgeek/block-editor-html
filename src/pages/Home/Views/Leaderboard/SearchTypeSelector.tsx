import React, { useEffect, useMemo, useState } from "react";

import { type SearchType } from "../../../../store/search/state";
//import { useI18n } from "../../../../lang";
import { useTheme } from "../../../../store/theme/hook";
import { getSearchSetting, saveSearchSetting } from "../../../../utils/data";

const SEARCH_TYPE_LIST = ["music", "songlist"] as const;

export default () => {
  //const t = useI18n();
  const theme = useTheme();
  const [type, setType] = useState<SearchType>("music");

  useEffect(() => {
    void getSearchSetting().then((info) => {
      setType(info.type);
      global.app_event.songFilterChanged();
    });
  }, []);

  const list = useMemo(() => {
    return SEARCH_TYPE_LIST.map((type) => ({
      label: `search_type_${type}`,
      id: type,
      text: type == "music" ? 'Musique' : "Artists"
    }));
  }, []);

  const handleTypeChange = (type: SearchType) => {
    setType(type);
    global.app_event.searchTypeChanged(type);
    void saveSearchSetting({ type });
    global.app_event.songFilterChanged();
  };

  return (
    <div  className="board-list-type-container">
      {list.map((t) => (
        <div className="board-list-type-btn"
             onClick={() => {
            handleTypeChange(t.id);
            handleTypeChange(t.id);
          }}
          key={t.id}
        >
          <div
            style={{
              borderBottomColor:
                type == t.id
                  ? 'green'
                  : "transparent",
            }}
            color={
              type == t.id ? 'white' : 'dark'
            }
          >
            {t.text}
          </div>
        </div>
      ))}
    </div>
  );
};
