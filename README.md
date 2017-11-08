Projeto ATM [Caixa Eletronico]
===================

Projeto criado para estudo em desenvolvimento de sistemas web, com tecnologias **NodeJS**, **Mongodb**, **AngularJS**.

----------

Informações
-------------

Nessa stack foi usado as seguintes tecnologias e implementada algumas configurações, são elas:

> - Node v8 :  Todo o código foi escrito em es6.
> - Express : Framework node para web.
> - Mongodb : Banco de dados NOSQL, não relacional.
> - Mongoose : Framework para usar Mongodb no Node.
> - CORS : plugin node para permitir acesso em dominio diferente.
> - Nodemon : Plugin node para auto reload do servidor.
> - AngularJS : Desenvolvimento do frontend. 
> No caso do angular foi usado o **Bower** e **Grunt**

   
----------

#### <i class="icon-hdd"></i> Instalações
**Backend** :

	$ npm install

Para rodar o servidor:
O servidor já está confirgurado para rodar na porta 8000.

    $ npm run start:dev

Para iniciar o projeto abra no browser [http://localhost:8000](http://localhost:8000)
Ao abrir o link no browser já ira carregar o Front junto com o Server.

----------
**Frontend** :

    $cd frontend
    $npm install
    $bower install
   
  Para rodar o frontend desacoplado do backend:
  

    $grunt serve
Para iniciar o projeto abra no browser [http://localhost:9000](http://localhost:8000) 
Ao abrir o link no browser já ira carregar o Front sem o server com as apis.
  
----------

APIS no projeto
--------------------
### API
localhost:8000/api/ 

api              | método   |return 
---------------- |:----------:| ---
initAtm 		 | GET		| retorna os dados da atm (id, saldo, atualizadoem)
obterSaldoAtm    | GET		| retorna o saldoAtual 
obterMinimoNotas | POST		| retorna o numero de notas requisitado no saque
fazerDeposito	 | POST		| retorna o valor depositado
fazerSaque       | POST		| retorna o valor sacado


Qualquer dúvidas, meu email é hhalmeida3@gmail.com
Espero poder ajudar mais pessoas , o projeto está simples e fácil entendimento.

Obrigado, Hugo Almeida