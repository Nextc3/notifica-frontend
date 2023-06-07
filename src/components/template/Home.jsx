import React, { Component } from 'react';
import Main from '../template/Main';
import { Button, Checkbox, Form, Input } from 'antd';
import Card from '../template/Card';

import axios from 'axios';
import HomeOutlined from '@ant-design/icons';

/*
           <div className="form">
                   <div className="row">
                       <div className="col-12 col-md-6">
                           <div className="form-group">
                               <label>ID</label>
                               <input type="text" className="form-control"
                                   name="id"
                                   value={this.state.notificacao.id}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite o id..." />
                           </div>
                       </div>
                       <div className="col-12 col-md-6">
                           <div className="form-group">
                               <label>Nome</label>
                               <input type="text" className="form-control"
                                   name="nome"
                                   value={this.state.notificacao.nome}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite o nome..." />
                           </div>
                       </div>

                       <div className="col-12 col-md-6">
                           <div className="form-group">
                               <label>CPF</label>
                               <input type="text" className="form-control"
                                   name="cpf"
                                   value={this.state.notificacao.cpf}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite o cpf..." />
                           </div>
                       </div>
                   </div>

                   <hr />
                   <div className="row">
                       <div className="col-12 d-flex justify-content-end">
                           <button className="btn btn-primary"
                               onClick={e => this.save(e)}>
                               Salvar
                           </button>

                           <button className="btn btn-secondary ml-2"
                               onClick={e => this.clear(e)}>
                               Cancelar
                           </button>
                       </div>
                   </div>
               </div>
               */

const baseUrl = 'http://192.168.1.18:8080/notificacao/'
const initialState = {
    notificacao: { id: '', nome: '', cpf: '' },
    list: []
}

export default class Home extends Component {
    state = { ...initialState }
    
    componentWillMount(){
        axios(baseUrl).then(resp=> {
            this.setState({list: resp.data})
        })
    }

 

    clear() {
        this.setState({ notificacao: initialState.notificacao })
    }
    save() {
        let options = {
            url: baseUrl,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                id: parseInt(this.state.notificacao.id),
                cpf: this.state.notificacao.cpf,
                nome: this.state.notificacao.nome

            }
        };

        console.log(this.state.notificacao.id)
        console.log(this.state.notificacao.cpf)
        console.log(this.state.notificacao.nome)
        /*options.data.id = parseInt(this.state.notificacao.id)
        options.data.cpf = this.state.notificacao.cpf
        options.data.nome = this.state.notificacao.nome*/
        /*options.data(this.state.notificacao) */
        axios(options)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ notificacao: initialState.notificacao, list })

                console.log(resp.status)
            })
    }

    getUpdatedList(notificacao, add = true) {
        const list = this.state.list.filter(n => n.id !== notificacao.id)
        if(add) list.unshift(notificacao)
        return list
    }

    updateField(event) {

        const notificacao = { ...this.state.notificacao }
        notificacao[event.target.name] = event.target.value
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({ notificacao: notificacao })
    }
    remove(notificacao) {
        axios.delete(`${baseUrl}/${notificacao.id}`).then(resp => {
            const list = this.getUpdatedList(notificacao, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(notificacao => {
            return (
                <tr key={notificacao.id}>
                    <td>{notificacao.id}</td>
                    <td>{notificacao.name}</td>
                    <td>{notificacao.email}</td>
                    <td>
                    
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(notificacao)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }


    renderForm() {

        return (
            <div className="form">
                   <div className="row">
                       <div className="col-12 col-md-6">
                           <div className="form-group">
                               <label>ID</label>
                               <input type="text" className="form-control"
                                   name="id"
                                   value={this.state.notificacao.id}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite o id..." />
                           </div>
                       </div>
                       <div className="col-12 col-md-6">
                           <div className="form-group">
                               <label>Nome</label>
                               <input type="text" className="form-control"
                                   name="nome"
                                   value={this.state.notificacao.nome}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite o nome..." />
                           </div>
                       </div>

                       <div className="col-12 col-md-6">
                           <div className="form-group">
                               <label>CPF</label>
                               <input type="text" className="form-control"
                                   name="cpf"
                                   value={this.state.notificacao.cpf}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite o cpf..." />
                           </div>
                       </div>
                   </div>

                   <hr />
                   <div className="row">
                       <div className="col-12 d-flex justify-content-end">
                           <button className="btn btn-primary"
                               onClick={e => this.save(e)}>
                               Salvar
                           </button>

                           <button className="btn btn-secondary ml-2"
                               onClick={e => this.clear(e)}>
                               Cancelar
                           </button>
                       </div>
                   </div>
               </div>
            

        )




    }


    render() {
        console.log(this.state.list)

        return (


            <Main icon={<HomeOutlined />} title="Início"
                subtitle="Trabalho de Conclusão de Curso">
                <div className='display-4'>Bem Vindo!</div>
                <hr />
                <p className="mb-0">Sistema de armazenamento de Notificações Covid-19</p>
                <div className="teste">

                </div>
                {this.renderForm()}
                {this.renderTable()}
                {/*  <Card>

        </Card> */}
            </Main>
        )
    }
} 
