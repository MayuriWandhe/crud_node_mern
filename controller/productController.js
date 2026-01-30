import Product from '../model/productModel.js'

export const  create = async (req, res) =>{
    try {
        const {prodName , prodDescription, prodCost} = req.body;
        const  prodImg  = req.file.filename;

        console.log("prodImg : ", prodImg, req.file.filename,  req.body, req.file);
        if(!prodImg) {
            return res.status(400).json({error : 'Product image is required!'});
        }
        const prodExist = await Product.findOne({prodName});
        if(prodExist){
           return res.status(400).json({error : 'Product already exists.'})
        }
        const prodData = new Product({
            prodName,
            prodDescription,
            prodCost,
            prodImg
        });

        const newProduct = await prodData.save();

        console.log('newProduct : ', newProduct);
        
        return res.status(201).json({newProduct, message : 'Product created successfully.'});
        } catch (error) {
        console.log('error : ', error, req.body);
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


export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product){
            return res.status(400).json({error : 'Product not found.'});
        }
        await Product.findByIdAndDelete(id);
        return res.status(200).json({message : 'Product deleted successfully.'});
    } catch (error) {
        return res.status(500).json({error : 'Internal server error.'})        ;
    }
}