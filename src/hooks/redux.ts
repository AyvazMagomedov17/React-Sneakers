
import { put, PutEffect, select } from 'redux-saga/effects'
import { AppDispatchType, RootStateType } from './../redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
