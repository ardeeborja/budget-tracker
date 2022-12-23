import React from 'react'

//Context - is a way to pass datathrough the component tree without having to pass props manually

//Context can be a way for us to create a 'global' state that components can share AND update


//We're going to create a userContext so that we can share the data of the user between our components.

//Provider - every context oobj comes with a Provider React component. It allows components to subscribe to changes made to the context

const UserContext = React.createContext()

export const UserProvider = UserContext.Provider
export default UserContext