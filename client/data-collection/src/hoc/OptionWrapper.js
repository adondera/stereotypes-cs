import React from 'react'

const OptionWrapper = (props) => {
    var Child = props.children[0]
    return (<div>
        <Child {...props}/>
    </div>)
}

export default OptionWrapper