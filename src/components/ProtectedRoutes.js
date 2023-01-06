import { useEffect } from 'react'
import Router from 'next/router'

const ProtectedRoute = (WrappedComponent) => {
  const ProtectedRouteComponent = (props) => {
    useEffect(() => {
      if (!props.session) {
        Router.push('/login')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  ProtectedRouteComponent.getInitialProps = async (context) => {

    return {
      ...(WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(context) : {})
    }
  }

  return ProtectedRouteComponent
}

export default ProtectedRoute
