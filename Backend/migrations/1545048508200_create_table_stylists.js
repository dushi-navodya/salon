module.exports = {
    "up": "CREATE TABLE if not exists stylists(stylistId int AUTO_INCREMENT, firstName varchar(50) NOT NULL, lastName varchar(50) NOT NULL, userId int, job tinyint(1) NOT NULL default 0, PRIMARY KEY (stylistId), FOREIGN KEY(userId) REFERENCES users(userId))",
    "down": "DROP TABLE stylists"
}