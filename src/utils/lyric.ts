
export function pad(n, z) {
  z = z || 2;
  return ('00' + n).slice(-z);
}


export const guard = (value, min, max) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

export const mergeObject = (target, obj) => {
  for (const i in obj) {
    if (target[i] !== obj[i]) {
      return {...target, ...obj};
    }
  }

  return target;
};

export function diff(o1, o2, deep = false) {
  let updated = {};
  let changed = false;
  for (const prop in o1) {
    if (o1.hasOwnProperty(prop)) {
      const o2PropValue = o2[prop];
      const o1PropValue = o1[prop];
      if (o2.hasOwnProperty(prop)) {
        if (o2PropValue === o1PropValue) {
          changed = false;
        } else {
          updated[prop] =
            deep && this.isObject(o1PropValue) && this.isObject(o2PropValue)
              ? this.diff(o1PropValue, o2PropValue, deep)
              : {newValue: o2PropValue};
          changed = true;
        }
      }
    }
  }
  for (const prop in o2) {
    if (o2.hasOwnProperty(prop)) {
      const o1PropValue = o1[prop];
      const o2PropValue = o2[prop];
      if (o1.hasOwnProperty(prop)) {
        if (o1PropValue !== o2PropValue) {
          if (!deep || !this.isObject(o1PropValue)) {
            updated[prop].oldValue = o1PropValue;
            changed = true;
          }
        }
      }
    }
  }
  return {updated, changed};
}
export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
export function differ(x, y, length) {
  let allIndex = [];
  for (let index = 0; index < length; index++) {
    let {changed, updated} = diff(x[index], y[index]);
    if (changed) {
      allIndex.push({
        index,
        ...updated,
      });
    }
  }
  return allIndex;
}


export type Fixed = 0 | 1 | 2 | 3;

export interface ILyric {
    time?: number;
    text: string;
}

export type State = Readonly<{
    info: Map<string, string>;
    lyric: readonly ILyric[];
}>;

export type TrimOptios = Partial<{
    trimStart: boolean;
    trimEnd: boolean;
}>;

export const parser = (lrcString: string, option: TrimOptios = {}): State => {
    const { trimStart = false, trimEnd = false } = option;

    const lines = lrcString.split(/\r\n|\n|\r/u);

    const timeTag = /\[\s*(\d{1,3}):(\d{1,2}(?:[:.]\d{1,3})?)\s*]/g;
    const infoTag = /\[\s*(\w{1,6})\s*:(.*?)]/;

    const info = new Map<string, string>();
    const lyric: ILyric[] = [];

    for (const line of lines) {
        // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
        if (line[0] !== "[") {
            lyric.push({
                text: line,
            });
            continue;
        }

        // now, line starts with "["
        timeTag.lastIndex = 0;
        const rTimeTag = timeTag.exec(line);
        if (rTimeTag !== null) {
            const mm = Number.parseInt(rTimeTag[1], 10);
            const ss = Number.parseFloat(rTimeTag[2].replace(":", "."));
            const text = line.slice(timeTag.lastIndex);

            lyric.push({
                time: mm * 60 + ss,
                text,
            });

            continue;
        }

        const rInfoTag = infoTag.exec(line);
        if (rInfoTag !== null) {
            const value = rInfoTag[2].trim();

            if (value === "") {
                continue;
            }

            info.set(rInfoTag[1], value);

            continue;
        }

        // if we reach here, it means this line starts with "[",
        // but not match time tag or info tag.

        lyric.push({
            text: line,
        });
    }

    if (trimStart && trimEnd) {
        lyric.forEach((line) => {
            line.text = line.text.trim();
        });
    } else if (trimStart) {
        lyric.forEach((line) => {
            line.text = line.text.trimStart();
        });
    } else if (trimEnd) {
        lyric.forEach((line) => {
            line.text = line.text.trimEnd();
        });
    }

    return { info, lyric };
};

const storedFormatter = new Map<Fixed, Intl.NumberFormat>();

const getFormatter = (fixed: Fixed) => {
    if (storedFormatter.has(fixed)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return storedFormatter.get(fixed)!;
    }
    const newFormatter = new Intl.NumberFormat("en", {
        minimumIntegerDigits: 2,
        minimumFractionDigits: fixed,
        maximumFractionDigits: fixed,
        useGrouping: false,
    });
    storedFormatter.set(fixed, newFormatter);
    return newFormatter;
};

export const convertTimeToTag = (time: number | undefined, fixed: Fixed, withBrackets = true): string => {
    if (time === undefined) {
        return "";
    }

    const formatter = getFormatter(fixed);

    const mm = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
    const ss = formatter.format(time % 60);

    return withBrackets ? `[${mm}:${ss}]` : `${mm}:${ss}`;
};

export const formatText = (text: string, spaceStart: number, spaceEnd: number): string => {
    let newText = text;
    if (spaceStart >= 0) {
        newText = " ".repeat(spaceStart) + newText.trimStart();
    }
    if (spaceEnd >= 0) {
        newText = newText.trimEnd() + " ".repeat(spaceEnd);
    }
    return newText;
};

export interface IFormatOptions {
    spaceStart: number;
    spaceEnd: number;
    fixed: Fixed;
    endOfLine?: "\n" | "\r\n" | "\r";
}

export const stringify = (state: State, option: IFormatOptions): string => {
    const { spaceStart, spaceEnd, fixed, endOfLine = "\r\n" } = option;

    /**const infos = Array.from(state.info.entries()).map(([name, value]) => {
        return `[${name}: ${value}]`;
    });**/

    const lines = state.lyric.map((line) => {
        if (line.time === undefined) {
            return line.text;
        }
        const text = formatText(line.text, spaceStart, spaceEnd);

        return `${convertTimeToTag(line.time, fixed)}${text}`;
    });
    return lines.join(endOfLine);
};
