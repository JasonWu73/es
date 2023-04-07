import {createStore} from 'redux';

const store = createStore(counterReducer);
console.log('initialData: ', store.getState());

store.subscribe(handleCount);

store.dispatch({type: 'increment'});

function handleCount() {
  const latestState = store.getState();
  console.log('latestState: ', latestState);
}

function counterReducer(state: { counter: number } = {counter: 0}) {
  return {
    counter: state.counter + 1
  };
}
