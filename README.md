# BackEnd

Web services for nodebnb

## Requirements

- [node](http://nodejs.org/)
- [mongodb](https://www.elastic.co/downloads/elasticsearch)
- [elasticsearch]((https://www.elastic.co/downloads/elasticsearch))

export elasticsearch bin folder, e.g.

    ```bash
    echo 'export PATH=/Users/ytian/Applications/elasticsearch-1.5.2/bin:$PATH' >> ~/.bash_profile; source ~/.bash_profile
    ```

## First time setup

1. Clone the repo: `git clone https://github.com/nodebnb/BackEnd.git`
2. Go into folder: `cd BackEnd`
3. Install dependencies: `npm install`
4. Create local MongoDB database called **nodebnb**

## Start

1. Start the app: `npm start`
2. View in browser at: `http://localhost:3000`

## Demo

## Troubleshootings

1. Address in use

Error: listen EADDRINUSE

	``` 
	ps aux | grep node
	kill <node-process>
	```

2. Restart search engine

