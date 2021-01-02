

//library code 
function createStore(reducer){
    let state;
    let listeners =[]

    const getState=()=> state
    const subScribe=(listen)=>{ 
        listeners.push(listen);
        return() => {
            listeners = listeners.filter((l) => l!==listeners)
        }

        // ES5寫法
        // return function(){
        //     listeners = listeners.filter(function(l){
        //         return l !== listeners;
        //     });
        // };
    }
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
          listeners = listeners.filter((l) => l !== listener)
        }
      }
    const dispatch=(action)=>{
        state = reducer(state, action)
        listeners.forEach((listen) => listen())
    }

    return{
        getState,
        subScribe,
        subscribe,
        dispatch
    }
}


// User made 
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function addTodoAction (todo) {
    return {
        type:ADD_TODO,
        todo,
    }
}
function removeTodoAction (id) {
    return {
        type:REMOVE_TODO,
        id,
    }
}
function toggleTodoAction (id) {
    return {
      type: TOGGLE_TODO,
      id,
    }
  }


function addGoalAction (goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}


function removeGoalAction (id) {
    return {
      type: REMOVE_GOAL,
      id,
    }
  }
  

function todo (state=[], action) {
    switch(action.type){
        case ADD_TODO:
            return  state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id === action.todo.id)
        case TOGGLE_TODO : 
            return state.map((todo) => todo.id !== action.todo.id ? todo : (
                Object.assign({}, todo, {complete: !todo.complete})
            ))
        default:
            return state;
    }
}

function goal (state=[], action) {
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id === action.goal.id)
        default :
            return state;
    }
}

function app (state={}, action){
    return ( //but to sum up, the app function will return an object which attributes are arrays
        {
            todo: todo(state.todo, action), //this might get an array [a, b, c]
            goal: goal(state.goal, action) //if not this reduce then return []
        }
    )
}
const store = createStore(app);

//tell when the state change what we are going to do 
store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

//這時候回傳的State是一個object
// store.dispatch({
//     type: 'ADD_TODO',
//     todo: {...}
// })
store.dispatch(addTodoAction({
    id: 1,
    name: 'loss 20 pounds'
}))