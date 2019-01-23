/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const ERR = {
    TEXTINPUT_ERROR : ( event, state ) =>
        `TextInput cannot simulate ${event} since it is ${state}`,
};

export default class TextInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERROR( 'blur', 'disabled' ) );
        }

        this.wrapper.simulate( 'blur' );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERROR( 'focus', 'disabled' ) );
        }

        this.wrapper.simulate( 'focus' );
        return this;
    }

    change( val, input = 'input' )
    {
        const node = this.wrapper.find( input ).instance();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERROR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTINPUT_ERROR( 'change', 'read only' ) );
        }

        node.value = val;
        this.wrapper.simulate( 'change' );

        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERROR( 'click', 'disabled' ) );
        }

        this.wrapper.simulate( 'click' );
        return this;
    }

    keyPress( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERROR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.simulate( 'keyPress', { keyCode, which: keyCode } );
        return this;
    }

    keyDown( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERROR( 'keyDown', 'disabled' ) );
        }

        this.wrapper.simulate( 'keyDown', { keyCode, which: keyCode } );
        return this;
    }

    keyUp( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERROR( 'keyUp', 'disabled' ) );
        }

        this.wrapper.simulate( 'keyUp', { keyCode, which: keyCode } );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseover' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseout' );
        return this;
    }
}