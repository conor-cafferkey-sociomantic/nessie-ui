/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React                                      from 'react';
import ReactDOM                                   from 'react-dom';
import { Manager, Reference, Popper }             from 'react-popper';
import PropTypes                                  from 'prop-types';

const PopperWrapper = props =>
{
    const {
        children,
        container,
        isVisible,
        popper,
        popperOffset,
        popperPosition,
    } = props;

    let offset = '';

    switch ( popperOffset )
    {
    case 'S':
        offset = '8px';
        break;
    case 'M':
        offset = '16px';
        break;
    case 'L':
        offset = '24px';
        break;
    case 'XL':
        offset = '32px';
        break;
    default:
        offset = '16px';
    }

    let popperComponent = children;

    if ( isVisible )
    {
        popperComponent = (
            <Manager>
                <Reference>
                    { ( { ref } ) => (
                        <div ref = { ref }>
                            { children }
                        </div>
                    ) }
                </Reference>
                { ReactDOM.createPortal(
                    <Popper
                        placement = { popperPosition }
                        modifiers = { { offset: { offset: `0, ${offset}` } } }>
                        { ( { ref, style } ) => (
                            <div
                                ref   = { ref }
                                style = { style }>
                                { popper }
                            </div>
                        ) }
                    </Popper>,
                    container ? document.querySelector( container ) :
                        document.body,
                ) }
            </Manager>
        );
    }

    return popperComponent;
};

PopperWrapper.propTypes =
{
    /**
     *  Reference node to attach popper
     */
    children       : PropTypes.node,
    /**
     *  id of the DOM element used as container
     */
    container      : PropTypes.string,
    /**
     *  Show / Hide popper
     */
    isVisible      : PropTypes.bool,
    /**
     *  Popper content node
     */
    popper         : PropTypes.node,
    /**
     *  Popper offset
     */
    popperOffset   : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL' ] ),
    /**
     *  Popper position
     */
    popperPosition : PropTypes.oneOf( [
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
    ] ),
};

PopperWrapper.defaultProps =
{
    children       : undefined,
    container      : undefined,
    isVisible      : false,
    popper         : undefined,
    popperOffset   : 'M',
    popperPosition : 'auto',
};

PopperWrapper.displayName = 'PopperWrapper';

export default PopperWrapper;
