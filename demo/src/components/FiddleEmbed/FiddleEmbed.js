import React, { PropTypes } from 'react';

import './FiddleEmbed.scss';


const FiddleEmbed = ({ fiddleId, bodyColor, accentColor, menuColor }) => {
  const url = `//jsfiddle.net/joshwcomeau/${fiddleId}/embedded/js/?bodyColor=${bodyColor}&accentColor=${accentColor}&menuColor=${menuColor}`;

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
  bodyColor: PropTypes.string.isRequired,
  accentColor: PropTypes.string.isRequired,
  menuColor: PropTypes.string.isRequired,
}

FiddleEmbed.defaultProps = {
  bodyColor: 'FFFFFF',
  accentColor: '3498DB',
  menuColor: 'F2F5F6',
};

export default FiddleEmbed
