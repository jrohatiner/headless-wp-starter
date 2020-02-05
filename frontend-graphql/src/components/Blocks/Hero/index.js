/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Hero = ({ attributes, innerBlocks, originalContent }) => {
  // console.log('inner', innerBlocks);
  // console.log('content', originalContent);
  const {
    align,
    backgroundColor,
    backgroundImg,
    backgroundSize,
    backgroundType,
    className,
    contentAlign,
    customBackgroundColor,
    height,
    layout,
    marginSize,
    maxWidth,
    paddingSize,
    textColor
  } = attributes;

  const hasBackgroundColor = backgroundColor || customBackgroundColor;
  const hasBackgroundImg = backgroundImg;

  // @todo: use classnames package to build classnames;
  // @todo: CSSinJS
  // @todo: regex to strip HTML && spacing from all originalContent.
  const classNames = `mwd__hero ${hasBackgroundColor ? 'mwd__bkg-color' : null}`;
  return (
    <div className={classNames}>
      {hasBackgroundImg && (
        <img
          src={backgroundImg}
          alt=""
          style={{
            backgroundSize,
            height
          }}
        />
      )}
      {innerBlocks && (
        innerBlocks.map(block => (
          <div
            key={block.name}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: block.originalContent,
            }}
          />
        ))
      )}
    </div>
  )
};

export default Hero;

Hero.propTypes = {
  attributes: PropTypes.shape({}).isRequired,
  innerBlocks: PropTypes.array.isRequired,
  originalContent: PropTypes.string,
};

Hero.defaultProps = {
  originalContent: ''
};