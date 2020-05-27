import React from 'react'
const withProps = (props, component) => {
    return class extends React.Component {
        render() {
            return (
                <component {...props}/>
            )
        }
    }
}

export default withProps