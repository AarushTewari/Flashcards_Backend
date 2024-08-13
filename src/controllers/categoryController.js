import { getCategories } from "../db/category.js"


export const categoryList = async (req, res) => {
    try {
        const result = await getCategories();
        res.status(200).json({
            data: result
        })
    } catch(err) {
        res.status(500).json({
            error: err
        })
    }
}