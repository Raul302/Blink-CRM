import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

export default function TableRemindersColleges() {
    const { remindersCollege } = useSelector(state => state.remindersColleges);
    const dispatch = useDispatch();

    return (
        <div class="col-12">
            <h2 class="text-center">
                Recordatorios Colegios
            </h2>
        </div>
    )
}
