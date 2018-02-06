import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import IconButton           from '../IconButton';
import Text                 from '../Text';

const Tag = ( {  children, className, cssMap, label, ...props } ) =>
{
    const { isDisabled } = props;

    const labelString = typeof children === 'string' ? children : label;

    return (
        <Css
            cssMap   = { cssMap }
            cssProps = { { disabled: isDisabled } }
        >
            <div className = { className }>
                <Text overflowIsHidden className = { cssMap.label }>
                    { labelString }
                </Text>
                <IconButton
                    { ...props }
                    iconType   = "close"
                    iconSize   = "M"
                    className  = { cssMap.delete }
                />
            </div>
        </Css>
    );
};

Tag.propTypes =
{
    /**
     *  Display as disabled
     */
    isDisabled : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly : PropTypes.bool,
    /**
     *  Tag label (string)
     */
    label      : PropTypes.string,
    /**
     *  Tag label (string; overrides label prop)
     */
    children   : PropTypes.string,
    /**
     *   onClick callback function for delete icon
     */
    onClick    : PropTypes.func,
    /**
     * Display as hover when required from another component
     */
    forceHover : PropTypes.bool

};

Tag.defaultProps =
{
    isDisabled : false,
    isReadOnly : false,
    forceHover : false,
    cssMap     : require( './tag.css' )
};

export default Tag;
