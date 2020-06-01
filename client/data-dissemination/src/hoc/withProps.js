import React from 'react'
const withProps = (props, Component) => {
    return class extends React.Component {
        render() {
            console.log(props)
            return (
                <Component {...props}/>
            )
        }
    }
}

export default withProps