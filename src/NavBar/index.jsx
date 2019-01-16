/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { NavList }          from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';

export default class NavBar extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Navigation bar content (NavItems)
         */
        children  : PropTypes.node,
        /**
         *  CSS class name
         */
        className : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
    };

    static defaultProps =
    {
        children  : undefined,
        className : undefined,
        cssMap    : undefined,
    };

    static displayName = 'NavBar';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.NavBar, this.props ),
        } = this.props;

        return (
            <nav className = { cssMap.main }>
                <NavList>{ children }</NavList>
            </nav>
        );
    }
}
