var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
var should = require('chai').should();
var chaiHttp = require('chai-http');
var server = 'http://localhost:8080';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Tarjeta De Credito', function(){
        describe('Crear tarjeta', function(){
        //Nombrefuncion_Scenario_valorEsperado
            var cuenta = {
                NumeroDeTarjeta: '0506-1991-0051-9456',
                NombreDelCliente: 'Antonio Sosa',
                NumeroDePin: 4538,
                TipoDeTarjeta: 'visa',
                LimiteDeCredito: 20000,
                FechaDeCorte: '2019/09/03',
                FechaDeExpiracion:'2019/12/23'
            };     
            it('CrearTarjeta_NoExisteNumeroDeTarjeta_RetornaSucessTrue', (done) => {
                chai.request(server)
                .post('/api/v1/cuenta/creartarjeta')
                .send(cuenta).then((res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('success');
                    res.body.should.have.property('success').be.equal(true);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
            it('CrearCuenta_SiExisteNumeroDeTarjeta_RetornaSucessFalse', (done) => {
                    chai.request(server)
                    .post('/api/v1/cuenta/creartarjeta')
                    .send(cuenta).then((res)=>{
                        res.should.have.status(400);
                        res.body.should.have.property('success');
                        res.body.should.have.property('success').be.equal(false);
                        done();
                    }).catch((err) => {
                        done(err);
                    });
            })
        });
        describe('Compra', function(){ 
            var limite = {
                NumeroDeTarjeta: '0506-1991-0051-9456',
                NumeroDePin: 4538,
                TipoDeTarjeta: 'visa',
                NombreDelCliente: 'Antonio Sosa',
                Monto: 1500
            };
            var limite2 = {
                NumeroDeTarjeta: '0506-1991-0051-9456',
                NumeroDePin: 4538,
                TipoDeTarjeta: 'visa',
                NombreDelCliente: 'Antonio Sosa',
                Monto: 21000
            };
            var registro = {
                NumeroDeTarjeta: '0506-1991-0051-9456',
                NumeroDePin: 4538,
                TipoDeTarjeta: 'visa',
                NombreDelCliente: 'Antonio Sosa',
                Monto: 599
            };
            it('Compra_SiHayLimiteDisponible_RetornaSucessTrue', (done) => {
                chai.request(server)
                .post('/api/v1/cuenta/compra')
                .send(limite)
                .then((res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('success');
                    res.body.should.have.property('success').be.equal(true);
                    done();
                }).catch((err) => {
                    done(err);
                });
            })
            it('Compra_NoHayLimiteDisponible_RetornaSucessFalse', (done) => {
                chai.request(server)
                .post('/api/v1/cuenta/compra')
                .send(limite2)
                .then((res)=>{
                    res.should.have.status(400);
                    res.body.should.have.property('success');
                    res.body.should.have.property('success').be.equal(false);
                    done();
                }).catch((err) => {
                    done(err);
                });
            })
            it('Compra_RegistroNoDuplicado_RetornaSucessTrue', (done) => {
                chai.request(server)
                .post('/api/v1/cuenta/compra')
                .send(registro).then((res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('success');
                    res.body.should.have.property('success').be.equal(true);
                    done();
                }).catch((err) => {
                    done(err);
                });
            })
            it('Compra_ElRegistroEstaDuplicado_RetornaSucessFalse', (done) => {
                chai.request(server)
                .post('/api/v1/cuenta/compra')
                .send(registro).then((res)=>{
                    res.should.have.status(400);
                    res.body.should.have.property('success');
                    res.body.should.have.property('success').be.equal(false);
                    done();
                }).catch((err) => {
                    done(err);
                });
            })
            it('Compra_ElPinEsCorrecto_RetornaSucessTrue', (done) => {
                chai.request(server)
                .post('/api/v1/cuenta/compra')
                .send(pin)
                .then((res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('success');
                    res.body.should.have.property('success').be.equal(true);
                    done();
                }).catch((err) => {
                    done(err);
                });
            })
            it('Compra_ElPinEsIncorrecto_RetornaSucessFalse', (done) => {
                chai.request(server)
                .post('/api/v1/cuenta/compra')
                .send(pin2)
                .then((res)=>{
                    res.should.have.status(400);
                    res.body.should.have.property('success');
                    res.body.should.have.property('success').be.equal(false);
                    done();
                }).catch((err) => {
                    done(err);
                });
            })
        });
});
