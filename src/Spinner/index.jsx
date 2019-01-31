/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';
import { Icon }             from '..';


export default class Spinner extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Size of the Spinner
         */
        cssMap : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Size of the Spinner
         */
        size   : PropTypes.oneOf( [
            'S',
            'M',
            'L',
            'XL'
        ] ),
    };

    static defaultProps =
    {
        cssMap : undefined,
        size   : 'M',
    };

    static displayName = 'Spinner';

    render()
    {
        const {
            cssMap = createCssMap( this.context.Spinner, this.props ),
            size
        } = this.props;

        return (
            <Icon
                className = { cssMap.main }
                type = "loader"
                size = { size } />
        );
    }
}
