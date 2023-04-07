import {createStore} from 'redux';

const store = createStore(counterReducer);
console.log('initialData: ', store.getState());

const unsubscribe = store.subscribe(handleCount);

store.dispatch({type: 'increment'});
store.dispatch({type: 'decrement'});

unsubscribe();

function handleCount() {
  const latestState = store.getState();
  console.log('latestState: ', latestState);
}

function counterReducer(
  state: { counter: number } = {counter: 0},
  action: { type: 'increment' | 'decrement' }
) {
  switch (action.type) {
    case 'increment': {
      return {
        counter: state.counter + 1

      };
    }
    case 'decrement': {
      return {
        counter: state.counter - 1
      };
    }
  }

  return state;
}
