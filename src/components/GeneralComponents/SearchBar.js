import React, { useState } from 'react'
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";
import '../../styles/checkStyle.css';
import axios from 'axios';
import { constaApi } from '../../constants/constants';
export default function SearchBar(props) {
  const [flag, setFlag] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  function checked() {
    setCheckbox(!checkbox);
  }
  function search(e) {
    setFlag(e.target.value);
    props.consult(e);
  }
  return (
    <div className="">
      <div class="row">
        <div class="col-4">
          <InputGroup

            className="no-border">
            <Input
              style={{
                color: flag != "" && '#35B5B8'
              }}
              onChange={(e) => search(e)}
              placeholder="Search..." />
            <InputGroupAddon addonType="append">
              <InputGroupText >
                <i className="nc-icon nc-zoom-split" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
        {/* <label class="custom-radio-checkbox">
    <input class="custom-radio-checkbox__input" 
    value={checkbox}
    checked={checkbox} type="checkbox" onClick={(e) => checked(e)} />
    <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
    <span class="custom-radio-checkbox__text">Ref.</span>
                 </label> */}
      </div>
    </div>
  )
}
