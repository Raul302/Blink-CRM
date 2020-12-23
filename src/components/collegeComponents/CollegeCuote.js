

import React, { Component } from "react";
import {ProgressBar,Form} from 'react-bootstrap';
import axios from 'axios';
import { store } from "store/store";
import Colleges from "pages/Colleges";

var college;
export class CollegeCuote extends Component {
constructor(props){
    super(props)
    college = store.getState().colleges ? store.getState().colleges.active : null;
    this.getDocs();
}
  state = {
    uploadPercentage: 0,
    avatar: '',
    avatarTwo: '',
    cicly:null,
    calendar:null,
    turn:0,
    id:null,
  }
  
  componentDidMount = () =>{
    const {avatar} = this.props;
    this.setState({ avatar })
}

uploadFile = ({ target: { files,name } }) =>{
    let data = new FormData();
    data.append('idCollege',college.id);
    if(this.state.id){
        data.append('id',this.state.id);
    }
    if(name === 'cicly'){
        data.append( 'cuote', files[0] )
        data.append( 'cuote_cicly', this.state.cicly)
    } else {
        data.append( 'calendar', files[0] )
        data.append( 'calendar_date', this.state.cicly)
    }
    
    const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        console.log( `${loaded}kb of ${total}kb | ${percent}%` );
        if( percent < 100 ){
          this.setState({ uploadPercentage: percent })
        }
      }
    }
    axios({
        method:'post',
        url:"http://api.boardingschools.mx/api/files/upload",
        data:data,
        options,
        headers: {'Content-Type':'multipart/form-data'}
        }
        ).then(res => { 
            console.log(res);
        const {file_path_cuote,domain,file_path_calendar,id} = res.data;
        this.setState({ id:id,avatar: domain + file_path_cuote,avatarTwo: domain + file_path_calendar, uploadPercentage: 100 }, ()=>{
          setTimeout(() => {
            this.setState({ uploadPercentage: 0 })
          }, 1000);
        })
    })
  }
  handleValid = (e) => {
    this.setState({cicly:e.target.value,turn:0})
  }
  handleValidTwo = (e) => {
    this.setState({calendar:e.target.value,turn:1})
  }
  getDocs = () => {
    const {id} = college;
    axios.post('http://api.boardingschools.mx/api/files/index', { id: id })
    .then( res => {
        console.log(res.data);
        const{ domain } = res.data;
        const {file_path_cuote,calendar,cicly,file_path_calendar,id} = res.data[0];
        this.setState({ id:id,calendar:calendar,cicly:cicly,avatar: domain + file_path_cuote,avatarTwo: domain + file_path_calendar});
        console.log(this.state);
    }).catch(error => {
    });
  }
  render() {
    const {uploadPercentage,turn} = this.state;
    return (
    <div class="row">
    <div class="col-6">
    <div className="card card-user">
        <div>
            <center>
            <img
                className="avatar border-gray"
                src={this.state.avatar}
                alt="..."
            />
            </center>
            <input
            disabled={!this.state.cicly}
            type="file" className="form-control profile-pic-uploader" name="cicly" onChange={this.uploadFile} />
            { (uploadPercentage > 0 && turn == 0) && <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`} /> }
        </div>
        <div class="row">
            <div class="col">
            <Form.Label className="formGray">Ciclo Cuota</Form.Label>
                                    <Form.Control autoComplete="off" onChange={this.handleValid} 
                                    value={this.state.cicly} name="cicly"  as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        <option value="2015-2016">2015 - 2016</option>
                                        <option>2016 - 2017</option>
                                        <option>2017 - 2018</option>
                                        <option>2018 - 2019</option>
                                        <option>2019 - 2020</option>
                                        <option>2020 - 2021</option>
                                        <option>2021 - 2022</option>
                                        <option>2022 - 2023</option>
                                        <option>2023 - 2024</option>
                                        <option>2024 - 2025</option>
                                        <option>2025 - 2026</option>
                                        <option>2026 - 2027</option>
                                        <option>2027 - 2028</option>
                                        <option>2028 - 2029</option>
                                        <option>2029 - 2030</option>
                                        <option>2030 - 2031</option>
                                    </Form.Control>
            </div>
        </div>
        </div>
        </div>
        <div class="col-6">
        <div className="card card-user">
        <div>
            <center>
            <img
                className="avatar border-gray"
                src={this.state.avatarTwo}
                alt="..."
            />
            </center>
            <input
            disabled={!this.state.calendar}
            type="file" className="form-control profile-pic-uploader" name="calendar" onChange={this.uploadFile} />
            { (uploadPercentage > 0 && turn == 1) && <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`} /> }
        </div>
        <div class="row">
            <div class="col">
            <Form.Label className="formGray">Ciclo Calendario</Form.Label>
                                    <Form.Control autoComplete="off" onChange={this.handleValidTwo} 
                                    value={this.state.calendar} name="cicly"  as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        <option value="2015-2016">2015 - 2016</option>
                                        <option>2016 - 2017</option>
                                        <option>2017 - 2018</option>
                                        <option>2018 - 2019</option>
                                        <option>2019 - 2020</option>
                                        <option>2020 - 2021</option>
                                        <option>2021 - 2022</option>
                                        <option>2022 - 2023</option>
                                        <option>2023 - 2024</option>
                                        <option>2024 - 2025</option>
                                        <option>2025 - 2026</option>
                                        <option>2026 - 2027</option>
                                        <option>2027 - 2028</option>
                                        <option>2028 - 2029</option>
                                        <option>2029 - 2030</option>
                                        <option>2030 - 2031</option>
                                    </Form.Control>
            </div>
        </div>
        </div>
        </div>
        </div>

    
    );
}
}

export default CollegeCuote;

