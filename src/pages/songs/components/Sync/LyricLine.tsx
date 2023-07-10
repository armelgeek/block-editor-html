import React, { memo } from 'react';
import { convertTimeToTag, formatText } from '../../../../utils/lyric';

const LyricLine = memo(({ line, index, highlight, select, error }:any) => {
  const lineTime = convertTimeToTag(line.time, 3);
  const lineText = formatText(line.text, 1, 0);
  const className = Object.entries({
                line: true,
                select,
                highlight,
                error,
            })
                .reduce((p, [name, value]) => {
                    if (value) {
                        p.push(name);
                    }
                    return p;
   }, [])
                .join(' ');
  return (
    <li className={className}
      key={index}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:10,
        paddingBottom:10,
        marginBottom:5,
        backgroundColor: error ? '#f1c1c0' : 'transparent',
      }}
    >
      <div
        style={{
          width: '100%',
          fontSize:"20px",
          display:'flex'
       //   backgroundColor:  highlight ? 'green' : 'transparent'
        }}
      >
          {error && (
            <div>{error}</div>
          )}
          {select && (
            <div style={{
              marginLeft:5,
              marginRight:5,
              color: 'green'
            }}>
              {"  >  "}
            </div>
          )}
          {lineTime}
          {lineText}
      </div>
    </li>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.line === nextProps.line &&
    prevProps.index === nextProps.index &&
    prevProps.select === nextProps.select &&
    prevProps.error === nextProps.error &&
    prevProps.highlight === nextProps.highlight &&
    prevProps.theme === nextProps.theme
  );
});

export default LyricLine;
