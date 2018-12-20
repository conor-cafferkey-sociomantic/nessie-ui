/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children }     from 'react';
import PropTypes               from 'prop-types';

import { generateId }          from '../utils';
import { buildTagsFromValues } from './utils';
import ThemeContext            from '../Theming/ThemeContext';
import { createCssMap }        from '../Theming';

export default class TagInput extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         * Node containing Tag components ( overrides tags prop )
         */
        children     : PropTypes.node,
        /**
         *  CSS class name
         */
        className    : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap       : PropTypes.objectOf( PropTypes.string ),
        /**
         * Display as hover when required from another component
         */
        forceHover   : PropTypes.bool,
        /**
        *  specifies the height for the tag input (CSS length value)
        */
        height       : PropTypes.string,
        /**
         *  Display as error/invalid
         */
        hasError     : PropTypes.bool,
        /**
         *  HTML id attribute
         */
        id           : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled   : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly   : PropTypes.bool,
        /**
        *  Allows container to be resize by the user
        */
        isResizable  : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name         : PropTypes.string,
        /**
         * onBlur callback function
         */
        onBlur       : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange     : PropTypes.func,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClickClose : PropTypes.func,
        /**
         * onFocus callback function
         */
        onFocus      : PropTypes.func,
        /**
         * onKeyDown callback function
         */
        onKeyDown    : PropTypes.func,
        /**
         * onKeyPress callback function
         */
        onKeyUp      : PropTypes.func,
        /**
         * onKeyUp callback function
         */
        onKeyPress   : PropTypes.func,
        /**
         *  Input mouseOut callback function
         */
        onMouseOut   : PropTypes.func,
        /**
         *  Input mouseOver callback function
         */
        onMouseOver  : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder  : PropTypes.string,
        /**
         * Array of strings to build Tag components
         */
        tags         : PropTypes.arrayOf( PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.object,
        ] ) ),
        /**
         * Input's value
         */
        value : PropTypes.string,
    };

    static defaultProps =
    {
        children     : undefined,
        className    : undefined,
        forceHover   : false,
        hasError     : false,
        height       : undefined,
        id           : undefined,
        isDisabled   : false,
        isReadOnly   : false,
        isResizable  : false,
        name         : undefined,
        onBlur       : undefined,
        onChange     : undefined,
        onClickClose : undefined,
        onFocus      : undefined,
        onKeyDown    : undefined,
        onKeyPress   : undefined,
        onKeyUp      : undefined,
        onMouseOut   : undefined,
        onMouseOver  : undefined,
        placeholder  : undefined,
        tags         : undefined,
        value        : undefined,
    };

    static displayName = 'TagInput';

    inputRef = React.createRef();

    focus()
    {
        this.inputRef.current.focus();
    }

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.TagInput, this.props ),
            height,
            id = generateId( 'TagInput' ),
            isDisabled,
            isReadOnly,
            name,
            onBlur,
            onChange,
            onClickClose,
            onFocus,
            onKeyDown,
            onKeyPress,
            onKeyUp,
            onMouseOut,
            onMouseOver,
            placeholder,
            tags,
            value,
        } = this.props;

        let items = children ?
            Children.toArray( children ) : buildTagsFromValues( tags );

        items = items.map( tag =>
        {
            let handleClick;

            if ( !onClickClose )
            {
                handleClick = tag.props.onClick;
            }
            else if ( !tag.props.onClick )
            {
                handleClick =  onClickClose;
            }
            else
            {
                handleClick = ( ...args ) =>
                {
                    onClickClose( args );
                    tag.props.onClick( args );
                };
            }

            return React.cloneElement( tag, {
                ...tag.props,
                isDisabled : isDisabled || tag.props.isDisabled,
                isReadOnly : isReadOnly || tag.props.isReadOnly,
                onClick    : handleClick,
            } );
        } );

        return (
            <label
                className    = { cssMap.main }
                htmlFor      = { id }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }
                style        = { { height } }>
                { items }
                <input
                    className   = { cssMap.input }
                    disabled    = { isDisabled }
                    id          = { id }
                    name        = { name }
                    onBlur      = { onBlur }
                    onChange    = { onChange }
                    onFocus     = { onFocus }
                    onKeyDown   = { onKeyDown }
                    onKeyPress  = { onKeyPress }
                    onKeyUp     = { onKeyUp }
                    placeholder = { placeholder }
                    readOnly    = { isReadOnly }
                    ref         = { this.inputRef }
                    type        = "text"
                    value       = { value } />
            </label>
        );
    }
}
