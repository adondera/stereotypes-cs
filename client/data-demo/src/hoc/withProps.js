import React from 'react'
const withProps = (props, Component) => {
    return class extends React.Component {
        render() {
            return (
                <Component {...props}/>
            )
        }
    }
}

export default withProps