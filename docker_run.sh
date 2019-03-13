docker build --tag="securemail" .
docker stop securemail
docker rm securemail
docker create --name="securemail" --network="host" securemail
docker start securemail
echo "Visit http://localhost:<X> where X is the port specified in the file config/config_server to access the server"
