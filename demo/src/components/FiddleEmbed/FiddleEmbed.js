import React, { PropTypes } from 'react';

import './FiddleEmbed.scss';


const FiddleEmbed = ({
  fiddleId,
  revision,
  panes,
  bodyColor,
  accentColor,
  menuColor,
}) => {
  let url = `//jsfiddle.net/joshwcomeau/${fiddleId}/`;

  if (revision) {
    url += `${revision}/`;
  }

  url += `embedded/${panes.join(',')}/?
    bodyColor=${bodyColor}&
    accentColor=${accentColor}&
    menuColor=${menuColor}`.replace(/\s/g, '');

  console.log({ url })

  return (
    <div className="FiddleEmbed">
      <iframe
        width="100%"
        height="300"
        src={url}
        allowFullScreen="allowfullscreen"
        frameBorder="0"
      />
    </div>
  );
};

FiddleEmbed.propTypes = {
  fiddleId: PropTypes.string.isRequired,
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
  panes: ['js', 'result'],
  bodyColor: 'FFFFFF',
  accentColor: '3498DB',
  menuColor: 'F2F5F6',
};

export default FiddleEmbed
