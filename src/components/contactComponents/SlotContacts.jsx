import { Link } from "react-router-dom";
import *  as RIcons from "react-icons/ri";
import { activeContact } from "actions/contacts/contacts/contacts";
import { useDispatch, useSelector } from 'react-redux';

export const SlotName = function SlotName(props) {
    const dispatch = useDispatch();

    const showName = (id = null, fullname = "") => {
        const click = () => {
        dispatch( activeContact(props.data) );
    }
        let n = fullname ? fullname.split(" ") : " ";
        let tag = '';
        n = n ? n[0].charAt(0) + n[1].charAt(0) : null;
        tag = <>
            <Link  onClick={(e) => click(props.data)} to={"contacts/" + (id) + "/bio"}>
                <span class="mt-1 mr-2 sc-caSCKo fXbvQO styles__Company-sc-103gogw-0 jdbeFR">{n}</span>
                <span>{fullname} </span>
            </Link>
        </>;
        return tag;
    }
    return (
        <>
            <span>{showName(props.data.id, props.data.fullname)}</span>
        </>
    )
}

export const SlotOrigin = function SlotOrigin(props) {
    const { city, state } = props.data;
    return (
        <>
            <span>{city ? city + ',' : ''}{state ? state : ''}</span>
        </>
    )
}

export const SlotProgram = function SlotProgram(props) {
    const { id_program: program, year } = props.data;
    return (
        <>
            <span>{program} {year}</span>
        </>
    )
}


{/* <tr key={row.id}>
                                                <td><RIcons.RiUser3Fill size={32} />
                                                    <Link to={"contacts/" + (row.id) + "/bio"} > {row.name} {row.father_lastname} {row.mother_lastname} </Link></td>
                                                <td>
                                                {(row.city ? row.city : ' ') + (row.state ? ', ' + row.state : '')}
                                                </td>
                                                <td>{row.id_program} {row.year}</td>
                                                <td>
                                                    <a> <RIcons.RiEyeFill onClick={(e) => showModal(row.id)} style={{ color: '#79B9E1' }} size={18} /></a>
                                                </td>
                                            </tr> */}