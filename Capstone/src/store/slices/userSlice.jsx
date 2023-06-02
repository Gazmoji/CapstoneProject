import { createSlice } from "@reduxjs/toolkit"


const initialState = {

    name: 'Default',
    ending: 'none',
    score: 0
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setEnding: (state, action) => {
            state.ending = action.payload
        },
        upScore: (state, action) => {
            state.score += action.payload
        }
    }
})

export const { setName, setEnding, upScore } = userSlice.actions
export default userSlice.reducer