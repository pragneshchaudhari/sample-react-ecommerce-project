import React, { Component} from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true});

    // log error or send to reporting service
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if(this.state.hasError) {
      return <>
        <div className='flex flex-col grow'>
          <div className='container mx-auto px-4'>
            <div className='text-center py-2 px-3 my-2 bg-red-600 rounded-lg text-gray-50'>
              <span>Something went wrong.</span>
            </div>
          </div>
        </div>
      </>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;