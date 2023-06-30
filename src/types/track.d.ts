export type MyDate = string | number | Date;

export interface Base {
  createAt?: MyDate;
  updateAt?: MyDate;
  modifiedAt?: MyDate;
}

export interface Track extends Base {
  uuid?: string;
  //
  src?: string | undefined;
  title?: string;
  artist?: string;
  artists?: string;
  album?: string;
  //
  duration?: number;
  date?: MyDate;
  genre?: string;
  picture?: string;
  pictureBuffer?: ArrayBuffer;
  //
  albumKey?: string;
}

export interface Album extends Base {
  uuid?: string;
  key: string;
  pb?: ArrayBuffer;
  children?: Track[];
}

export type LyricScript = {
  start: number;
  text: string;
  end: number;
};

export type PlayOrder =
  | 'in-order'
  | 'shuffle'
  | 'repeat'
  | 'loop'