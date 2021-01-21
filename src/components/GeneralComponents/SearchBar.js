import React,{useState} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";
import axios from 'axios';
import { constaApi } from '../../constants/constants';
export default function SearchBar(props) {
  const [results,setResults] = useState();
  async function search(e){
    await axios.post(constaApi+'search/contact',{query:e.target.value})
    .then(function (response) {
      let {data} = response;
      props.setData(data);
    });
  }
    return (
        <div className="mb-n5">
          <div class="row">
            <div class="col-4">
         <InputGroup className="no-border">
                <Input onChange={(e) => search(e)} placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText >
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            </div>
        </div>
    )
}
