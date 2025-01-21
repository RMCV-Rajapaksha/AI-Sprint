from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://admin:admin@cluster0.b775wno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client.predicitions

collection_name = db['Predicitions']
