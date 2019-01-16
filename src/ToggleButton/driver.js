/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { createCssMap } from '../Theming';


const ERR = {
    TOGGLEBUTTON_ERR : ( label, event, state ) =>
        `ToggleButton '${label}' cannot simulate ${event} since it is ${state}`,
};


export default class ToggleButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    get instance()
    {
        return this.wrapper.instance();
    }

    get cssMap()
    {
        const { instance } = this;
        return instance.props.cssMap ||
            createCssMap( instance.context.ToggleButton, instance.props );
    }

    get button()
    {
        return this.wrapper.find( `.${this.cssMap.main}` ).first();
    }


    focus()
    {
        const label = this.wrapper.find( `.${this.cssMap.title}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .TOGGLEBUTTON_ERR( label, 'focus', 'disabled' ) );
        }

        this.button.simulate( 'focus' );
        return this;
    }

    blur()
    {
        const label = this.wrapper.find( `.${this.cssMap.title}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .TOGGLEBUTTON_ERR( label, 'blur', 'disabled' ) );
        }

        this.button.simulate( 'blur' );
        return this;
    }

    click()
    {
        const label = this.wrapper.find( `.${this.cssMap.title}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .TOGGLEBUTTON_ERR( label, 'click', 'disabled' ) );
        }

        this.button.simulate( 'click' );
        return this;
    }

    mouseOver()
    {
        const label = this.wrapper.find( `.${this.cssMap.title}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .TOGGLEBUTTON_ERR( label, 'mouseOver', 'disabled' ) );
        }

        this.button.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const label = this.wrapper.find( `.${this.cssMap.title}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .TOGGLEBUTTON_ERR( label, 'mouseOut', 'disabled' ) );
        }

        this.button.simulate( 'mouseleave' );
        return this;
    }
}
