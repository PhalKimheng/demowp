## Rachana Demo

A demo for apply CGDS on Wordpress theme.

## Installation


1. With Docker installed and running, in Terminal:

````
cd rachana-demo
````

2. Then: (add sudo if linux)

````
docker compose up -d
````

3. After that, in your browser:
   
````
http://localhost:10033/
````

4. But, there are style errors of Rachana blocks. While running docker, you have to:

- Navigate to the Rachana Block directory:

  ```
  cd plugins/rachana-block/
  ```

- Then, install the packages and build the plugin:

  ```
  npm install && npm run build
  ```

(you might encounter database connection error, just wait for a while for the queries to be executed and refresh the page and it should work)

also a common problem faced by linux is the permission issue, to fix it run the following command:

Unlock permision directory
```` 
chmod -R 777 . 
````

Clear Database

````
docker compose down -v
````

## WordPress Admin Login

Go to `http://localhost:10033/wp-admin/`

Then, log in with: `Username: admin` and `Password: password`
