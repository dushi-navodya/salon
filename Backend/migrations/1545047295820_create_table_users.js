module.exports = {
    "up": "CREATE TABLE users( userId int AUTO_INCREMENT, userName varchar(30) NOT NULL, userGroupId int, password varchar(50) NOT NULL, PRIMARY KEY (userId), FOREIGN KEY(userGroupId) REFERENCES userGroups(userGroupId))",
    "down": "DROP TABLE users"
}