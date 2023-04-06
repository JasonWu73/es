import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

// Reading Data with useSelector
// The `useSelector` hook lets our component extract whatever pieces of data it needs from the Redux store state:
// const counter = useAppSelector(state => state.counter);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Dispatching Actions with useDispatch
// The `useDispatch` hook gives us the actual dispatch method from the Redux store:
// const dispatch = useAppDispatch();
export const useAppDispatch: () => AppDispatch = useDispatch;
