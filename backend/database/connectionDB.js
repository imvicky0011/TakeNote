import mongoose  from 'mongoose'

const connectionDB = () => {
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {console.log("Connected to DB")})
    .catch((err) => {console.log("here: " + err.message)})
}

export default connectionDB