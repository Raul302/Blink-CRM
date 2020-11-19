import React from 'react'
import { useParams} from "react-router";

function TabOne() {
    let { id } = useParams();

    return (
        <>
            <div className="mt-3 container cwml">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Informacion</h5>
                        <div class="row">
                            <div class="col-3">
                            <h6 class="card-subtitle mb-2 text-muted">Nombre</h6>
                            </div>
                            <div class="col-6">
                                {id}
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-3">
                            <h6 class="card-subtitle mb-2 text-muted">Edad</h6>
                            </div>
                            <div class="col-6">
                                {id}
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-3">
                            <h6 class="card-subtitle mb-2 text-muted">Colegio</h6>
                            </div>
                            <div class="col-6">
                                {id}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-3">
                    <div class="card-body">
                        <h5 class="card-title">Direccion</h5>
                        <div class="row">
                            <div class="col-3">
                            <h6 class="card-subtitle mb-2 text-muted">Nombre</h6>
                            </div>
                            <div class="col-6">
                                {id}
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-3">
                            <h6 class="card-subtitle mb-2 text-muted">Edad</h6>
                            </div>
                            <div class="col-6">
                                {id}
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-3">
                            <h6 class="card-subtitle mb-2 text-muted">Colegio</h6>
                            </div>
                            <div class="col-6">
                                {id}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-3">
                    <div class="card-body">
                        <h5 class="card-title">Otra informacion</h5>
                        <div class="row">
                            <div class="col-3">
                            <h6 class="card-subtitle mb-2 text-muted">Nombre</h6>
                            </div>
                            <div class="col-6">
                                {id}
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-3">
                            <h6 class="card-subtitle mb-2 text-muted">Edad</h6>
                            </div>
                            <div class="col-6">
                                {id}
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-3">
                            <h6 class="card-subtitle mb-2 text-muted">Colegio</h6>
                            </div>
                            <div class="col-6">
                                {id}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TabOne
