import Product from '../model/productModel.js'

export const  create = async (req, res) =>{
    try {
        const prodData = new Product(req.body);
        const { prodName } = prodData;
        const prodExist = await Product.findOne({prodName});
        if(prodExist){
           return res.status(400).json({error : 'Product already exists.'})
        }
        const newProduct = await prodData.save();
        return res.status(201).json({newProduct, message : 'Product created successfully.'});
        } catch (error) {
        res.status(500).json({error : 'Inetrnal server error.'})
    }
}


export const getAllProducts = async (req, res) =>{
    try {
        const productData = await Product.find();
        if(!productData){
            return res.status(400).json({error : 'Product not found.'})
        }
        return res.status(200).json(productData)
    } catch (error) {
        console.log('getAllProducts error : ' , error);
        return res.status(500).json({error : 'Inetrnal server error.'})
    }
}

export const getProductByd = async (req, res) =>{
    try {
        const id = req.params.id;
        const prodData = await Product.findById(id);
        if(!prodData) {
            return res.status(400).json({error : 'Product not found.'});
        }       
        return res.status(200).json({prodData});
    } catch (error) {
        res.status(500).json({error : 'Internal server error.'})
    }
}


export const update = async (req, res) => {
    try {
        const _id = req.params.id;
        const prodData = await Product.findById(_id);
        if(!prodData){
            return res.status(400).json({error : "Product not found."});
        }        
        const data = await Product.findByIdAndUpdate(_id, req.body, {new : true});
        res.status(200).json({data, message : 'Product updated successfully.'});
    } catch (error) {
        console.log('error update :', error);
        return res.status(500).json({error : 'Internal server error.'})
    }
}