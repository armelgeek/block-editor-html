import music from "../../utils/musicSdk";

export declare type Source = LX.OnlineSource;

export declare interface BoardItem {
  id: string;
  name: string;
  bangid: string;
}
export declare interface Board {
  list: BoardItem[];
  source: LX.OnlineSource;
}
type Boards = Partial<Record<LX.OnlineSource, Board>>;

export declare interface ListDetailInfo {
  list: LX.Music.MusicInfoOnline[];
  total: number;
  maxPage: number;
  page: number;
  source: LX.OnlineSource | null;
  limit: number;
  key: string | null;
  id: string;
}
export declare interface FilterBoard {
  date?: any;
  user?: any;
  sort?: any;
}
export interface InitState {
  sources: LX.OnlineSource[];
  boards: Boards;
  listDetailInfo: ListDetailInfo;
  filters: any;
  sortData: any;
}

const state: InitState = {
  sources: [],
  boards: {},
  filters: {
    date: {},
    user: {},
    sort: {},
  },
  listDetailInfo: {
    list: [],
    total: 0,
    page: 1,
    maxPage: 1,
    limit: 30,
    key: null,
    source: "kw",
    id: "tous",
  },
  sortData: [
    {
      id: 1,
      title: "Date de mis en ligne",
    },
    {
      id: 2,
      title: "Ordre alphabetique",
    },
    {
      id: 3,
      title: "Nombre d'ecoute",
    },
  ],
};

for (const source of music.sources) {
  if (!music[source.id as LX.OnlineSource]?.leaderboard?.getBoards) continue;
  state.sources.push(source.id as LX.OnlineSource);
}

export default state;
