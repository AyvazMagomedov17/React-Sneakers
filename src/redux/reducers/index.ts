
const initialState = {
    people: [] as Array<any>,
    posts: [] as Array<any>
}
export const SET_PEOPLE = 'reducer/SET_PEOPLE'
export const LOAD_DATA = 'reducer/LOAD_DATA'
export const SET_POSTS = 'reducer/SET_POSTS'
type initialStateType = typeof initialState

const reducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_PEOPLE:
            return { ...state, people: [...state.people, action.payloud] }
        case SET_POSTS:
            return { ...state, posts: [...state.posts, action.payloud] }
        default:
            return state
    }

}

export default reducer