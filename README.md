INSTALACION DYNAMODB LOCAL

This open-source (https://github.com/YoyaTeam/dynamodb-manager) tool is pretty good.

It has the following features:

Table

Add Table
Edit Table
Delete Table
Connect Table
Add Index(GSI and LSI)
Delete Index
Item

Add Item
Edit Item
Delete Item
import/export Items
Search (Table or Index)

Scan Table
Query Table
Filter Condition
Usage:

docker pull taydy/dynamodb-manager
docker run -t -p 8080:80 taydy/dynamodb-manager

Open the following URL in the browser:

http://localhost:8080/ or http://127.0.0.1:8080/