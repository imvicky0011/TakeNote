import axios from "axios"

export const register = async (user) => {
    try {
        const res = await axios.post("/users/register", user)
        return res
    }
    catch(err) {
        return err;
    }
}

export const login = async (user) => {
    try {
        const res = await axios.post("/users/login", user)
        return res
    }
    catch(err) {
        return err;
    }
}

export const logout = async () => {
    try {
        const res = await axios.get("/users/logout")
        return res
    }
    catch(err) {
        return err;
    }
}

export const getUser = async () => {
    try {
        const res = await axios.get("/users/me")
        return res
    }
    catch(err) {
        return err;
    }
}

export const updateUser = async (user) => {
    try {
        const res = await axios.put("/users/updateDetails", user)
        return res
    }
    catch (err) {
        return err
    }
}

export const updatepassword = async (data) => {
    try {
        const res = await axios.put("/users/updatePassword", data)
        return res
    }
    catch (err) {
        return err
    }
}

export const deleteUser = async () => {
    try {
        const res = await axios.delete("/users/delete")
        return res
    }
    catch (err) {
        return err
    }
}

