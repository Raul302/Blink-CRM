<div class="col-6">
        <div className="card card-user">
        <div>
        <center>
            <ModalImage
            className="modal-image"
            small={this.state.avatarTwo}
            medium={this.state.avatarTwo}
            large={domain +'c/'+id + '/'+ this.state.name_calendar}
            alt={this.state.name_calendar}
            />;
            </center>
            <input
            disabled={!this.state.calendar}
            type="file" className="form-control profile-pic-uploader" name="calendar" onChange={this.uploadFile} />
            { (uploadPercentage > 0 && turn === 1) && <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`} /> }
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