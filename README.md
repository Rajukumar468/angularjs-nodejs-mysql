# angularjs-nodejs-mysql
Web angular js as frontend, express js as backend and mysql as database
This Package inclide npm backend package (express js ) and front end package(angular4)

<b>Installation steps</b>
1. **git clone https://github.com/Rajukumar468/angularjs-nodejs-mysql.git angularjs-nodejs-mysql**
2. **cd angularjs-nodejs-mysql**
3. **git install** (install expressjs dependency)
4. **cd client** (go to front end directory)
5. **git install** (install angularjs(frontend) dependency)
7. **cd ..** (come back to main directory "angularjs-nodejs-mysql")
8. Change database settings- open **index.js** and do necessary changes<br/>
      **var con=mysql.createPool({<br/>
          connectionLimit:50,<br/>
          host:'localhost',<br/>
          user:'root',<br/>
          password:'',<br/>
          database:'app'<br/>
      });**<br/>
   Note: Make sure you are using Mysql database
   <br/>
9. run "DEBUG=angularjs-nodejs-mysql:* npm start" command ( backend is up and running started)
10. open http://localhost:3000/ in browser to verify backend
11. **cd client** ( go to front end direcory(angularjs))
12. **ng serve** (run angular)
13. Open in browser http://localhost:4200/ (now angular up and running)

Now your project up and running.
