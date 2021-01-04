
import axios from 'axios';
import { constaApi } from 'constants/constants';
import { setError,removeError, startLoading, finishLoading } from "../actions/ui";

export const loadColleges = async  () => {
        // dispatch( startLoading() );
    const colleges = [];
    const {data} = await axios.post(constaApi+'colleges')
    data.forEach(child => {
        colleges.push({
            id:child.id,
            ...child
        });
    });
        return colleges;
}