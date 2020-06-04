import React from 'react'
class AppError extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(_, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(errorInfo)
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong. Please refresh the app and check your internet connection</h1>;
      }
      return this.props.children; 
    }
  }

  export default AppError

