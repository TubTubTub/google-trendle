import { createContext, useReducer } from 'react'

const profileReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.payload
            }
        case 'SET_STATISTICS':
            return {
                ...state,
                statistics: action.payload
            }
        default:
            return state
    }
}

const ProfileContext = createContext()

const initialValues = {
    profile: null,
    statistics: {
        averageScore: null,
        rank: null
    }
}

export const ProfileContextProvider = (props) => {
    const [profile, profileDispatch] = useReducer(profileReducer, initialValues)

    return (
        <ProfileContext.Provider value={[profile, profileDispatch]}>
            {props.children}
        </ProfileContext.Provider>
    )
}

export default ProfileContext