#curl -F file=@./test.txt -X POST http://localhost:3000/blob-file/upload
#curl -F file=@./image.png -X POST http://localhost:3000/blob-file/upload

curl --form fileName='@./image.png' http://localhost:3000/blob-file/upload

#curl -F file=@./image.png -X POST --data-binary http://localhost:3000/blob-file/upload/image.png
#curl --request POST -H "Content-Type:application/octet-stream" --data-binary "@./image.png" --header "file=\"image.png\""  http://localhost:3000/blob-file/upload
#curl --request PUT --data-binary "@./image.png" http://localhost:3000/blob-file/upload/image.png --header "file=\"image.png\""

