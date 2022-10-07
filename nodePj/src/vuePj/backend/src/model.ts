import { MongoClient, ServerApiVersion } from "mongodb"

export function connectTo() {
	const uri = "mongodb+srv://test:test@utahdelta.787l9or.mongodb.net/?retryWrites=true&w=majority"
	const client = new MongoClient(uri)
	client.connect(async (err) => {
		const collection = client.db("test").collection("devices")
		const data = await collection.findOne({ title: "Back to the Future" })
		console.log(data)
		client.close()
	})
}
