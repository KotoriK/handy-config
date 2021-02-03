const {argv} = process
function _parseItem(item:string){
    const _item = item.split('=')
    if(_item.length>1){
        return [_item[0],_item.slice(1).join('=')]
    }else{
        return [_item[0],true]
    }
}
export const getConfigFromArgv=()=>Object.fromEntries(argv.map(_parseItem))
