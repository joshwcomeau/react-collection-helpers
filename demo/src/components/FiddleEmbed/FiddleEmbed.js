import React, { PropTypes } from 'react';

import './FiddleEmbed.scss';


const FiddleEmbed = ({
  fiddleId,
  height,
  revision,
  panes,
  bodyColor,
  accentColor,
  menuColor,
  children,
}) => {
  let url = `//jsfiddle.net/joshwcomeau/${fiddleId}/`;

  if (revision) {
    url += `${revision}/`;
  }

  url += `embedded/${panes.join(',')}/?
    bodyColor=${bodyColor}&
    accentColor=${accentColor}&
    menuColor=${menuColor}`.replace(/\s/g, '');

  return (
    <div className="FiddleEmbed" style={{ height }}>
      <iframe
        width="100%"
        height={height}
        src={url}
        allowFullScreen="allowfullscreen"
        frameBorder="0"
      />
      {children && <div className="annotation">{children}</div>}
    </div>
  );
};

FiddleEmbed.propTypes = {
  fiddleId: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  panes: PropTypes.arrayOf(PropTypes.oneOf([
    'js',
    'html',
    'css',
    'result',
  ])),
  revision: PropTypes.number,
  bodyColor: PropTypes.string.isRequired,
  accentColor: PropTypes.string.isRequired,
  menuColor: PropTypes.string.isRequired,
}

FiddleEmbed.defaultProps = {
  height: 300,
  panes: ['js', 'result'],
  bodyColor: 'FFFFFF',
  accentColor: '3498DB',
  menuColor: 'F2F5F6',
};

export default FiddleEmbed
