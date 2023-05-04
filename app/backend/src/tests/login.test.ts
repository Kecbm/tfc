import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const dataUser =  {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin'
};

 describe('Testando a rota POST /login', () => {
   describe('Caso de sucesso:', () => {
     let chaiHttpResponse: Response;
   
     before(async () => {
       sinon
         .stub(User, "findOne")
         .resolves(dataUser as User);
     });
   
     after(()=>{
       (User.findOne as sinon.SinonStub).restore();
     })
   
     it('Login com usuário válido', async () => {
       chaiHttpResponse = await chai
          .request(app).post('/login').send({
            email: 'admin@admin.com',
            password: 'secret_admin'
          });
   
       expect(chaiHttpResponse).to.equal(200);
     });
   });

   describe('Caso de falha:', () => {
     let chaiHttpResponse: Response;
   
     before(async () => {
       sinon
         .stub(User, "findOne")
         .resolves({} as User);
     });
   
     after(()=>{
       (User.findOne as sinon.SinonStub).restore();
     })
   
     it('Login com usuário inválido', async () => {
       chaiHttpResponse = await chai
          .request(app).post('/login').send({
           email: 'outrousuário@email.com',
           password: 'outrasenha123'
          });
   
       expect(chaiHttpResponse).to.equal(401);
     });
   });

   describe('Caso de falha:', () => {
     let chaiHttpResponse: Response;
   
     before(async () => {
       sinon
         .stub(User, "findOne")
         .resolves({} as User);
     });
   
     after(()=>{
       (User.findOne as sinon.SinonStub).restore();
     })
   
     it('Login sem email', async () => {
       chaiHttpResponse = await chai
          .request(app).post('/login').send({
           password: 'outrasenha123'
          });
   
       expect(chaiHttpResponse).to.equal(400);
     });
   });

   describe('Caso de falha:', () => {
     let chaiHttpResponse: Response;
   
     before(async () => {
       sinon
         .stub(User, "findOne")
         .resolves({} as User);
     });
   
     after(()=>{
       (User.findOne as sinon.SinonStub).restore();
     })
   
     it('Login sem senha', async () => {
       chaiHttpResponse = await chai
          .request(app).post('/login').send({
            email: 'admin@admin.com'
          });
   
       expect(chaiHttpResponse).to.equal(400);
     });
   });

   describe('Caso de falha:', () => {
     let chaiHttpResponse: Response;
   
     before(async () => {
       sinon
         .stub(User, "findOne")
         .resolves({} as User);
     });
   
     after(()=>{
       (User.findOne as sinon.SinonStub).restore();
     })
   
     it('Login com email inválido', async () => {
       chaiHttpResponse = await chai
          .request(app).post('/login').send({
            email: 'outroadmin@admin.com',
            password: 'secret_admin'
          });
   
       expect(chaiHttpResponse).to.equal(401);
     });
   });

   describe('Caso de falha:', () => {
     let chaiHttpResponse: Response;
   
     before(async () => {
       sinon
         .stub(User, "findOne")
         .resolves({} as User);
     });
   
     after(()=>{
       (User.findOne as sinon.SinonStub).restore();
     })
   
     it('Login com senha inválida', async () => {
       chaiHttpResponse = await chai
          .request(app).post('/login').send({
            email: 'admin@admin.com',
            password: 'outrasenhasecret_admin'
          });
   
       expect(chaiHttpResponse).to.equal(401);
     });
   });
 });
