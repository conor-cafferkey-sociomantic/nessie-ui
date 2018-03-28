export default class PaginatorDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getShownPages()
    {
        const items = this.wrapper.find( 'Text div' ).children();
        return items.map( item => parseInt( item.node.value, 10 ) );
    }

    setShownPages( value )
    {
        return this.wrapper.setProps( {
            shownPages : value
        } );
    }

    clickPrev()
    {
        this.wrapper.find( 'IconButton' ).first().simulate( 'click' );
        return this;
    }

    clickNext()
    {
        this.wrapper.find( 'IconButton' ).last().simulate( 'click' );
        return this;
    }
}
