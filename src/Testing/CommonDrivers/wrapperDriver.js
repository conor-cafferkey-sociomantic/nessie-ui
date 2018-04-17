export default class WrapperDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
    }

    getContent( selector = `.${this.cssMap.default}` )
    {
        return this.wrapper.find( selector ).first().children();
    }
}
