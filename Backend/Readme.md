#Asosiaction avec l'utilisation de sequelize-auto

npm install sequelize-auto

Prérequis pour son utilisation: Avoir installé le dialect utilisé dans la db.
Dans ce cas c'est mysql

npm install mysql2

npx sequelize-auto -h localhost -d db_Test_Associate -u root -x root -p 6033 --dialect mysql -c ./config.json -o ./Models

Le résultat est en CommonJS, si le travail est effectué en ES modules il faudra adapter le code
